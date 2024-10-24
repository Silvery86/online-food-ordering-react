import { Box, Card, CardHeader, IconButton } from '@mui/material'
import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Create, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
const orders=[1,1,1,1,1]

export const MenuTable = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Card>
        <CardHeader
           action={
            <IconButton onClick={() => navigate("/admin/restaurant/add-menu")} aria-label="settings">
              <Create />
            </IconButton>
          } 
        title={"Danh sách món ăn"}
        sx={{pt:2,alignItems:"center"}}
        />
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>            
            <TableCell align="right">Ảnh</TableCell>
            <TableCell align="right">Món ăn</TableCell>
            <TableCell align="right">Nguyên liệu</TableCell>
            <TableCell align="right">Giá</TableCell>
            <TableCell align="right">Tồn kho</TableCell>
            <TableCell align="right">Xóa</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              
              <TableCell align="right"><IconButton><Delete/></IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Card>
    </Box>
  )
}
