import { useTheme } from '@emotion/react'
import React from 'react'

export const CarouselItem = ({images,title}) => {
  const theme = useTheme()
  return (
    <div className='flex flex-col justify-center items-center'>
        <img className="w-[12rem] h-[15rem] md:w-[15rem] md:h-[15rem] md:rounded-2xl object-cover object-center" src={images[0]} alt=''/>
        <span 
        style={{color: theme.palette.secondary.main}}
        className='py-5 font-semibold md:text-2xl text-center'>{title}</span>
    </div>
  )
}
