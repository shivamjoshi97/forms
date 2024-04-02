import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AccordionItem from './AccordionItem';
import ViewAccordion from './ViewAccordion';

const TimeCheckView = () => {
  let { auditid } = useParams();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/getsingleaudit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ auditid })
        });
        const resultdata = await res.json();
        setFormData(resultdata.Time_Check);
        console.log(resultdata.Time_Check);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [auditid]);

  return (
    <div>
        {formData ? Object.entries(formData).map(([key, value], index) => (
            key !== "_id" ? <ViewAccordion key={key} title={key} content={value} accordionindex={index} /> : null
        )) : null}
    </div>
  );
}

export default TimeCheckView;
