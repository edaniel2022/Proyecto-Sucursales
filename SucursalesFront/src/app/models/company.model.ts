export class CompanyModel{
    constructor(
        public id: string, 
        public name: string, 
        public typeOfCompany: string, 
        public town: string, 
        public password: string, 
        public role: string
    ){}
}