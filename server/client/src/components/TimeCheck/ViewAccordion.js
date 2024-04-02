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
        <div className='d-flex flex-column gap-3'>
          {Object.entries(content).map(([key, value], index) => (
            <div key={key}>
                {key !== "_id" && (
                typeof value === 'object' ? (
                    <ViewAccordion title={key} content={value} accordionindex={index} />
                ) : (
                    <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField size='small' className='w-100' disabled value={value || ' '}  label={key === "Remarks" ? key : key.replace('T_', '').replace('_', ' ') + " AM/PM"} variant="outlined"/>
                    </div>
                )
                )}
            </div>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default ViewAccordion;