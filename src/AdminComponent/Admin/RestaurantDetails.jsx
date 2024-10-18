import { Facebook, Instagram, YouTube } from '@mui/icons-material'
import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import React from 'react'

export const RestaurantDetails = () => {
  const handleRestaurantStatus = () => { }
  return (
    <div className='lg:px-20 px-5 pb-10'>
      <div className='py-5 flex justify-center items-center gap-5'>
        <h1 className='text-2xl lg:text-5xl text-center font-bold p-5'>Hadilao</h1>
        <div>
          <Button color={true ? "primary" : "error"} className="py-[1rem] px-[2rem]" variant='contained' onClick={handleRestaurantStatus} size='normal'>
            {true ? "Close" : "Open"}
          </Button>
        </div>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<span className='text-gray-300'>Thông tin nhà hàng</span>} />
            <CardContent>
              <div className='space-y-4 text-gray-200'>
                <div className='flex'>
                  <p className='w-48'>Chủ nhà hàng</p>
                  <p className='text-gray-400'>
                    <span className='pr-55'> : </span>
                    Hadilao
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Tên nhà hàng</p>
                  <p className='text-gray-400'>
                    <span className='pr-55'> : </span>
                    Hadilao
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Loại nhà hàng</p>
                  <p className='text-gray-400'>
                    <span className='pr-55'> : </span>
                    HotPot
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Giờ mở cửa</p>
                  <p className='text-gray-400'>
                    <span className='pr-55'> : </span>
                    HotPot
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Trạng thái</p>
                  <p className='text-gray-400'>
                    <span className='pr-55'> : </span>
                    {true
                      ? <span className='px-5 py-2 rounded-full bg-green-400 text-gray-950'>Open</span>
                      : <span className='px-5 py-2 rounded-full bg-red-500 text-gray-950'>Closed</span>}
                  </p>
                </div>

              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={<span className='text-gray-300'>Địa chỉ</span>} />
            <CardContent>
              <div className='space-y-4 text-gray-200'>
                <div className='flex'>
                  <p className='w-48'>Địa chỉ</p>
                  <p className='text-gray-400'>
                    <span className='pr-55'> : </span>
                    Hadilao
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Quận</p>
                  <p className='text-gray-400'>
                    <span className='pr-55'> : </span>
                    Hadilao
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Thành phố</p>
                  <p className='text-gray-400'>
                    <span className='pr-55'> : </span>
                    HotPot
                  </p>
                </div>


              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={<span className='text-gray-300'>Thông tin liên hệ</span>} />
            <CardContent>
              <div className='space-y-4 text-gray-200'>
                <div className='flex'>
                  <p className='w-48'>Hộp thư</p>
                  <p className='text-gray-400'>
                    <span className='pr-55'> : </span>
                    Hadilao
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Điện thoại liên hệ</p>
                  <p className='text-gray-400'>
                    <span className='pr-55'> : </span>
                    Hadilao
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Fanpage</p>
                  <p className='text-gray-400 flex items-center pb-3 gap-5'>
                    <span className='pr-55'> : </span>
                    <a href='/' >
                      <Instagram sx={{ fontSize: "2rem" }} />
                    </a>
                    <a href='/' >
                      <Facebook sx={{ fontSize: "2rem" }} />
                    </a>
                    <a href='/' >
                      <YouTube sx={{ fontSize: "2rem" }} />
                    </a>

                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
