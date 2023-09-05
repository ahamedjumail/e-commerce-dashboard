
require("dotenv").config()
const express = require("express")
const bcrypt = require("bcrypt")
const { User } = require("./schemas/user")
const { Product } = require("./schemas/product")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const cors = require("cors")
mongoose.connect('mongodb://127.0.0.1:27017/dashboardwithimage');
const app = express()
app.use(express.json())
app.use(cors())


app.get("/products", async (req, res) => {
    let prods = await Product.find();
    res.send(prods);
})

app.get("/products/:id", async (req, res) => {
    const { id } = req.params

    let prod = await Product.findById(id)

    res.send(prod)
})



app.get("/search/:key", async (req, res) => {
    let { key } = req.params
    let result = await Product.find({
        $or: [{ name: { $regex: key, $options: "i" } }, { brand: { $regex: key, $options: "i" } }]
    })

    res.send(result)

})

app.put("/products/:id", async (req, res) => {
    const { id } = req.params;

    const { _id, name, brand, img, price } = req.body;

    await Product.findByIdAndUpdate(id, { name: name, brand: brand, img: img, price: price, user: _id });

    res.send({ mes: "edited" })

})

app.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.send({ mes: "deleted" });
})

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    const hashPassword = bcrypt.hashSync(password, 12);
    let u1 = new User({ name: name, email: email, password: hashPassword })
    await u1.save()
    u1 = u1.toObject()
    delete u1.password
    jwt.sign({ u1 }, process.env.JWT_KEY, { expiresIn: "1h" }, (err, token) => {
        res.send({ u1, auth: token })
    })

})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    let usr = await User.findOne({ email: email })
    if (usr) {

        if (bcrypt.compareSync(password, usr.password)) {
            usr = usr.toObject()
            delete usr.password
            jwt.sign({ usr }, process.env.JWT_KEY, { expiresIn: "1h" }, (err, token) => {
                res.send({ usr, auth: token })
            })

        } else {
            res.send({ mes: "wrong password" })
        }
    } else {
        res.send({ mes: "user not found" })
    }
})

app.post("/addproducts", async (req, res) => {
    const { id, name, brand, img, price } = req.body

    await Product.insertMany({ name: name, brand: brand, img: img, price: price, user: id })

    res.send({ mes: "added" });
})



function verifytoken(req, res, next) {
    let token = req.headers.authorization
    token = token.split(" ")[1]
    console.log(req.headers)
    console.log(token)

    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (err, valid) => {
            if (err) {
                console.log("here");
                res.status(403).send({ mes: "unauthorized" });
            } else {
                next();
            }
        })
    } else {
        res.status(401).send({ mes: "no token" });
    }
}

app.listen(8000, () => {
    console.log("listening on 8000")
})