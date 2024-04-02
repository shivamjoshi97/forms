import React, { useEffect, useState } from 'react'

const FormView = () => {

    const [reportData, serReportData] = useState();

    useEffect(()=>{
        async function GetFromReport()
        {
            const response = await fetch('/getreport', {
                method: 'GET',
                headers:{
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const report = await response.json();
                // console.log(report);
                // for(var i=0 ; i < report.monthlyAuditData.March.length ; i++)
                // {
                //     var currentarray = report.monthlyAuditData.March[i];
                //     currentarray.forEach(element => {
                        
                //     });
                // }
                serReportData(report.monthlyAuditData.March);
            } else {
                console.error('Error:', response.statusText);
            }
        }

        GetFromReport();
    },[])

    function sumTextfieldValues() {
        const resultArray = [];
    
        // Iterate through each object in the array
        reportData.forEach(obj => {
            const result = {};
            // Iterate through each key in the object
            Object.keys(obj).forEach(mainKey => {
                if (!result[mainKey]) {
                    result[mainKey] = 0;
                }

                const mainObject = obj[mainKey];
                var firstkey = Object.keys(mainObject)[0];


                if(mainObject[firstkey].textfieldvalue)
                {
                    Object.keys(mainObject).forEach(subkey =>{
                        result[mainKey] += parseFloat(mainObject[subkey].textfieldvalue || 0);
                    })
                }
                else{
                    Object.keys(mainObject).forEach(subkey =>{

                        var subObject = obj[mainKey][subkey];

                        Object.keys(subObject).forEach(lastfield =>{
                            result[mainKey] += parseFloat(mainObject[subkey][lastfield].textfieldvalue || 0);
                        })
                    })
                }
            });

            resultArray.push(result);
        });
    
        console.log(resultArray);
    }
    

  return (
    <div>
        <button onClick={sumTextfieldValues}>ShowSum</button>
        {/* <table>
            <thead>
                <tr>
                    <td>Item</td>
                    <td>Alloted Points</td>
                    <td>Score Recd</td>
                    <td>Q-1</td>
                    <td>Q-2</td>
                    <td>Q-3</td>
                    <td>Q-4</td>
                    <td>Percentage</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1. The Basic Order</td>
                </tr>
                <tr>
                    <td>1. The Basic Order</td>
                </tr>
                <tr>
                    <td>1. The Basic Order</td>
                </tr>
                <tr>
                    <td>1. The Basic Order</td>
                </tr>
                <tr>
                    <td>1. The Basic Order</td>
                </tr>
                <tr>
                    <td>1. The Basic Order</td>
                </tr>
                <tr>
                    <td>1. The Basic Order</td>
                </tr>
            </tbody>
        </table> */}

        {/* <table>
            <thead>
                <tr>
                    <td>Jan Score</td>
                    <td>Feb Score</td>
                    <td>Mar Score</td>
                    <td>Apr Score</td>
                    <td>May Score</td>
                    <td>Jun Score</td>
                    <td>July Score</td>
                    <td>Aug Score</td>
                    <td>Sept Score</td>
                    <td>Oct Score</td>
                    <td>Nov Score</td>
                    <td>Dec Score</td>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table> */}
    </div>
  )
}

export default FormView