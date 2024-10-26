import { Box, Button, Card, CardHeader, IconButton, Modal, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Create } from '@mui/icons-material';
import { CreateIngredientForm } from './CreateIngredientForm';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsOfRestaurant, updateStockOfIngredient } from '../../component/State/Ingredients/Action';
const orders = [1, 1, 1, 1, 1]
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
export const IngredientsTable = () => {
    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt")
    const restaurant = useSelector(state => state.restaurant)
    const ingredients = useSelector(state => state.ingredients)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(getIngredientsOfRestaurant({
            id: restaurant.usersRestaurant.id,
            jwt
        }))
    }, [])
    const handleUpdateStoke = (id) => {
        dispatch(updateStockOfIngredient({
            id,
            jwt
        }))
    }
    const ingredientsList = ingredients.ingredients
    console.log("Ingredients......", ingredientsList)
    return (
        <Box>
            <Card>
                <CardHeader
                    action={
                        <IconButton onClick={handleOpen} aria-label="settings">
                            <Create />
                        </IconButton>
                    }
                    title={"Danh sách nguyên liệu"}
                    sx={{ pt: 2, alignItems: "center" }}
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>

                                <TableCell align="right">Id</TableCell>
                                <TableCell align="right">Nguyên liệu</TableCell>
                                <TableCell align="right">Danh mục</TableCell>
                                <TableCell align="right">Tồn kho</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ingredientsList.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.category.name}</TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => handleUpdateStoke(row.id)}>
                                            {row.inStoke ? "Tồn kho" : "Hết hàng"}
                                        </Button>
                                    </TableCell>

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
                        <CreateIngredientForm />
                    </Typography>
                </Box>
            </Modal>
        </Box>
    )
}
