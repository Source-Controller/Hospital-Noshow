import React from "react";
import TableForm from "../elements/tables/tableForm";

const Apointments = ({ apointData, filter }) => {
  const column = [
    { Header: "pat_name", accessor: "pat_name" },
    { Header: "appt_made_dttm", accessor: "appt_made_dttm" },
    { Header: "appt_made_date", accessor: "appt_made_date" },
    { Header: "appt_status_name", accessor: "appt_status_name" },
    { Header: "department_name", accessor: "department_name" },
    { Header: "dept_specialty_name", accessor: "dept_specialty_name" },
  ];

  const title = "Apointment Information";

  const filteredData = filter.toLowerCase() === "all" ? apointData : apointData.filter(item => item.dept_specialty_name.toLowerCase() === filter.toLowerCase());

  return (
    <>
      <TableForm
        column_data={column}
        data={filteredData}
        table_title={title}
        font={20}
      />
    </>
  );
};

export default Apointments;
