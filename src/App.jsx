import "./App.css";
import listaProductos from "./utils/listProducts.json";
import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("");
  const [listaCarrito, setListaCarrito] = useState([]);

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

  const actualizarCarrito = (lista, producto) => {
    if (productoExiste(lista,producto)){

    }
  }

  const handleClick = (producto) => {
    if (productoExiste(listaCarrito, producto)) {
      
    } else {
      setListaCarrito((prevCarrito) => [...prevCarrito, {...producto, cantidad: 1}]);
    }
  };

  useEffect(() => {
    console.log(listaCarrito);
  }, [listaCarrito]);

  return (
    <>
      <h1 className="text-3xl text-center mt-8 font-bold text-red-500/80">
        Danger-Gaming
      </h1>
      <h1 className="text-2xl text-center font-semibold">Lista de precios</h1>
      <div className="flex justify-center items-center sticky top-0 bg-slate-900/10 backdrop-blur-md m-5 gap-3">
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
        <div className="p-2 bg-green-500 rounded-md px-4 cursor-pointer">
          <i className="bx bxs-cart"></i>
        </div>
      </div>
      <div className="max-w-[600px] mx-auto">
        {filterByCategory.map((producto, index) => (
          <div
            className="flex group justify-between items-center text-xl border-t-1 border-slate-600 cursor-pointer"
            key={index}
            onClick={() => handleClick(producto)}
          >
            <div className="group-hover:scale-110 transition-all flex items-center group">
              <p>{producto.nombre}</p>
              <button className="flex items-center group-hover:text-green-500">
                <i className="bx bx-plus"></i>
                {/* <i className='bx bx-cart-add'></i> */}
              </button>
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
    </>
  );
}

export default App;
