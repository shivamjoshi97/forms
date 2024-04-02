import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TextField, Button, Card, FormControlLabel, Switch } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

function CreateTemplate() {

  const location = useLocation();
  // const [isedit , setIsedit] = useState(false);
  const templateid = new URLSearchParams(location.search).get('templateid');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/viewtemplate/${templateid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const resultdata = await res.json();
        console.log(resultdata);
        setHeaders(resultdata.alltemplates.header_details);
        setTemplateName(resultdata.alltemplates.template_name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (templateid) {
      fetchData();
    }

  }, [templateid]);


  const [headerValue, setHeaderValue] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [headers, setHeaders] = useState([]);

  const handleInputChange = (event) => {
    setHeaderValue(event.target.value);
  };

  const handleTemplateChange = (event) => {
    setTemplateName(event.target.value);
  };

  const handleSaveHeader = () => {
    if (headerValue.trim() !== '') {
      const newHeader = {
        header_id: Math.random(),
        header_name: headerValue,
        header_subheading:[]
      };
      const updatedHeaders = [...headers, newHeader];
      setHeaders(updatedHeaders);
      setHeaderValue('');
    } else {
      alert('Please enter a valid header value.');
    }
  };

  const handleAddSubheading = (headerIndex) => {
    const updatedHeaders = [...headers]; 
    const headerToUpdate = updatedHeaders[headerIndex]; 
    if (headerToUpdate) {
      headerToUpdate.header_subheading.push({ name: '', Observation: false, Before_Pic: true, After_Pic: true, Target: true, Responsibility: false }); // Add the new subheading
      setHeaders(updatedHeaders); 
    }
  };
  
  const handleLabelChange = (headIndex, subheadIndex, labelName, labelvalue) => {
    setHeaders(prevHeaders => {
      const updatedHeaders = [...prevHeaders]; 
      const headerToUpdate = updatedHeaders[headIndex]; 
      if (headerToUpdate && headerToUpdate.header_subheading[subheadIndex]) {
        const subheadingToUpdate = headerToUpdate.header_subheading[subheadIndex];
        if(labelName === "name")
        {
          subheadingToUpdate[labelName] = labelvalue; 
        } else{
          subheadingToUpdate[labelName] = !subheadingToUpdate[labelName]; 
        }
      }
      return updatedHeaders; 
    });
  };

  const SaveTemplate = async ()=>{
    try {
      const requestData = {
        allheaders: headers,
        tempname: templateName,
        templateid:templateid
      };
      // console.log(requestData);
      const res = await fetch("/createtemplate",{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify(requestData)
      });
      const resultdata = await res.json();
      alert(resultdata.message);
      window.location.href = "/admin/alltemplate";
  } catch (error) {
      console.error('Upload failed front', error);
  }
  }

  return (
    <div>
      <div className='d-flex'>
        <TextField
            variant='outlined'
            size='medium'
            className='w-100'
            label="Template Name"
            value={templateName}
            onChange={handleTemplateChange}
        />
      </div>
      <div className='d-flex gap-3 mt-3'>
        <TextField
          variant='outlined'
          size='medium'
          className='w-100'
          label="Header Name"
          value={headerValue}
          onChange={handleInputChange}
        />
        <Button variant="contained" style={{width:'150px'}} onClick={handleSaveHeader}>Add Header</Button>
      </div>
      <div className='row mt-3'>
        {headers.map((header,headerindex) => (
          <div key={header.header_id} className='col-md-12 mb-3'>
            <Card variant="outlined" className='p-3'>
              <div className='d-flex flex-column gap-2'>
                <div className='d-flex gap-3'>
                  <TextField
                    variant='outlined'
                    size='medium'
                    className='w-100'
                    label="Cheque Point"
                    value={header.header_name}
                    disabled
                  />
                  <Button
                    variant="contained"
                    onClick={() => handleAddSubheading(headerindex)}>
                    <AddIcon></AddIcon>
                  </Button>
                  <Button
                    variant="contained"
                    // onClick={() => handleAddSubheading(header.header_id)}
                    >
                    <DeleteIcon></DeleteIcon>
                  </Button>
                </div>
                <div className='row mt-3'>
                  {header.header_subheading.map((subheading,subindex) =>(
                    <div key={subindex} className='col-md-4 mb-3'>
                      <Card variant="outlined" className='p-3'>
                        <div className='d-flex gap-2'>
                            <TextField
                              variant='outlined'
                              size='medium'
                              className='w-100'
                              label="Specefication"
                              value={subheading.name}
                              onChange={(e) => handleLabelChange(headerindex,subindex,'name',e.target.value)}
                            />
                            <Button
                              variant="contained"
                              // onClick={() => handleAddSubheading(header.header_id)}
                              >
                              <DeleteIcon></DeleteIcon>
                            </Button>
                        </div>
                        <div className='d-flex flex-column gap-3 mt-2'>
                          <div>
                            <FormControlLabel
                              control={<Switch checked={subheading.Observation} onChange={() => handleLabelChange(headerindex,subindex,'Observation')} />}
                              label="Observation"
                            />
                          </div>
                          <div>
                            <FormControlLabel
                              control={<Switch checked={subheading.Before_Pic} onChange={() => handleLabelChange(headerindex,subindex,'Before_Pic')} />}
                              label="Before Pic"
                            />
                          </div>
                          <div>
                            <FormControlLabel
                              control={<Switch checked={subheading.After_Pic} onChange={() => handleLabelChange(headerindex,subindex,'After_Pic')} />}
                              label="After Pic"
                            />
                          </div>
                          <div>
                            <FormControlLabel
                              control={<Switch checked={subheading.Target} onChange={() => handleLabelChange(headerindex,subindex,'Target')} />}
                              label="Target"
                            />
                          </div>
                          <div>
                            <FormControlLabel
                              control={<Switch checked={subheading.Responsibility} onChange={() => handleLabelChange(headerindex,subindex,'Responsibility')} />}
                              label="Responsibility"
                            />
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                  {/* {header.header_subheading.map((subheading, index) => (
                    <div key={index} className='col-md-4 mb-3'>
                      <Card variant="outlined" className='p-3'>
                        <h2>{subheading}</h2>
                        <div className='d-flex gap-2'>
                          <TextField
                            variant='outlined'
                            size='medium'
                            className='w-100'
                            label="Specefication"
                            value={subheading.name}
                          />
                          <Button
                            variant="contained"
                            onClick={() => handleAddSubheading(header.header_id)}>
                            <AddIcon></AddIcon>
                          </Button>
                        </div>
                        <div className='d-flex flex-column gap-3 mt-2'>
                          <div>
                            <FormControlLabel
                              control={<Switch checked={subheading.Observation} onChange={() => handleLabelChange(header.header_id, 'Observation')} />}
                              label="Observation"
                            />
                          </div>
                          <div>
                            <FormControlLabel
                              control={<Switch checked={subheading.Before_Pic} onChange={() => handleLabelChange(header.header_id, 'Before_Pic')} />}
                              label="Before Pic"
                            />
                          </div>
                          <div>
                            <FormControlLabel
                              control={<Switch checked={subheading.After_Pic} onChange={() => handleLabelChange(header.header_id, 'After_Pic')} />}
                              label="After Pic"
                            />
                          </div>
                          <div>
                            <FormControlLabel
                              control={<Switch checked={subheading.Target} onChange={() => handleLabelChange(header.header_id, 'Target')} />}
                              label="Target"
                            />
                          </div>
                          <div>
                            <FormControlLabel
                              control={<Switch checked={subheading.Responsibility} onChange={() => handleLabelChange(header.header_id, 'Responsibility')} />}
                              label="Responsibility"
                            />
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))} */}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <div className='d-flex gap-3'>
        <Button variant="contained" style={{width:'150px'}} onClick={SaveTemplate}>Save</Button>
      </div>
    </div>
  );
}

export default CreateTemplate;