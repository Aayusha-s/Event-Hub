import React from 'react'
import Button from './Button'
import { ArrowRight, ChevronRight } from 'lucide-react'

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
            iconRight={<ChevronRight />}
            variant='cta'
            size='sm'
            />
        </div>
    )
}

export default Pagination
