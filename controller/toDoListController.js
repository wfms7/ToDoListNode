const fs = require('fs')
const util = require('util')

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

class toDoListController{

    constructor(){
        this.NOME_ARQUIVO = 'BD_JSON/toDolist.json';
    }

   async getToDolist(){
        const arquivo = await readFileAsync(this.NOME_ARQUIVO,'utf-8');
        return JSON.parse(arquivo.toString());

    }

    async escreverArquivo (dados){

        await writeFileAsync(this.NOME_ARQUIVO,JSON.stringify(dados))
      return  JSON.stringify(true)
    }

    async saveToDoList(toDo){
        const toDolist = await this.getToDolist();
        const ID = Date.now()
        console.log(ID)
        const newToDO = {
            ID:ID,
            Tarefas: toDo.Tarefas,
            Data: toDo.Data,
            Status:  toDo.Status
        }

        const dadoFinal = [
            ...toDolist,
            newToDO
        ]

        return this.escreverArquivo(dadoFinal)

      

    }

   async deleteToDo(ID){
    console.log(ID)
        if(!ID){
            return await this.escreverArquivo([])
        }

        const dados =  await this.getToDolist();
        console.log(dados)
        const indice = dados.findIndex(item => item.ID === parseInt(ID));
        console.log(indice)
        if (indice === -1 ){
            throw Error('Tarefa informada não Existe')
        } 

        dados.splice(indice,1)

        return await this.escreverArquivo(dados);

    }

    async editToDo(id, toDo){
        const dados =  await this.getToDolist();
        const indice = dados.findIndex(item => item.ID === parseInt(id));

        if (indice === -1 ){
            throw Error('Tarefa informada não Existe')
        } 

        console.log(dados)
        dados[indice] = {...dados[indice], ...toDo}

        console.log(dados)

        return this.escreverArquivo(dados);

    }

}

module.exports = new toDoListController();