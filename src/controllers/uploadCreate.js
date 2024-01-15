const newProduct = {
    id: products[products.length - 1].id + 1,
    imagen: req.file.filename,
    imagenimagenFrontal: req.file.filename,
    imagenLateralDerecha: req.file.filename,
    imagenLateralIzquierda: req.file.filename,
    nombre: req.body.nombre,
    marca: req.body.marca,
    precio: req.body.precio,
    descuento: req.body.descuento,
    descripcion: req.body.descripcion,
    cantidad: req.body.cantidad,
    coloresDisponibes: req.body.color,
    categoria: req.body.categoria
}

module.exports = newProduct;