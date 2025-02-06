















/*
 ░▒▓██████▓▒░ ░▒▓██████▓▒░ ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░░▒▓███████▓▒░░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓███████▓▒░ ░▒▓██████▓▒░  
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░      ░▒▓████████▓▒░▒▓█▓▒░      ░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░░▒▓███████▓▒░░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░ 
░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
 ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░░▒▓█▓▒░░▒▓█▓▒░                                                                                                                                                                                                                                                                    
 */



const apiDoZap = require('./contatos.js')

const getListarDadosPessoais = function () {
    let listaDadosPessoais = apiDoZap.contatos['whats-users']
    if (!listaDadosPessoais) {
        console.error("Erro: Dados não encontrados!");
        return []
    }

    let dadosListados = listaDadosPessoais.map(function (dados) {
        return {
            id: dados.id,
            account: dados.account,
            nickname: dados.nickname,
            "created-since": dados.created,
            "profile-image": dados.profile,
            number: dados.number,
            background: dados.background,
            contacts: dados.contacts
        }
    })

    return dadosListados;
}


const getListarDadosProfile = function() {
    let listaUsuarios = apiDoZap.contatos['whats-users']

    if (!listaUsuarios) {
        return { mensagem: "Nenhum usuário encontrado" }
    }

    let profilesListados = listaUsuarios.map(function(usuario) {
        return {
            id: usuario.id,
            nickname: usuario.nickname,
            "profile-image": usuario.profile,
            background: usuario.background
        }
    })

    return profilesListados
}



const getListarContatosUsuario = function() {
    let listaUsuarios = apiDoZap.contatos['whats-users']

    if (!listaUsuarios) {
        return { mensagem: "Nenhum usuário encontrado" }
    }

    let contatosListados = listaUsuarios.map(function(usuario) {
        return {
            id: usuario.id,
            contatos: usuario.contacts.map(function(contato) {
                return {
                    nome: contato.name,
                    foto: contato.image,
                    descricao: contato.description
                }
            })
        }
    })

    return contatosListados
}



const getListarConversasUsuario = function() {
    let listaUsuarios = apiDoZap.contatos['whats-users']

    if (!listaUsuarios) {
        return { mensagem: "Nenhum usuário encontrado" }
    }

    let conversasListadas = listaUsuarios.map(function(usuario) {
        return {
            id: usuario.id,
            conversas: usuario.contacts.map(function(contato) {
                return {
                    nome: contato.name,
                    foto: contato.image,
                    mensagens: contato.messages
                }
            })
        }
    })

    return conversasListadas
}

const getConversasPorContato = function(nomeContato) {
    let listaUsuarios = apiDoZap.contatos['whats-users']

    if (!listaUsuarios) {
        return { mensagem: "Nenhum usuário encontrado" }
    }

    let conversasFiltradas = listaUsuarios.map(function(usuario) {
     
        let contato = usuario.contacts.find(function(contato) {
            return contato.name.toLowerCase() === nomeContato.toLowerCase() 
        })

        if (contato) {
            return {
                nome: contato.name,
                foto: contato.image,
                mensagens: contato.messages
            }
        }
    }).filter(Boolean)

    return conversasFiltradas.length > 0 ? conversasFiltradas : { mensagem: "Contato não encontrado." }
}

const getPesquisarMensagensPorPalavraChave = function (nomeContato, palavraChave) {
    if (!nomeContato || typeof nomeContato !== "string") {
        return { mensagem: "Nome do contato inválido." }
    }

    let listaUsuarios = apiDoZap.contatos["whats-users"]

    if (!Array.isArray(listaUsuarios)) {
        return { mensagem: "Nenhum usuário encontrado" }
    }

    for (let usuario of listaUsuarios) {
        if (!Array.isArray(usuario.contacts)) {
            continue
        }

        let contato = usuario.contacts.find(contato =>
            contato.name.trim().toLowerCase() === nomeContato.trim().toLowerCase()
        )

        if (!contato) {
            continue 
        }

        if (!Array.isArray(contato.messages)) {
            return { mensagem: `O contato "${nomeContato}" não possui mensagens.` }
        }

        let mensagensFiltradas = contato.messages
            .filter(mensagem => 
                mensagem.content && mensagem.content.toLowerCase().includes(palavraChave.toLowerCase())
            )
            .map(mensagem => ({
                remetente: mensagem.sender || "Desconhecido",
                texto: mensagem.content || "Sem conteúdo",
                hora: mensagem.time || "Sem horário"
            }))

        if (mensagensFiltradas.length === 0) {
            return { mensagem: `Nenhuma mensagem encontrada com a palavra "${palavraChave}" no contato "${nomeContato}".` }
        }

        return {
            nomeContato: contato.name,
            fotoContato: contato.image || "img/default.png",
            mensagensEncontradas: mensagensFiltradas,
        }
    }

    return { mensagem: `Contato "${nomeContato}" não encontrado em nenhum usuário.` }
}









//1- //console.log(apiDoZap.contatos['whats-users'][0])
//2- //console.log(getListarDadosProfile());
//3- //console.log(JSON.stringify(getListarContatosUsuario(), null, 2));
//4- //console.log(JSON.stringify(getListarConversasUsuario(), null, 2));
//5- //console.log(getConversasPorContato("Ana Maria"));
//6- //console.log(getPesquisarMensagensPorPalavraChave("Ana Maria", "Hi, I'm doing fine. Thanks for asking."));

module.exports = { getListarDadosPessoais,
    getListarDadosProfile,
    getListarContatosUsuario,
    getListarConversasUsuario,
    getPesquisarMensagensPorPalavraChave,
    getConversasPorContato
 };