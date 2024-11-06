import { AddPhotoAlternate, Close } from '@mui/icons-material'
import { Box, Button, Chip, CircularProgress, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { uploadImageToCloudinary } from '../util/UploadToCloudinary'
import { useDispatch, useSelector } from 'react-redux'
import { createMenuItem } from '../../component/State/Menu/Action'
import { getIngredientsOfRestaurant } from '../../component/State/Ingredients/Action'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@emotion/react'
const initialValues = {
    name: "",
    description: "",
    price: "",
    category: "",
    restaurantId: "",
    vegetarian: false,
    seasonal: false,
    ingredients: [],
    images: []
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
export const CreateMenuForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const theme = useTheme()
    const jwt = localStorage.getItem("jwt")
    const restaurant = useSelector(state => state.restaurant)
    const ingredients = useSelector(state => state.ingredients)
    const [uploadImage, setUploadImage] = useState(false)
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            values.restaurantId = restaurant.usersRestaurant.id
            dispatch(createMenuItem({
                menu: values,
                jwt,
                navigate
            }))
        }
    })
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        setUploadImage(true);
        const image = await uploadImageToCloudinary(file);
        formik.setFieldValue("images", [...formik.values.images, image]);
        setUploadImage(false);
    };
    const handleRemoveImage = (index) => {
        const updatedImages = [...formik.values.images];
        updatedImages.splice(index, 1);
        formik.setFieldValue("images", updatedImages);
    };
    useEffect(() => {
        dispatch(getIngredientsOfRestaurant({
            id: restaurant.usersRestaurant.id,
            jwt
        }))
    }, [dispatch])
    return (
        <div className='py-10 px-5 lg:flex items-center justify-center min-h-screen'>
            <div className='lg:max-w-4xl'>
                <h1
                style={{color : theme.palette.primary.main}} 
                className='font-bold text-2xl text-center py-2'>
                    Thêm món ăn
                </h1>
                <form onSubmit={formik.handleSubmit} className='space-y-4'>
                    <Grid container spacing={2}>
                        <Grid className='flex flex-wrap gap-5' item xs={12}>
                            <Typography className='font-semibold '>Ảnh món ăn:</Typography>
                            <input
                                accept='image/*'
                                id='fileInput'
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                                type='file'
                            />
                            <label className='relative' htmlFor='fileInput'>
                                <span className='w-24 h-24 cursor-pointer items-center flex justify-center p-3 border rounded-md border-gray-600'>
                                    <AddPhotoAlternate className='text-black' />
                                    {
                                        uploadImage && <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex items-center justify-center'>
                                            <CircularProgress />
                                        </div>
                                    }
                                </span>
                            </label>
                            <div className='flex flex-wrap gap-2'>
                                {formik.values.images.map((image, index) => (

                                    <div className='relative'>
                                        <img
                                            className='w-24 h-24 object-cover'
                                            key={index}
                                            src={image}
                                            alt={image}
                                        />
                                        <IconButton size='small' sx={{ position: "absolute", top: 0, right: 0, outline: "none" }} onClick={() => handleRemoveImage(index)}>
                                            <Close sx={{ fontSize: "1rem" }} />
                                        </IconButton>
                                    </div>
                                ))}
                            </div>

                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id='name'
                                name='name'
                                label="Tên món ăn"
                                variant='outlined'
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id='description'
                                name='description'
                                label="Mô tả"
                                variant='outlined'
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12} lg={6}>                           
                            <FormControl fullWidth>
                                <InputLabel htmlFor="price-adornment-amount">Giá</InputLabel>
                                <OutlinedInput
                                    id="price-adornment-amount"                                
                                    name='price'
                                    label="Price"
                                    variant='outlined'
                                    onChange={formik.handleChange}
                                    value={formik.values.price}
                                    endAdornment={<InputAdornment position="end">đ</InputAdornment>}
                                    
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormControl fullWidth>
                                <InputLabel id="category-simple-select-label">Danh mục món ăn</InputLabel>
                                <Select
                                    labelId="category-simple-select-label"
                                    id="category-simple-select"
                                    value={formik.values.category}
                                    label="Danh mục món ăn"
                                    onChange={formik.handleChange}
                                    name='category'
                                >
                                    {restaurant.categories?.map((item) =>
                                        <MenuItem value={item}>{item.name}</MenuItem>
                                    )}


                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="ingredients-multiple-chip-label">Nguyên liệu</InputLabel>
                                <Select
                                    labelId="ingredients-multiple-chip-label"
                                    id="ingredients-multiple-chip"
                                    name='ingredients'
                                    multiple
                                    value={formik.values.ingredients}
                                    onChange={formik.handleChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Nguyên liệu" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value.id} label={value.name} />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {ingredients.ingredients?.map((item, index) => (
                                        <MenuItem
                                            key={item.id}
                                            value={item}
                                        >
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormControl fullWidth>
                                <InputLabel id="vegetarian-simple-select-label">Món chay</InputLabel>
                                <Select
                                    labelId="vegetarian-simple-select-label"
                                    id="vegetarian-simple-select"
                                    value={formik.values.vegetarian}
                                    label="Is Vegetarian"
                                    onChange={formik.handleChange}
                                    name='vegetarian'
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormControl fullWidth>
                                <InputLabel id="seasonal-simple-select-label">Theo mùa</InputLabel>
                                <Select
                                    labelId="seasonal-simple-select-label"
                                    id="seasonal-simple-select"
                                    value={formik.values.seasonal}
                                    label="Is Seasonal"
                                    onChange={formik.handleChange}
                                    name='seasonal'
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button variant='contained' color='primary' type='submit'>
                        Tạo món ăn
                    </Button>

                </form>
            </div>
        </div>
    )
}
