import express from "express";
import dbconnection from "./../../helpers/database";
import mariadb from "mariadb";
import { sendmail } from "./../../helpers/email";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

const router = express.Router();

router.post("/signup", (req, res, next) => {
    const form = req.body;

    const legalperson = "cnpj" in form;

    const expectedkeys_naturalperson = ["email", "senha", "nome", "sobrenome", "cpf", "nascimento", "genero"];
    const expectedkeys_legalperson = ["email", "senha", "titulo", "cnpj"];

    if ((legalperson ? expectedkeys_legalperson : expectedkeys_naturalperson).some((key) => !form[key]))
    {
        res.json({"err": 1, "verbose": `Um ou mais campos para cadastro de ${legalperson ? "pessoa jurídica" : "pessoa física"} não foram recebidos`});
        return;
    }

    dbconnection().then(async (conn) =>
    {
        await conn.beginTransaction();

        try {
            let senha_hash = bcrypt.hashSync(form["senha"], 2);
            if (legalperson)
                await conn.execute("CALL criarPessoaJuridica(?, ?, ?, ?, @id)", 
                    [form["email"], senha_hash, form["titulo"], form["cnpj"]]);
            else
            
                await conn.execute("CALL criarPessoaFisica(?, ?, ?, ?, ?, ?, ?, @id)", 
                    [form["email"], senha_hash, form["nome"], form["sobrenome"], form["cpf"], form["nascimento"], form["genero"]]);

            await conn.commit();

            let query_tkn = await conn.query("SELECT valor from token where id = @id");
            let token = query_tkn[0].valor;

            sendmail(form["email"], "Verifique sua conta ToLá", "http://localhost/token?token=" + token);
            res.json({"verbose": `Conta de ${legalperson ? "pessoa jurídica" : "pessoa física"} criada e e-mail enviado`});
        }
        catch (err) {
            if (err instanceof mariadb.SqlError)
            {
                let sqlerr = (err as mariadb.SqlError);
                switch (sqlerr.code)
                {
                    case "ER_DUP_ENTRY":
                    {
                        let query_dup = await conn.query("SELECT 1 FROM credencial WHERE email = ? AND id_token IS NOT NULL", 
                            form["email"]) as object[];
                        
                        if (query_dup.length == 0)
                            res.json({"err": 2, "verbose": "E-mail ou CPF/CNPJ já cadastrado(s)"});
                        else
                            res.json({"err": 3, "verbose": "Conta já cadastrada e aguardando verificação de e-mail"});

                        break;
                    } 
                    case "ER_DATA_TOO_LONG":
                    {
                        res.json({"err": 4, "verbose": "Um ou mais campos eram longos demais"});
                        break;
                    }
                    default:
                        console.log(err);
                        res.sendStatus(500);
                        break;
                }

            }
            else
            {
                console.log(err);
                res.sendStatus(500);
            }
        }

        conn.release();

    });
});

router.post("/login", (req, res, next) => {
    const form = req.body;

    if (!form["email"] || !form["senha"])
    {
        res.json({"err": 1, "verbose": `Um ou mais campos para login não foram recebidos`});
        return;
    }

    dbconnection().then(async (conn) =>
    {
        await conn.beginTransaction();

        try {
            let query_email = await conn.execute("SELECT id, id_token, senha from credencial where email = ?", 
                form["email"]);

            if (query_email.length == 0)
                res.json({"err": 2, "verbose": `E-mail ou senha incorreto(s)`});
            else
            {
                let query_email_res = query_email[0];

                if (!bcrypt.compareSync(form["senha"], query_email_res.senha))
                    res.json({"err": 2, "verbose": `E-mail ou senha incorreto(s)`});
                else
                {
                    if (query_email_res.id_token)
                        res.json({"err": 3, "verbose": "E-mail de conta ainda não verificado"});
                    else
                    {
                        var token = jwt.sign({id: query_email_res.id}, process.env.DB_PASS as string);
                        res.cookie("token", token).json({"verbose": `Login efetuado`}).send();
                    }

                }
            }            
        }
        catch (err) {
           console.log(err);
           res.sendStatus(500);
        }

        conn.release();

    });
});

router.post("/status", (req, res, next) => {
    const form = req.body;

    let decodedToken : JwtPayload;
    try {
        decodedToken = jwt.verify(req.cookies["token"], process.env.DB_PASS as string) as JwtPayload;
    }
    catch (err) {
        res.json({"verbose": `Não logado`});
        return;
    }

    dbconnection().then(async (conn) =>
    {
        try {
            let query_userinfo = await conn.execute("SELECT * from pessoafisica WHERE id_credencial = ?",
                decodedToken.id);

            if (query_userinfo.length == 0)
                query_userinfo = await conn.execute("SELECT * from pessoajuridica WHERE id_credencial = ?",
                decodedToken.id);
            
            let query_userinfo_res = query_userinfo[0];
            let pessoafisica = query_userinfo_res.cpf && true;

            res.json({pessoafisica: pessoafisica, verbose: `Logado como pessoa ${pessoafisica? "física" : "jurídica"}`, userinfo: query_userinfo_res});
        }
        catch (err) {
           console.log(err);
           res.sendStatus(500);
        }

        conn.release();
    });

});

router.get("/logout", (req, res, next) => {
    res.status(200).clearCookie("token").redirect("/");
});

export default router;
