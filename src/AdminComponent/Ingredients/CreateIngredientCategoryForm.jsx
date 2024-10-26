import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createIngredientCategory } from '../../component/State/Ingredients/Action'

export const CreateIngredientCategoryForm = () => {
    const dispatch = useDispatch()
    const restaurant = useSelector(state => state.restaurant)
    const jwt = localStorage.getItem("jwt")
    const [formData, setFormData] = useState({
        name: "",
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            name: formData.name,
            restaurantId: restaurant.usersRestaurant?.id,
        }
        dispatch(createIngredientCategory({
            jwt,
            data,
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
                <h1 className='text-gray-400 text-center text-xl pb-10'>Create Ingredient Category</h1>
                <form className='space-y-5' onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        id='name'
                        name='name'
                        label="Ingredient Category Name"
                        variant='outlined'
                        onChange={handleInputChange}
                        value={formData.name}
                    >
                    </TextField>
                    <Button variant='contained' type='submit'>
                        Create
                    </Button>
                </form>
            </div>
        </div>
    )
}
