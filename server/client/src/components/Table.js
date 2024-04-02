import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const Table = () => {
  const [audit_name , setAuditName] = useState('');
  const [formType , setFormType] = useState('form');
  const [auditData , setAuditData] = useState([]);
  const [alltemplates , setAlltemplates] = useState([]);
  const [customaudits , setCustomaudits] = useState([]);

  const formMapping = {
    form:"F 11",
    firstfive:"First Five", 
    timecheck:"Time Check", 
    dailyprocess:"Daily Process", 
    dailyline:"Daily Line"
  };


  useEffect(()=>{
    async function fetchData() {
      const res = await fetch("/getallaudit",{
        method:"GET",
        headers:{
            "Content-Type": "application/json"
        }
      });
      const resultdata = await res.json();
      setAuditData(resultdata);
      const response = await fetch("/getalltemplates", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
      });
      const responsedata = await response.json();
      setAlltemplates(responsedata.alltemplates);

      
      const res2 = await fetch("/getallcustomaudit",{
        method:"GET",
        headers:{
            "Content-Type": "application/json"
        }
      });
      const resultdata2 = await res2.json();
      console.log(resultdata2.allcustomaudits);
      setCustomaudits(resultdata2.allcustomaudits);
    }
    fetchData();
  },[])

  const CreateNewAudit = async ()=>{
    try{
        if (formType.includes("custom_")) {

          var templateid = formType.replace("custom_", "");

          window.location.href = `/user/customfrom/${templateid}`;
        } else {
          const res = await fetch("/createaudit",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
              "audit_name": audit_name,
              "FormType": formType
            })
          });
          const resultdata = await res.json();
          alert(resultdata.message);
          var auditID = resultdata.AuditDetails._id;
          window.location.href = `/user/${formType}/${auditID}`;
        }
        
    } catch (error) {
      console.error('Upload failed:', error);
    }
  }

  const DeleteAudit = async (auditID) => {
    try {
      const res = await fetch(`/deleteaudit/${auditID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) {
        throw new Error('Failed to delete Audit');
      }
      const data = await res.json();
      alert(data.message);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting Audit:', error);
    }
  };

  return (
    <>
      <div className='d-flex gap-3 mb-2'>
        <TextField label={"Audit Name"} variant='outlined' size='medium' className='w-100' value={audit_name} onChange={(e)=> setAuditName(e.target.value)}/>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Form</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formType}
            label="Select Form"
            onChange={(e) => setFormType(e.target.value)}
          >
            {Object.entries(formMapping).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
            {alltemplates.map((key,index)=>(
              <MenuItem key={index} value={'custom_' + key._id}>
                {key.template_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" style={{width:'350px'}} onClick={CreateNewAudit}>Create Audit</Button>
      </div>
      {/* d-flex py-3 px-2 pe-5 justify-content-between */}
      {auditData.map((row,rowindex) => (
        <div key={row.audit_name} className={`row py-3 px-2`} style={{ backgroundColor: rowindex % 2 === 0 ? 'rgb(238 238 238)' : 'white' }}>
          <div className='col-md-5'>
            <span className='fw-bolder fs-6'>{row.audit_name}</span> 
          </div>
          <div className='col-md-5'>
            <span className='fs-6'>{row.form_name}</span>
          </div>
          <div className='col-md-2' style={{cursor:'pointer',textAlign:'end'}}>
            {row.other_keys[0] ? 
            <div className='d-flex justify-content-between'>
              <a style={{cursor:'pointer'}} href={`/user/${row.form_name}view/${row._id}`} target='_blank' rel="noopener">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                </svg>
              </a>
              <a style={{cursor:'pointer'}} href={`/user/${row.form_name}/${row._id}?edit=true`} target='_blank' rel="noopener">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
              </a>
              {/* href={`/user/${row.form_name}view/${row._id}`} */}
              <div style={{cursor:'pointer'}} onClick={() => DeleteAudit(row._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                </svg>
              </div>
            </div> :
            <div className='d-flex justify-content-between'>
              <a style={{cursor:'pointer'}} href={`/user/${row.form_name}/${row._id}`} target='_blank' rel="noopener">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                </svg>
              </a>
              <div style={{cursor:'pointer'}} onClick={() => DeleteAudit(row._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                </svg>
              </div>
            </div>
              // <a style={{cursor:'pointer'}} href={`/user/${row.form_name}/${row._id}`}>
              //   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
              //     <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
              //   </svg>
              // </a>
            }
          </div>
        </div>
      ))}
      {customaudits.map((row,rowindex)=>(
        <div key={row.auditname} className={`row py-3 px-2`} style={{ backgroundColor: rowindex % 2 === 0 ? 'white' : 'rgb(238 238 238)'}}>
          <div className='col-md-5'>
            <span className='fw-bolder fs-6'>{row.auditname}</span> 
          </div>
          <div className='col-md-5'>
            <span className='fs-6'>{row.templatename}</span>
          </div>
          <div className='col-md-2'>
            <div className='d-flex justify-content-between'>
              <a style={{cursor:'pointer'}} href={`/user/customfromview/${row._id}`} target='_blank' rel="noopener">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                </svg>
              </a>
              <a style={{cursor:'pointer'}} href={`/user/customfromedit/${row._id}?edit=true`} target='_blank' rel="noopener">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
              </a>
              <div style={{cursor:'pointer'}} onClick={() => DeleteAudit(row._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                </svg>
              </div>
            </div>
          </div>
      </div>
      ))}
    </>
  )
}

export default Table


// <div key={form} className={`d-flex py-3 px-2 pe-5 justify-content-between`} style={{ backgroundColor: rowindex % 2 === 0 ? 'rgb(238 238 238)' : 'white' }}>
//                   <div className='fw-bolder fs-6'>
//                     <span>{form}</span> 
//                   </div>
                  
//                 </div>