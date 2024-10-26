import { Avatar, Box, Card, CardHeader, Chip, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Create, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { deleteFoodAction, getMenuItemsByRestaurantId } from '../../component/State/Menu/Action';
import { useDispatch, useSelector } from 'react-redux';

export const MenuTable = () => {
  const dispatch = useDispatch()
  const restaurant = useSelector(state => state.restaurant)
  const ingredients = useSelector(state => state.ingredients)
  const menu = useSelector(state => state.menu)
  const jwt = localStorage.getItem("jwt")
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMenuItemsByRestaurantId({
      restaurantId: restaurant.usersRestaurant.id,
      jwt: jwt
    }))
  }, [])
  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodAction({ foodId, jwt }))
  }
  console.log("Menu....", menu)
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
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Ảnh</TableCell>
                <TableCell align="right">Món ăn</TableCell>
                <TableCell align="center">Nguyên liệu</TableCell>
                <TableCell align="right">Giá</TableCell>
                <TableCell align="right">Tồn kho</TableCell>
                <TableCell align="right">Xóa</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.menuItems.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    <Avatar src={item.images[0]} sx={{ width: "100px", height: "100px" }}></Avatar>
                  </TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="center">
                    {item.ingredients.map((ingredient) => <Chip label={ingredient.name} />)}
                  </TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">{item.available ? "Có hàng" : "Hết hàng"}</TableCell>

                  <TableCell align="right">
                    <IconButton color='primary' onClick={() => handleDeleteFood(item.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}
