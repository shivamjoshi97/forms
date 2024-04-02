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
                value.max_marks ? (
                  <div className='row'>
                    <div className="col-md-4 mb-2">
                      <TextField size='small' className='w-100' label={value.textfieldvalue} variant="outlined" helperText={'Maximum allowable value:'+ value.max_marks}/>
                    </div>
                    <div className="col-md-4 mb-2">
                      <TextField size='small' className='w-100' label="Observations" variant="outlined" value={value.observations} disabled/>
                    </div>
                    <div className="col-md-4 mb-2">
                      {value.imageurls === "" ? <div>No Image</div> : <img src='' alt='demo'/>}
                    </div>
                  </div>
                ) : (
                  // <div>Demo</div>
                  <ViewAccordion title={key} content={value} accordionindex={index} />
                )
                )}
            </div>
          ))}
          {/* {Object.entries(content).map(([key, value], index) => (
            <div key={key}>
                {key !== "_id" && (
                value.textfieldvalue ? (
                  <div className='row'>
                    <div className="col-md-4 mb-2">
                      <TextField size='small' className='w-100' label={value.fieldlable} variant="outlined" helperText="Maximum allowable value: 1"/>
                    </div>
                    <div className="col-md-4 mb-2">
                      <TextField size='small' className='w-100' label="Observations" variant="outlined"/>
                    </div>
                    <div className="col-md-4 mb-2">
                      <img src='' alt='demo'/>
                    </div>
                  </div>
                ) : (
                  // <ViewAccordion title={key} content={value} accordionindex={index} />
                  <div>hello</div>
                )
                )}
            </div>
          ))} */}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default ViewAccordion;