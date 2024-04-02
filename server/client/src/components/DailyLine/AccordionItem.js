import React , {useContext} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AllFroms } from '../../store/AppContext';
import TextField from '@mui/material/TextField';

const AccordionItem = ({ title, content, accordionindex }) => {
    
    const { dailyLineFrom, setDailyLineFrom } = useContext(AllFroms);

    function setLogFormDetails(mainfield, subfield,field,value) {
        setDailyLineFrom(prevState => ({
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

    const expand = accordionindex === 0 ? true : false;
    return (
        <Accordion defaultExpanded={expand}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`Accordin_Time_Check_${title}`}>
                <h4 className='fw-bolder'>{content.label}</h4>
            </AccordionSummary>
            <AccordionDetails>
                <div className='d-flex flex-column'>
                    {
                        Object.entries(content).map(([key, value]) => (
                            (key !== "label" ? 
                            <div className='row' key={key}>
                                <label className='mb-2 fw-bolder'>{value.label}</label>
                                <div className='col-md-4 mb-3'>
                                    <TextField size='small' className='w-100' value={dailyLineFrom?.[title]?.[key].observation} label="Observation" variant="outlined"
                                    onChange={(e)=> setLogFormDetails(title,key,"observation",e.target.value)}/>
                                </div>
                                <div className='col-md-4 mb-3'>
                                    <TextField size='small' className='w-100' value={dailyLineFrom?.[title]?.[key].remarks} label="Remarks" variant="outlined"
                                    onChange={(e)=> setLogFormDetails(title,key,"remarks",e.target.value)}/>
                                </div>
                                <div className='col-md-4 mb-3'>
                                    <TextField size='small' className='w-100' value={dailyLineFrom?.[title]?.[key].judgement} label="Judgement" variant="outlined"
                                    onChange={(e)=> setLogFormDetails(title,key,"judgement",e.target.value)}/>
                                </div>
                            </div> : null)
                            
                        ))
                    }
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

export default AccordionItem;
