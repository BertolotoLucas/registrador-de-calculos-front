export class Calculo {
    id?: string;
    nomePessoa?: string;
    operacao?: string;
    resultado?: number;

    
    public getid() : string|undefined {
        return this.id;
    }
    public setid(id : string|undefined) {
        this.id = id;
    }    
    
    public getnomePessoa() : string|undefined {
        return this.nomePessoa;
    }
    public setnomePessoa(nomePessoa : string|undefined) {
        this.nomePessoa = nomePessoa;
    }
    
    public getoperacao() : string|undefined {
        return this.operacao;
    }
    public setoperacao(operacao : string|undefined) {
        this.operacao = operacao;
    }   
    
    public getresultado() : number|undefined {
        return this.resultado;
    }
    public setresultado(resultado : number|undefined) {
        this.resultado = resultado;
    }
    
    
}
