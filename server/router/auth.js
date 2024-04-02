const express = require('express');
const Audit = require("../modles/AuditSchema")
const Template = require("../modles/TemplateSchema");
const TemplateDetails = require("../modles/TemplateForm")
const FormUser = require("../modles/AppUserSchema")
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");

const upload = multer();
const router = express.Router();


router.use(cookieParser());

// Handle file upload
// router.post('/upload', upload.array('file') , async (req, res) => {
//     const files = req.files;
//     console.log(files);
//     res.status(200).json({ message: "Uploaded"});
//     // try {
//     //   const updatedData = await uploadFilesToS3(files);
//     //   res.json({ success: true, updatedData });
//     // } catch (error) {
//     //   console.error('Upload failed:', error);
//     //   res.status(500).json({ success: false, error: 'Upload failed' });
//     // }
// });

//create services
// router.post('/saveform',upload.none(), async (req,res)=>
router.post('/saveform', async (req,res)=>
{
    try
    {
        const { formData, auditid, formname } = req.body;

        const audit = await Audit.findById(auditid);

        if (!audit) {
          return res.status(404).json({ error: 'Form not found' });
        }

        if(formname === "First_Five")
        {
          audit.First_Five = formData;
        }else if(formname === "Time_Check")
        {
          audit.Time_Check = formData
        }else if(formname === "Daily_Process")
        {
          audit.Daily_Process = formData
        }else if(formname === "Daily_Line")
        {
          audit.Daily_Line = formData
        }else if(formname === "F_11"){
          audit.F_11 = formData
        }
        // Save the updated document
        await audit.save();
        
        res.status(200).json({message:"Details Added Sucessfully"});
    }catch(err){
        console.log(err);
    }
});

//Create Audit
router.post('/createaudit' , async (req, res) => {
    try {
        const {audit_name , FormType} = req.body;

        const existingAudit = await Audit.findOne({ audit_name });

        if(existingAudit)
        {
          return res.status(500).json({ message: "Audit name already exists in the database"});
        }
        //Save Audit NAme in Database
        const AuditDetails = new Audit({
            audit_name:audit_name,
            FormName:FormType
        });

        await AuditDetails.save();
        
        //Create Main Folder
        // const dynamicFolderPath = path.join('./images', audit_name);
        // if (!fs.existsSync(dynamicFolderPath)) {
        //     fs.mkdirSync(dynamicFolderPath);
        // }

        res.status(200).json({message:"Details Added Sucessfully",AuditDetails});
    } catch (error) {
        console.error('Upload failed:', error);
        res.status(500).json({ message: error });
    }
});


router.get('/getallaudit' , async (req, res) => {
    try {
      const audits = await Audit.find({},{ audit_name: 1, F_11: 1, First_Five: 1, Time_Check: 1, Daily_Line: 1, Daily_Process: 1, _id: 1,FormName:1 });
      // const audits = await Audit.find({});
      const modifiedAudits = audits.map(audit => ({
          _id:audit._id,
          audit_name: audit.audit_name,
          form_name:audit.FormName,
          other_keys: Object.keys(audit.toObject()).filter(key => key !== 'audit_name' && key !== "_id" && key !== "FormName")
      }));
      res.json(modifiedAudits);
    } catch (error) {
        console.error('Upload failed:', error);
        res.status(500).json({ success: false, error: 'Upload failed' });
    }
});


router.post('/getsingleaudit' , async (req, res) => {
  try {
      const { auditid } = req.body; 
      let AuditDetails = await Audit.findById(auditid);
      // select('heading description icon color');
      res.status(200).json(AuditDetails);
  } catch (error) {
      console.error('Upload failed:', error);
      res.status(500).json({ success: false, error: 'Upload failed' });
  }
});


// Route to handle the file upload and other fields
// router.post('/saveimage', upload.single('file'), (req, res) => {
//   try{
//     // const { mainfield, subfield, field,auditname } = req.body; 
//     const file = req.file;

//     const filename = file.originalname.replace(/\s+/g, '_');

//     const filePath = path.join('../client/public/images', file.originalname);

//     fs.writeFileSync(filePath, file.buffer);
    
//     res.status(200).json({filePath:file.originalname});
//   }catch (error) {
//     console.error('Upload failed:', error);
//     res.status(500).json({ success: false, error: 'Upload failed' });
//   }
// });

