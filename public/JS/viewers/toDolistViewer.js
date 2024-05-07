class toDolistViewer{
    constructor(){
        this._ativarForm = document.querySelector('[ data-form]');
        this._tarefas = document.querySelector('[data-tarefas]');
        this._ul = document.querySelector('[data-ul]')
    }

   
    openAndCloseForm(){
        let status = this._ativarForm.classList.toggle('form__container-ativo');

        if (status)  {
            console.log(status)
            this._tarefas.style.display = "none"
        }
        else{
            console.log(status)
            this._tarefas.style.display = "block"
        }
    }

   async  viewerToDolist(toDO){

   
    
        let li ='';

        toDO.forEach(element => {
            const statusConcluido = element.Status.toLowerCase() === 'concluído';
            const classCSS = statusConcluido ?  'tarefas__itens-concluido': 'tarefas__itens';
            const hidden = statusConcluido ?  'hidden': '';
            
            li+=`
            <li class="${classCSS}  ">
            <span class="tarefa__iten" id="IdTarefa" hidden>${element.ID}</span>
            <label for="" class="tarefa__label">Tarefa:</label>
            <span class="tarefa__iten">${element.Tarefas}</span>
            <label for="" class="tarefa__label">Data:</label>
            <span class="tarefa__iten">${element.Data}</span>
            <label for="" class="tarefa__label">Status:</label>
            <span class="tarefa__iten">${element.Status}</span>
            <div class="tarefas__-container-button-itens">
                <button class="button-itens icon-edit" ${hidden}  id="btnEdit"></button>
                <button class="button-itens icon-delete" id="btnDelete"></button>
                <button class="button-itens icon-concluido" id="btnConcluir"></button>
            </div>

         </li>


            
            `

        });


        this._ul.innerHTML =li;

        

    }


}

export{toDolistViewer}