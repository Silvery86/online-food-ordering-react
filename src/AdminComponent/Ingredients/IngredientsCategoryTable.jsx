import { Box, Card, CardHeader, IconButton, Modal, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Create} from '@mui/icons-material';
import { CreateIngredientCategoryForm } from './CreateIngredientCategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientCategory } from '../../component/State/Ingredients/Action';
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
  const dispatch = useDispatch()
  const restaurant = useSelector(state => state.restaurant)
  const ingredients = useSelector(state => state.ingredients)
  const jwt = localStorage.getItem("jwt")
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    dispatch(getIngredientCategory({
      jwt:jwt,
      id:restaurant.usersRestaurant?.id,
    }))
  },[jwt])
  const ingredientCategoryList = ingredients.category
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
          {ingredientCategoryList.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>           
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
