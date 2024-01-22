import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Test = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get_table_data')
      .then(response => response.json())
      .then(data => setTableData(data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <TableContainer component={Paper} style={{ maxHeight: '100%', overflow: 'auto' }}>
      <Table aria-label="your table">
        <TableHead>
          <TableRow>
            {tableData.length > 0 &&
              tableData[0].map((header, index) => (
                <TableCell key={`header-${index}`} align="center">
                  {header}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.slice(1).map((row, rowIndex) => (
            <TableRow key={`row-${rowIndex}`}>
              {row.map((cellData, colIndex) => (
                <TableCell key={`cell-${rowIndex}-${colIndex}`} align="center">
                  {cellData}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Test;
