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
            // 1. Récupération et validation des variables
            CPH.LogInfo("=== WEBWUI Webhook Sender - Début ===");
            
            // Essayer d'abord l'argument, puis fallback sur la variable globale
            string payloadJson = "";
            bool fromArgument = CPH.TryGetArg<string>("WEBWUI_WebhookPayload", out payloadJson);
            
            if (string.IsNullOrEmpty(payloadJson))
            {
                CPH.LogInfo("Argument WEBWUI_WebhookPayload vide/absent, fallback sur variable globale...");
                payloadJson = CPH.GetGlobalVar<string>("WEBWUI_WebhookPayload", true);
                fromArgument = false;
            }
            
            CPH.TryGetArg<string>("WEBWUI_WebhookURL", out string fallbackUrl);
            fallbackUrl = fallbackUrl ?? "";
            
            if (string.IsNullOrEmpty(payloadJson))
            {
                CPH.LogError("Variable WEBWUI_WebhookPayload vide ou non trouvée (ni argument ni globale)");
                return false;
            }
            
            CPH.LogInfo($"Payload récupéré: {payloadJson.Length} caractères {(fromArgument ? "(depuis argument)" : "(depuis variable globale)")}");
            CPH.LogInfo($"URL de fallback: {(string.IsNullOrEmpty(fallbackUrl) ? "Aucune" : "Définie")}");
            
            // 2. Parsing JSON
            JObject rootObject;
            try
            {
                rootObject = JObject.Parse(payloadJson);
            }
            catch (JsonException ex)
            {
                CPH.LogError($"Erreur parsing JSON: {ex.Message}");
                return false;
            }
            
            // 3. Extraction payload et URL
            JObject payload = rootObject["payload"]?.ToObject<JObject>();
            string webhookUrl = rootObject["WebHookUrl"]?.ToString();
            
            if (payload == null)
            {
                CPH.LogError("Section 'payload' manquante dans le JSON");
                return false;
            }
            
            // Utiliser l'URL du payload ou la fallback
            if (string.IsNullOrEmpty(webhookUrl))
            {
                webhookUrl = fallbackUrl;
            }
            
            if (string.IsNullOrEmpty(webhookUrl))
            {
                CPH.LogError("Aucune URL webhook trouvée (ni dans payload ni en argument)");
                return false;
            }
            
            // Ajouter ?wait=true si pas déjà présent
            if (!webhookUrl.Contains("?wait=true"))
            {
                webhookUrl += webhookUrl.Contains("?") ? "&wait=true" : "?wait=true";
            }
            
            CPH.LogInfo($"URL webhook finale: {webhookUrl.Substring(0, Math.Min(50, webhookUrl.Length))}...");
            
            // 4. Remplacement des variables Streamer.bot dans le payload
            string payloadJsonString = payload.ToString(Formatting.None);
            string processedPayload = ReplaceStreamerBotVariables(payloadJsonString);
            
            // Vérifier taille content si présent après traitement
            JObject processedPayloadObj = JObject.Parse(processedPayload);
            string content = processedPayloadObj["content"]?.ToString() ?? "";
            if (content.Length > 2000)
            {
                CPH.LogWarn($"Content très long ({content.Length} chars), risque de rejet Discord");
            }
            
            CPH.LogInfo($"Payload traité à envoyer: {processedPayload.Length} caractères");
            
            // 5. Envoi HTTP
            return SendWebhookAsync(webhookUrl, processedPayload).GetAwaiter().GetResult();
        }
        catch (Exception ex)
        {
            CPH.LogError($"Erreur critique dans Execute(): {ex.Message}");
            return false;
        }
    }
    
    private async Task<bool> SendWebhookAsync(string webhookUrl, string payloadJson)
    {
        using (HttpClient client = new HttpClient())
        {
            try
            {
                // Configuration du client HTTP
                client.Timeout = TimeSpan.FromSeconds(30);
                client.DefaultRequestHeaders.Add("User-Agent", "WEBWUI-Webhook-Sender/1.0");
                
                // Préparation de la requête
                var content = new StringContent(payloadJson, Encoding.UTF8, "application/json");
                
                CPH.LogInfo("Envoi de la requête à Discord...");
                
                // Envoi de la requête
                HttpResponseMessage response = await client.PostAsync(webhookUrl, content);
                
                // Gestion de la réponse
                string responseBody = await response.Content.ReadAsStringAsync();
                
                CPH.LogInfo($"Réponse Discord: {response.StatusCode} ({(int)response.StatusCode})");
                
                if (response.IsSuccessStatusCode)
                {
                    CPH.LogInfo("✅ Webhook envoyé avec succès!");
                    
                    // Si wait=true, Discord retourne les détails du message
                    if (!string.IsNullOrEmpty(responseBody) && responseBody.StartsWith("{"))
                    {
                        try
                        {
                            var responseObj = JObject.Parse(responseBody);
                            string messageId = responseObj["id"]?.ToString();
                            if (!string.IsNullOrEmpty(messageId))
                            {
                                CPH.LogInfo($"Message ID Discord: {messageId}");
                            }
                        }
                        catch
                        {
                            // Ignore si parsing échoue
                        }
                    }
                    
                    return true;
                }
                else
                {
                    // Gestion des erreurs Discord
                    CPH.LogError($"❌ Erreur Discord: {response.StatusCode}");
                    
                    if (!string.IsNullOrEmpty(responseBody))
                    {
                        CPH.LogError($"Détails erreur: {responseBody}");
                        
                        // Parse les erreurs Discord si possible
                        try
                        {
                            var errorObj = JObject.Parse(responseBody);
                            string errorMessage = errorObj["message"]?.ToString();
                            if (!string.IsNullOrEmpty(errorMessage))
                            {
                                CPH.LogError($"Message d'erreur Discord: {errorMessage}");
                            }
                        }
                        catch
                        {
                            // Si parsing échoue, afficher le texte brut
                        }
                    }
                    
                    // Gestion spéciale pour rate limiting (429 Too Many Requests)
                    if ((int)response.StatusCode == 429)
                    {
                        CPH.LogWarn("⚠️ Rate limit Discord atteint - réessayez plus tard");
                    }
                    
                    return false;
                }
            }
            catch (TaskCanceledException ex)
            {
                if (ex.CancellationToken.IsCancellationRequested)
                {
                    CPH.LogError("❌ Timeout: La requête a pris trop de temps");
                }
                else
                {
                    CPH.LogError("❌ Timeout réseau lors de l'envoi");
                }
                return false;
            }
            catch (HttpRequestException ex)
            {
                CPH.LogError($"❌ Erreur HTTP: {ex.Message}");
                return false;
            }
            catch (Exception ex)
            {
                CPH.LogError($"❌ Erreur inattendue lors de l'envoi: {ex.Message}");
                return false;
            }
        }
    }
    
    private string ReplaceStreamerBotVariables(string text)
    {
        try
        {
            CPH.LogInfo("Traitement des variables Streamer.bot...");
            string result = text;
            int replacements = 0;
            
            // 1. Remplacer les variables globales ~variableName~
            var globalMatches = System.Text.RegularExpressions.Regex.Matches(text, @"~([^~]+)~");
            foreach (System.Text.RegularExpressions.Match match in globalMatches)
            {
                string variableName = match.Groups[1].Value;
                string variableValue = CPH.GetGlobalVar<string>(variableName, true) ?? "";
                
                if (!string.IsNullOrEmpty(variableValue))
                {
                    result = result.Replace(match.Value, variableValue);
                    replacements++;
                    CPH.LogInfo($"Variable globale remplacée: ~{variableName}~ → {variableValue.Substring(0, Math.Min(50, variableValue.Length))}...");
                }
                else
                {
                    CPH.LogWarn($"Variable globale non trouvée: ~{variableName}~");
                }
            }
            
            // 2. Remplacer les arguments %argumentName%
            var argMatches = System.Text.RegularExpressions.Regex.Matches(result, @"%([^%]+)%");
            foreach (System.Text.RegularExpressions.Match match in argMatches)
            {
                string argumentName = match.Groups[1].Value;
                string argumentValue = "";
                
                if (CPH.TryGetArg<string>(argumentName, out argumentValue) && !string.IsNullOrEmpty(argumentValue))
                {
                    result = result.Replace(match.Value, argumentValue);
                    replacements++;
                    CPH.LogInfo($"Argument remplacé: %{argumentName}% → {argumentValue.Substring(0, Math.Min(50, argumentValue.Length))}...");
                }
                else
                {
                    CPH.LogWarn($"Argument non trouvé: %{argumentName}%");
                }
            }
            
            CPH.LogInfo($"Traitement terminé: {replacements} variable(s) remplacée(s)");
            return result;
        }
        catch (Exception ex)
        {
            CPH.LogError($"Erreur lors du remplacement des variables: {ex.Message}");
            return text; // Retourner le texte original en cas d'erreur
        }
    }
}