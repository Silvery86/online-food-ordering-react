import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createIngredient } from '../../component/State/Ingredients/Action'

export const CreateIngredientForm = () => {
    const dispatch = useDispatch()
    const restaurant = useSelector(state => state.restaurant)
    const ingredients = useSelector(state => state.ingredients)
    const jwt = localStorage.getItem("jwt")
    const [formData,setFormData] = useState({
        name:"",
        categoryId:""
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        const data={
            ...formData,
            restaurantId : restaurant.usersRestaurant?.id,
        }
        dispatch(createIngredient({
            data,
            jwt
        }))
        console.log("Data......:",data)
     }
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,[name]:value
        })
    }
    console.log("Ingredients.....",ingredients)
    console.log("Restaurant.....",restaurant)
    return (
        <div className=''>
            <div className='p-5'>
                <h1 className='text-gray-400 text-center text-xl pb-10'>Create Category</h1>
                <form className='space-y-5' onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        id='name'
                        name='name'
                        label="Name"
                        variant='outlined'
                        onChange={handleInputChange}
                        value={formData.name}
                    >
                    </TextField>

                    <FormControl fullWidth>
                                <InputLabel id="category-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="category-simple-select-label"
                                    id="category-simple-select"
                                    value={formData.categoryId}
                                    label="Category"
                                    onChange={handleInputChange}
                                    name='categoryId'
                                >
                                    {ingredients.category.map((item) => <MenuItem value={item.id}>{item.name}</MenuItem>)}
                                    
                                   
                                </Select>
                            </FormControl>
                    <Button variant='contained' type='submit'>
                        Create
                    </Button>
                </form>
            </div>
        </div>
    )
}
