















/*
 ▄▀▄▄▄▄   ▄▀▀█▄   ▄▀▄▄▄▄   ▄▀▀▄ ▄▄   ▄▀▀▀▀▄   ▄▀▀▄▀▀▀▄  ▄▀▀▄▀▀▀▄  ▄▀▀█▄   ▄▀▀█▄▄   ▄▀▀█▄  
 █ █    ▌ ▐ ▄▀ ▀▄ █ █    ▌ █  █   ▄▀ █      █ █   █   █ █   █   █ ▐ ▄▀ ▀▄ █ ▄▀   █ ▐ ▄▀ ▀▄ 
 ▐ █        █▄▄▄█ ▐ █      ▐  █▄▄▄█  █      █ ▐  █▀▀█▀  ▐  █▀▀█▀    █▄▄▄█ ▐ █    █   █▄▄▄█ 
   █       ▄▀   █   █         █   █  ▀▄    ▄▀  ▄▀    █   ▄▀    █   ▄▀   █   █    █  ▄▀   █ 
  ▄▀▄▄▄▄▀ █   ▄▀   ▄▀▄▄▄▄▀   ▄▀  ▄▀    ▀▀▀▀   █     █   █     █   █   ▄▀   ▄▀▄▄▄▄▀ █   ▄▀  
 █     ▐  ▐   ▐   █     ▐   █   █             ▐     ▐   ▐     ▐   ▐   ▐   █     ▐  ▐   ▐   
 ▐                ▐         ▐   ▐                                         ▐                
*/
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())


app.get('/v1/whatsapp/usuarios', (req, res) => {
    const usuarios = getListarDadosPessoais()
    res.status(200).json(usuarios)
})

app.get('/v1/whatsapp/usuario/:id', (req, res) => {
    const usuarios = getListarDadosPessoais()
    const usuario = usuarios.find(user => user.id == req.params.id)
    if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' })
    }
    res.status(200).json(usuario)
})

app.get('/v1/whatsapp/profile/:id', (req, res) => {
    const profiles = getListarDadosProfile()
    const usuario = profiles.find(user => user.id == req.params.id)
    if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' })
    }
    res.status(200).json(usuario)
})


app.get('/v1/whatsapp/contatos/:id', (req, res) => {
    const contatos = getListarContatosUsuario()
    const usuario = contatos.find(user => user.id == req.params.id)
    if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' })
    }
    res.status(200).json(usuario.contatos)
})


app.get('/v1/whatsapp/conversas/:id', (req, res) => {
    const conversas = getListarConversasUsuario()
    const usuario = conversas.find(user => user.id == req.params.id)
    if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' })
    }
    res.status(200).json(usuario.conversas)
})


app.get('/v1/whatsapp/conversas/:id/:contato', (req, res) => {
    const { id, contato } = req.params
    const conversas = getConversasPorContato(contato)
    if (!conversas || conversas.length === 0) {
        return res.status(404).json({ mensagem: 'Nenhuma conversa encontrada com este contato.' })
    }
    res.status(200).json(conversas)
})


app.get('/v1/whatsapp/conversas/pesquisa', (req, res) => {
    const { contato, termo } = req.query
    if (!contato || !termo) {
        return res.status(400).json({ mensagem: 'Contato e termo de pesquisa são obrigatórios.' })
    }
    const resultado = getPesquisarMensagensPorPalavraChave(contato, termo)
    res.status(200).json(resultado)
})

app.listen(8081, () => console.log('Jacaré no peito'))

const {
    getListarDadosPessoais,
    getListarDadosProfile,
    getListarContatosUsuario,
    getListarConversasUsuario,
    getConversasPorContato,
    getPesquisarMensagensPorPalavraChave
} = require('./funcao')


