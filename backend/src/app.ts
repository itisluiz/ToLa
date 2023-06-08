import dotenv from "dotenv";
import express from "express";
import cookieparser from "cookie-parser";
import dbconnection from "./helpers/database";
import chalk from "chalk";

// Routers
import router_index from "./routes/index"

dotenv.config({path: "./src/config/host.env"});

const app = express();
app.use(cookieparser());
app.use("/static", express.static("public"));

app.use(router_index);

app.listen(process.env.PORT, () => {
    console.log(`HTTP server starting at port ${process.env.PORT}`);
    
    // Test DB connection acquisition from pool
    dbconnection().then((conn) => { 
        console.log(chalk.greenBright("Established database connection"));
        conn.release();
    }).catch(() => {
        console.error(chalk.redBright("Failed to establish database connection"));
        process.exit(1);
    });
});

export default app;
