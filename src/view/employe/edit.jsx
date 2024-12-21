import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import {  editemploye, viewemploye } from '../../redux/api';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Edit = () => {
    
    const dispatch = useDispatch();
    const naviagte = useNavigate();
    const location = useLocation();
   const id  = location.pathname.split("/")[3]


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

  // Initial form values
    const [ disabled , setDisabled] = useState(false)
  
  const [loading ,setLoading] = useState(true)
  const [initialValues , setInitialValue] = useState({
    name: '',
    email: '',
    department: '',
    phone: '',
    address: '',
  });

  // Form submission 
  const handleSubmit = (values) => {
    setDisabled(true)
    const requestOption = {
        ...values, id:id
    }
    try {
       dispatch(editemploye(requestOption)).then((res)=>{
        naviagte(-1)
    setDisabled(false)
            toast.success("Updated Successfully")
    

       })
    } catch (error) {
        console.log(error)
    setDisabled(false)

    }
  };

  const handlegetData = () => {
    try {
       dispatch(viewemploye(id)).then((res)=>{
        setInitialValue({
            name: res?.payload?.name,
            email: res?.payload?.email,
            department: res?.payload?.department,
            phone: res?.payload?.phone,
            address: res?.payload?.address,
        })
        setLoading(false)
       })
    } catch (error) {
        console.log(error)
        setLoading(false)

    }
  };

  useEffect(()=>{
    handlegetData();
  },[])

  return (
    <div className='container'>
  <button  className="btn btn-primary" onClick={() => naviagte(-1)} >
              Back
            </button>
        <div className="row justify-content-center">

        <div className="col-lg-6">
        <h3>Edit Form</h3>
        {
            loading  ?  <h4>Loading data...</h4>
            
            : 
        

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
              Update
            </button>
          </Form>
        )}
      </Formik>
}
            </div>
   
            
          
        </div>
    
    </div>
  );
};

export default Edit;
