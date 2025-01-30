<?php
// Conectar ao banco de dados SQLite
$db = new PDO('sqlite:meubanco.db');

// Criar a tabela
$sql = "CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
)";
$db->exec($sql);

// Fechar a conexão
$db = null;
?>
