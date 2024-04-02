import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [userdetails, setUserDetails] = useState({
    email:'',
    password:''
  })

  const UserDetailsChnage = (strippedId,value) =>{
    setUserDetails(prevState => ({
      ...prevState,
      [strippedId]: value
  }));
  }

  const UserLogin =async ()=>{
    try{
      const res = await fetch('/login',{
          method:"POST",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify(userdetails)
      })
      if(res.status === 200){
        const data = await res.json();
        alert(data);
        navigate('/admin');
      }
      else{
          const error = new Error(res.error);
          throw error;
      }
    }catch(err)
    {
      console.log(err);
      navigate('/');
    }
  }
  return (
    <>
      <div className='login-body'>
        <div className="container">
          <div className="container-text">
            <div className='d-flex justify-content-center'><h2>Login</h2></div>
            <input type="email" placeholder="Email address" autoComplete='off' value={userdetails.email} onChange={(e) => UserDetailsChnage("email",e.target.value)}/>
            <input type="password" placeholder="Password" autoComplete='off' value={userdetails.password} onChange={(e) => UserDetailsChnage("password",e.target.value)}/>
            <button type="submit" onClick={UserLogin}>Login</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login