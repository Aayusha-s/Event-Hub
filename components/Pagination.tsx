import React from 'react'
import Button from './Button'

const Pagination = () => {
    return (
        <div className='flex flex-row items-center justify-center gap-3 font-bold'>

            <Button 
            text="1"
            variant='cta'
            size='sm'
            />

            <Button 
            text="2"
            variant='cta'
            size='sm'
            />

            <Button 
            text="3"
            variant='cta'
            size='sm'
            />

            <Button 
            icon={<i className="fa-solid fa-angle-right"></i>}
            variant='cta'
            size='sm'
            />
        </div>
    )
}

export default Pagination
