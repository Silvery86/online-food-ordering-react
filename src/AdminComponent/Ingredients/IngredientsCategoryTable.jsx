import { Box, Card, CardHeader, IconButton, Modal, Typography } from '@mui/material'
import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Create, Delete } from '@mui/icons-material';
import { CreateIngredientCategoryForm } from './CreateIngredientCategoryForm';
const orders=[1,1,1,1,1]
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export const IngredientsCategoryTable = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box>
      <Card>
        <CardHeader
           action={
            <IconButton onClick={handleOpen} aria-label="settings">
              <Create />
            </IconButton>
          } 
        title={"Danh mục nguyên liệu"}
        sx={{pt:2,alignItems:"center"}}
        />
        <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>            
            <TableCell align="right">Id</TableCell>
            <TableCell align="right">Dạnh mục</TableCell>          
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Card>
      <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                       <CreateIngredientCategoryForm/>
                    </Typography>
                </Box>
            </Modal>
    </Box>
  )
}
