import { AddPhotoAlternate, Close } from '@mui/icons-material';
import { Box, Button, Chip, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { uploadImageToCloudinary } from '../util/UploadToCloudinary';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../../component/State/Event/Action';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Quill } from 'react-quill';
import ImageUploader from 'quill-image-uploader';

import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

Quill.register('modules/imageUploader', ImageUploader);

const initialValues = {
  restaurantId: null,
  title: "",
  startAt: null,
  endAt: null,
  description: "",
  location: [],
  images: [],
  header: "",
  content: "",
};
const selectLocation = [
  { slug: "ha_noi", location: "TP.Hà Nội", zipCode: "" },
];
const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  imageUploader: {
    upload: file => {
      return uploadImageToCloudinary(file)
        .then(response => response)
        .catch(error => {
          console.error('Error uploading image:', error);
          return '';
        });
    }
  }
};
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
export const CreateEvent = () => {
  const navigate = useNavigate()
  const [uploadImage, setUploadImage] = useState(false);
  const dispatch = useDispatch();
  const restaurant = useSelector(state => state.restaurant)
  const jwt = localStorage.getItem("jwt");  
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const formattedStartAt = values.startAt
        ? dayjs(values.startAt, 'DD/MM/YYYY hh:mm A').toISOString()
        : null;
      const formattedEndAt = values.endAt
        ? dayjs(values.endAt, 'DD/MM/YYYY hh:mm A').toISOString()
        : null;

      const data = {
        event: {
          title: values.title, // Correctly map to event object
          startAt: formattedStartAt,
          endAt: formattedEndAt,
          description: values.description,
          location: values.location,
          images: values.images,
        },
        restaurantId: restaurant.usersRestaurant.id, // Keep restaurantId as is
        details:
          [
            {
              header: values.header,
              content: values.content,
            }
          ]

      };      
      dispatch(createEvent({ eventData: data, jwt: jwt }));
      navigate("/admin/restaurant/event")
    },
  });

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

  const handleDateChange = (date, dateType) => {
    formik.setFieldValue(dateType, date);
  };

  return (
    <div className='py-10 px-5 lg:flex items-center justify-center min-h-screen'>
      <div className='lg:max-w-4xl'>
        <h1 className='font-bold text-2xl text-center py-2'>
          Tạo sự kiện cho nhà hàng
        </h1>
        <form onSubmit={formik.handleSubmit} className='space-y-4'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>Ảnh sự kiện</Typography>
              <input
                accept='image/*'
                id='fileInput'
                style={{ display: "none" }}
                onChange={handleImageChange}
                type='file'
              />
              <label className='relative' htmlFor='fileInput'>
                <span className='w-24 h-24 cursor-pointer flex justify-center items-center p-3 border rounded-md border-gray-600'>
                  <AddPhotoAlternate className='text-white' />
                  {uploadImage && (
                    <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex items-center justify-center'>
                      <CircularProgress />
                    </div>
                  )}
                </span>
              </label>
              <div className='flex flex-wrap gap-2'>
                {formik.values.images.map((image, index) => (
                  <div className='relative' key={index}>
                    <img
                      className='h-[80vh] object-cover'
                      src={image}
                      alt={`Event Image ${index}`}
                    />
                    <IconButton
                      size='small'
                      sx={{ position: "absolute", top: 0, right: 0, outline: "none" }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <Close sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='title'
                name='title'
                label="Tiêu đề sự kiện (Hiện thị tại banner quảng cáo)"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.title}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='description'
                name='description'
                label="Tóm tắt sự kiện (Hiển thị tại banner quảng cáo)"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.description}
                multiline
                rows={3}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => (
                    <TextField {...props} />
                  )}
                  label="Thời gian bắt đầu"
                  value={formik.values.startAt}
                  onChange={(newValue) => handleDateChange(newValue, "startAt")}
                  className='w-full'
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => (
                    <TextField {...props} />
                  )}
                  label="Thời gian kết thúc"
                  value={formik.values.endAt}
                  onChange={(newValue) => handleDateChange(newValue, "endAt")}
                  className='w-full'
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="location-multiple-chip-label">Địa điểm áp dụng</InputLabel>
                <Select
                  labelId="location-multiple-chip-label"
                  id="location-multiple-chip"
                  name="location" // This should match your Formik field name
                  multiple
                  value={formik.values.location} // This should be an array of slugs
                  onChange={(event) => {
                    const {
                      target: { value },
                    } = event;
                    formik.setFieldValue("location", typeof value === 'string' ? value.split(',') : value);
                  }}
                  input={<OutlinedInput id="select-multiple-chip" label="Location" />}
                  renderValue={(selected) => {
                    // Map slugs to location names
                    const selectedLocations = selectLocation.filter(loc => selected.includes(loc.slug));
                    return (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selectedLocations.map((loc) => (
                          <Chip key={loc.slug} label={loc.location} />
                        ))}
                      </Box>
                    );
                  }}
                  MenuProps={MenuProps}
                >
                  {selectLocation.map((item) => (
                    <MenuItem key={item.slug} value={item.slug}>
                      {item.location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='header'
                name='header'
                label="Tiêu đề chi tiết sự kiện"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.header}
                required
              />
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', height: '80vh' }}>
              <Typography>Nội dung chi tiết sự kiện</Typography>
              <Box width="100%" flexGrow={1} mb={2}>
                <ReactQuill
                  value={formik.values.content}
                  onChange={(value) => formik.setFieldValue('content', value)}
                  modules={modules}
                  placeholder="Enter event details here..."
                  style={{ height: '100%' }}
                />
              </Box>
              <Button variant='contained' color='primary' type='submit'>
                Tạo sự kiện
              </Button>
            </Grid>
          </Grid>

        </form>
      </div>
    </div>
  );
};
