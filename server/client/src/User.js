import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    const callAbout= async()=>{
        try{
        const res = await fetch('/getauthuser',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        })
        if(res.status === 200){
          var response = await res.json();
          console.log(response);
        }
        else{
            const error = new Error(res.error);
            throw error;
        }
    }catch(err)
    {
      console.log(err);
      navigate('/login');
    }
  };
    callAbout()
  },[])
  return (
    <div className="admin-layout d-flex">
      <div className="container my-5">
        <Outlet/>
      </div>
    </div>
  )
}

export default User