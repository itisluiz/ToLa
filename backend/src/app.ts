import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cookieparser from "cookie-parser";
import dbconnection from "./helpers/database";
import { testmail } from "./helpers/email";
import chalk from "chalk";

// Routers
import router_index from "./routes/index";
import router_token from "./routes/token";
import router_api_auth from "./routes/api/auth";

dotenv.config({path: "./src/config/host.env"});

const app = express();
app.use(cookieparser());
app.use(bodyParser.json());
app.use("/static", express.static("public"));

app.use("/api/auth", router_api_auth);
app.use("/token", router_token);
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

    // Test e-mail connection from mailer server
    testmail().then((conn) => {
        console.log(chalk.greenBright("Established e-mail server connection"));
    }).catch(() => {
        console.error(chalk.redBright("Failed to establish e-mail server connection"));
        process.exit(1);
    });

});

export default app;
