import express from "express";
import dbconnection from "./../helpers/database";

const router = express.Router();

router.get("/", (req, res, next) => {
    let form = req.query;

    if (!form.token)
    {
        res.sendStatus(400);
        return;
    }

    dbconnection().then(async (conn) =>
    {
        try {
            let query_tkn = await conn.execute(`
                SELECT credencial.id, credencial.email FROM credencial
                INNER JOIN token
                ON credencial.id_token = token.id
                WHERE token.valor = ?
                LIMIT 1
            `, 
                form["token"]);

            if (query_tkn.length == 0)
                res.send("Token inválido");
            else
            {
                let query_tkn_res = query_tkn[0];

                await conn.beginTransaction();
                await conn.execute("UPDATE credencial SET id_token = NULL WHERE id = ?", query_tkn_res.id);
                await conn.commit();
                res.send("Conta de " + query_tkn_res.email + " verificada com sucesso!");
            }
        }
        catch (err) {
            console.error(err);
        }

        conn.release();
    });

});

export default router;
