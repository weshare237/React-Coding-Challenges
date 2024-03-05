import { useState } from 'react';
import * as Yup from 'yup';

const FormWithYup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    interests: [],
    birthDate: '',
  });

  const [errors, setErrors] = useState();

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one symbol'
      )
      .matches(/\d/, 'Password must contain at least one number')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords should match'),
    age: Yup.number()
      .typeError('Age must be a number')
      .min(18, 'You must be at least 18 years old')
      .max(100, 'You cannot be older than 100 years')
      .required('Age is required'),
    gender: Yup.string().required('Gender is required'),
    interests: Yup.array()
      .min(1, 'Select at least one interest')
      .required('Select at least one interest'),
    birthDate: Yup.date()
      .required('Date of birth is required')
      .max(new Date(), 'Date of birth cannot be a future date'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log(formData);
    } catch (error) {
      let newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    let updatedInterests = [...formData.interests];

    if (checked) {
      updatedInterests.push(name);
    } else {
      updatedInterests.filter((interest) => interest !== name);
    }

    setFormData({ ...formData, interests: updatedInterests });
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <div>
        <label htmlFor='firstName'>First Name:</label>
        <input
          type='text'
          name='firstName'
          id='firstName'
          value={formData.firstName}
          placeholder='Enter first name'
          onChange={handleChange}
        />
        {errors?.firstName && <div className='error'>{errors.firstName}</div>}
      </div>

      <div>
        <label htmlFor='lastName'>Last Name:</label>
        <input
          type='text'
          name='lastName'
          id='lastName'
          value={formData.lastName}
          placeholder='Enter last name'
          onChange={handleChange}
        />
        {errors?.lastName && <div className='error'>{errors.lastName}</div>}
      </div>

      <div>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          name='email'
          id='email'
          value={formData.email}
          placeholder='Enter email'
          onChange={handleChange}
        />
        {errors?.email && <div className='error'>{errors.email}</div>}
      </div>

      <div>
        <label htmlFor='phoneNumber'>Phone Number:</label>
        <input
          type='text'
          name='phoneNUmber'
          id='phoneNumber'
          value={formData.phoneNumber}
          placeholder='Enter phone number'
          onChange={handleChange}
        />
        {errors?.phoneNumber && (
          <div className='error'>{errors.phoneNumber}</div>
        )}
      </div>

      <div>
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          name='password'
          id='password'
          value={formData.password}
          placeholder='Enter password'
          onChange={handleChange}
        />
        {errors?.password && <div className='error'>{errors.password}</div>}
      </div>

      <div>
        <label htmlFor='confirmPassword'>Confirm Password:</label>
        <input
          type='password'
          name='confirmPassword'
          id='confirmPassword'
          value={formData.confirmPassword}
          placeholder='Confirm password'
          onChange={handleChange}
        />
        {errors?.confirmPassword && (
          <div className='error'>{errors.confirmPassword}</div>
        )}
      </div>

      <div>
        <label htmlFor='age'>Age:</label>
        <input
          type='number'
          name='age'
          id='age'
          value={formData.age}
          placeholder='Enter age'
          onChange={handleChange}
        />
        {errors?.age && <div className='error'>{errors.age}</div>}
      </div>

      <div>
        <label htmlFor='gender'>Gender:</label>
        <select
          name='gender'
          id='gender'
          value={formData.gender}
          onChange={handleChange}
        >
          <option value=''>Select Gender</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
          <option value='other'>Other</option>
        </select>
      </div>

      <div>
        <label htmlFor='gender'>Interests:</label>
        <label htmlFor='coding'>
          <input
            type='checkbox'
            name='coding'
            id='coding'
            checked={formData.interests.includes('coding')}
            onChange={handleCheckboxChange}
          />
          Coding
        </label>
        <label htmlFor='sports'>
          <input
            type='checkbox'
            name='sports'
            id='sports'
            checked={formData.interests.includes('sports')}
            onChange={handleCheckboxChange}
          />
          Sports
        </label>
        <label htmlFor='reading'>
          <input
            type='checkbox'
            name='reading'
            id='reading'
            checked={formData.interests.includes('reading')}
            onChange={handleCheckboxChange}
          />
          Reading
        </label>
        {errors?.interests && <div className='error'>{errors.interests}</div>}
      </div>

      <div>
        <label htmlFor='birthDate'>Birth Date:</label>
        <input
          type='date'
          name='birthDate'
          id='birthDate'
          value={formData.birthDate}
          onChange={handleChange}
          placeholder='Enter your date of birth'
        />
        {errors?.birthDate && <div className='error'>{errors.birthDate}</div>}
      </div>

      <button type='submit'>Submit</button>
    </form>
  );
};

export default FormWithYup;
