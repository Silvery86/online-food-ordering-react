
import { Box, Button, Grid, Modal, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import React from 'react'
import { hasFormSubmit } from '@testing-library/user-event/dist/utils';

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
const initialValue = {
  image: "",
  location: "",
  name: "",
  startAt: null,
  endAt: null
}
export const Events = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formValues, setFormValues] = React.useState(initialValue)

  const handleSubmit = (e) => {
   e.preventDefault();  
    const formattedStartAt = formValues.startAt ? dayjs(formValues.startAt).format('DD/MM/YYYY hh:mm A') : null;
    const formattedEndAt = formValues.endAt ? dayjs(formValues.endAt).format('DD/MM/YYYY hh:mm A') : null;
  
    console.log({
      ...formValues,
      startAt: formattedStartAt,
      endAt: formattedEndAt,
    });
  
  
    setFormValues(initialValue)
  }
  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }
  const handleDateChange = (date, dateType) => {

    setFormValues({ ...formValues, [dateType]: date })
  }
  return (
    <div>
      <div className='p-5'>
        <Button onClick={handleOpen} variant='contained'>
          Create New Event
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name='image'
                    label="Image URL"
                    variant='outlined'
                    fullWidth
                    value={formValues.image}
                    onChange={handleFormChange}
                  >
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name='location'
                    label="Location"
                    variant='outlined'
                    fullWidth
                    value={formValues.location}
                    onChange={handleFormChange}
                  >
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name='name'
                    label="Event Name"
                    variant='outlined'
                    fullWidth
                    value={formValues.name}
                    onChange={handleFormChange}
                  >
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField
                          {...props}                  
                        />
                      )}
                      label="Start Date And Time"
                      value={formValues.startAt}
                      onChange={(newValue) => handleDateChange(newValue, "startAt")}
                      className='w-full'
                      sx={{ widows: "100%" }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField
                          {...props}                         
                        />
                      )}
                      label="End Date And Time"
                      value={formValues.endAt}
                      onChange={(newValue) => handleDateChange(newValue, "endAt")}                
                      className='w-full'
                      sx={{ widows: "100%" }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
                    Add Event
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  )
}
