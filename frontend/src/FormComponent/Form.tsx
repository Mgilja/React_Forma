import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../redux/formSlice';
import './Form.css';
import SuccessMessage from '../SucessMessage/SuccessMessage';

const Form: React.FC<{}> = () => {
  const formData = useSelector((state: any) => state.form.formData);
  const dispatch = useDispatch();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    address: false,
    phone: false,
    email: false,
    checkbox: false,
  });



   const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let hasError = false;
  
    if (value.trim() === '') {
      hasError = true;
    } else if (name === 'phone' && !value.trim().match(/^\+\d{10,20}$/)) {
      hasError = true;
    } else if (name === 'email' && !value.trim().match(/^\S+@\S+\.\S+/)) {
      hasError = true;
    }
  
    setErrors({ ...errors, [name]: hasError });
  };
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    dispatch(setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value }));

    if (name === 'phone' && !value.trim().match(/^\+\d{0,20}$/)) {
      setErrors({ ...errors, [name]: true });
    } else {
      setErrors({ ...errors, [name]: false });
    }
  };

  const isFormValid = () => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.address.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.phone.trim().match(/^\+\d{10,20}$/) &&
      formData.email.trim() !== '' &&
      formData.email.trim().match(/^\S+@\S+\.\S+/) &&
      formData.checkbox
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormValid()) {
      const response = await fetch('http://localhost:8080/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setShowSuccessMessage(true);
        dispatch(setFormData({ firstName: '', lastName: '', address: '', phone: '', email: '', checkbox: false }));
        console.log(data);
      } else if (response.status === 400) {
        const errorData = await response.json();
        console.log(errorData.message);
      } else {
        console.error('Request failed with status: ' + response.status);
      }
    }
  };

  return (
    <div>
      {showSuccessMessage ? (
        <SuccessMessage />
      ) : (
        <form onSubmit={handleSubmit} className="form-container">
          <h1>Input Form</h1>

          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input${errors.firstName ? ' error' : ''}`}
            />
            {errors.firstName && (
              <div className="error-message">Required First Name</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input${errors.lastName ? ' error' : ''}`}
            />
            {errors.lastName && (
              <div className="error-message">Required Last Name</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input${errors.address ? ' error' : ''}`}
            />
            {errors.address &&(
              <div className="error-message">Required Address</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Phone number (+0000000000)"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input${errors.phone ? ' error' : ''}`}
            />
              {errors.phone && !formData.phone.trim() && (
              <div className="error-message">Required</div>
            )}
            {errors.phone && formData.phone.trim() !== '' && !formData.phone.trim().match(/^\+\d{10,20}$/) && (
              <div className="error-message">Bad format e.g +3858 8888 8888</div>
            )}
            
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input${errors.email ? ' error' : ''}`}
            />
            
            {errors.email && !formData.email.trim() && <div className="error-message">Required</div>}
            {errors.email && formData.email.trim() !== '' && !formData.email.trim().match(/^\S+@\S+\.\S+/) && (
              <div className="error-message">Bad format e.g john@doe.com</div>
            )}
          </div>

          <div className="form-group">
            <input
              type="checkbox"
              name="checkbox"
              id="checkbox"
              checked={formData.checkbox}
              onChange={handleChange}
            />
            <label htmlFor="checkbox">I agree to the terms and conditions</label>
            {errors.checkbox && !formData.checkbox && (
              <div className="error-message">Required checkbox confirmation</div>
            )}
          </div>

          <button type="submit" className="form-button" disabled={!isFormValid()}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Form;