router.post('/saveimage', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const file = req.file;
    const filename = file.originalname.replace(/\s+/g, '_');
    const filePath = path.join('../client/public/images', filename);

    // Check if the file already exists
    if (fs.existsSync(filePath)) {
      return res.status(200).json({filePath: filename});
    }

    // Save the file
    fs.writeFileSync(filePath, file.buffer);
    res.status(200).json({ filePath: filename });
  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).json({ success: false, error: 'Upload failed' });
  }
});

// Route to handle the Excel file 
router.get('/generateexcel', async (req, res) => {
  try {

    const AuditDetails = await Audit.findById("6602dc7ecce9d66e7a864e1a").select('F_11');

    const object_sheet_mapping = {
      "basicorder":"Basic Order ",
      "cleanupsteps":"Clean up 3 step ",
      "manufacturing":"Mfg,Assembly",
      "equipment_maintenance":"Equipment, Maintenance",
      "warehouse":"Warehouse",
      "tools":"6 Tool"
    }
    // console.log(AuditDetails);
    if (AuditDetails) {
      const templateFilePath = './ReportingFormat.xls';
      const existingWorkbook = XLSX.readFile(templateFilePath, {cellStyles: true });
      // const existingWorkbook = XLSX.readFile(templateFilePath, {cellStyles: true });
      const data = AuditDetails.F_11.toObject();
      // Get the worksheet
      const result = {};
      // Iterate through each key in the object
      Object.keys(data).forEach(mainKey => {
          if(mainKey !== "_id")
          {
            if (!result[mainKey]) {
                result[mainKey] = [];
            }

            const mainObject = data[mainKey];
            var firstkey = Object.keys(mainObject)[0];


            if(mainObject[firstkey].textfieldvalue)
            {
                Object.keys(mainObject).forEach(subkey =>{
                  result[mainKey].push(mainObject[subkey].observations || "");
                })
            }
            else{
                Object.keys(mainObject).forEach(subkey =>{

                    var subObject = data[mainKey][subkey];

                    Object.keys(subObject).forEach(lastfield =>{
                        result[mainKey].push(mainObject[subkey][lastfield].observations || "");
                    })
                })
            }
          }
      });

      // Copy formatting from the original sheet to the new sheet
      // Object.keys(object_sheet_mapping).forEach((key, value) => {
      //   const sheetName = object_sheet_mapping[key];
      //   const originalWorksheet = existingWorkbook.Sheets[sheetName];
      //   const newWorksheet = XLSX.utils.clone(originalWorksheet);

      //   // Copy each cell's formatting from the original sheet to the new sheet
      //   for (const cellAddress in originalWorksheet) {
      //       if (originalWorksheet.hasOwnProperty(cellAddress)) {
      //           if (!newWorksheet[cellAddress]) {
      //               newWorksheet[cellAddress] = {};
      //           }
      //           newWorksheet[cellAddress].s = originalWorksheet[cellAddress].s;
      //       }
      //   }

      //   result[key].forEach((reskey, index) => {
      //       const rowIndex = index + 5;
      //       newWorksheet[`A${rowIndex}`] = { t: 's', v: `${index + 1}` };
      //       newWorksheet[`B${rowIndex}`] = { t: 's', v: reskey };
      //   });
      //   // Assign the new worksheet back to the existing workbook
      //   existingWorkbook.Sheets[sheetName] = newWorksheet;
      // }); 


      //only data
      Object.keys(object_sheet_mapping).forEach((key)=>{
        const sheetName = object_sheet_mapping[key];
        const worksheet = existingWorkbook.Sheets[sheetName];

        const cellA = worksheet['A1'];
        
        console.log("before",cellA);
        cellA.s = { 
          patternType: 'solid',
          fontSize: 15,
          bold: true, 
          bgColor: { rgb: 'FFCCFFCC'} 
        };

        console.log("After",cellA);
        // console.log(cellA);
        // for (let rowIndex = 1; rowIndex <= 4; rowIndex++) {
        //   const range = `A${rowIndex}:Z${rowIndex}`; // Assuming the row spans columns A to Z
        //   const row = XLSX.utils.decode_range(range).s.r; // Get the row index from the range
  
        //   // Apply font size, font weight, and background color to the entire row
        //   for (let colIndex = 0; colIndex < 26; colIndex++) { // Assuming 26 columns (A-Z)
        //       const cellAddress = XLSX.utils.encode_cell({ r: row, c: colIndex }); // Get the cell address
        //       const cell = worksheet[cellAddress]; // Get the cell
        //       if (cell) {
        //           cell.s = { fontSize: 15, bold: true, bgFill: { fgColor: { rgb: 'FFCCFFCC' } } }; // Apply formatting
        //       }
        //   }
        // }

        result[key].forEach((reskey,index) =>{
          const rowIndex = index + 5;
          worksheet[`A${rowIndex}`] = { t: 's', v: `${index+1}` };
          worksheet[`B${rowIndex}`] = { t: 's', v: reskey };
        });
      });

      // temporary file path
      const tempFilePath = 'temp.xlsx';

      XLSX.writeFile(existingWorkbook, tempFilePath);

      res.status(200).send({ message: 'Excel file generated successfully'});
      // // const templateFilePath = './MAIL_Reporting_Format.xlsx';
      // const templateFilePath = './ReportingFormat.xlsx';
      // const existingWorkbook = XLSX.readFile(templateFilePath);
      // const data = AuditDetails.toObject();

      // // Get the worksheet
      // const sheetName = 'demo';
      // const worksheet = existingWorkbook.Sheets[sheetName];
  
      // // Specify the cell addresses for writing data
      // const cellAddresses = {
      //     // 'S.No.': 1,
      //     'Demo': "data.observations"
      //     // 'C2': data.observation
      //     // Add more cell addresses if needed
      // };
  
      // // Write data to specified cells
      // Object.keys(cellAddresses).forEach(address => {
      //     worksheet[address] = { t: 's', v: cellAddresses[address] };
      // });
  
      // // Write the modified workbook to a buffer
      // const buffer = XLSX.write(existingWorkbook, { type: 'buffer', bookType: 'xls' });
  
      // res.status(200).send({ message: 'Excel file generated successfully', buffer });
    } else {
        res.status(404).send({ message: 'Audit not found' });
    }

      //send it in buffer
      // // Convert JSON data to worksheet
      // const worksheet = XLSX.utils.json_to_sheet(AuditDetails);

      // // Create a workbook
      // const workbook = XLSX.utils.book_new();

      // // Add the worksheet to the workbook
      // XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      // // Write the workbook to a buffer
      // const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

      // // Set response headers
      // res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
      // res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

      // // Send the Excel file as a response
      // res.send(buffer);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to handle the Excel file 
router.get('/getreport', async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1); 
    const endDate = new Date(currentYear, 11, 31, 23, 59, 59); 

    // Find audits within the date range
    const auditsByMonth = await Audit.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: { $month: '$date' },
          audits: { $push: '$F_11' }
        }
      }
    ]);

    // Construct response object with month-wise audit data
    const monthlyAuditData = {};
    auditsByMonth.forEach(month => {
      const monthName = new Date(2000, month._id - 1, 1).toLocaleString('default', { month: 'long' });
      monthlyAuditData[monthName] = month.audits;
    });

    if (monthlyAuditData) {
        res.status(200).send({monthlyAuditData});
    } else {
        res.status(404).send({ message: 'No Audit found' });
    }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Route to handle the file upload and other fields
