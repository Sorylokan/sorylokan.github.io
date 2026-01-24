using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

public class CPHInline
{
    public bool Execute()
    {
        try
        {
            CPH.LogInfo("WEBUI Webhook Sender starting");
            
            string payloadJson = "";
            bool fromArgument = CPH.TryGetArg<string>("WEBWUI_WebhookPayload", out payloadJson);
            
            if (string.IsNullOrEmpty(payloadJson))
            {
                CPH.LogDebug("Argument empty, using global variable");
                payloadJson = CPH.GetGlobalVar<string>("WEBWUI_WebhookPayload", true);
                fromArgument = false;
            }
            
            CPH.TryGetArg<string>("WEBWUI_WebhookURL", out string fallbackUrl);
            fallbackUrl = fallbackUrl ?? "";
            
            if (string.IsNullOrEmpty(payloadJson))
            {
                CPH.LogError("No webhook payload found");
                return false;
            }
            
            CPH.LogDebug($"Payload size: {payloadJson.Length} characters from {(fromArgument ? "argument" : "global variable")}");
            
            JObject rootObject;
            try
            {
                rootObject = JObject.Parse(payloadJson);
            }
            catch (JsonException ex)
            {
                CPH.LogError($"JSON parsing failed: {ex.Message}");
                return false;
            }
            
            JObject payload = rootObject["payload"]?.ToObject<JObject>();
            string webhookUrl = rootObject["WebHookUrl"]?.ToString();
            
            if (payload == null)
            {
                CPH.LogError("Missing payload section in JSON");
                return false;
            }
            
            if (string.IsNullOrEmpty(webhookUrl))
            {
                webhookUrl = fallbackUrl;
            }
            
            if (string.IsNullOrEmpty(webhookUrl))
            {
                CPH.LogError("No webhook URL found");
                return false;
            }
            
            if (!webhookUrl.Contains("?wait=true"))
            {
                webhookUrl += webhookUrl.Contains("?") ? "&wait=true" : "?wait=true";
            }
            
            CPH.LogVerbose($"Final webhook URL: {webhookUrl.Substring(0, Math.Min(50, webhookUrl.Length))}...");
            
            string payloadJsonString = payload.ToString(Formatting.None);
            string processedPayload = ReplaceStreamerBotVariables(payloadJsonString);
            
            JObject processedPayloadObj = JObject.Parse(processedPayload);
            string content = processedPayloadObj["content"]?.ToString() ?? "";
            if (content.Length > 2000)
            {
                CPH.LogWarn($"Content length ({content.Length} chars) may exceed Discord limits");
            }
            
            CPH.LogDebug($"Processed payload size: {processedPayload.Length} characters");
            
            return SendWebhookAsync(webhookUrl, processedPayload).GetAwaiter().GetResult();
        }
        catch (Exception ex)
        {
            CPH.LogError($"Critical error in Execute: {ex.Message}");
            return false;
        }
    }
    
    private async Task<bool> SendWebhookAsync(string webhookUrl, string payloadJson)
    {
        using (HttpClient client = new HttpClient())
        {
            try
            {
                client.Timeout = TimeSpan.FromSeconds(30);
                client.DefaultRequestHeaders.Add("User-Agent", "WEBUI-Webhook-Sender/1.0");
                
                var content = new StringContent(payloadJson, Encoding.UTF8, "application/json");
                
                CPH.LogDebug("Sending request to Discord");
                
                HttpResponseMessage response = await client.PostAsync(webhookUrl, content);
                string responseBody = await response.Content.ReadAsStringAsync();
                
                CPH.LogDebug($"Discord response: {response.StatusCode} ({(int)response.StatusCode})");
                
                if (response.IsSuccessStatusCode)
                {
                    CPH.LogInfo("Webhook sent successfully");
                    
                    if (!string.IsNullOrEmpty(responseBody) && responseBody.StartsWith("{"))
                    {
                        try
                        {
                            var responseObj = JObject.Parse(responseBody);
                            string messageId = responseObj["id"]?.ToString();
                            if (!string.IsNullOrEmpty(messageId))
                            {
                                CPH.LogVerbose($"Discord message ID: {messageId}");
                            }
                        }
                        catch
                        {
                            // Ignore parsing errors
                        }
                    }
                    
                    return true;
                }
                else
                {
                    CPH.LogError($"Discord error: {response.StatusCode}");
                    
                    if (!string.IsNullOrEmpty(responseBody))
                    {
                        CPH.LogDebug($"Error details: {responseBody}");
                        
                        try
                        {
                            var errorObj = JObject.Parse(responseBody);
                            string errorMessage = errorObj["message"]?.ToString();
                            if (!string.IsNullOrEmpty(errorMessage))
                            {
                                CPH.LogError($"Discord error message: {errorMessage}");
                            }
                        }
                        catch
                        {
                            // Ignore parsing errors
                        }
                    }
                    
                    if ((int)response.StatusCode == 429)
                    {
                        CPH.LogWarn("Discord rate limit reached, retry later");
                    }
                    
                    return false;
                }
            }
            catch (TaskCanceledException ex)
            {
                if (ex.CancellationToken.IsCancellationRequested)
                {
                    CPH.LogError("Request timeout exceeded");
                }
                else
                {
                    CPH.LogError("Network timeout during send");
                }
                return false;
            }
            catch (HttpRequestException ex)
            {
                CPH.LogError($"HTTP error: {ex.Message}");
                return false;
            }
            catch (Exception ex)
            {
                CPH.LogError($"Unexpected error during send: {ex.Message}");
                return false;
            }
        }
    }
    
    private string ReplaceStreamerBotVariables(string text)
    {
        try
        {
            CPH.LogDebug("Processing Streamer.bot variables");
            string result = text;
            int replacements = 0;
            
            var globalMatches = System.Text.RegularExpressions.Regex.Matches(text, @"~([^~]+)~");
            foreach (System.Text.RegularExpressions.Match match in globalMatches)
            {
                string variableName = match.Groups[1].Value;
                string variableValue = CPH.GetGlobalVar<string>(variableName, true) ?? "";
                
                if (!string.IsNullOrEmpty(variableValue))
                {
                    result = result.Replace(match.Value, variableValue);
                    replacements++;
                    CPH.LogVerbose($"Global variable replaced: ~{variableName}~");
                }
                else
                {
                    CPH.LogWarn($"Global variable not found: ~{variableName}~");
                }
            }
            
            var argMatches = System.Text.RegularExpressions.Regex.Matches(result, @"%([^%]+)%");
            foreach (System.Text.RegularExpressions.Match match in argMatches)
            {
                string argumentName = match.Groups[1].Value;
                string argumentValue = "";
                
                if (CPH.TryGetArg<string>(argumentName, out argumentValue) && !string.IsNullOrEmpty(argumentValue))
                {
                    result = result.Replace(match.Value, argumentValue);
                    replacements++;
                    CPH.LogVerbose($"Argument replaced: %{argumentName}%");
                }
                else
                {
                    CPH.LogWarn($"Argument not found: %{argumentName}%");
                }
            }
            
            CPH.LogDebug($"Variable processing complete: {replacements} replacements");
            return result;
        }
        catch (Exception ex)
        {
            CPH.LogError($"Error processing variables: {ex.Message}");
            return text;
        }
    }
}