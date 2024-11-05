import { AddPhotoAlternate, Close } from '@mui/icons-material';
import { Box, Button, Chip, CircularProgress, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography, Grid, IconButton, Snackbar, Alert } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { uploadImageToCloudinary } from '../util/UploadToCloudinary';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../../component/State/Event/Action';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import dayjs from 'dayjs';

const initialValues = {
  restaurantId: null,
  title: "",
  startAt: null,
  endAt: null,
  description: "",
  location: [],
  images: [],
  header: "",
  content: "", // Use plain string for TinyMCE
};

const selectLocation = [
  { slug: "ha_noi", location: "TP.Hà Nội", zipCode: "" },
];

export const CreateEvent = () => {
  const navigate = useNavigate();
  const [uploadImage, setUploadImage] = useState(false);
  const dispatch = useDispatch();
  const restaurant = useSelector(state => state.restaurant);
  const jwt = localStorage.getItem("jwt");

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const formattedStartAt = values.startAt ? dayjs(values.startAt).toISOString() : null;
      const formattedEndAt = values.endAt ? dayjs(values.endAt).toISOString() : null;

      const data = {
        event: {
          title: values.title,
          startAt: formattedStartAt,
          endAt: formattedEndAt,
          description: values.description,
          location: values.location,
          image: values.images[0],
        },
        restaurantId: restaurant.usersRestaurant.id,
        details:
        {
          header: values.header,
          content: values.content, // Use raw content from TinyMCE
        }

      };
      dispatch(createEvent({ eventData: data, jwt: jwt ,navigate}));
    

    },
  });
  // Local states to control Snackbar display
  const [open, setOpen] = React.useState(false);
  const [alertType, setAlertType] = React.useState('error');
  const [alertMessage, setAlertMessage] = React.useState('');
  const { error, success } = useSelector(state => state.auth)
  // Snack bar notification
  useEffect(() => {
    if (success !== null && success == "Tạo sự kiện thành công") {
      setAlertType('success');
      setAlertMessage(success);
      setOpen(true);
    }
    if (error !== null && error !== "") {
      setAlertType('error');
      setAlertMessage(error);
      setOpen(true);
    }
  }, [error, success]);
  // Snackbar close handler
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // Image upload
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

  // Function to handle image uploads in TinyMCE
  const handleImageUpload = async (blobInfo, success, failure) => {
    const file = blobInfo.blob(); // Get the image file from blobInfo
    try {
      const uploadedImage = await uploadImageToCloudinary(file); // Upload the image to Cloudinary
      success(uploadedImage); // Call success with the uploaded image URL
    } catch (error) {
      failure("Image upload failed."); // Call failure with an error message
    }
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
                  <AddPhotoAlternate className='text-black' />
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
                      className='h-[30vh] object-cover'
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
                  name="location"
                  multiple
                  value={formik.values.location}
                  onChange={(event) => {
                    const {
                      target: { value },
                    } = event;
                    formik.setFieldValue("location", typeof value === 'string' ? value.split(',') : value);
                  }}
                  input={<OutlinedInput id="select-multiple-chip" label="Location" />}
                  renderValue={(selected) => {
                    const selectedLocations = selectLocation.filter(loc => selected.includes(loc.slug));
                    return (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selectedLocations.map((loc) => (
                          <Chip key={loc.slug} label={loc.location} />
                        ))}
                      </Box>
                    );
                  }}
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
            <Grid item xs={12}>
              <Editor
                apiKey='3u4fydpe7yhax17ypsxcb053drfd9iq66mmhvl9oiqp310x8'
                init={{
                  plugins: [
                    'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists',
                    'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                    'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter',
                    'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste',
                    'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions',
                    'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect',
                    'typography', 'inlinecss', 'markdown',
                    'importword', 'exportword', 'exportpdf'
                  ],
                  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                  tinycomments_mode: 'embedded',
                  tinycomments_author: 'Author name',
                  mergetags_list: [
                    { value: 'First.Name', title: 'First Name' },
                    { value: 'Email', title: 'Email' },
                  ],
                  ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                  exportpdf_converter_options: { format: 'Letter', margin_top: '1in', margin_right: '1in', margin_bottom: '1in', margin_left: '1in' },
                  exportword_converter_options: { document: { size: 'Letter' } },
                  importword_converter_options: { formatting: { styles: 'inline', resets: 'inline', defaults: 'inline' } },
                }}
                initialValue="Welcome to TinyMCE!"
                onEditorChange={(content) => formik.setFieldValue('content', content)} // Update formik value
                images_upload_handler={handleImageUpload} // Custom image upload handler
              />
            </Grid>
            <Grid item xs={12} className='flex justify-center py-4'>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className='w-full'
              >
                Tạo sự kiện
              </Button>
            </Grid>
          </Grid>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
              {alertMessage}
            </Alert>
          </Snackbar>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