router.post('/createtemplate', async (req, res) => {
  try{
    const { allheaders , tempname ,templateid } = req.body;

    if(templateid)
    {
      const template_detail = await Template.findById(templateid);

      template_detail.header_details =  allheaders
      template_detail.template_name = tempname

      await template_detail.save();

      res.status(200).json({message:"Edit Sucessfull"});
    }else{

      const newtemplate = new Template({
        template_name: tempname,
        header_details:allheaders
      });

      await newtemplate.save();
      res.status(200).json({message:"Carete Sucessfull"});
    }
  }catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Upload failed' });
  }
});

// Route to get custom template
router.post('/gettemplate', async (req, res) => {
  try{
    const { templateid } = req.body;

    if(!templateid)
    {
      res.status(500).json({message:"Template Not fFound"});
      return;
    }
    const TemplateDetails = await Template.findById(templateid);
    res.status(200).json({TemplateDetails});
  }catch (error) {
    res.status(500).json({ success: false, error: 'Upload failed' });
  }
});

// Route to save custom template
router.post('/savecustomform', async (req, res) => {
  try{
    const { formData,auditname,templatename } = req.body;

    const newtemplateform = new TemplateDetails({
      template_detail: formData,
      auditname:auditname,
      templatename:templatename
    });
    await newtemplateform.save();
    res.status(200).json({message:"Details Saved Sucessfull",newtemplateform});
  }catch (error) {
    res.status(500).json({ success: false, error: 'Upload failed' });
  }
});

// Route to get all custom template
router.get('/getalltemplates', async (req, res) => {
  try{
    const alltemplates = await Template.find({}).select('_id date template_name');
    res.status(200).json({alltemplates});
  }catch (error) {
    res.status(500).json({ success: false, error: 'Upload failed' });
  }
});

