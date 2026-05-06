CREATE DATABASE IF NOT EXISTS chifa_menu;

USE chifa_menu;

CREATE TABLE IF NOT EXISTS pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_nombre VARCHAR(100) NOT NULL,
  productos JSON NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  yape_operacion VARCHAR(100) NOT NULL,
  estado ENUM('preparando', 'listo', 'entregado') DEFAULT 'preparando',
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);