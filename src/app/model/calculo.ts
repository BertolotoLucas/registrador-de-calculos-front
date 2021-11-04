export class Calculo {
    _id?: string;
    _nomePessoa?: string;
    _operacao?: string;
    _resultado?: number;

    
    public get id() : string|undefined {
        return this._id;
    }
    public set id(id : string|undefined) {
        this._id = id;
    }    
    
    public get nomePessoa() : string|undefined {
        return this._nomePessoa;
    }
    public set nomePessoa(v : string|undefined) {
        this._nomePessoa = v;
    }
    
    public get operacao() : string|undefined {
        return this._operacao;
    }
    public set operacao(v : string|undefined) {
        this._operacao = v;
    }
    
    
    public get resultado() : number|undefined {
        return this._resultado;
    }
    public set resultado(v : number|undefined) {
        this._resultado = v;
    }
    
    
}
