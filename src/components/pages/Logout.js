import React, { useState }  from 'react';
import { AiFillPauseCircle } from 'react-icons/ai';
import {withRouter,Redirect,Link} from 'react-router-dom'
import Navbar from './Navbar';
import { Button, Confirm } from 'semantic-ui-react'


const Logout = (props) => {

  const [logOut, setlogOut] = useState('');

    return (
  
        <div className="text-center">
            <div className="nav-text" onClick={()=>{
                    if(window.confirm('Are you sure You want to logout?'))
                    {
                      setlogOut(true)
                      localStorage.clear()
                      this.props.history.push('/')
                    }
                    else{
                      setlogOut(false)
                    }
            }}>
                <Link to={logOut ? "/" : "#"}></Link>
            </div>
        </div>
        
    )

}


export default withRouter(Logout);
