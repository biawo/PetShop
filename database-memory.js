import { randomUUID } from "crypto"

export class DatabaseMemory{
#gatos = new Map()

list(search){
    return Array.from(this.#gatos.entries()).map((gatoArray) => {
        const id = gatoArray[0]
        const data = gatoArray[1]

        return{
            id,
            ...data

        }
        
    })
    .filter(gato => {
        if(search) {
            return gato.nome.includes(search)
        }
        return true
    })
}
create(gato){
    const gatoId = randomUUID()
    this.#gatos.set(gatoId, gato)
}
update(id, gato){
    this.#gatos.set(id, gato)
}
delete(id, gato){
    this.#gatos.delete(id, gato)
}
}