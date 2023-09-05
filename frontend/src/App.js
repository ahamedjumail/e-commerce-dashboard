import Navbar from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import Logout from "./components/logout";
import Addproduct from "./components/addproduct";
import Products from "./components/products";
import Editproduct from "./components/editproduct";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>

        <Route path="/" element={<Products />}></Route>
        <Route path="/addproduct" element={<Addproduct />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/editproduct/:id" element={<Editproduct />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
      </Routes>

    </div>
  );
}

export default App;
