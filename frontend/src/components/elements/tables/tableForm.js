import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import "./tableForm.scss";

const TableForm = ({ column_data, data, table_title, font }) => {
  const columns = useMemo(() => column_data, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <div className="info-main">
      <span>{table_title}</span>
      <div className="table-container">
        <table {...getTableProps()} style={{ fontSize: font }}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span style={{ fontSize: "20px" }}>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? "🔽"
                          : "🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows ? (
              <>
                {
                  rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                        ))}
                      </tr>
                    );
                  })
                }
              </>
            ) : (
              ''
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableForm;