// Route to edit template
router.get('/viewtemplate/:templateid', async (req, res) => {
  try{

    const { templateid } = req.params;

    const alltemplates = await Template.findById(templateid).select('template_name header_details');

    res.status(200).json({alltemplates});
  }catch (error) {
    res.status(500).json({ success: false, error: 'Upload failed' });
  }
});

//all custom audit
router.get('/getallcustomaudit', async (req, res) => {
  try{

    const allcustomaudits = await TemplateDetails.find({}).select("templatename auditname _id");

    res.status(200).json({allcustomaudits});
    
  }catch (error) {
    res.status(500).json({ success: false, error: 'Upload failed' });
  }
});

//get sungle custom audit
router.post('/getsinglecustomaudit', async (req, res) => {
  try{

    const { auditID } = req.body;

    const customaudit = await TemplateDetails.findById(auditID);

    res.status(200).json({customaudit});
    
  }catch (error) {
    res.status(500).json({ success: false, error: 'Upload failed' });
  }
});

// Route to delete template
router.delete('/deletetemplate/:templateid', async (req, res) => {
  try {
    const { templateid } = req.params;
    const deletedTemplate = await Template.findByIdAndDelete(templateid);
    
    if (!deletedTemplate) {
      return res.status(404).json({ success: false, error: 'Template not found' });
    }

    res.status(200).json({ success: true, message: 'Template deleted successfully' });
  } catch (error) {
    console.error('Error deleting template:', error);
    res.status(500).json({ success: false, error: 'Failed to delete template' });
  }
});

// Route to delete Audit
router.delete('/deleteaudit/:auditID', async (req, res) => {
  try {
    const { auditID } = req.params;
    const deletedAudit = await Audit.findByIdAndDelete(auditID);
    
    if (!deletedAudit) {
      return res.status(404).json({ success: false, error: 'Template not found' });
    }

    res.status(200).json({ success: true, message: 'Template deleted successfully' });
  } catch (error) {
    console.error('Error deleting template:', error);
    res.status(500).json({ success: false, error: 'Failed to delete template' });
  }
});

//-------------------------------------------------------------------- Login Routes(Auth Routes) --------------------------------------------
//validation
const private = async (req, res, next)=>{
  try
  {
      const token = req.cookies.jwtoken;
      if (!token) {
          return res.status(401).send(`Unauthorized: No token found`);
      }
      const valid = jwt.verify(token, process.env.SKEY);
      const rootUser = await FormUser.findOne({ _id: valid._id, "tokens.token": token }).select('admin');
      if (!rootUser) {
          return res.status(401).send(`Unauthorized: Not a valid user`);
      }
      req.rootUser=rootUser.admin;
      next();
  }
  catch(err)
  {
      res.status(401).send(`Unauthorised:No token Found`);
      console.log(err);
  }
}


router.get('/getauthuser',private, async (req,res)=>
{
  const IsAdmin = req.rootUser;
  if(!IsAdmin){
    res.status(200).send({message:"User Authorised",IsAdmin});
  }
});

router.get('/getauthadmin',private, async (req,res)=>
{
  const IsAdmin = req.rootUser;
  if(IsAdmin)
  {
    res.status(200).send({message:"User Authorised",IsAdmin});
  }
  else{
    res.status(201).send({message:"User Authorised",IsAdmin});
  }
  
});
//login route

router.post('/login', async (req,res)=>{ 
  try{
  const {email,password}=req.body;

  if(!email || !password){
      return res.status(400).json({error:"400"});
  }

  const validuser = await FormUser.findOne({name:email});

  console.log(validuser);
  if(validuser){
      const match = await bcrypt.compare(password,validuser.password);

      // generate token
      const token = await validuser.generateAuthToken();
      //read token
      res.cookie("jwtoken", token ,  {
          expires:new Date(Date.now() + 2589000000),
          httpOnly:true
      });
      if(!match){
          res.status(400).json({error:"401"});
      }else{
          res.json({error:"Login Sucessfull"});
      }
  }else{
      res.status(400).json({error:"402"});
  }
}catch(err){
      console.log(err);
  }
});

// router.post('/register', async (req,res)=>{ 
//   try{
//   const {name,password}=req.body;

//   if(!name || !password){
//       return res.status(400).json({message:"Please fill the details Carefully"});
//   }else{
//       const formuser =new FormUser({
//           name:name,
//           password:password,
//           admin:false
//       });
//       await formuser.save();
//       res.status(200).json({message:"Registration Sucessfull"});
//   }
// }catch(err){
//       console.log(err);
//   }
// });


module.exports = router;
  