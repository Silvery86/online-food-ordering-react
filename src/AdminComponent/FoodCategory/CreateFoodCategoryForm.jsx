import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCategoryAction } from '../../component/State/Restaurant/Action'
import { useTheme } from '@emotion/react'

export const CreateFoodCategoryForm = () => {
    const theme = useTheme()
    const restaurant = useSelector(state => state.restaurant)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({ categoryName: "", restaurantId: "" })
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: formData.categoryName,
            restaurantId: {
                id: 1,
            }
        }
        console.log("Data:", data)
        dispatch(createCategoryAction({
            reqData: data,
            jwt: localStorage.getItem("jwt")
        }))
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        })
    }
    return (
        <div className=''>
            <div className='p-5'>
                <h1 
                style={{color:theme.palette.primary.main}}
                className='text-center text-xl pb-10'>Tạo danh mục món ăn</h1>
                <form className='space-y-5' onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        id='categoryName'
                        name='categoryName'
                        label="Danh mục món ăn"
                        variant='outlined'
                        onChange={handleInputChange}
                        value={formData.categoryName}
                    >
                    </TextField>
                    <Button variant='contained' type='submit' fullWidth>
                        Tạo danh mục
                    </Button>
                </form>
            </div>
        </div>
    )
}
