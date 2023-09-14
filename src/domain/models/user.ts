export interface User {
  _id?: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  isblocked: boolean;
  premium: boolean;
  isGoogle: boolean;
  role: string;
  profileImg?: string;
  paymentDetails?:[{orderId :string,stadiumId :string}]
}

export interface OTPuser {
  Email: string;
  otp: string;
  otpStatus?: boolean;
}
