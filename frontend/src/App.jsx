import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Route, Routes } from 'react-router-dom';
import Home from './view/Home';
import Login from './view/Login';
import Agregar from './view/Agregar';
import Inicio from './view/Inicio';
import Favoritos from './view/Favoritos';
import Perfil from './view/Perfil';
import Productos from './view/Productos';
import { AppProvider } from './context/AppContext';


const urlBaseServer = "http://localhost:3000"; // a este puerto de apuntar


function App() {

  //users
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date_birth, setDate_birth] = useState("");

  //products
  const [titulo, setTitulo] = useState("");
  const [imagen, setImagen] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");



//obtener usuarios
  const getName = async () => {
    const { data: name } = await axios.get(urlBaseServer + "/get-name");
    setName([...name]);
  };

  //agregar usuario
  const agregarUser = async () => {
    const user = { name, email, password, date_birth };
    await axios.post(urlBaseServer + "/create-user", user);
    getName();
  };

  //eliminar producto
  const eliminarProduct = async (id) => {
    await axios.delete(urlBaseServer + `/products/${id}`);
    getProcucts();
  };


useEffect(() => {
  getName();
  
})
const App = () => {
  return (
    <>
     <AppProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/agregar-producto" element={<Agregar/>} />
        <Route path="/productos" element={<Productos/>} />
        <Route path="/favoritos" element={<Favoritos/>} />
        <Route path="/perfil" element={<Perfil/>} />
        <Route path="*" element={<Home />} />
      </Routes>
     </AppProvider>
    </>
    
  );
};
}

export default App;

