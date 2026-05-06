import { db } from "../config/db.js";

export async function crearPedidoModel({
  cliente_nombre,
  productos,
  total,
  yape_operacion,
}) {
  const [result] = await db.query(
    `
    INSERT INTO pedidos 
    (cliente_nombre, productos, total, yape_operacion, estado)
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      cliente_nombre,            // Corregido: antes decía clienteNombre
      JSON.stringify(productos),
      total,
      yape_operacion,           // Corregido: antes decía yapeOperacion
      "preparando",
    ]
  );

  return result.insertId;
}

export async function obtenerPedidosModel() {
  const [rows] = await db.query(
    `
    SELECT 
      id,
      cliente_nombre,
      productos,
      total,
      yape_operacion,
      estado,
      creado_en,
      actualizado_en
    FROM pedidos
    WHERE estado != 'entregado'
    ORDER BY creado_en ASC
    `
  );

  return rows;
}

export async function obtenerPedidoPorIdModel(id) {
  const [rows] = await db.query(
    `
    SELECT 
      id,
      cliente_nombre,
      productos,
      total,
      yape_operacion,
      estado,
      creado_en,
      actualizado_en
    FROM pedidos
    WHERE id = ?
    LIMIT 1
    `,
    [id]
  );

  return rows[0];
}

export async function marcarPedidoEntregadoModel(id) {
  const [result] = await db.query(
    `
    UPDATE pedidos
    SET estado = 'entregado'
    WHERE id = ?
    `,
    [id]
  );

  return result.affectedRows;
}

export async function actualizarPedidosListosModel() {
  const [result] = await db.query(
    `
    UPDATE pedidos
    SET estado = 'listo'
    WHERE estado = 'preparando'
    AND TIMESTAMPDIFF(MINUTE, creado_en, NOW()) >= 20
    `
  );

  return result.affectedRows;
}