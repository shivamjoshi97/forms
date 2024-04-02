import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';

const FormDetails = () => {

    let { auditid } = useParams();
    const [ auditname, setAuditName] = useState();


    useEffect(()=>{
        async function GetFormDetails()
        {
            const response = await fetch('/getsingleaudit', {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({auditid})
            });
            if (response.ok) {
                var formName = await response.json();
                setAuditName(formName.audit_name);
            } else {
                console.error('Error:', response.statusText);
            }
        }

        GetFormDetails();
    },[])

    const itemDefinition = {
        textfieldvalue: '',
        imageurls: '',
        observations:''
    };

    const [formData , setFormData] = useState({
        basicorder:{
            compliance:{
                openclose:{...itemDefinition , max_marks : 1},
                prepofwork:{...itemDefinition , max_marks : 1},
                finishing:{...itemDefinition , max_marks : 1}
            },
            minimization:{
                floatingpeople:{...itemDefinition , max_marks : 1},
                visitors:{...itemDefinition , max_marks : 0.5},
                smokingarea:{...itemDefinition , max_marks : 0.5}
            },
            appearance:{
                clothappearance:{...itemDefinition , max_marks : 1},
                shoesgloves:{...itemDefinition , max_marks : 1}
            },
            workerbehavior:{
                concentration:{...itemDefinition , max_marks : 2},
                absenteeism:{...itemDefinition , max_marks : 1}
            }
        },
        cleanupsteps:{
            sortout:{
                parts:{...itemDefinition , max_marks : 1},
                tools:{...itemDefinition , max_marks : 1}
            },
            setinorder:{
                materials:{...itemDefinition , max_marks : 1},
                tools:{...itemDefinition , max_marks : 0.5},
                cleaningtools:{...itemDefinition , max_marks : 0.5},
            },
            shine:{
                equipment:{...itemDefinition , max_marks : 1},
                process:{...itemDefinition , max_marks : 1},
                interiorexterior:{...itemDefinition , max_marks : 1}
            },
            rightposition:{
                rawmaterials:{...itemDefinition , max_marks : 0.7},
                tools:{...itemDefinition , max_marks : 0.6},
            },
            rightcontainer:{
                standardized_rate:{...itemDefinition , max_marks : 1}
            },
            right_quantity:{
                material_depot:{...itemDefinition , max_marks : 1},
                line_side:{...itemDefinition , max_marks : 1}
            },
            status_board:{
                production:{...itemDefinition , max_marks : 0.5},
                quality:{...itemDefinition , max_marks : 0.5}
            },
            stack_height:{...itemDefinition , max_marks : 1},
            warning_lights:{...itemDefinition , max_marks : 1}
        },
        manufacturing:{
            products_handling:{...itemDefinition , max_marks : 3},
            work_standards:{...itemDefinition , max_marks : 2},
            torque_managment:{...itemDefinition , max_marks : 2},
            multi_skilling:{...itemDefinition , max_marks : 3}
        },
        equipment_maintenance:{
            issue_improvement:{
                identification:{...itemDefinition , max_marks : 1.5},
                observation:{...itemDefinition , max_marks : 1},
                contamination_source:{...itemDefinition , max_marks : 1.5}
            },
            my_machine:{
                cleaning:{...itemDefinition , max_marks : 2},
                ownership:{...itemDefinition , max_marks : 1}
            },
            improvement:{
                macine_performance:{...itemDefinition , max_marks : 1},
                machine_visual:{...itemDefinition , max_marks : 1},
                cleaning_tools:{...itemDefinition , max_marks : 1}
            }
        },
        smt:{
            temprature_control:{...itemDefinition , max_marks : 1},
            msl_control:{...itemDefinition , max_marks : 1},
            reel_materials_control:{...itemDefinition , max_marks : 1},
            sub_materials_control:{...itemDefinition , max_marks : 1},
            stencil_control:{...itemDefinition , max_marks : 1},
            screen_printer_control:{...itemDefinition , max_marks : 2},
            reflow_control:{...itemDefinition , max_marks : 1},
            magazine_control:{...itemDefinition , max_marks : 1},
            electric_iron_control:{...itemDefinition , max_marks : 1}
        },
        injection:{
            raw_material_control:{...itemDefinition , max_marks : 1},
            drying_supply_control:{...itemDefinition , max_marks : 2},
            mold_storage_control:{...itemDefinition , max_marks : 2},
            cleaning_control:{...itemDefinition , max_marks : 1},
            equipment_control:{...itemDefinition , max_marks : 3},
            saftey_control:{...itemDefinition , max_marks : 1}
        },
        press:{
            raw_material_control:{...itemDefinition , max_marks : 3},
            mold_storage_control:{...itemDefinition , max_marks : 2},
            cleaning_control:{...itemDefinition , max_marks : 1},
            equipment_control:{...itemDefinition , max_marks : 3},
            saftey_control:{...itemDefinition , max_marks : 1}
        },
        warehouse:{
            materail:{
                managment:{...itemDefinition , max_marks : 1},
                defective_stock:{...itemDefinition , max_marks : 1},
                location:{...itemDefinition , max_marks : 1},
                fifo:{...itemDefinition , max_marks : 1}
            },
            materail_depot:{
                managment:{...itemDefinition , max_marks : 2},
                location:{...itemDefinition , max_marks : 1},
                fifo:{...itemDefinition , max_marks : 1}
            },
            product_warehouse_managment:{
                product_keeping:{...itemDefinition , max_marks : 1},
                defective_stock:{...itemDefinition , max_marks : 1},
                location:{...itemDefinition , max_marks : 1},
                fifo:{...itemDefinition , max_marks : 1}
            }
        },
        tools:{
            self_check:{...itemDefinition , max_marks : 2},
            time_check:{...itemDefinition , max_marks : 2},
            major_process:{...itemDefinition , max_marks : 1},
            return_defects:{...itemDefinition , max_marks : 2},
            quality_review:{...itemDefinition , max_marks : 2},
            line_audit:{...itemDefinition , max_marks : 1}
        },
        esd:{
            grounding:{...itemDefinition , max_marks : 1},
            transportaion:{...itemDefinition , max_marks : 1},
            entrance:{...itemDefinition , max_marks : 1},
            wrist_strap:{...itemDefinition , max_marks : 1},
            pcba_handling:{...itemDefinition , max_marks : 1}
        }
    });

    function setLogFormDetails(mainfield, field, subfield, value,type) {
        if(type === "value")
        {
            if(field === subfield)
            {
                setFormData(prev => ({
                    ...prev,
                    [mainfield]: {
                        ...prev[mainfield],
                        [subfield]: {
                            ...prev[mainfield][field],
                            textfieldvalue: value
                        }
                    }
                }));
            }else{
                setFormData(prev => ({
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
            if(field === subfield)
            {
                setFormData(prev => ({
                    ...prev,
                    [mainfield]: {
                        ...prev[mainfield],
                        [subfield]: {
                            ...prev[mainfield][field],
                            observations: value
                        }
                    }
                }));
            }else{
                setFormData(prev => ({
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
        else{
            if(field === subfield)
            {
                setFormData(prev => ({
                    ...prev,
                    [mainfield]: {
                        ...prev[mainfield],
                        [subfield]: {
                            ...prev[mainfield][field],
                            imageurls: value
                        }
                    }
                }));
            }else{
                setFormData(prev => ({
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
        formData.append('mainfield', mainfield);
        formData.append('subfield', subfield);
        formData.append('field', field);
        formData.append('auditname',auditname);

        const response = await fetch('/saveimage', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            var filepath = await response.json();
            setLogFormDetails(mainfield,subfield,field,filepath.filePath,"image")
        } else {
            console.error('Error:', response.statusText);
        }
    }

    

    const SaveFormDetails = async () => {
        try {
            const requestData = {
                formData: formData,
                auditid: auditid,
                formname:"F_11"
            };
            const res = await fetch("/saveform",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
            },
            body:JSON.stringify(requestData)
            });
            const resultdata = await res.json();
            alert(resultdata.message);
            window.location.href = "/admin";
        } catch (error) {
            console.error('Upload failed:', error);
        }
    }
    
  return (
    <>
      <div className='d-flex gap-3'>
        <TextField disabled variant='outlined' size='medium' className='w-100' value={auditname}/>
        <Button variant="contained" style={{width:'150px'}} onClick={()=> SaveFormDetails()}>Save</Button>
      </div>
      {/* 1 */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
           <h4 className='fw-bolder'>The Basic Order</h4>
        </AccordionSummary>
        <AccordionDetails>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-1-content" id="panel1-1-header">
                <h5 className='fw-bolder'>Compliance with working hours</h5>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='d-flex flex-column gap-3'>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Compliance with opening/closing" variant="outlined" onChange={(e)=> setLogFormDetails("basicorder","compliance","openclose",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("basicorder","compliance","openclose",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("basicorder","compliance","openclose",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Preparation for work" variant="outlined"  onChange={(e)=> setLogFormDetails("basicorder","compliance","prepofwork",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="observation" variant="outlined"  onChange={(e)=> setLogFormDetails("basicorder","compliance","prepofwork",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("basicorder","compliance","prepofwork",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField id="" size='small' className='w-100' label="Finishing/Progress" variant="outlined" onChange={(e)=> setLogFormDetails("basicorder","compliance","finishing",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("basicorder","compliance","finishing",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("basicorder","compliance","finishing",e.target.files)}/>
                            </Form.Group>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-2-content" id="panel1-2-header">
                <h5 className='fw-bolder'>Minimization of floating people</h5>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='d-flex flex-column gap-3'>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Managing of floating people" variant="outlined"  onChange={(e)=> setLogFormDetails("basicorder","minimization","floatingpeople",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("basicorder","minimization","floatingpeople",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("basicorder","minimization","floatingpeople",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Managing of Visitors/Indirect workers" variant="outlined"  onChange={(e)=> setLogFormDetails("basicorder","minimization","visitors",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("basicorder","minimization","visitors",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("basicorder","minimization","visitors",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Managing of Smoking area/Lounge" variant="outlined"  onChange={(e)=> setLogFormDetails("basicorder","minimization","smokingarea",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("basicorder","minimization","smokingarea",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("basicorder","minimization","smokingarea",e.target.files)}/>
                            </Form.Group>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-3-content" id="panel1-3-header">
                <h5 className='fw-bolder'>Clothing / Appearance</h5>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='d-flex flex-column gap-3'>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Clothing/Appearance" variant="outlined"  onChange={(e)=> setLogFormDetails("basicorder","appearance","clothappearance",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("basicorder","appearance","clothappearance",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("basicorder","appearance","clothappearance",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Wearing of shoes/gloves" variant="outlined"  onChange={(e)=> setLogFormDetails("basicorder","appearance","shoesgloves",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("basicorder","appearance","shoesgloves",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("basicorder","appearance","shoesgloves",e.target.files)}/>
                            </Form.Group>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-4-content" id="panel1-4-header">
                <h5 className='fw-bolder'>Worker`s behavior</h5>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='d-flex flex-column gap-3'>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Concentration on work" variant="outlined"  onChange={(e)=> setLogFormDetails("basicorder","workerbehavior","concentration",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("basicorder","workerbehavior","concentration",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("basicorder","workerbehavior","concentration",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Absenteeism and tardiness management" variant="outlined"  onChange={(e)=> setLogFormDetails("basicorder","workerbehavior","absenteeism",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("basicorder","workerbehavior","absenteeism",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("basicorder","workerbehavior","absenteeism",e.target.files)}/>
                            </Form.Group>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </AccordionDetails>
      </Accordion>
      {/* 2 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
           <h4 className='fw-bolder'>Clean up 3 Steps</h4>
        </AccordionSummary>
        <AccordionDetails>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-1-content" id="panel1-1-header">
                <h5 className='fw-bolder'>Sort-out</h5>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='d-flex flex-column gap-3'>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField id="" size='small' className='w-100' label="Parts/materials" variant="outlined"  onChange={(e)=> setLogFormDetails("cleanupsteps","sortout","parts",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("cleanupsteps","sortout","parts",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("cleanupsteps","sortout","parts",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField id="" size='small' className='w-100' label="Tools/equipment" variant="outlined"  onChange={(e)=> setLogFormDetails("cleanupsteps","sortout","tools",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("cleanupsteps","sortout","tools",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("cleanupsteps","sortout","tools",e.target.files)}/>
                            </Form.Group>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-2-content" id="panel1-2-header">
                <h5 className='fw-bolder'>Set in order</h5>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='d-flex flex-column gap-3'>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="parts/materials" variant="outlined"  onChange={(e)=> setLogFormDetails("cleanupsteps","setinorder","materials",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("cleanupsteps","setinorder","materials",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("cleanupsteps","setinorder","materials",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="tools" variant="outlined"  onChange={(e)=> setLogFormDetails("cleanupsteps","setinorder","tools",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("cleanupsteps","setinorder","tools",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("cleanupsteps","setinorder","tools",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Cleaning tools" variant="outlined"  onChange={(e)=> setLogFormDetails("cleanupsteps","setinorder","cleaningtools",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("cleanupsteps","setinorder","cleaningtools",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("cleanupsteps","setinorder","cleaningtools",e.target.files)}/>
                            </Form.Group>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-3-content" id="panel1-3-header">
                <h5 className='fw-bolder'>Shine</h5>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='d-flex flex-column gap-3'>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="equipment" variant="outlined"  onChange={(e)=> setLogFormDetails("cleanupsteps","shine","equipment",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("cleanupsteps","shine","equipment",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("cleanupsteps","shine","equipment",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Process" variant="outlined"  onChange={(e)=> setLogFormDetails("cleanupsteps","shine","process",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("cleanupsteps","shine","process",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("cleanupsteps","shine","process",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Interior/exterior of factory/" variant="outlined"  onChange={(e)=> setLogFormDetails("cleanupsteps","shine","interiorexterior",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("cleanupsteps","shine","interiorexterior",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("cleanupsteps","shine","interiorexterior",e.target.files)}/>
                            </Form.Group>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-4-content" id="panel1-4-header">
                <h5 className='fw-bolder'>Right position</h5>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='d-flex flex-column gap-3'>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="parts/raw materials" variant="outlined"  onChange={(e)=> setLogFormDetails("cleanupsteps","rightposition","rawmaterials",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("cleanupsteps","rightposition","rawmaterials",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("cleanupsteps","rightposition","rawmaterials",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Tools" variant="outlined"  onChange={(e)=> setLogFormDetails("cleanupsteps","rightposition","tools",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("cleanupsteps","rightposition","tools",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("cleanupsteps","rightposition","tools",e.target.files)}/>
                            </Form.Group>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-4-content" id="panel1-4-header">
                <h5 className='fw-bolder'>Right container</h5>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='d-flex flex-column gap-3'>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Standardized container/standardized rate" variant="outlined"  onChange={(e)=> setLogFormDetails("cleanupsteps","rightcontainer","standardized_rate",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("cleanupsteps","rightcontainer","standardized_rate",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("cleanupsteps","rightcontainer","standardized_rate",e.target.files)}/>
                            </Form.Group>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-4-content" id="panel1-4-header">
                <h5 className='fw-bolder'>Right quantity</h5>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='d-flex flex-column gap-3'>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Material Depot WIP" variant="outlined"  onChange={(e)=> setLogFormDetails("cleanupsteps","right_quantity","material_depot",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("cleanupsteps","right_quantity","material_depot",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("cleanupsteps","right_quantity","material_depot",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Line Side WIP" variant="outlined"  onChange={(e)=> setLogFormDetails("cleanupsteps","right_quantity","line_side",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("cleanupsteps","right_quantity","line_side",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("cleanupsteps","right_quantity","line_side",e.target.files)}/>
                            </Form.Group>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion className='mb-3'>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-4-content" id="panel1-4-header">
                <h5 className='fw-bolder'>Status board</h5>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='d-flex flex-column gap-3'>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Production status board" variant="outlined"  onChange={(e)=> setLogFormDetails("cleanupsteps","status_board","production",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("cleanupsteps","status_board","production",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("cleanupsteps","status_board","production",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Quality status board" variant="outlined"  onChange={(e)=> setLogFormDetails("cleanupsteps","status_board","quality",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("cleanupsteps","status_board","quality",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("cleanupsteps","status_board","quality",e.target.files)}/>
                            </Form.Group>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            <div className='d-flex flex-column gap-3'>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField size='small' className='w-100' label="Stack height" variant="outlined"  onChange={(e)=> setLogFormDetails("cleanupsteps","stack_height","stack_height",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("cleanupsteps","stack_height","stack_height",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("cleanupsteps","stack_height","stack_height",e.target.files)}/>
                    </Form.Group>
                </div>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField size='small' className='w-100' label="Warning lights" variant="outlined"  onChange={(e)=> setLogFormDetails("cleanupsteps","warning_lights","warning_lights",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("cleanupsteps","warning_lights","warning_lights",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("cleanupsteps","warning_lights","warning_lights",e.target.files)}/>
                    </Form.Group>
                </div>
            </div>
        </AccordionDetails>
      </Accordion>
      {/* 3 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
           <h4 className='fw-bolder'>3A. Manufacturing(Assembly)</h4>
        </AccordionSummary>
        <AccordionDetails>
            <div className='d-flex flex-column gap-3'>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField id="" size='small' className='w-100' label="Parts/Products handling" variant="outlined"  onChange={(e)=> setLogFormDetails("manufacturing","products_handling","products_handling",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("manufacturing","products_handling","products_handling",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("manufacturing","products_handling","products_handling",e.target.files)}/>
                    </Form.Group>
                </div>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField id="" size='small' className='w-100' label="Work Standards" variant="outlined"  onChange={(e)=> setLogFormDetails("manufacturing","work_standards","work_standards",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("manufacturing","work_standards","work_standards",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("manufacturing","work_standards","work_standards",e.target.files)}/>
                    </Form.Group>
                </div>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField id="" size='small' className='w-100' label="Drive/Torque management" variant="outlined"  onChange={(e)=> setLogFormDetails("manufacturing","torque_managment","torque_managment",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("manufacturing","torque_managment","torque_managment",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("manufacturing","torque_managment","torque_managment",e.target.files)}/>
                    </Form.Group>
                </div>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField id="" size='small' className='w-100' label="Multi skilling" variant="outlined"  onChange={(e)=> setLogFormDetails("manufacturing","multi_skilling","multi_skilling",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("manufacturing","multi_skilling","multi_skilling",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("manufacturing","multi_skilling","multi_skilling",e.target.files)}/>
                    </Form.Group>
                </div>
            </div>
        </AccordionDetails>
      </Accordion>
      {/* 4 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
           <h4 className='fw-bolder'>4. Equipment Maintenance</h4>
        </AccordionSummary>
        <AccordionDetails>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-1-content" id="panel1-1-header">
                <h5 className='fw-bolder'>Issue improvement</h5>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='d-flex flex-column gap-3'>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField id="" size='small' className='w-100' label="Issue Identification(Tag method )" variant="outlined"  onChange={(e)=> setLogFormDetails("equipment_maintenance","issue_improvement","identification",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("equipment_maintenance","issue_improvement","identification",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("equipment_maintenance","issue_improvement","identification",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField id="" size='small' className='w-100' label="Issue Observation report" variant="outlined"  onChange={(e)=> setLogFormDetails("equipment_maintenance","issue_improvement","observation",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("equipment_maintenance","issue_improvement","observation",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("equipment_maintenance","issue_improvement","observation",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField id="" size='small' className='w-100' label="(Contamination sources-Air,water,oil,Leakages & Noise control)" variant="outlined"  onChange={(e)=> setLogFormDetails("equipment_maintenance","issue_improvement","contamination_source",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("equipment_maintenance","issue_improvement","contamination_source",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("equipment_maintenance","issue_improvement","contamination_source",e.target.files)}/>
                            </Form.Group>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-4-content" id="panel1-4-header">
                <h5 className='fw-bolder'>My Machine</h5>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='d-flex flex-column gap-3'>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Machine Cleaning" variant="outlined"  onChange={(e)=> setLogFormDetails("equipment_maintenance","my_machine","cleaning",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("equipment_maintenance","my_machine","cleaning",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("equipment_maintenance","my_machine","cleaning",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="My Machine(Operator ownership)" variant="outlined"  onChange={(e)=> setLogFormDetails("equipment_maintenance","my_machine","ownership",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("equipment_maintenance","my_machine","ownership",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("equipment_maintenance","my_machine","ownership",e.target.files)}/>
                            </Form.Group>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-4-content" id="panel1-4-header">
                <h5 className='fw-bolder'>Mc Improvement</h5>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='d-flex flex-column gap-3'>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Machine Performance (Idle Time & Process rej) Improvement" variant="outlined"  onChange={(e)=> setLogFormDetails("equipment_maintenance","improvement","macine_performance",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("equipment_maintenance","improvement","macine_performance",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("equipment_maintenance","improvement","macine_performance",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Machine Visual Management" variant="outlined"  onChange={(e)=> setLogFormDetails("equipment_maintenance","improvement","machine_visual",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("equipment_maintenance","improvement","machine_visual",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("equipment_maintenance","improvement","machine_visual",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="TPM Machine Cleaning Tools" variant="outlined"  onChange={(e)=> setLogFormDetails("equipment_maintenance","improvement","cleaning_tools",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("equipment_maintenance","improvement","cleaning_tools",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("equipment_maintenance","improvement","cleaning_tools",e.target.files)}/>
                            </Form.Group>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </AccordionDetails>
      </Accordion>
      {/* 5 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
           <h4 className='fw-bolder'>5. SMT</h4>
        </AccordionSummary>
        <AccordionDetails>
            <div className='d-flex flex-column gap-3'>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField id="" size='small' className='w-100' label="Temperature/humidity control" variant="outlined"  onChange={(e)=> setLogFormDetails("smt","temprature_control","temprature_control",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("smt","temprature_control","temprature_control",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("smt","temprature_control","temprature_control",e.target.files)}/>
                    </Form.Group>
                </div>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField id="" size='small' className='w-100' label="MSL control" variant="outlined"  onChange={(e)=> setLogFormDetails("smt","msl_control","msl_control",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("smt","msl_control","msl_control",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("smt","msl_control","msl_control",e.target.files)}/>
                    </Form.Group>
                </div>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField id="" size='small' className='w-100' label="Reel materials control" variant="outlined"  onChange={(e)=> setLogFormDetails("smt","reel_materials_control","reel_materials_control",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("smt","reel_materials_control","reel_materials_control",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("smt","reel_materials_control","reel_materials_control",e.target.files)}/>
                    </Form.Group>
                </div>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField id="" size='small' className='w-100' label="Sub-materials control" variant="outlined"  onChange={(e)=> setLogFormDetails("smt","sub_materials_control","sub_materials_control",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("smt","sub_materials_control","sub_materials_control",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("smt","sub_materials_control","sub_materials_control",e.target.files)}/>
                    </Form.Group>
                </div>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField id="" size='small' className='w-100' label="Stencil control" variant="outlined"  onChange={(e)=> setLogFormDetails("smt","stencil_control","stencil_control",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("smt","stencil_control","stencil_control",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("smt","stencil_control","stencil_control",e.target.files)}/>
                    </Form.Group>
                </div>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField id="" size='small' className='w-100' label="Screen Printer control" variant="outlined"  onChange={(e)=> setLogFormDetails("smt","screen_printer_control","screen_printer_control",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("smt","screen_printer_control","screen_printer_control",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("smt","screen_printer_control","screen_printer_control",e.target.files)}/>
                    </Form.Group>
                </div>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField id="" size='small' className='w-100' label="Reflow Profile control" variant="outlined"  onChange={(e)=> setLogFormDetails("smt","reflow_control","reflow_control",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("smt","reflow_control","reflow_control",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("smt","reflow_control","reflow_control",e.target.files)}/>
                    </Form.Group>
                </div>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField id="" size='small' className='w-100' label="Magazine control" variant="outlined"  onChange={(e)=> setLogFormDetails("smt","magazine_control","magazine_control",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("smt","magazine_control","magazine_control",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("smt","magazine_control","magazine_control",e.target.files)}/>
                    </Form.Group>
                </div>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField id="" size='small' className='w-100' label="Electric iron control" variant="outlined"  onChange={(e)=> setLogFormDetails("smt","electric_iron_control","electric_iron_control",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("smt","electric_iron_control","electric_iron_control",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("smt","electric_iron_control","electric_iron_control",e.target.files)}/>
                    </Form.Group>
                </div>
            </div>
        </AccordionDetails>
      </Accordion>
      {/* 6 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
           <h4 className='fw-bolder'>Injection</h4>
        </AccordionSummary>
        <AccordionDetails>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-1-content" id="panel1-1-header">
                <h5 className='fw-bolder'>A. Injection</h5>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='d-flex flex-column gap-3'>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField id="" size='small' className='w-100' label="Raw material control" variant="outlined"  onChange={(e)=> setLogFormDetails("injection","raw_material_control","raw_material_control",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("injection","raw_material_control","raw_material_control",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("injection","raw_material_control","raw_material_control",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField id="" size='small' className='w-100' label="Raw material drying & supply control" variant="outlined"  onChange={(e)=> setLogFormDetails("injection","drying_supply_control","drying_supply_control",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("injection","drying_supply_control","drying_supply_control",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("injection","drying_supply_control","drying_supply_control",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField id="" size='small' className='w-100' label="Mold storage control" variant="outlined"  onChange={(e)=> setLogFormDetails("injection","mold_storage_control","mold_storage_control",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("injection","mold_storage_control","mold_storage_control",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("injection","mold_storage_control","mold_storage_control",e.target.files)}/>
                            </Form.Group>
                        </div>
                        
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField id="" size='small' className='w-100' label="Mold repairing/cleaning control" variant="outlined"  onChange={(e)=> setLogFormDetails("injection","cleaning_control","cleaning_control",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("injection","cleaning_control","cleaning_control",e.target.value,"observation")} />
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("injection","cleaning_control","cleaning_control",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField id="" size='small' className='w-100' label="Mold Equipment control" variant="outlined"  onChange={(e)=> setLogFormDetails("injection","equipment_control","equipment_control",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("injection","equipment_control","equipment_control",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("injection","equipment_control","equipment_control",e.target.files)}/>
                            </Form.Group>
                            <input type='file' className='form-control w-100' />
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField id="" size='small' className='w-100' label="Safety control" variant="outlined"  onChange={(e)=> setLogFormDetails("injection","saftey_control","saftey_control",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("injection","saftey_control","saftey_control",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("injection","saftey_control","saftey_control",e.target.files)}/>
                            </Form.Group>
                            <input type='file' className='form-control w-100'/>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-4-content" id="panel1-4-header">
                <h5 className='fw-bolder'>B. Press</h5>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='d-flex flex-column gap-3'>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Raw material control" variant="outlined"  onChange={(e)=> setLogFormDetails("press","raw_material_control","raw_material_control",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("press","raw_material_control","raw_material_control",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("press","raw_material_control","raw_material_control",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Mold storage control" variant="outlined"  onChange={(e)=> setLogFormDetails("press","mold_storage_control","mold_storage_control",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("press","mold_storage_control","mold_storage_control",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("press","mold_storage_control","mold_storage_control",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Mold repairing/cleaning control" variant="outlined"  onChange={(e)=> setLogFormDetails("press","cleaning_control","cleaning_control",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("press","cleaning_control","cleaning_control",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("press","cleaning_control","cleaning_control",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Equipment Control " variant="outlined"  onChange={(e)=> setLogFormDetails("press","equipment_control","equipment_control",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("press","equipment_control","equipment_control",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("press","equipment_control","equipment_control",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Safety control" variant="outlined"  onChange={(e)=> setLogFormDetails("press","saftey_control","saftey_control",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("press","saftey_control","saftey_control",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("press","saftey_control","saftey_control",e.target.files)}/>
                            </Form.Group>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </AccordionDetails>
      </Accordion>
      {/* 7 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
           <h4 className='fw-bolder'>7. Warehouse</h4>
        </AccordionSummary>
        <AccordionDetails>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-1-content" id="panel1-1-header">
                <h5 className='fw-bolder'>Material warehouse</h5>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='d-flex flex-column gap-3'>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField id="" size='small' className='w-100' label="Materials Management" variant="outlined"  onChange={(e)=> setLogFormDetails("warehouse","materail","managment",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("warehouse","materail","managment",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("warehouse","materail","managment",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField id="" size='small' className='w-100' label="Defective stock" variant="outlined"  onChange={(e)=> setLogFormDetails("warehouse","materail","defective_stock",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("warehouse","materail","defective_stock",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("warehouse","materail","defective_stock",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField id="" size='small' className='w-100' label="Location Mgt" variant="outlined"  onChange={(e)=> setLogFormDetails("warehouse","materail","location",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("warehouse","materail","location",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("warehouse","materail","location",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField id="" size='small' className='w-100' label="FIFO" variant="outlined"  onChange={(e)=> setLogFormDetails("warehouse","materail","fifo",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("warehouse","materail","fifo",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("warehouse","materail","fifo",e.target.files)}/>
                            </Form.Group>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-4-content" id="panel1-4-header">
                <h5 className='fw-bolder'>Material  Depot</h5>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='d-flex flex-column gap-3'>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Materials Depot Management" variant="outlined"  onChange={(e)=> setLogFormDetails("warehouse","materail_depot","managment",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("warehouse","materail_depot","managment",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("warehouse","materail_depot","managment",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Location Management" variant="outlined"  onChange={(e)=> setLogFormDetails("warehouse","materail_depot","location",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("warehouse","materail_depot","location",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("warehouse","materail_depot","location",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="FIFO" variant="outlined"  onChange={(e)=> setLogFormDetails("warehouse","materail_depot","fifo",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("warehouse","materail_depot","fifo",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("warehouse","materail_depot","fifo",e.target.files)}/>
                            </Form.Group>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-4-content" id="panel1-4-header">
                <h5 className='fw-bolder'>Product warehouse management</h5>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='d-flex flex-column gap-3'>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Products in/out Management" variant="outlined"  onChange={(e)=> setLogFormDetails("warehouse","product_warehouse_managment","in_out",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("warehouse","product_warehouse_managment","in_out",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("warehouse","product_warehouse_managment","in_out",e.target.files)}/>
                            </Form.Group>
                        </div>
                        <div className="flex-column gap-3 d-flex flex-lg-row">
                            <TextField size='small' className='w-100' label="Products keeping Management, Defective stock, Location management, FIFO" variant="outlined"  onChange={(e)=> setLogFormDetails("warehouse","product_warehouse_managment","",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                            <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("warehouse","product_warehouse_managment","",e.target.value,"observation")}/>
                            <Form.Group controlId="formFile" className='w-100'>
                                <Form.Control type="file" onChange={(e)=> setLogFormImages("warehouse","product_warehouse_managment","",e.target.files)}/>
                            </Form.Group>
                        </div>
                        {/* need to be add */}
                    </div>
                </AccordionDetails>
            </Accordion>
        </AccordionDetails>
      </Accordion>
      {/* 8 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
           <h4 className='fw-bolder'>8.6 Tools</h4>
        </AccordionSummary>
        <AccordionDetails>
            <div className='d-flex flex-column gap-3'>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField id="" size='small' className='w-100' label="Self/Successive Check" variant="outlined"  onChange={(e)=> setLogFormDetails("tools","self_check","self_check",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("tools","self_check","self_check",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("tools","self_check","self_check",e.target.files)}/>
                    </Form.Group>
                </div>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField id="" size='small' className='w-100' label="Time/Spec. Check" variant="outlined"  onChange={(e)=> setLogFormDetails("tools","time_check","time_check",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("tools","time_check","time_check",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("tools","time_check","time_check",e.target.files)}/>
                    </Form.Group>
                </div>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField id="" size='small' className='w-100' label="Major Process Control" variant="outlined"  onChange={(e)=> setLogFormDetails("tools","major_process","major_process",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("tools","major_process","major_process",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("tools","major_process","major_process",e.target.files)}/>
                    </Form.Group>
                </div>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField id="" size='small' className='w-100' label="Return Defects" variant="outlined"  onChange={(e)=> setLogFormDetails("tools","return_defects","return_defects",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("tools","return_defects","return_defects",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("tools","return_defects","return_defects",e.target.files)}/>
                    </Form.Group>
                </div>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField id="" size='small' className='w-100' label="Quality Review Meeting" variant="outlined"  onChange={(e)=> setLogFormDetails("tools","quality_review","quality_review",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("tools","quality_review","quality_review",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("tools","quality_review","quality_review",e.target.files)}/>
                    </Form.Group>
                </div>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField id="" size='small' className='w-100' label="Line Audit" variant="outlined"  onChange={(e)=> setLogFormDetails("tools","line_audit","line_audit",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("tools","line_audit","line_audit",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("tools","line_audit","line_audit",e.target.files)}/>
                    </Form.Group>
                </div>
            </div>
        </AccordionDetails>
      </Accordion>
      {/* 9 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
           <h4 className='fw-bolder'>9. ESD</h4>
        </AccordionSummary>
        <AccordionDetails>
            <div className='d-flex flex-column gap-3'>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField id="" size='small' className='w-100' label="Grounding" variant="outlined"  onChange={(e)=> setLogFormDetails("esd","grounding","grounding",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("esd","grounding","grounding",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("esd","grounding","grounding",e.target.files)}/>
                    </Form.Group>
                </div>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField id="" size='small' className='w-100' label="Transportation electrostatic measures" variant="outlined"  onChange={(e)=> setLogFormDetails("esd","transportaion","transportaion",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("esd","transportaion","transportaion",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("esd","transportaion","transportaion",e.target.files)}/>
                    </Form.Group>
                </div>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField id="" size='small' className='w-100' label="Entrance / Exit electrostatic measures" variant="outlined"  onChange={(e)=> setLogFormDetails("esd","entrance","entrance",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("esd","entrance","entrance",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("esd","entrance","entrance",e.target.files)}/>
                    </Form.Group>
                </div>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField id="" size='small' className='w-100' label="Wrist Strap management" variant="outlined"  onChange={(e)=> setLogFormDetails("esd","wrist_strap","wrist_strap",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("esd","wrist_strap","wrist_strap",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("esd","wrist_strap","wrist_strap",e.target.files)}/>
                    </Form.Group>
                </div>
                <div className="flex-column gap-3 d-flex flex-lg-row">
                    <TextField id="" size='small' className='w-100' label="PCBA handling management" variant="outlined"  onChange={(e)=> setLogFormDetails("esd","pcba_handling","pcba_handling",e.target.value,"value")} helperText="Maximum allowable value: 1"/>
                    <TextField size='small' className='w-100' label="Observations" variant="outlined" onChange={(e)=> setLogFormDetails("esd","pcba_handling","pcba_handling",e.target.value,"observation")}/>
                    <Form.Group controlId="formFile" className='w-100'>
                        <Form.Control type="file" onChange={(e)=> setLogFormImages("esd","pcba_handling","pcba_handling",e.target.files)}/>
                    </Form.Group>
                </div>
            </div>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default FormDetails