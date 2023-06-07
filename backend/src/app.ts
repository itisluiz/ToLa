import dotenv from "dotenv";
import express from "express";
import cookieparser from "cookie-parser";

// Routers
import router_index from "./routes/index"

dotenv.config({path: "./src/config/host.env"});
dotenv.config({path: "./src/config/database.env"});

const app = express();
app.use(cookieparser());
app.use("/static", express.static("public"));

app.use(router_index);

app.listen(process.env.PORT, () => {
    console.info(`Servidor aberto na porta ${process.env.PORT}`);
});

export default app;