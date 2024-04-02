import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccordionItem from './AccordionItem';
import { AllFroms } from '../../store/AppContext';

const CustomForm = () => {
    let { templateid } = useParams();
    
    const { customineFrom } =  useContext(AllFroms);
    
    const [templateData , setTemplateData] = useState({});
    const [auditname , setAuditName] = useState('');

    useEffect(()=>{
        async function GetCustomTemplate()
        {
            const response = await fetch('/gettemplate', {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({templateid})
            });
            var formData = await response.json();
            console.log(formData);
            if (response.ok) {
                setTemplateData(formData.TemplateDetails);
            } else {
                console.error('Error:', response.statusText);
            }
        }

        GetCustomTemplate();
    },[])

    const saveFormDetails = async () => {
        try {
            const requestData = {
                formData: customineFrom,
                auditname:auditname,
                templatename:templateData.template_name
            };
            const res = await fetch("/savecustomform",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
            },
            body:JSON.stringify(requestData)
            });
            const resultdata = await res.json();
            alert(resultdata.message);
            window.location.href = "/admin";
        } catch (error) {
            console.error('Upload failed:', error);
        }
        // console.log(customineFrom);
    };

    return (
        <div>
            <div className='d-flex justify-content-center'>
                <span>{templateData.template_name}</span>
            </div>
            <div className='d-flex gap-3 mb-2'>
                <TextField label={"Audit Name"} variant='outlined' size='medium' className='w-100' value={auditname} onChange={(e)=> setAuditName(e.target.value)}/>
                <Button variant="contained" style={{ width: '150px' }} onClick={saveFormDetails}>Save</Button>
                {/* onClick={saveFormDetails} */}
            </div>
            {templateData.header_details && (templateData.header_details).map((details, index) => (
                <AccordionItem key={details.header_name} title={details.header_name} content={details} accordionindex={index}/>  
            ))}
        </div>
    )
}

export default CustomForm