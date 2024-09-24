import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';


const demo = [
    {
        category: "Lựa chọn",
        ingredients: ["Thêm phở", "Thêm thịt bò"]
    },
    {
        category: "Ăn kèm",
        ingredients: ["Quẩy", "Trứng lộn"]
    }
]

const MenuCard = () => {
    const handleCheckBoxChange = (value) => {
        console.log(value);
    }
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <div className='lg:flex items-center justify-between'>
                    <div className='lg:flex items-center lg:gap-5'>
                        <img
                            className='w-[7rem] h-[7rem] object-cover'
                            src='https://pholyquocsu.vn/wp-content/uploads/2022/09/mon-an-quoc-dan-768x768.jpg'
                            alt=''
                        />
                        <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
                            <p className='font-semibold text-xl'>Phở</p>
                            <p>50.000 đ</p>
                            <p className='text-gray-400'>Phở ngon</p>
                        </div>
                    </div>

                </div>
            </AccordionSummary>
            <AccordionDetails>
                <form>
                    <div className='flex gap-5 flex-wrap'>
                        {
                            demo.map((item) =>
                                <div>
                                    <p>{item.category}</p>
                                    <FormGroup>
                                        {item.ingredients.map((item) => <FormControlLabel control={<Checkbox onChange={() => handleCheckBoxChange(item)} />} label={item} />)}
                                    </FormGroup>
                                </div>
                            )
                        }
                    </div>
                    <div className='pt-5'>
                        <Button variant='contained' disable={true} type='submit'>{true ? "Add to Cart" : "Out Of Stock"}</Button>
                    </div>
                </form>
            </AccordionDetails>
        </Accordion>
    )
}

export default MenuCard
