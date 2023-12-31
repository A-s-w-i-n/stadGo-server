export interface Owner {
  _id?: string;
  firstname: string;
  lastname: string;
  ownername: string;
  phone: string;
  password: string;
  companyname: string;
  email: string;
  location: string;
  isblocked: boolean;
  premium: boolean;
  role: string;
  User? : string
  paymentDetails?:[{orderId :string,stadiumId :string,userId : string,stadiumPrice :string,date : string,startDate : string,endDate : string}]
}
