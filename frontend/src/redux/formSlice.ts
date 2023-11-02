import { createSlice } from '@reduxjs/toolkit';
import { FormState } from './FormState';



const initialState: FormState = {
  formData: {
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    checkbox: false,
  },
  validationErrors: {
    firstName: false,
    lastName: false,
    address: false,
    phone: false,
    email: false,
    checkbox: false,
  },
};





  const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
      setFormData: (state, action) => {
        state.formData = action.payload;
       
      },
       setValidationErrors: (state, action) => {
        state.validationErrors = action.payload;
       },
      
    },
  });
  
  export const { setFormData, setValidationErrors } = formSlice.actions;
  export default formSlice.reducer;