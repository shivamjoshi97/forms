import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';

const ViewAccordion = ({ title, content, accordionindex }) => {
  const expand = accordionindex === 0 ? true : false;
  return (
    <Accordion defaultExpanded={expand}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`Accordin_Time_Check_${title}`}>
        <h4 className='fw-bolder'>{title.replace(/_/g, ' ')}</h4>
      </AccordionSummary>
      <AccordionDetails>
      <div className='row'>
        {Object.entries(content).map(([key, value]) => (
          key !== "_id" ? (
            <div className='col-md-4 mb-3' key={key}>
              <TextField size='small' className='w-100' disabled value={value || ' '}  label={key.replace(/_/g, ' ')} variant="outlined"/>
            </div>
          ) : null
        ))}
      </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default ViewAccordion;