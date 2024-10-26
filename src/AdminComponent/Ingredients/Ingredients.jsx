import { Grid } from '@mui/material'
import React from 'react'
import { IngredientsTable } from './IngredientsTable'
import { IngredientsCategoryTable } from './IngredientsCategoryTable'

export const Ingredients = () => {
  return (
    <div className='px-2'>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={9}>
            <IngredientsTable/>
        </Grid>
        <Grid item xs={12} lg={3}>
            <IngredientsCategoryTable/>
        </Grid>

      </Grid>
    </div>
  )
}
