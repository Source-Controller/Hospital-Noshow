import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
// import "./patientInfo.scss";

const PatientInfo = ({ data }) => {
  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "First Name", accessor: "first_name" },
      { Header: "Last Name", accessor: "last_name" },
      { Header: "Email", accessor: "email" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Address", accessor: "address" },
      { Header: "Desease", accessor: "desease" },
      { Header: "Department", accessor: "department" },
      { Header: "No-show rate", accessor: "nsRate" },
      { Header: "apointment", accessor: "apointment" },
      { Header: "apnStatus", accessor: "apnStatus" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <div className="pinfo-main">
        <span>Patients Information</span>
      <div className="table-container">

        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientInfo;
