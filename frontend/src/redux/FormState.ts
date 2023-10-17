import {  FormData } from "../FormComponent/FormData";


export interface FormState {
  formData:FormData

  validationErrors: {
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    email: string;
    checkbox: string;
  };
}