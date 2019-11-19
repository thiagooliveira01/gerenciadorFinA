import { Categoria } from '../../categorias/shared/categoria.model';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Lancamento extends BaseResourceModel{
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string,
        public tipo?: string,
        public valor?: number,
        public data?: string,
        public pago?: number,
        public categoriaId?: number,
        public categoria?: Categoria
    ){
        super();
    }

    static types = {
        despesa: 'Despesa',
        receita: 'Receita'
    };

    static fromJson(jsonData: any) : Lancamento{
        return Object.assign(new Lancamento, jsonData)
    }

    get pagoText(): string{
        return this.pago == 1 ? 'Pago' : 'Pendente';
    }
}