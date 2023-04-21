import './App.css';
import React from 'react';
import NavBar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/Login';
import HomeScreen from './components/HomeScreen'
import { useState } from 'react';
import Registration from './components/Registration';
import Button from '@mui/material/Button';

function App() {

  const [enableReg, setEnableReg]= useState(false);
  const [registrationString,setRegistrationString]=useState("Employee Registration");

  const setReg = ()=>{
    setEnableReg(!enableReg);

    if(enableReg === true)
    setRegistrationString("Employee Registration")
    else 
    setRegistrationString(" Go to Admin Login")

    
    
  }
  // const logggedIn = window.sessionStorage.getItem("isLoggedIn");
  // const[status, setStatus] = useState('');
  var status = JSON.parse(window.sessionStorage.getItem('user'));
  return (
    <>
      <div className="Navbar">
        <NavBar />
      </div>
      <div >
      <Button style={{ marginLeft:'70rem',marginTop:'2rem'}} variant="contained" color="success"  onClick={setReg}> {registrationString}</Button>
      </div>
      <br />
      <div className='Container' >
        {
          (!enableReg) && (status!=="Success") && <LoginForm />
        }
        {
          (!enableReg)&&(status==="Success") && <HomeScreen /> 
        }
      </div> 
      { (enableReg) &&  <Registration />
      }   
    </>
  );
}

export default App;
