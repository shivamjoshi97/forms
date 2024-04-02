import React, {useContext}  from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { F_11 } from './F_11'
import AccordionItem from './AccordionItem';
import { AllFroms } from '../../store/AppContext';

const F_11Form = () => {

  let { auditid } = useParams();

  const { f_11From, setF_11From} = useContext(AllFroms);
  
  const headermapping = {
    basicorder:'The Basic Order',
    cleanupsteps:'Clean up 3 Steps',
    manufacturing:'Manufaturing (Assembly)',
    equipment_maintenance:'Equipmant Maintenance',
    smt:'SMT',
    injection:'Injection',
    press:'Press',
    warehouse:'Warehouse',
    tools:'Tools',
    esd:'ESD'
  }

  const saveFormDetails = async () => {
    console.log(f_11From);
    // try {
    //     const requestData = {
    //         formData: formDetails,
    //         auditid: auditid,
    //         formname:"Time_Check"
    //     };
    //     const res = await fetch("/saveform",{
    //         method:"POST",
    //         headers:{
    //             "Content-Type": "application/json"
    //     },
    //     body:JSON.stringify(requestData)
    //     });
    //     const resultdata = await res.json();
    //     alert(resultdata.message);
    //     window.location.href = "/admin";
    // } catch (error) {
    //     console.error('Upload failed:', error);
    // }
};

  return (
    <div>
        <div className='d-flex gap-3 mb-2'>
            <TextField label={"Audit Name"} variant='outlined' size='medium' className='w-100' />
            <Button variant="contained" style={{ width: '150px' }} onClick={saveFormDetails}>Save</Button>
        </div>
        {Object.entries(F_11).map(([key, value],index) => (
            <AccordionItem key={key} title={headermapping[key]} hreader={key} content={value} accordionindex={index} mainheader={key}/>
        ))}
    </div>
  )
}

export default F_11Form