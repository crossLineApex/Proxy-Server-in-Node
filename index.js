const Express = require("express");
const {createProxyMiddleware} = require("http-proxy-middleware");
const app = Express();
const PORT = process.env.PORT || 8080;
const HOST = "localhost";
const API_SERVICE_URL = "https://jsonplaceholder.typicode.com";


const options = {
    target: API_SERVICE_URL, // target host
    changeOrigin: true, // needed for hosted sites
    pathRewrite: {
       [`^/api`]: '',
    }, // rewrite the path
}


app.use("/api",createProxyMiddleware(options));
//now if a client hits any route with localhost:8080/api/* it will rewrite to https://jsonplaceholder.typicode.com/* 
//e.g localhost:8080/api/posts/1 proxy will send a request to  https://jsonplaceholder.typicode.com/posts/1
// if you deploy this application and use the /api endpoints you were able to proxy from jsonplaceholder

app.listen(PORT,HOST,() => {
    console.log(`Server running at ${HOST}:${PORT}`);
})