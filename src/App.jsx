import "./App.css";
import listaProductos from "./utils/listProducts.json";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const filterByName = listaProductos.filter((producto) =>
    producto.nombre.toLowerCase().includes(input.toLowerCase()),
  );

  const filterByCategory = filterByName.filter((producto) =>
    producto.categoria.includes(category),
  );

  return (
    <>
      <h1 className="text-2xl text-center m-6 font-bold">Lista de precios</h1>
      <div className="flex justify-center items-center">
        <input
          type="text"
          className="bg-slate-800 p-2 text-white rounded-md  w-[450px] m-5 outline-none"
          placeholder="Busca el producto aqui..."
          onChange={handleChange}
        />

        <select
          className="bg-slate-800 p-2 rounded-md"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="gaseosa">Gaseosa</option>
          <option value="galleta">galleta</option>
        </select>
      </div>
      <div className="max-w-[600px] mx-auto">
        {filterByCategory.map((producto, index) => (
          <div
            className="flex justify-between items-center text-xl border-t-1 border-slate-600"
            key={index}
          >
            <div>{producto.nombre}</div>
            <div
              className="text-red-500/80 font-bold text-4xl"
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
