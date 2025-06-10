import { useState } from "react";
import "../css/TiendaTecnologia.css";

const productosDisponibles = [
  { id: 1, nombre: "Laptop ASUS", precio: 1200, imagen: "https://m.media-amazon.com/images/I/71ehzrGUO7L._AC_UF894,1000_QL80_.jpg" },
  { id: 2, nombre: "Monitor LG 27\"", precio: 300, imagen: "https://m.media-amazon.com/images/I/71GRpZb6+vL._AC_UF894,1000_QL80_.jpg" },
  { id: 3, nombre: "Mouse Logitech", precio: 50, imagen: "https://m.media-amazon.com/images/I/61RYwHoeHjL._AC_UF1000,1000_QL80_.jpg" },
  { id: 4, nombre: "Teclado Mecánico", precio: 80, imagen: "https://m.media-amazon.com/images/I/61CJJ297IJL._AC_UF894,1000_QL80_.jpg" },
  { id: 5, nombre: "SSD 1TB", precio: 150, imagen: "https://www.supermexdigital.mx/web/image/product.template/27554/image_1024?unique=157101a" },
  { id: 6, nombre: "Auriculares Sony", precio: 200, imagen: "https://mxsonyb2c.vtexassets.com/arquivos/ids/316334/01_Product_WH-1000XM4-B.jpg?v=638632950237230000" },
  { id: 7, nombre: "Webcam HD", precio: 90, imagen: "https://www.logitech.com/content/dam/logitech/en/products/webcams/c922/gallery/c922-gallery-1.png" },
  { id: 8, nombre: "Router WiFi 6", precio: 110, imagen: "https://m.media-amazon.com/images/I/51Q99CZv-SL._AC_UF894,1000_QL80_.jpg" },
  { id: 9, nombre: "Tablet Android", precio: 250, imagen: "https://i.ebayimg.com/images/g/qAsAAOSw-9Nj45Wt/s-l1200.jpg" },
  { id: 10, nombre: "Smartwatch", precio: 180, imagen: "https://m.media-amazon.com/images/I/71u9PXWPzFL.jpg" },
];

function TiendaTecnologia() {
  const [carrito, setCarrito] = useState([]);
  const [cantidades, setCantidades] = useState({});
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const agregarAlCarrito = (producto) => {
    const cantidad = cantidades[producto.id] || 1;
    const itemExistente = carrito.find((item) => item.id === producto.id);

    if (itemExistente) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad }]);
    }
  };

  const manejarCambioCantidad = (id, valor) => {
    const nuevaCantidad = parseInt(valor);
    if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
      setCantidades({ ...cantidades, [id]: nuevaCantidad });
    }
  };

  const aumentarCantidad = (id) => {
    setCarrito(carrito.map(item =>
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    ));
  };

  const reducirCantidad = (id) => {
    setCarrito(carrito.map(item =>
      item.id === id && item.cantidad > 1
        ? { ...item, cantidad: item.cantidad - 1 }
        : item
    ));
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const totalCarrito = carrito.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );

  return (
    <div className="tienda-container">
      <header className="header">
        <h1>Tienda Tech</h1>
        <button onClick={() => setMostrarCarrito(!mostrarCarrito)}>
          {mostrarCarrito ? "Ir a tienda" : `Ver Carrito (${carrito.length})`}
        </button>
      </header>

      {mostrarCarrito ? (
        <div className="carrito">
          <h2>Carrito de Compras</h2>
          {carrito.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            <ul>
              {carrito.map((item) => (
                <li key={item.id}>
                  <strong>{item.nombre}</strong> - Total: ${item.precio * item.cantidad}
                  <div className="controles-cantidad">
                    <button className="boton-cantidad" onClick={() => reducirCantidad(item.id)}>-</button>
                    <span>{item.cantidad}</span>
                    <button className="boton-cantidad" onClick={() => aumentarCantidad(item.id)}>+</button>
                    <button className="boton-eliminar" onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <p className="total">Total: ${totalCarrito}</p>
        </div>
      ) : (
        <div className="grid-productos">
          {productosDisponibles.map((producto) => (
            <div key={producto.id} className="card-producto">
              <img src={producto.imagen} alt={producto.nombre} />
              <h3>{producto.nombre}</h3>
              <p>Precio: ${producto.precio}</p>
              <input
                type="number"
                min="1"
                value={cantidades[producto.id] || 1}
                onChange={(e) => manejarCambioCantidad(producto.id, e.target.value)}
              />
              <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TiendaTecnologia;
