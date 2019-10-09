import { Categoria } from '../../categorias/shared/categoria.model';

export class Lancamento{
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string,
        public tipo?: string,
        public valor?: string,
        public data?: string,
        public pago?: boolean,
        public categoriaId?: number,
        public categoria?: Categoria
    ){}

    static types = {
        despesa: 'Despesa',
        receita: 'Receita'
    };

    get pagoText(): string{
        return this.pago ? 'Pago' : 'Pendente';
    }
}