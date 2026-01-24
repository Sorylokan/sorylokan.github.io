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
            
            // Get payload and webhook URL
            var (payload, webhookUrl) = GetPayloadAndWebhookUrl();
            if (payload == null || string.IsNullOrEmpty(webhookUrl))
            {
                return false;
            }
            
            if (!webhookUrl.Contains("?wait=true"))
            {
                webhookUrl += webhookUrl.Contains("?") ? "&wait=true" : "?wait=true";
            }
            
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
    
    public bool EditMode()
    {
        try
        {
            CPH.LogInfo("=== WEBUI Edit Mode with Dynamic Variables - Start ===");
            
            // 1. Get payload and webhook URL
            var (payload, webhookUrl) = GetPayloadAndWebhookUrl();
            if (payload == null || string.IsNullOrEmpty(webhookUrl))
            {
                return false;
            }
            
            // 2. Generate dynamic variable name based on action
            string variableName = GenerateDynamicVariableName();
            CPH.LogInfo($"Using dynamic variable: {variableName}");
            
            // 3. Process variables 
            string payloadJsonString = payload.ToString(Formatting.None);
            string processedPayload = ReplaceStreamerBotVariables(payloadJsonString);
            
            // 4. Content length warning
            JObject processedPayloadObj = JObject.Parse(processedPayload);
            string content = processedPayloadObj["content"]?.ToString() ?? "";
            if (content.Length > 2000)
            {
                CPH.LogWarn($"Content length ({content.Length} chars) may exceed Discord limits");
            }
            
            CPH.LogDebug($"Processed payload size: {processedPayload.Length} characters");
            
            return EditModeWebhookAsync(webhookUrl, processedPayload, variableName).GetAwaiter().GetResult();
        }
        catch (Exception ex)
        {
            CPH.LogError($"Critical error in EditMode: {ex.Message}");
            return false;
        }
    }
    
    private (JObject payload, string webhookUrl) GetPayloadAndWebhookUrl()
    {
        string payloadJson = "";
        bool fromArgument = CPH.TryGetArg<string>("WEBWUI_WebhookPayload", out payloadJson);
        
        if (string.IsNullOrEmpty(payloadJson))
        {
            payloadJson = CPH.GetGlobalVar<string>("WEBWUI_WebhookPayload", true);
            fromArgument = false;
        }
        
        CPH.TryGetArg<string>("WEBWUI_WebhookURL", out string fallbackUrl);
        fallbackUrl = fallbackUrl ?? "";
        
        if (string.IsNullOrEmpty(payloadJson))
        {
            CPH.LogError("No webhook payload found");
            return (null, null);
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
            return (null, null);
        }
        
        JObject payload = rootObject["payload"]?.ToObject<JObject>();
        string webhookUrl = rootObject["WebHookUrl"]?.ToString();
        
        if (payload == null)
        {
            CPH.LogError("Missing payload section in JSON");
            return (null, null);
        }
        
        if (string.IsNullOrEmpty(webhookUrl))
        {
            webhookUrl = fallbackUrl;
        }
        
        if (string.IsNullOrEmpty(webhookUrl))
        {
            CPH.LogError("No webhook URL found");
            return (null, null);
        }
        
        return (payload, webhookUrl);
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
    
    private async Task<bool> EditModeWebhookAsync(string webhookUrl, string payloadJson, string variableName)
    {
        // Try to get the stored message ID for this specific action
        string lastMessageId = CPH.GetGlobalVar<string>(variableName, false);
        
        if (!string.IsNullOrEmpty(lastMessageId))
        {
            CPH.LogInfo($"Edit mode: Attempting to edit existing message (ID: {lastMessageId})");
            bool editSuccess = await EditExistingMessageAsync(webhookUrl, payloadJson, lastMessageId);
            
            if (editSuccess)
            {
                CPH.LogInfo("✅ Message edited successfully (PATCH)");
                return true;
            }
            else
            {
                CPH.LogWarn("Edit failed, falling back to new message");
                // Clear invalid ID and fall through to send new message
                CPH.SetGlobalVar(variableName, "", false);
            }
        }
        else
        {
            CPH.LogInfo("Edit mode: No previous message ID found, sending new message");
        }
        
        // Send new message and store ID for future edits
        return await SendWebhookWithIdStorageAsync(webhookUrl, payloadJson, variableName);
    }
    
    private async Task<bool> EditExistingMessageAsync(string webhookUrl, string payloadJson, string messageId)
    {
        using (HttpClient client = new HttpClient())
        {
            try
            {
                // Remove ?wait=true for edit requests (not needed)
                string cleanWebhookUrl = webhookUrl.Replace("?wait=true", "").Replace("&wait=true", "");
                string editUrl = cleanWebhookUrl.TrimEnd('/') + "/messages/" + messageId;
                
                client.Timeout = TimeSpan.FromSeconds(30);
                client.DefaultRequestHeaders.Add("User-Agent", "WEBUI-Webhook-Sender/1.0");
                
                var content = new StringContent(payloadJson, Encoding.UTF8, "application/json");
                
                CPH.LogDebug($"Editing message ID: {messageId}");
                
                HttpResponseMessage response = await client.PatchAsync(editUrl, content);
                string responseBody = await response.Content.ReadAsStringAsync();
                
                CPH.LogDebug($"Discord edit response: {response.StatusCode} ({(int)response.StatusCode})");
                
                if (response.IsSuccessStatusCode)
                {
                    CPH.LogInfo("Message edited successfully");
                    return true;
                }
                else
                {
                    if ((int)response.StatusCode == 404)
                    {
                        CPH.LogWarn("Message not found (may have been deleted)");
                    }
                    else
                    {
                        CPH.LogError($"Discord edit error: {response.StatusCode}");
                        
                        // Log Discord error details
                        if (!string.IsNullOrEmpty(responseBody))
                        {
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
                    }
                    
                    return false;
                }
            }
            catch (TaskCanceledException ex)
            {
                if (ex.CancellationToken.IsCancellationRequested)
                {
                    CPH.LogError("Edit request timeout exceeded");
                }
                else
                {
                    CPH.LogError("Network timeout during edit");
                }
                return false;
            }
            catch (HttpRequestException ex)
            {
                CPH.LogError($"HTTP error during edit: {ex.Message}");
                return false;
            }
            catch (Exception ex)
            {
                CPH.LogError($"Unexpected error during edit: {ex.Message}");
                return false;
            }
        }
    }
    
    private async Task<bool> SendWebhookWithIdStorageAsync(string webhookUrl, string payloadJson, string variableName)
    {
        // Ensure webhook URL has wait=true to get the message ID
        if (!webhookUrl.Contains("?wait=true"))
        {
            webhookUrl += webhookUrl.Contains("?") ? "&wait=true" : "?wait=true";
        }
        
        using (HttpClient client = new HttpClient())
        {
            try
            {
                client.Timeout = TimeSpan.FromSeconds(30);
                client.DefaultRequestHeaders.Add("User-Agent", "WEBUI-Webhook-Sender/1.0");
                
                var content = new StringContent(payloadJson, Encoding.UTF8, "application/json");
                
                CPH.LogDebug("Sending new message to Discord");
                
                HttpResponseMessage response = await client.PostAsync(webhookUrl, content);
                string responseBody = await response.Content.ReadAsStringAsync();
                
                CPH.LogDebug($"Discord response: {response.StatusCode} ({(int)response.StatusCode})");
                
                if (response.IsSuccessStatusCode)
                {
                    CPH.LogInfo("Webhook sent successfully");
                    
                    // Extract and store message ID for future edits
                    if (!string.IsNullOrEmpty(responseBody) && responseBody.StartsWith("{"))
                    {
                        try
                        {
                            var responseObj = JObject.Parse(responseBody);
                            string messageId = responseObj["id"]?.ToString();
                            if (!string.IsNullOrEmpty(messageId))
                            {
                                CPH.SetGlobalVar(variableName, messageId, false);
                                CPH.LogDebug($"Message ID stored in {variableName}: {messageId}");
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
    
    private string GenerateDynamicVariableName()
    {
        try
        {
            // Get action name from Streamer.bot arguments
            string actionName = "";
            bool hasActionName = CPH.TryGetArg<string>("actionName", out actionName);
            
            // Get optional custom suffix
            string customSuffix = "";
            CPH.TryGetArg<string>("WEBWUI_EditSuffix", out customSuffix);
            
            // Build variable name
            string variableName = "WEBWUI_EditMsgId";
            
            if (hasActionName && !string.IsNullOrEmpty(actionName))
            {
                // Action-based variable: WEBWUI_EditMsgId_ActionName
                variableName += "_" + SanitizeVariableName(actionName);
                CPH.LogDebug($"Variable based on action: {actionName}");
            }
            else
            {
                // Fallback to generic variable
                CPH.LogWarn("actionName argument not found, using generic variable");
                variableName += "_Default";
            }
            
            if (!string.IsNullOrEmpty(customSuffix))
            {
                // Add custom suffix: WEBWUI_EditMsgId_ActionName_CustomSuffix
                variableName += "_" + SanitizeVariableName(customSuffix);
                CPH.LogDebug($"Custom suffix added: {customSuffix}");
            }
            
            return variableName;
        }
        catch (Exception ex)
        {
            CPH.LogError($"Error generating variable name: {ex.Message}");
            return "WEBWUI_EditMsgId_Error"; // Emergency fallback
        }
    }
    
    private string SanitizeVariableName(string name)
    {
        if (string.IsNullOrEmpty(name)) return "";
        
        // Clean name to be compatible with Streamer.bot variables
        // Keep only letters, numbers and underscores
        var result = System.Text.RegularExpressions.Regex.Replace(name, @"[^a-zA-Z0-9_]", "_");
        
        // Avoid double underscores
        result = System.Text.RegularExpressions.Regex.Replace(result, @"_+", "_");
        
        // Trim underscores from start/end
        result = result.Trim('_');
        
        return result;
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