import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import {   viewemploye } from '../../redux/api';
import { useDispatch } from 'react-redux';

const View = () => {
    
    const dispatch = useDispatch();
    const naviagte = useNavigate();
    const location = useLocation();
   const id  = location.pathname.split("/")[3]



  const [loading ,setLoading] = useState(true)
  const [initialValues , setInitialValue] = useState({
    name: '',
    email: '',
    department: '',
    phone: '',
    address: '',
  });

 

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
        <h3>View </h3>
        {
            loading  ?  <h4>Loading data...</h4>
            
            : 
        

        <Formik
        initialValues={initialValues}
      >
        {() => (
          <Form>
            {/* Name Field */}
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" id="name" disabled className="form-control" placeholder="Enter your name" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

            {/* Email Field */}
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" id="email" disabled className="form-control"  placeholder="Enter your email" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>

            {/* Department Dropdown */}
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="department">Department</label>
              <Field as="select" name="department" id="department" disabled className="form-control">
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
              <Field type="text" name="phone" id="phone" disabled className="form-control"  placeholder="Enter your number" />
              <ErrorMessage name="phone" component="div" className="text-danger" />
            </div>

            {/* Address Field */}
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="address">Address</label>
              <Field
                as="textarea"
                name="address"
                disabled
                id="address"
                className="form-control"
                rows="3"
                 placeholder="Enter your address"
              />
              <ErrorMessage name="address" component="div" className="text-danger" />
            </div>

          
          </Form>
        )}
      </Formik>
}
            </div>
   
            
          
        </div>
    
    </div>
  );
};

export default View;
