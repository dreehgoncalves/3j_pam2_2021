const express = require('express')
const servidor = express()
const mysql = require('mysql2')
const banco = mysql.createPool({
    "database": "3j_2021",
    "user": "root",
    "password": "",
    "host": "localhost",
    "port": "3306"
})
servidor.get("/teste", (req, res, next) => {
    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Erro: "Erro no servidor",
                Detalhes: error,
            })
        }
        conn.release()
        return res.status(200).send({
            Mensagem: "Conexão estabelecida com sucesso",
        })
    })
})

servidor.get("/clientes", (req, res, next) => {
    const QUERY = 'SELECT * FROM clientes ORDER BY nome'

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Erro: "Não foi possivel atender à solicitação",
                Detalhes: error
            })
        }
        conn.query(QUERY, (error, resultado) => {
            conn.release()

            if (error) {
                return res.status(500).send({
                    Erro: "Não foi possivel atender à solicitação",
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
    const QUERY = `SELECT * FROM clientes WHERE nome like '%${criterio}%' ORDER BY nome`

    banco.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                Erro: "Não foi possivel atender à solicitação",
                Detalhes: error
            })
        }
        conn.query(QUERY, (error, resultado) => {
            conn.release()

            if (error) {
                return res.status(500).send({
                    Erro: "Não foi possivel atender à solicitação",
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

servidor.get(
    '/', (req, res, next) => {
        return res.send({
            "mensagem": "Tá logado ein bichão"
        })
    }
)

servidor.listen(3000, () => {
    console.log('Servidor na halfpipe!')
})