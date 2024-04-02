import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';

const ViewAccordion = ({ title, content, accordionindex }) => {
  const expand = accordionindex === 0 ? true : false;
  const headermapping = {
    Work_Station:"Work Station",
    Part_Product:"Part Product",
    Process:"Process",
    Voice_of_the_customer:"Voice of the customer",
  };
  return (
    <Accordion defaultExpanded={expand}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`Accordin_Time_Check_${title}`}>
        <h4 className='fw-bolder'>{headermapping[title]}</h4>
      </AccordionSummary>
      <AccordionDetails>
          {Object.entries(content).map(([key, value]) => (
            <div className='row' key={key}>
                <label className="mb-3 fw-bolder">{value.label}</label>
                <div className='col-md-4 mb-3'>
                    <TextField size='small' className='w-100' disabled value={value.observation || ' '}  label="Observation" variant="outlined"/>
                </div>
                <div className='col-md-4 mb-3'>
                    <TextField size='small' className='w-100' disabled value={value.remarks || ' '}  label="Remarks" variant="outlined"/>
                </div>
                <div className='col-md-4 mb-3'>
                  {value.imageurl ? <img src={`/${value.imageurl}`} alt={value.label} /> : <div>No Image</div>}
                </div>
            </div>
          ))}
      </AccordionDetails>
    </Accordion>
  );
}

export default ViewAccordion;