
export type SignUpValues = {
    firstname : string,
    lastname : string,
    email: string,
    password : string,
    confirmPassword : string,
    companyName : string,
  }

export type LogInValues = {
    email: string,
    password : string,
  }

export type User = {
  name : string,
  role: 'public' | 'client' | 'admin';
}


export type AuthContextType =  {
  user: User | null | undefined ;
  login : (userData : LogInValues) => Promise<boolean>;
  logout : () => void;
}

export type Service  = {
  name : string,
  image : string,
  price : string
}