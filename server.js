import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/gato', (request, reply) => {
    const {nome, raca, cor, peso, sexo} = request.body
    //console.log(body)

   // return 'cadastrar'
    database.create({
        nome: nome,
        raca: raca,
        cor: cor,
        peso: peso,
        sexo: sexo
    })

    return reply.status(201).send
})

server.get('/gato', (request) => {
    const search = request.query.search
    console.log(search)

    const gatos = database.list(search)
    //console.log(gatos)

    return gatos
})

server.put("/gatos/:id", (request, reply) => {
    const gatoId = request.params.id 
    const {nome, raca, cor, peso, sexo} = request.body
    const gato = database.update(gatoId, {
        nome: nome,
        raca: raca,
        cor: cor,
        peso: peso,
        sexo: sexo
    })
    return reply.status(204).send()
})

server.delete("/gatos/:id", (request, reply) => {
    const gatoId = request.params.id
    database.delete(gatoId)

    return reply.status(204).send()
})

server.listen({
    port: 3333,
})