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
const orders = [1, 1, 1, 1, 1]

export const IngredientsTable = () => {
    return (
        <Box>
            <Card>
                <CardHeader
                    action={
                        <IconButton aria-label="settings">
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
            
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    )
}
