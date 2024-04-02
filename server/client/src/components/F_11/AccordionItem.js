import React , {useContext} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AllFroms } from '../../store/AppContext';
import TextField from '@mui/material/TextField';
import Form from 'react-bootstrap/Form';

const AccordionItem = ({ title, hreader, content, accordionindex, mainheader }) => {
    
    const { setF_11From } = useContext(AllFroms);

    function setLogFormDetails(mainfield, field, subfield, value,type) {
        if(type === "value")
        {
            if(field === mainfield)
            {
                setF_11From(prev => ({
                    ...prev,
                    [mainfield]: {
                        ...prev[mainfield],
                        [subfield]: {
                            ...prev[mainfield][subfield],
                            textfieldvalue: value
                        }
                    }
                }));
            }else{
                setF_11From(prev => ({
                    ...prev,
                    [mainfield]: {
                        ...prev[mainfield],
                        [field]: {
                            ...prev[mainfield][field],
                            [subfield]: {
                                ...prev[mainfield][field][subfield],
                                textfieldvalue: value
                            }
                        }
                    }
                }));
            }
        }
        else if(type === "observation")
        {
            if(field === mainfield)
            {
                setF_11From(prev => ({
                    ...prev,
                    [mainfield]: {
                        ...prev[mainfield],
                        [subfield]: {
                            ...prev[mainfield][subfield],
                            observations: value
                        }
                    }
                }));
            }else{
                setF_11From(prev => ({
                    ...prev,
                    [mainfield]: {
                        ...prev[mainfield],
                        [field]: {
                            ...prev[mainfield][field],
                            [subfield]: {
                                ...prev[mainfield][field][subfield],
                                observations: value
                            }
                        }
                    }
                }));
            }
        }
        else if(type === "image"){
            if(field === mainfield)
            {
                setF_11From(prev => ({
                    ...prev,
                    [mainfield]: {
                        ...prev[mainfield],
                        [subfield]: {
                            ...prev[mainfield][subfield],
                            imageurls: value
                        }
                    }
                }));
            }else{
                setF_11From(prev => ({
                    ...prev,
                    [mainfield]: {
                        ...prev[mainfield],
                        [field]: {
                            ...prev[mainfield][field],
                            [subfield]: {
                                ...prev[mainfield][field][subfield],
                                imageurls: value
                            }
                        }
                    }
                }));
            }
        }
    }

    async function setLogFormImages(mainfield, subfield, field, files) {
        const formData = new FormData();
        formData.append('file', files[0]);

        const response = await fetch('/saveimage', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            const filepath = await response.json();
            setLogFormDetails(mainfield,subfield,field,filepath.filePath,"image");
        } else {
            console.error('Error:', response.statusText);
        }
    }

    const expand = accordionindex === 0 ? true : false;
    return (
        <Accordion defaultExpanded={expand}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`Accordin_Time_Check_${title}`}>
                <h4 className='fw-bolder'>{title}</h4>
            </AccordionSummary>
            <AccordionDetails>
                <div className='d-flex flex-column gap-3'>
                    {
                        Object.entries(content).map(([key, value], index) => (
                            <div key={key}>
                                {value.textfieldvalue === '' ? (
                                    <div className='row'>
                                      <div className="col-md-4 mb-2">
                                        <TextField size='small' className='w-100' label={value.fieldlable} variant="outlined" helperText="Maximum allowable value: 1" onChange={(e)=> setLogFormDetails(mainheader,hreader,key,e.target.value,"value")}/>
                                        {/* onChange={(e)=> setLogFormDetails("basicorder","compliance","openclose",e.target.value,"value")} */}
                                      </div>
                                      <div className="col-md-4 mb-2">
                                        <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails(mainheader,hreader,key,e.target.value,"observation")}/>
                                        {/* onChange={(e)=> setLogFormDetails("basicorder","compliance","openclose",e.target.value,"observation")} */}
                                      </div>
                                      <div className="col-md-4 mb-2">
                                        <Form.Group controlId="formFile" className='w-100'>
                                            <Form.Control type="file" onChange={(e)=> setLogFormImages(mainheader,hreader,key,e.target.files)}/>
                                        </Form.Group>
                                        {/* onChange={(e)=> setLogFormImages("basicorder","compliance","openclose",e.target.files)} */}
                                      </div>
                                    </div>
                                ) : (
                                   key !== 'label' && <AccordionItem key={key} title={value.label} hreader={key} content={value} accordionindex={index} mainheader={mainheader} />
                                )}
                            </div>
                        ))
                    }
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

export default AccordionItem;

// value={formDetails?.[title]?.[key]} 
// onChange={(e)=> setLogFormDetails(title,key,e.target.value)}
