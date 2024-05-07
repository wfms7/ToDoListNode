class alertMensagem{
    constructor(){
        this._alertSection = document.querySelector('[data-alert]')
    }


    alertMensagemOpen(tipo, mensagem){

        const SucessoErro = tipo ? "Sucesso" :"Erro"

        this._alertSection.innerHTML =`
        <div class="alert">
            <div class="alert__container-${SucessoErro.toLowerCase()} show">
                <div class="alert__titulo">
                    <h2 class="alert__titulo-texto">${SucessoErro}</h2>
                </div>
                <div class="alert__mensagem">
                    <h3 class="alert__titulo-texto">${mensagem}</h3>
                </div>
        
            </div>
        </div>

        
        `;

       setTimeout(()=>{
        this.closeAlert();

       },5000)

        
    }

    closeAlert(){
        this._alertSection.innerHTML ="";
    }


}

export{alertMensagem};