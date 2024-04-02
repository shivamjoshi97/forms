import React, {useState , useEffect} from 'react'
import { useParams } from 'react-router-dom'
import ViewAccordion from './ViewAccordion';

const DailyProcessView = () => {

  const [formData, setFormData] = useState({});
  
  let { auditid } = useParams();

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
        setFormData(resultdata.Daily_Process);
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
  )
}

export default DailyProcessView