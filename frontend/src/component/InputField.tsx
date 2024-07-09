import { InputHTMLAttributes, forwardRef } from "react";
import { ErrorText } from "../utils";

type TextFieldParams = Omit<
  InputHTMLAttributes<HTMLInputElement>, 
  "className" 
> & {
  label : string;
  error?: string | any;
}

export const InputField = forwardRef<HTMLInputElement, TextFieldParams>(({label, error, ...inputParams}, ref) => (
    <>
      <input 
        ref={ref}
        {...inputParams}
        placeholder={label}
        
      />
      <ErrorText>{error}</ErrorText>
    </>
    )
  )