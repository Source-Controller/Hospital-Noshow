import React from "react";
import './styles.scss'

const Patients = ({ patientData }) => {

  console.log(patientData,'patientdata')

  const headers = [
    'Name', 'Age', 'Gender', 'Birthday', 'Ethnic_Group', 
    'Marital_Status', 'Religion', 'Language', 'Contact_date'
  ];

  return (
    <div className="patients-main">
      {/* <sapn>Selected Patient Infomation</sapn> */}
      <table className="patient-table">
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {patientData && patientData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.sex}</td>
              <td>{item.birthday}</td>
              <td>{item.race}</td>
              <td>{item.ethnic_group}</td>
              <td>{item.marital_status}</td>
              <td>{item.religion}</td>
              <td>{item.language}</td>
              <td>{item.contact_date}</td>
              {/* <td>{item.department}</td>
              <td>{item.dept_specialty}</td> */}
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patients;