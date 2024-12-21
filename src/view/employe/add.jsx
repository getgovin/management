import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { addemploye } from '../../redux/api';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Add = () => {

    const dispatch = useDispatch();
    const naviagte = useNavigate();
  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    department: Yup.string().required('Department is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    address: Yup.string().required('Address is required'),
  });

  const [ disabled , setDisabled] = useState(false)
  // Initial form values
  const initialValues = {
    name: '',
    email: '',
    department: '',
    phone: '',
    address: '',
  };

  // Form submission 
  const handleSubmit = (values) => {
    setDisabled(true)
    try {
       dispatch(addemploye(values)).then((res)=>{
        naviagte(-1)
        setDisabled(false)
        toast.success("Added Successfully")

       })
    } catch (error) {
        console.log(error)
    setDisabled(false)

    }
  };

  return (
    <div className='container my-5'>
  <button  className="btn btn-primary" onClick={() => naviagte(-1)} >
              Back
            </button>
        <div className="row justify-content-center">

        <div className="col-lg-6">
        <h3>Create Form</h3>

        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            {/* Name Field */}
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" id="name" className="form-control" placeholder="Enter your name" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

            {/* Email Field */}
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" id="email" className="form-control"  placeholder="Enter your email" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>

            {/* Department Dropdown */}
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="department">Department</label>
              <Field as="select" name="department" id="department" className="form-control">
                <option value="" disabled>
                  Select Department
                </option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
              </Field>
              <ErrorMessage name="department" component="div" className="text-danger" />
            </div>

            {/* Phone Number Field */}
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="phone">Phone Number</label>
              <Field type="text" name="phone" id="phone" className="form-control"  placeholder="Enter your number" />
              <ErrorMessage name="phone" component="div" className="text-danger" />
            </div>

            {/* Address Field */}
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="address">Address</label>
              <Field
                as="textarea"
                name="address"
                id="address"
                className="form-control"
                rows="3"
                 placeholder="Enter your address"
              />
              <ErrorMessage name="address" component="div" className="text-danger" />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary" disabled={disabled} >
              Submit
            </button>
          </Form>
        )}
      </Formik>
            </div>
   
            
          
        </div>
    
    </div>
  );
};

export default Add;
