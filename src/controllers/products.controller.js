const Product = require("../models/product")

const products = (req, res, next) => {
    const { title, images,price, currency, sale, specs} = req.body;
    const product = new Product({ title, images,price, currency, sale,specs })

    product.save(err=>{
        if(err){
            res.status(500).json({'msg':'ERROR AL REGISTRAR PRODUCTO'})
            console.log(err)
        }else{
            res.status(200).json({'msg':'PRODUCTO REGISTRADO'})
        }
    })

}

module.exports = {
    products
}