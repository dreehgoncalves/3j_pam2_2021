const express = require('express')
const servidor = express()

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