export type SignUpData = {
  firstname : string,
  lastname : string,
  email: string,
  company? : string,
  password : string,
  confirmPassword : string,
}


export type User = {
  id : string,
  firstName : string,
  lastName : string,
  company? : string,
  userType : string,
}