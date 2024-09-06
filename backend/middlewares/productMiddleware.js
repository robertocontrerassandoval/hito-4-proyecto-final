export const validateProductData = (req, res, next) => {
    const { titulo, imagen, descripcion, precio, stock } = req.body;

    // Validar que todos los campos estén presentes
    if (!titulo || !imagen || !descripcion || !precio || !stock) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Validar que el título tenga un mínimo de caracteres
    if (titulo.length < 3) {
        return res.status(400).json({ message: 'El título debe tener al menos 3 caracteres' });
    }

    // Validar que el precio sea un número válido y mayor que 0
    if (isNaN(precio) || precio <= 0) {
        return res.status(400).json({ message: 'El precio debe ser un número mayor que 0' });
    }

    // Validar que el stock sea un número entero
    if (!Number.isInteger(stock) || stock < 0) {
        return res.status(400).json({ message: 'El stock debe ser un número entero mayor o igual a 0' });
    }

    // Si todo está bien, pasar al siguiente middleware o controlador
    next();
};

export const validateProductId = (req, res, next) => {
    const { id } = req.params;

    // Validar que el ID sea un número entero
    if (!Number.isInteger(Number(id))) {
        return res.status(400).json({ message: 'ID de producto no válido' });
    }

    next();
};
