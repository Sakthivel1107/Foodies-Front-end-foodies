import React, { useContext, useState } from 'react';
import './Contact.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';


const Contact = () => {
    const {token} = useContext(StoreContext);
    const navigate = useNavigate();
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
        console.log(data);
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        console.log(data)
        const mail = {
            "name" : data.firstName+" "+data.lastName,
            "email" : data.email,
            "message" : data.message
        }
        
        
        try {
           const response = await axios.post("https://foodies-back-end-1.onrender.com/api/mail",mail,{headers:{"Authorization":`Bearer ${token}`}});
           if(response.status !== 200)
           throw new Error(response);
           toast.success("Message sent");
           navigate("/");
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
                      <form onSubmit={onSubmitHandler}>
                          <div className="row g-3">
                              <div className="col-md-6">
                                  <input type="text" className="form-control custom-input" placeholder="First Name" name="firstName" onChange={onChangeHandler} onInput={onChangeHandler}required />
                              </div>
                              <div className="col-md-6">
                                  <input type="text" className="form-control custom-input" placeholder="Last Name" name="lastName" onChange={onChangeHandler} onInput={onChangeHandler}/>
                              </div>
                              <div className="col-12">
                                  <input type="email" className="form-control custom-input" placeholder="Email Address" name="email" onChange={onChangeHandler} onInput={onChangeHandler} required />
                              </div>
                              <div className="col-12">
                                  <textarea className="form-control custom-input" rows="5" placeholder="Your Message" name="message" onChange={onChangeHandler} onInput={onChangeHandler} required ></textarea>
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