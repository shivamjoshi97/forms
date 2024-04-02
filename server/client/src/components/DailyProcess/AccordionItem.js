import React , {useContext} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AllFroms } from '../../store/AppContext';
import TextField from '@mui/material/TextField';
import Form from 'react-bootstrap/Form';

const AccordionItem = ({ title, content, accordionindex }) => {
    
    const { dailyprocessFrom, setDailyProcessFrom } = useContext(AllFroms);

    function setLogFormDetails(mainfield, subfield,field,value) {
        setDailyProcessFrom(prevState => ({
            ...prevState,
            [mainfield]: {
                ...prevState[mainfield],
                [subfield]: {
                    ...prevState[mainfield][subfield],
                    [field]:value
                }
            }
        }));
    }

    async function setLogFormImages(mainfield, subfield, field, files) {
        const formData = new FormData();
        formData.append('file', files[0]);

        const response = await fetch('/saveimage', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            var filepath = await response.json();
            setLogFormDetails(mainfield,subfield,field,filepath.filePath)
        } else {
            console.error('Error:', response.statusText);
        }
    }

    const expand = accordionindex === 0 ? true : false;
    return (
        <Accordion defaultExpanded={expand}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`Accordin_Time_Check_${title}`}>
                <h4 className='fw-bolder'>{title.replace(/_/g, ' ')}</h4>
            </AccordionSummary>
            <AccordionDetails>
                <div className='d-flex flex-column'>
                    {
                        Object.entries(content).map(([key, value]) => (
                            <div className='row' key={key}>
                                <label className='mb-2 fw-bolder'>{value.label}</label>
                                <div className='col-md-4 mb-3'>
                                    <TextField size='small' className='w-100' value={dailyprocessFrom?.[title]?.[key].observation} label="Observation" variant="outlined"
                                    onChange={(e)=> setLogFormDetails(title,key,"observation",e.target.value)}/>
                                </div>
                                <div className='col-md-4 mb-3'>
                                    <TextField size='small' className='w-100' value={dailyprocessFrom?.[title]?.[key].remarks} label="Remarks" variant="outlined"
                                    onChange={(e)=> setLogFormDetails(title,key,"remarks",e.target.value)}/>
                                </div>
                                <div className='col-md-4 mb-3'>
                                    {/* <TextField size='small' className='w-100' value={dailyprocessFrom?.[title]?.[key].remarks} label="Remarks" variant="outlined"
                                    onChange={(e)=> setLogFormDetails(title,key,"remarks",e.target.value)}/> */}
                                    {dailyprocessFrom?.[title]?.[key].imageurl ?
                                    <img src={'/'+dailyprocessFrom?.[title]?.[key].imageurl} alt={value.label}/> :
                                    <Form.Group controlId="formFile" className='w-100'>
                                        <Form.Control type="file" onChange={(e)=> setLogFormImages(title,key,"imageurl",e.target.files)}/>
                                    </Form.Group>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

export default AccordionItem;
