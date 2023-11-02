


 export interface FormState {
  formData: {
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    email: string;
    checkbox: boolean;
  };
  validationErrors: {
    firstName: boolean;
    lastName: boolean;
    address: boolean;
    phone: boolean;
    email: boolean;
    checkbox: boolean;
  };
}