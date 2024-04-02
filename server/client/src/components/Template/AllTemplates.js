import React, { useEffect, useState } from 'react'

const AllTemplates = () => {
    const [alltemplates , setAlltemplates] = useState();

    useEffect(() => {
        async function fetchData() {
        try {
            const res = await fetch("/getalltemplates", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const resultdata = await res.json();
            setAlltemplates(resultdata.alltemplates);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        }
        fetchData();
    }, []);

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const options = { day: "2-digit", month: "short", year: "numeric" };
        return new Intl.DateTimeFormat("en-US", options).format(date);
    }

    const DeleteTemplate = async (tempID) => {
        try {
          const res = await fetch(`/deletetemplate/${tempID}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
    
          if (!res.ok) {
            throw new Error('Failed to delete template');
          }
    
          const data = await res.json();
          alert(data.message);
          window.location.reload();
    
        } catch (error) {
          console.error('Error deleting template:', error);
        }
    };

  return (
    <div>
        <div className='d-flex justify-content-center mb-3'>
            <span className='fs-4 fw-bolder'>All Templates</span>
        </div>
        {alltemplates && alltemplates.map((row,rowindex) => (
            <div key={row._id} className={`row py-3 px-2`} style={{ backgroundColor: rowindex % 2 === 0 ? 'rgb(238 238 238)' : 'white' }}>
                <div className='col-md-5'>
                    <span className='fw-bolder fs-6'>{row.template_name}</span> 
                </div>
                <div className='col-md-5'>
                    <span className='fs-6'>{formatDate(row.date)}</span>
                </div>
                <div className='col-md-1'></div>
                <div className='col-md-1'>
                    <div className='d-flex gap-3 justify-content-between'>
                        <a href={'/admin/createtemplate?templateid='+ row._id} target='_blank' rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>
                        </a>
                        <div onClick={() => DeleteTemplate(row._id)} style={{cursor:'pointer'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default AllTemplates