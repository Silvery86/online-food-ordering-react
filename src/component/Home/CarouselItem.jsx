import { useTheme } from '@emotion/react'
import React from 'react'

export const CarouselItem = ({images,title}) => {
  const theme = useTheme()
  return (
    <div className='flex flex-col justify-center items-center'>
        <img className="w-[15rem] h-[15rem] lg:w-[15rem] lg:h-[15rem] rounded-2xl object-cover object-center" src={images[0]} alt=''/>
        <span 
        style={{color: theme.palette.secondary.main}}
        className='py-5 font-semibold text-xl'>{title}</span>
    </div>
  )
}
