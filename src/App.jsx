import "./App.css";
import listaProductos from "./utils/listProducts.json";
import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("");
  const [listaCarrito, setListaCarrito] = useState([]);
  const [suma, setSuma] = useState(0);
  const [switchCarrito, setSwitchCarrito] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const filterByName = listaProductos.filter((producto) =>
    producto.nombre.toLowerCase().includes(input.toLowerCase())
  );

  const filterByCategory = filterByName.filter((producto) =>
    producto.categoria.includes(category)
  );

  const productoExiste = (lista, producto) =>
    lista.some((productoLista) => productoLista.nombre === producto.nombre);

  const sumaTotalCarrito = (array) => {
    let sumaTotal = 0;
    array.map((item) => {
      let aux = item.cantidad * item.precio;
      sumaTotal += aux;
    });
    return sumaTotal.toFixed(2);
  };

  const handleClick = (producto) => {
    if (productoExiste(listaCarrito, producto)) {
      setListaCarrito((prevCarrito) => {
        return prevCarrito.map((item) =>
          item.nombre === producto.nombre
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      });
    } else {
      setListaCarrito((prevCarrito) => [
        ...prevCarrito,
        { ...producto, cantidad: 1 },
      ]);
    }
  };

  useEffect(() => {
    console.log(listaCarrito);
    if (listaCarrito > 0) {
      setSwitchCarrito(true);
    }
  }, [listaCarrito]);

  return (
    <>
      <h1 className="text-3xl text-center mt-8 font-bold text-red-500/80">
        Danger-Gaming
      </h1>
      <h1 className="text-2xl text-center font-semibold">Lista de precios</h1>
      <div className="flex justify-center items-center sticky top-0 bg-slate-900/10 backdrop-blur-md p-5 gap-3">
        <input
          type="text"
          className="bg-slate-800 p-2 text-white rounded-md  w-[450px] outline-none"
          placeholder="Busca el producto aqui..."
          onChange={handleChange}
        />

        <select
          className="bg-slate-800 p-2 rounded-md"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="gaseosa">Gaseosa</option>
          <option value="galleta">Galleta</option>
          <option value="otros">Otros</option>
        </select>
        <button
          onClick={() => setSwitchCarrito(!switchCarrito)}
          className="bg-green-500 rounded-md p-1 px-4 cursor-pointer text-2xl hover:scale-110 transition-transform"
        >
          <i className="bx bxs-cart"></i>
        </button>
      </div>
      <div className="max-w-[600px] mx-auto">
        {filterByCategory.map((producto, index) => (
          <div
            className="flex group justify-between items-center text-xl border-t-1 border-slate-600 cursor-pointer"
            key={index}
            onClick={() => {
              handleClick(producto);
              setSwitchCarrito(true);
            }}
          >
            <div className="group-hover:scale-110 transition-all flex items-center group">
              <p>{producto.nombre}</p>
              <div className="flex items-center group-hover:text-green-500">
                <i className="bx bx-plus"></i>
                {/* <i className='bx bx-cart-add'></i> */}
              </div>
            </div>
            <div
              className="group-hover:scale-125 transition-all text-red-500/80 font-bold text-4xl"
              style={{ fontFamily: "Caveat" }}
            >
              s/{producto.precio.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Carrito de compras */}
      <div
        className={`fixed backdrop-blur-md bg-black/30 w-[350px] h-auto top-[80px] rounded-md m-3 flex flex-col justify-between transition-all ease-in ${
          switchCarrito ? "right-0" : "right-[-500px]"
        }`}
      >
        <div className="w-[350px] h-[440px] right-0 rounded-md flex flex-col justify-between">
          <button
            className="cursor-pointer absolute right-0 p-3 text-2xl"
            onClick={() => setSwitchCarrito(false)}
          >
            X
          </button>
          <h2 className="text-center text-red-500 font-bold text-2xl p-3">
            Carrito de compras
          </h2>

          <div className="w-auto h-[85%] rounded-md overflow-y-auto px-3">
            {listaCarrito.map((item) => (
              <div className="flex justify-between items-center">
                <p className="w-[220px] line-clamp-1 overflow-hidden" alt={item.nombre}>{item.nombre}</p>
                <p className="text-green-500 text-xl font-bold">
                  {item.cantidad}
                </p>
                <p
                  className="text-red-500 text-3xl font-bold"
                  style={{ fontFamily: "Caveat" }}
                >
                  s/{(item.precio * item.cantidad).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center p-1 items-center gap-4">
            <p className="font-bold text-xl text-center">
              {listaCarrito.length >= 1
                ? "Monto total: "
                : "No tienes productos"}
            </p>
            {listaCarrito.length >= 1 ? (
              <p
                className="text-red-500 text-5xl font-bold"
                style={{ fontFamily: "Caveat" }}
              >
                s/{sumaTotalCarrito(listaCarrito)}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        {listaCarrito.length > 0 ? (
          <div className=" mx-auto p-2">
            <button
              onClick={() => setListaCarrito([])}
              className="bg-green-600 p-2 text-xl rounded-md cursor-pointer"
            >
              Limpiar carrito
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
