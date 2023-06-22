import React, { useMemo, useEffect } from 'react'
import { useTable, useRowSelect, useFilters, useGlobalFilter, useBlockLayout } from 'react-table'
import { useSticky } from 'react-table-sticky'
import Data from './Data.json'
import { COLUMNS } from './columns'
import './table.css'
import { Checkbox } from './Checkbox'
import { GlobalFilter } from './GlobalFilter'


const RowSelection = ({ requests, setSelectedRows }) => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => requests.map((request) => {
    // console.log(request.floorNo);
    return {
      _id: request._id,
      id: request.email ? request.email.slice(0,11) : "",
      name: request.name,
      room_allocated: (request.roomNo ? request.roomNo.toString() + "," : "")  + (request.floorNo !== undefined ? request.floorNo.toString() + "," : "")  + request.block + "," + request.hostelName,
      status: request.tempLocked === true ? "Temp Locked" : "Not Locked",
      fileURL : request.fileURL,
      details: "View"
    }
  }), [requests]);
  
  // {
  //  _id:
  //  name: { type: String, required: true },
  // email: { type: String, required: true, unique: true },
  // phoneNo: { type: Number },
  // year: { type: Number, required: true },
  // branch: { type: String, required: true },
  // roomId: { type: mongoose.Schema.Types.ObjectId },
  // tempLocked: { type: Boolean, default: false },
  // permanentLocked: { type: Boolean, default: false },
  // transactionId: { type: String }
  // roomNo: { type: Number },
  // hostelNo: { type: Number },
  // hostelName: {type: String},
  // block: { type: String },
  // floorNo: {type: Number}
  // }

  // let data = [];
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useRowSelect,
    useSticky,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
        },
        ...columns
      ])
    }
  )

  const { globalFilter } = state

  // const firstPageRows = requests;

  useEffect(() => {
    setSelectedRows(selectedFlatRows);
  }, [selectedFlatRows])

  const handleViewDetails = async (data) => {
      console.log(data);
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
        }}
      >
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>

      <div
        style={{
          width: "75vw",
          height: "40vh",
          overflowX: "auto",
          overflowY: "auto",
        }}
      >
        <table {...getTableProps()} className="sticky">
          <thead style={{ position: 'sticky', top: '0', zIndex: '1' }}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              console.log(row);
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, idx) => {
                    if(idx === 5){
                      return (
                        <td {...cell.getCellProps()} onClick={() => handleViewDetails(row.original)}>{cell.render("Cell")}</td>
                      );
                    }
                    else{
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    }
                    
                  })}
                  {/* <td><button >View</button></td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* <pre>
        <code>
        {JSON.stringify(
          {
            selectedFlatRows: selectedFlatRows.map(row => row.original)
          },
          null,
          2
          )}
        </code>
      </pre> */}
    </>
  );
}

export default RowSelection;