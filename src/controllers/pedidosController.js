import {
  actualizarPedidosListosModel,
  crearPedidoModel,
  marcarPedidoEntregadoModel,
  obtenerPedidoPorIdModel,
  obtenerPedidosModel,
} from "../models/pedidoModel.js";

export async function crearPedido(req, res) {
  try {
    const { cliente_nombre, productos, total, yape_operacion } = req.body;

    if (!cliente_nombre || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({
        message: "El nombre del cliente y los productos son obligatorios",
      });
    }

    if (!total || Number(total) <= 0) {
      return res.status(400).json({
        message: "El total del pedido no es válido",
      });
    }

    if (!yape_operacion) {
      return res.status(400).json({
        message: "El ID de operación Yape es obligatorio",
      });
    }

    const pedidoId = await crearPedidoModel({
      cliente_nombre,
      productos,
      total,
      yape_operacion,
    });

    return res.status(201).json({
      message: "Pedido creado correctamente",
      pedidoId,
    });
  } catch (error) {
    console.error("Error al crear pedido:", error);

    return res.status(500).json({
      message: "Error interno al crear el pedido",
    });
  }
}

export async function obtenerPedidos(req, res) {
  try {
    await actualizarPedidosListosModel();

    const pedidos = await obtenerPedidosModel();

    return res.status(200).json(pedidos);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);

    return res.status(500).json({
      message: "Error interno al obtener pedidos",
    });
  }
}

export async function obtenerPedidoPorId(req, res) {
  try {
    const { id } = req.params; // Next.js enviará el ID aquí

    await actualizarPedidosListosModel();

    const pedido = await obtenerPedidoPorIdModel(id);

    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    return res.status(200).json(pedido);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener el pedido" });
  }
}

export async function marcarPedidoEntregado(req, res) {
  try {
    const { id } = req.params;

    const affectedRows = await marcarPedidoEntregadoModel(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        message: "Pedido no encontrado",
      });
    }

    return res.status(200).json({
      message: "Pedido marcado como entregado",
      pedidoId: Number(id),
    });
  } catch (error) {
    console.error("Error al marcar pedido como entregado:", error);

    return res.status(500).json({
      message: "Error interno al actualizar pedido",
    });
  }
}