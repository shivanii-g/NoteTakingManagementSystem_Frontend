import React, { useState }  from 'react';
import {withRouter} from 'react-router-dom'
import LoadingBar from './LoadingBar';
import {Form, InputGroup,FormControl,FormGroup }from "react-bootstrap";
import Button from "react-bootstrap/Button";
import '../css/Login.css';

const Login = (props)=> {
   
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [login, setLogin] = useState(false);
     
    function onSubmit(e) {
        e.preventDefault()
        let regexPhn=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  
        if(phone.trim() == '' || password.trim()==''){
          document.getElementById ('login').innerHTML = 'Fields Cannot be Empty.';
          document.getElementById ('login').style.visibility='visible';
        }
        else if(!regexPhn.test(phone)){
          document.getElementById('login').innerHTML='Please Enter Valid Mobile'
          document.getElementById ('login').style.visibility='visible';
        }
        else{
          console.log("here "+phone);
          setLogin(true);
          const data = new FormData()
          data.append('phone',phone)
          data.append('password',password)   
          console.log("ghds "+data);
            fetch("http://ntrs-backend.herokuapp.com/user/loginUser", {
              
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify ({
                phone:phone,
                password:password
              })
              
            }).then(res =>res.json())
            .then (res => {
              setLogin(false)
              if (res.code === 200) {
                    console.log("Updated")
                    // console.log("j "+res.data);
                    // console.log("jahj "+JSON.stringify(res.data));
                    localStorage.setItem("local",JSON.stringify(res.data))
                    let temp=JSON.parse(localStorage.getItem('local'));
                    localStorage.setItem('token',`Bearer ${res.token}`)
                    // console.log("localstorage "+JSON.stringify(temp));
                    console.log("token "+res.token);
                    // console.log("localstorage "+JSON.stringify(temp.reminders));
                    alert("Logged In")
                    props.history.push('/notes')
              } else if (res.code === 401) {
                  setLogin(false)
                console.log("Error in Updating");
                alert("Invalid Password")
              }
              else if(res.code===402){
                setLogin(false)
                alert("Invalid User")
              }
            })
            .catch (err => {
              console.log (err);
              alert("Mobile Number or Password is incorrect")
              setLogin(false)
            });
        }

      setPhone('');
      setPassword('');
      
    }

   
    
      if(login){
        return(
        <LoadingBar text="Logging in..."></LoadingBar>
        )
      }
      
      else{
        return(
            <div className="container" id="cont1" style={{backgroundSize: 'cover'}}>

              <div className="loginCard" >
              
                <h1 style={{ 'text-align': 'center', marginBottom:'20px'}} data-testid="hello"> Log In</h1>
                    <Form className="login">

                      <Form.Group >
                      <p id="loginp" > Phone</p>
                      <Form.Control id="phone-test" type="phone" name="phone" placeholder="Enter phone number" style={{width:'100%',fontSize:'16px'}} data-testid="phone-input"    onChange={(e)=>setPhone(e.target.value)}/>
                      </Form.Group>

                      <Form.Group >
                        <p id="loginp" > Password</p>
                        <Form.Control id="password-test" data-testid="password-input" type="password" name="password" placeholder="Enter Password"  style={{width:'100%', fontSize:'16px'}} onChange={(e)=>setPassword(e.target.value)} />
                      </Form.Group>

                      
                      <p id="login" className="warning" style={{color:'red', fontWeight:'bold'}}/>
                  
                    </Form>
                <button  onClick={onSubmit} value="submit" type="submit" style={{width: '80%', padding: '6px',color: 'aliceblue',background: '#7277f1',marginTop: '15px',borderRadius: '5px',fontSize:'16px'}}>
                Submit
                </button>
              </div>
            </div>
          
            
        );
      }

        
    
}
export default withRouter(Login);