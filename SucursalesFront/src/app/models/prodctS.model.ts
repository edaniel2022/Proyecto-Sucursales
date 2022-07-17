export class ProductSsModel{
    constructor(
        public id: string,
        public name: string,
        public stock: number,
        public cantidadV: number,
        public idSucursal: string
    ){}
}