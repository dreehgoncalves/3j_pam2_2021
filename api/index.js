const express = require("express");
const servidor = express();
const mysql = require("mysql2");
const banco = mysql.createPool({
    database: "3j_2021",
    user: "root",
    password: "",
    host: "localhost",
    port: "3306",
});

const bodyParser = require('body-parser')
servidor.use(bodyParser.urlencoded({ extended: false }))
servidor.use(bodyParser.json())
servidor.post("/cliente", (req, res, next) => {
    let body = req.body
    const QUERY = `INSERT INTO clientes (nome, login, senha) VALUES('${body.nome}', '${body.login}', '${body.senha}')`
    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Mensagem: "Erro no servidor",
                Detalhes: error
            })
        }
        conn.query(QUERY, (error, resultado) => {
            conn.release()
            if (error) {
                return res.status(500).send({
                    Mensagem: "Erro no servidor",
                    Detalhes: error
                })
            }
            return res.status(200).send({
                Verbo: "post",
                Mensagem: "Cadastro realizado com sucesso!",
            })
        })
    })
})

servidor.patch("/cliente/:id", (req, res, next) => {
    let id = req.params.id

    return res.status(200).send({
        Verbo: 'patch',
        Mensagem: `Id capturado ${id}`
    })
})

servidor.get("/cliente/:id", (req, res, next) => {
    let id = req.params.id

    return res.status(200).send({
        Verbo: 'get',
        Mensagem: `Id capturado ${id}`
    })
})

servidor.get("/testarconexao", (req, res, next) => {
    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Erro: "Erro no servidor",
                Detalhes: error,
            });
        }

        conn.release();

        return res.status(200).send({
            Mensagem: "Conexão estabelecida com sucesso",
        });
    });
});

servidor.get("/clientes", (req, res, next) => {
    const QUERY = 'SELECT * FROM clientes ORDER BY nome'

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Erro: "Não foi possível atender à solicitação",
                Detalhes: error
            })
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release()

            if (error) {
                return res.status(500).send({
                    Erro: "Não foi possível atender à solicitação",
                    Detalhes: error
                })
            }

            return res.status(200).send({
                Mensagem: "Dados retornados com sucesso",
                Dados: resultado
            })
        })
    })
})

servidor.get("/clientes/:criterio", (req, res, next) => {
    let criterio = req.params.criterio
    const QUERY = `SELECT * FROM clientes WHERE nome LIKE '%${criterio}%' ORDER BY nome`

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Erro: "Não foi possível atender à solicitação",
                Detalhes: error
            })
        }

        conn.query(QUERY, (error, resultado) => {
            conn.release()

            if (error) {
                return res.status(500).send({
                    Erro: "Não foi possível atender à solicitação",
                    Detalhes: error
                })
            }

            return res.status(200).send({
                Mensagem: "Consulta realizada com sucesso",
                Dados: resultado
            })
        })
    })
})

servidor.get("/", (req, res, next) => {
    return res.send({
        mensagem: "Bem-vindo(a) ao servidor",
        cidade: "Itapeva",
        uf: "SP",
    });
});

servidor.listen(3000, () => {
    console.log("Servidor funcionando!");
});