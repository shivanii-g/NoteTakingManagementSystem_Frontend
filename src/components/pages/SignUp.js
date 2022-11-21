import React, { useState } from 'react';
import {withRouter} from 'react-router-dom'
import LoadingBar from './LoadingBar';
import {Form, InputGroup,FormControl,FormGroup }from "react-bootstrap";
import '../css/SignUp.css';

const SignUp = (props)=>{

  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [signup, setSignup] = useState(false);

  

  function checkOnSubmit() {
    let regexEmail=/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,20})(.[a-z]{2,20})?$/;
    let regexPassword=/^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,20}$/;
    let regexPhn=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
   
    if(
        firstName.trim()==''||
        lastName.trim()==''||
        email.trim()==''||
        password.trim()==''||
        confirmPassword.trim()==''
    ){
      document.getElementById ('signup').innerHTML ='Fields Cannot be Empty';
      document.getElementById ('signup').style.visibility='visible';
    }
    else if(!regexPhn.test(phone))
    {
      document.getElementById('signup').innerHTML="Mobile number is invalid";
      document.getElementById ('signup').style.visibility='visible';
    }
    else if(!regexEmail.test(email))
    {
      document.getElementById('signup').innerHTML="Emailis invalid";
      document.getElementById ('signup').style.visibility='visible';
    }
    else if(!regexPassword.test(password))
    {
      document.getElementById('signup').innerHTML="Password is invalid";
      document.getElementById ('signup').style.visibility='visible';
    }
    else if(password !== confirmPassword)
    {
      document.getElementById('signup').innerHTML="Password & ConfirmPassword must match";
      document.getElementById ('signup').style.visibility='visible';
    }
    else{
      console.log("signing up");
      document.getElementById ('signup').style.display='none';
      var newPhn="+91"+phone
      console.log("newphn "+newPhn);
      fetch('http://ntrs-backend.herokuapp.com/user/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify ({
                idUser: phone,  
                firstName : firstName,
                lastName:lastName,
                email:email,
                phone:newPhn,
                password:password,
                
              }),
            })
            .then(res =>res.json())
              .then (res => {
                  console.log("signup result "+JSON.stringify(res));
                if (res.msg === "user inserted") {
                  console.log("registered");
                  alert('registered!!!');
                  props.history.push('/login');
                } else  {
                  console.log("Error in inserting");
                }
              })
              .catch (err => {
                console.log (err);
              })
    }

      
    
  }

  
  if(signup){
    return(
      <LoadingBar text="Logging in..."></LoadingBar>
    )
  }
  else{
  
    return (
      <div className="container">
      
        <div className="signupCard" style={{borderRadius:'3%'}}>
                
                <h1 style={{ 'text-align': 'center', marginBottom:'20px'}}>Sign Up</h1>
                <Form className="signup">

                    <Form.Group >
                    <p id='signp' > First Name</p>
                    <Form.Control type="text" name="firstName" placeholder="Enter first" style={{width:'100%',fontSize:'16px'}}   onChange={(e)=>setFirstName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group >
                    <p id='signp' > Last Name</p>
                    <Form.Control type="text" name="lastName" placeholder="Enter last name" style={{width:'100%',fontSize:'16px'}}   onChange={(e)=>setlastName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group >
                    <p id='signp' > Phone</p>
                    <Form.Control type="phone" name="phone" placeholder="Enter phone" style={{width:'100%',fontSize:'16px'}}   onChange={(e)=>setPhone(e.target.value)}/>
                    </Form.Group>

                    <Form.Group >
                    <p id='signp' > Email</p>
                    <Form.Control type="email" name="email" placeholder="Enter email" style={{width:'100%',fontSize:'16px'}}   onChange={(e)=>setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group >
                    <p id='signp' > Password</p>
                    <Form.Control type="password" name="password" placeholder="Enter password" style={{width:'100%',fontSize:'16px'}}   onChange={(e)=>setPassword(e.target.value)}/>
                    </Form.Group>

                    <Form.Group >
                    <p id='signp'>Confirm Password</p>
                    <Form.Control type="password" name="confirmpassword" placeholder="Enter confirm password" style={{width:'100%',fontSize:'16px'}}   onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    </Form.Group>

    
                </Form>

                <p id="signup" className="warning" style={{color:'red', fontSize:'15px', fontWeight:'bold'}}></p>
                  <button id="vphn" onClick={checkOnSubmit } value="submit" style={{width: '80%', padding: '6px',color: 'aliceblue',background: '#7277f1',marginTop: '15px',borderRadius: '5px',fontSize:'16px'}}>
                  Submit
                </button>
                <h5 onClick={(e)=> props.history.push('/login')} id="vphn1" style={{ 'text-align': 'right',fontSize:'13px', margin:'10px' }}>Already have an account?</h5>
            
          
        </div>

      </div>        
    
  );}
  
}


export default withRouter(SignUp);