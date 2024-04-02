import React , {useContext} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AllFroms } from '../../store/AppContext';
import TextField from '@mui/material/TextField';
import Form from 'react-bootstrap/Form';

const AccordionItem = ({ content, title ,accordionindex }) => {
    
    const { customineFrom, setCustomineFrom } = useContext(AllFroms);

    const handleInputChange = (mainfield, subfield, field, value) => {
        setCustomineFrom(prevState => ({
            ...prevState,
            [sanitizeKey(mainfield)]: {
                ...prevState[sanitizeKey(mainfield)],
                [sanitizeKey(subfield)]: {
                    ...prevState[sanitizeKey(mainfield)]?.[sanitizeKey(subfield)], // Optional chaining to prevent errors if subfield is undefined
                    [sanitizeKey(field)]: value
                }
            }
        }));
    };

    async function setLogFormImages(mainfield, subfield, field, files) {
        const formData = new FormData();
        formData.append('file', files[0]);

        const response = await fetch('/saveimage', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            var filepath = await response.json();
            handleInputChange(mainfield,subfield,field,filepath.filePath)
        } else {
            console.error('Error:', response.statusText);
        }
    }

    const sanitizeKey = (key) => {
        return key.replace(/\s+/g, '_'); // Replace one or more spaces with underscores
    };

    const expand = accordionindex === 0 ? true : false;
    return (
        <Accordion defaultExpanded={expand}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`Custom_Accordin_${title}`}>
                <h4 className='fw-bolder'>{title}</h4>
            </AccordionSummary>
            <AccordionDetails>
                <div className='d-flex flex-column gap-3'>
                    {
                        content.header_subheading ? (
                            content.header_subheading.map((subheading, subheadingIndex) => (
                                // <Accordion key={subheadingIndex}>
                                //     <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                //         <h4 className='fw-bolder'>{subheading.name}</h4>
                                //     </AccordionSummary>
                                //     <AccordionDetails>
                                <div key={subheadingIndex}>
                                    <label className='fw-bolder fs-6 mb-2'>{subheading.name}</label>
                                    <div className='row'>
                                        {subheading.Observation &&
                                            <div className='col-md-4 mb-3'>
                                                <label className='mb-1'>&nbsp;</label>
                                                <TextField
                                                    size='small'
                                                    className='w-100'
                                                    label="Observation"
                                                    variant="outlined"
                                                    value={customineFrom?.[sanitizeKey(title)]?.[sanitizeKey(subheading.name)]?.Observation || ''}
                                                    onChange={(e) => handleInputChange(title, subheading.name, "Observation", e.target.value)}
                                                />
                                            </div>
                                        }
                                        { 
                                            subheading.Before_Pic ? <div className='col-md-4 mb-3'>
                                                <label className='mb-1'>Before Pic</label>
                                                <Form.Group controlId="formFile" className='w-100'>
                                                    <Form.Control type="file" onChange={(e)=> setLogFormImages(title,subheading.name,"Before_Pic",e.target.files)}/>
                                                </Form.Group>
                                            </div> : null
                                        }{ 
                                            subheading.After_Pic ? <div className='col-md-4 mb-3'>
                                                <label className='mb-1'>After Pic</label>
                                                <Form.Group controlId="formFile" className='w-100'>
                                                    <Form.Control type="file" onChange={(e)=> setLogFormImages(title,subheading.name,"After_Pic",e.target.files)}/>
                                                </Form.Group>
                                            </div> : null
                                        }{ 
                                            subheading.Target ? <div className='col-md-4 mb-3'>
                                                <label className='mb-1'>&nbsp;</label>
                                                <TextField size='small' className='w-100' label="Target" variant="outlined"
                                                    value={customineFrom?.[sanitizeKey(title)]?.[sanitizeKey(subheading.name)]?.Target || ''}
                                                    onChange={(e) => handleInputChange(title, subheading.name, "Target", e.target.value)}/>
                                            </div> : null
                                        }
                                        { 
                                            subheading.Responsibility ? <div className='col-md-4 mb-3'>
                                                <label className='mb-1'>&nbsp;</label>
                                                <TextField size='small' className='w-100' label="Responsibility" variant="outlined"
                                                    value={customineFrom?.[sanitizeKey(title)]?.[sanitizeKey(subheading.name)]?.Responsibility || ''}
                                                    onChange={(e) => handleInputChange(title, subheading.name, "Responsibility", e.target.value)}/>
                                            </div> : null
                                        }
                                    </div>
                                </div>
                                //     </AccordionDetails>
                                // </Accordion>
                            ))
                        ):null
                    }
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

export default AccordionItem;


{/* <TextField size='small' className='w-100' label="Before Pic" variant="outlined"
    value={customineFrom?.[sanitizeKey(title)]?.[sanitizeKey(subheading.name)]?.Before_Pic || ''}
    onChange={(e) => handleInputChange(title, subheading.name, "Before_Pic", e.target.value)}/>
</div> */}

{/* <TextField size='small' className='w-100' label="After Pic" variant="outlined"
value={customineFrom?.[sanitizeKey(title)]?.[sanitizeKey(subheading.name)]?.After_Pic || ''}
onChange={(e) => handleInputChange(title, subheading.name, "After_Pic", e.target.value)}/> */}

{/* value={customineFrom?.[title]?.[key].Observation || ''}
onChange={(e) => setLogFormDetails(title,"Observation",e.target.value)} */}


{/* <Accordion key={subheadingIndex}>
<AccordionSummary expandIcon={<ExpandMoreIcon/>}>
    <h4 className='fw-bolder'>{subheading.name}</h4>
</AccordionSummary>
<AccordionDetails>
    <div className='row'>
        {subheading.Observation &&
            <div className='col-md-4 mb-3'>
                <label className='mb-1'>&nbsp;</label>
                <TextField
                    size='small'
                    className='w-100'
                    label="Observation"
                    variant="outlined"
                    value={customineFrom?.[sanitizeKey(title)]?.[sanitizeKey(subheading.name)]?.Observation || ''}
                    onChange={(e) => handleInputChange(title, subheading.name, "Observation", e.target.value)}
                />
            </div>
        }
        { 
            subheading.Before_Pic ? <div className='col-md-4 mb-3'>
                <label className='mb-1'>Before Pic</label>
                <Form.Group controlId="formFile" className='w-100'>
                    <Form.Control type="file"/>
                </Form.Group>
            </div> : null
        }{ 
            subheading.After_Pic ? <div className='col-md-4 mb-3'>
                <label className='mb-1'>After Pic</label>
                <Form.Group controlId="formFile" className='w-100'>
                    <Form.Control type="file"/>
                </Form.Group>
            </div> : null
        }{ 
            subheading.Target ? <div className='col-md-4 mb-3'>
                <label className='mb-1'>&nbsp;</label>
                <TextField size='small' className='w-100' label="Target" variant="outlined"
                    value={customineFrom?.[sanitizeKey(title)]?.[sanitizeKey(subheading.name)]?.Target || ''}
                    onChange={(e) => handleInputChange(title, subheading.name, "Target", e.target.value)}/>
            </div> : null
        }
        { 
            subheading.Responsibility ? <div className='col-md-4 mb-3'>
                <label className='mb-1'>&nbsp;</label>
                <TextField size='small' className='w-100' label="Responsibility" variant="outlined"
                    value={customineFrom?.[sanitizeKey(title)]?.[sanitizeKey(subheading.name)]?.Responsibility || ''}
                    onChange={(e) => handleInputChange(title, subheading.name, "Responsibility", e.target.value)}/>
            </div> : null
        }
    </div>
</AccordionDetails>
</Accordion> */}