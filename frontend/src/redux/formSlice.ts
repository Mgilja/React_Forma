import { createSlice } from '@reduxjs/toolkit';
import { FormState } from './FormState';



const initialState : FormState = {
  formData: {
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    checkbox: false,
  },
  validationErrors: {
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    checkbox: '',
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
  
  export const { setFormData } = formSlice.actions;
  export default formSlice.reducer;