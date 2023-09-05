import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./product.css"

function Products() {
    let redirect = useNavigate();
    let usr = localStorage.getItem("user");
    let [prods, setProds] = useState([{}])

    usr = JSON.parse(usr);
    useEffect(() => {
        if (!usr) {
            redirect("/login");
        } else {
            getProducts();
        }

    }, [redirect])

    async function getProducts() {
        let data = await fetch("http://localhost:8000/products", {
            headers: {
                Authorization: `Bearer ${(localStorage.getItem("token"))}`
            }
        });
        data = await data.json();
        setProds(data);
        console.log(data);


    }
    let products = []


    function handleEdit(p) {
        redirect(`/editproduct/${p._id}`)
    }

    async function handleDelete(p) {
        let j = await fetch(`http://localhost:8000/products/${p._id}`, {
            method: "delete",

        })
        j = await j.json();
        redirect("/");
    }

    async function searchFunction(evnt) {
        let key = evnt.target.value
        if (key) {
            let result = await fetch(`http://localhost:8000/search/${key}`)
            result = await result.json()
            if (result) {
                setProds(result)
            }
        } else {
            getProducts()
        }

    }



    if (prods.mes) {
        return (<h1>eror</h1>)
    } else {
        products = prods.map((p, i) => {
            return (<div className="card" key={i}>
                <h4>{p.name}</h4>
                <img id="prodimg" src={p.img} alt="product"></img>
                <p>{p.brand}</p>
                <p>Rs-{p.price}</p>

                {usr._id === p.user ? <><button onClick={() => { handleEdit(p) }}>edit</button> <button onClick={() => { handleDelete(p) }}>delete</button></> : <></>}
            </div >)
        })
    }

    return (
        <>
            <div id="top">
                <h1>products</h1>
                <div>
                    <label htmlFor="searchbar">search</label>
                    <input
                        id="searchbar" type="text" onChange={searchFunction}></input>
                    <div />
                </div>
            </div>
            {products.length > 0 ?
                <div id="container">
                    {products}
                </div> : <h1>no result</h1>}
        </>
    );
}

export default Products;