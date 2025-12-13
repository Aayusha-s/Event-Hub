import React from 'react'

const page = () => {
    return (
        <section className='font-cause text-text-dark my-10 mx-5 px-4 flex justify-center'>
            {/* welcome message */}
            <div className='w-full  border border-brown-normal rounded-xl'>
                <h2 className='font-dynapuff text-3xl font-semibold p-10 px-10'>
                    Welcome to Your Dashboard
                </h2>
                <p className='text-lg px-10 pb-10'>
                    You have 2 upcoming events and 4 saved favourites
                </p>

            </div>
        </section>
    )
}

export default page
