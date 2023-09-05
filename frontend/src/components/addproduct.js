
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Addproduct() {
    let [name, setName] = useState("")
    let [brand, setBrand] = useState("")
    let [price, setPrice] = useState("")
    let [img, setImg] = useState();
    //stores the url from cloudinary
    let res = ""
    let redirect = useNavigate();
    let usr = localStorage.getItem("user");

    useEffect(() => {
        if (!usr) {
            redirect("/login");
        }

    })

    usr = JSON.parse(usr);

    async function cloudinary(file) {
        let data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "ecommercedashboard")
        data.append("cloud_name", "dxmrpempn")
        res = await fetch("https://api.cloudinary.com/v1_1/dxmrpempn/image/upload", {
            method: 'post',
            body: data
        })
        res = await res.json()
        res = res.url
    }

    async function handleClk(e) {
        e.preventDefault()
        await cloudinary(img);
        let data = await fetch("http://localhost:8000/addproducts", {
            method: "post",
            body: JSON.stringify({ id: usr._id, name: name, brand: brand, img: res, price: price }),
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${JSON.parse((localStorage.getItem("token")))}`
            }
        })

        data = await data.json();
        if (data) {
            redirect("/")
        }


    }


    return (
        <div>
            <h1> Add product</h1>
            <form>


                <label htmlFor="name">enter the name of the product</label>
                <input value={name} onChange={(e) => {
                    setName(e.target.value)
                }} type="text" id="name" required></input>

                <label htmlFor="brand">enter the brand of the product</label>
                <input value={brand} onChange={(e) => {
                    setBrand(e.target.value)
                }} type="text" id="brand" required></input>

                <label htmlFor="img"> add image</label>
                <input type="file" onChange={(e) => {
                    setImg(e.target.files[0])
                }} required></input>

                <label htmlFor="price">enter the price of the product</label>
                <input value={price} onChange={(e) => {
                    setPrice(e.target.value)
                }} type="number" id="price" required></input>

                <button onClick={handleClk}>add</button>
            </form>
        </div>
    );

}

export default Addproduct;