import React , {useContext} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AllFroms } from '../../store/AppContext';
import TextField from '@mui/material/TextField';

const AccordionItem = ({ title, content, accordionindex }) => {
    
    const { firstfiveformDetails, setFirstFiveFormDetails } = useContext(AllFroms);

    function setLogFormDetails(mainfield, field,value) {
        setFirstFiveFormDetails(prevState => ({
            ...prevState,
            [mainfield]: {
                ...prevState[mainfield],
                [field]: value
            }
        }));
    }

    const expand = accordionindex === 0 ? true : false;
    return (
        <Accordion defaultExpanded={expand}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`Accordin_Time_Check_${title}`}>
                <h4 className='fw-bolder'>{title.replace(/_/g, ' ')}</h4>
            </AccordionSummary>
            <AccordionDetails>
                <div className='d-flex flex-column gap-3'>
                    <div className='row'>
                        {
                            Object.entries(content).map(([key, value], index) => (
                                <div key={key} className='col-md-4 mb-3'>
                                    <TextField size='small' className='w-100' value={firstfiveformDetails?.[title]?.[key]} label={key === "Remarks" ? key : key.replace('_', ' ')} variant="outlined"
                                    onChange={(e)=> setLogFormDetails(title,key,e.target.value)}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

export default AccordionItem;
