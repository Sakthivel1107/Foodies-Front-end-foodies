import React, { useState } from 'react';
import './Contact.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const Contact = () => {
    const [data,setData] = useState({
        "email":"",
        "firstName":"",
        "lastName":"",
        "message":""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData( data => ({...data, [name]:value}) );
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const mail = {
            "name":data.firstName+" "+data.lastName,
            "email":data.email,
            "message":data.message
        }
        try {
           const response = await axios.post("http://localhost:8080/api/mail",mail,{headers:{"Authorization":`Bearer ${token}`}});
           if(!response.ok)
           throw new Error(response);
           toast.success("Message sent");
           console.log(response);
        } catch (error) {
            toast.error("Message not sent");
        }
    }
  return (
    <section className="py-5">
      <div className="container">
          <div className="row justify-content-center">
              <div className="col-lg-8">
                  <div className="contact-form p-5 shadow-sm bg-white">
                      <h2 className="text-center mb-4">Get in Touch</h2>
                      <form onSubmit={(event) => onSubmitHandler}>
                          <div className="row g-3">
                              <div className="col-md-6">
                                  <input type="text" className="form-control custom-input" placeholder="First Name" name="firstName" onChange={(event) => onChangeHandler} />
                              </div>
                              <div className="col-md-6">
                                  <input type="text" className="form-control custom-input" placeholder="Last Name" name="lastName" onChange={(event) => onChangeHandler} />
                              </div>
                              <div className="col-12">
                                  <input type="email" className="form-control custom-input" placeholder="Email Address" name="email" onChange={(event) => onChangeHandler} />
                              </div>
                              <div className="col-12">
                                  <textarea className="form-control custom-input" rows="5" placeholder="Your Message" name="message" onChange={(event) => onChangeHandler} ></textarea>
                              </div>
                              <div className="col-12">
                                  <button className="btn btn-primary w-100 py-3" type="submit">Send Message</button>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
    </section>
  )
}

export default Contact;