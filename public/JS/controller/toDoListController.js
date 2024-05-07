import {toDolistViewer} from "../viewers/toDolistViewer.js"
import { alertMensagem } from "../viewers/alertMensagem.js";

class toDoListController{
    constructor(){
        this._viewers = new toDolistViewer();
        this._AlertMensagem = new alertMensagem();
        this._btnAddTarefa = document.getElementById('addTarefa'); 
        this._btnFechar = document.getElementById('btnFechar');
        this._inputTarefa = document.getElementById('inputtarefa');
        this._inputData = document.getElementById('inputdata');
        this._btnAdd = document.getElementById('btnAdd');
        this._btnDeleteAll = document.getElementById('btnDeleteAll');
        this._btnAtualizar = document.getElementById('btnAtualizar');
        this._inputID = document.getElementById('inputID');
        this._totalLinhas= document.querySelector('[data-totalTarefas]')
    }

    main(){
       
        this._btnAddTarefa.addEventListener('click',()=>{
            this._viewers.openAndCloseForm();
            this._btnAtualizar.hidden= true;
            this._btnAdd.hidden = false;

            this._inputTarefa.value = "";
            this._inputData.value= "";
            this._inputID.value =""

            
                })


        this._btnFechar.addEventListener('click',()=>{
            this._viewers.openAndCloseForm();
            this.getToDoList();
        })

        this._btnAdd.addEventListener('click',()=>{
            this.addNewToDo()
        })

        this._btnDeleteAll.addEventListener('click',()=>{
            //this.deleteToDo();
            this.confirmacaoDelete(null)
        })

        this._btnAtualizar.addEventListener('click',()=>{
            this.AtualizarToDo()
        })

        this.getToDoList();

    }

    async getToDoList(){
        const resultado = await fetch(`/listadetarefas`);
      

        const resultconvertido = await resultado.json()

       

        this._totalLinhas.innerText =`Total de tarefas: ${resultconvertido.length}`



        await this._viewers.viewerToDolist(resultconvertido)
     
        this.btnClick();
    }


    btnClick(){
        const allbtnEdit = document.querySelectorAll('#btnEdit')
        const allbtnDelete =  document.querySelectorAll('#btnDelete')
        const allbtnConcluir =  document.querySelectorAll('#btnConcluir')
        
        allbtnEdit.forEach(btn =>{
            btn.addEventListener('click',()=>{

                const ID = parseInt(btn.parentNode.parentNode.querySelector("#IdTarefa").innerText) 
                this._viewers.openAndCloseForm();
                this._btnAtualizar.hidden= false;
                this._btnAdd.hidden = true;

                this._inputTarefa.value = btn.parentNode.parentNode.querySelectorAll('span')[1].innerText;
                this._inputData.value= btn.parentNode.parentNode.querySelectorAll('span')[2].innerText;
                this._inputID.value =ID

                console.log(ID)
                
            })
        })


        allbtnDelete.forEach(btn =>{
            btn.addEventListener('click',()=>{

               this.confirmacaoDelete(btn);
               
            })
        })


        allbtnConcluir.forEach(btn =>{
            btn.addEventListener('click',()=>{

                const dados ={
                    id:parseInt(btn.parentNode.parentNode.querySelector("#IdTarefa").innerText),
                    Tarefas:btn.parentNode.parentNode.querySelectorAll('span')[1].innerText,
                    Data:btn.parentNode.parentNode.querySelectorAll('span')[2].innerText
                }
                //const ID = parseInt(btn.parentNode.parentNode.querySelector("#IdTarefa").innerText) 
                console.log(dados)
                this.AtulizarToDoStatus(dados)


                
            })
        })


    }


    async addNewToDo(){
        const result = await fetch('/newToDoList',{
            method :'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                Tarefas: this._inputTarefa.value,
                Data: this._inputData.value,
                Status: 'Para Fazer'
            }
            )
        });

        const resultconvertido = await result.json();

        console.log(resultconvertido)
        if(resultconvertido){

            this._AlertMensagem.alertMensagemOpen(true,"Adicionado com Sucesso a Tarefa")
        }else{
            this._AlertMensagem.alertMensagemOpen(false,"Erro ao Adicionar a Tarefa")
        }

        
        
        this._viewers.openAndCloseForm();
        this.getToDoList();

    }

    async deleteToDo(ID){

        const result = await fetch(`/delete`,{
            method :'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
               ID:ID
            }
            )
        })


        this.getToDoList();

    }

    async AtualizarToDo(){
        const result = await fetch(`/edit/${this._inputID.value}`,{
            method :'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                Tarefas: this._inputTarefa.value,
                Data: this._inputData.value,
                Status: 'Para Fazer'
            }
            )
        })

        this.getToDoList();
    }
    
    async AtulizarToDoStatus(dados){

        const result = await fetch(`/edit/${dados.id}`,{
            method :'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                Tarefas: dados.Tarefas,
                Data: dados.Data,
                Status: 'Concluído'
            }
            )
        })

        this.getToDoList();
    }


    confirmacaoDelete(btn){

       let  result = confirm("Tem certeza que deseja deletar a tarefa?");

        if(result){

            console.log(btn)
            if (btn){
                const ID = parseInt(btn.parentNode.parentNode.querySelector("#IdTarefa").innerText) 
            this.deleteToDo(ID)
            } 
            else{
                this.deleteToDo()
            }
            
        }
       
    }

}

const  start = new toDoListController();

start.main()