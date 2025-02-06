const { request, response } = require('express')
const express = require('express')
const cors = require('cors')
const app = express()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET')
    app.use(cors())
    next()
})

const dados = require('./funcao.js')



app.get('/v1/whatsapp/usuarios', (req, res) => {
    if (dados) {
        res.status(200).json(dados);
    } else {
        res.status(404).json({ status: 404, mensagem: 'Nenhum aluno encontrado para o curso fornecido' });
    }
});










if (dados) {
    response.status(200).json(dados)
} else {
    response.status(404).json({ 'status': 404, 'mensagem': 'Nenhum aluno encontrado para o curso fornecido' })
}

app.listen(8081, function () {
console.log('API funcionando nessa porra')
})
