import React, {useContext,useEffect}  from 'react';
import { useParams, useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FirstFive } from './FirstFive';
import AccordionItem from './AccordionItem';
import { AllFroms } from '../../store/AppContext';

const FirstFiveForm = () => {

    let { auditid } = useParams();

    const location = useLocation();
    // const [isedit , setIsedit] = useState(false);
    const isedit = new URLSearchParams(location.search).get('edit');

    const { firstfiveformDetails,setFirstFiveFormDetails } = useContext(AllFroms);

    useEffect(() => {
        async function fetchData() {
          try {
            const res = await fetch("/getsingleaudit", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ auditid })
            });
            const resultdata = await res.json();
            setFirstFiveFormDetails(resultdata.First_Five);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
        if(isedit === "true"){
            fetchData();
        }
    }, [auditid]);
    
    const saveFormDetails = async () => {
        try {
            const requestData = {
                formData: firstfiveformDetails,
                auditid: auditid,
                formname:"First_Five"
            };
            const res = await fetch("/saveform",{
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
        console.log(firstfiveformDetails);
    };

    return (
        <div>
            <div className='d-flex gap-3 mb-2'>
                <TextField label={"Audit Name"} variant='outlined' size='medium' className='w-100' />
                <Button variant="contained" style={{ width: '150px' }} onClick={saveFormDetails}>Save</Button>
            </div>
            {Object.entries(FirstFive).map(([key, value],index) => (
                <AccordionItem key={key} title={key} content={value} accordionindex={index}/>
            ))}
        </div>
    );
};

export default FirstFiveForm;