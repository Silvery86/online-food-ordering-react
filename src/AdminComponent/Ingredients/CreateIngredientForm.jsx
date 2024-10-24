import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'

export const CreateIngredientForm = () => {
    const [formData,setFormData] = useState({
        name:"",
        ingredientCategoryId:""
    })
    const handleSubmit = () => {
        const data={
            name: formData.categoryName,
            restaurantId : {
                id: 1,
            }
        }
        console.loog("Data:",data)
     }
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,[name]:value
        })
    }
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
                                    value={formData.ingredientCategoryId}
                                    label="Category"
                                    onChange={handleInputChange}
                                    name='ingredientCategoryId'
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
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
