import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'

export const CreateIngredientCategoryForm = () => {
    const [formData, setFormData] = useState({
        name: "",
    })
    const handleSubmit = () => {
        
        console.loog("Data:", formData)
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
