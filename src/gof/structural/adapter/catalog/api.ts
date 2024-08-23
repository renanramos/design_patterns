// import express from "express";
import { ProductRepositoryMemory } from "./ProductRepository";
import GetProducts from "./GetProduct";
import { ExpressAdapter } from "./HttpServer";


    const productRepository = new ProductRepositoryMemory();
    const getProduct = new GetProducts(productRepository);
    const httpServer = new ExpressAdapter();
    
    httpServer.register("get", "/products/:productId", async function (params: any, body: any) {
        const productId = parseInt(params.productId);
        const output = await getProduct.execute(productId);
        return output;
    });
    
    httpServer.listen(3001);    



// const app = express();

// app.get("/products/:productId", async function(req, res) {
//     const productId = parseInt(req.params.productId);
//     const productRepository = new ProductRepositoryMemory();
//     const getProduct = new GetProducts(productRepository);
//     const output = await getProduct.execute(productId);
//     res.json(output);
// });


// app.listen(3001);