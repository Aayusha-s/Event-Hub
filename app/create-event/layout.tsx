

export default function CreateEventLayout({
    children,
}: { children: React.ReactNode; }) {


    return (
        <section className='
            my-4 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8'>
            <div className='mb-4'>
                <h3 className='font-dynapuff text-lg md:text-xl lg:text-2xl font-semibold mb-4'>Create New Event</h3>
            </div>



            <div className="mb-6 flex items-center justify-center gap-2">
                <div className="w-10 h-10 rounded-[50px] bg-brown-normal flex items-center justify-center ">
                    <span className="text-white font-bold">1</span>
                </div>
                <div className="flex border-0 w-12 h-0.5 bg-brown-dark rounded-xl"></div>
                <div className="w-10 h-10 rounded-[50px] bg-gray-300 flex items-center justify-center ">
                    <span className="text-white font-bold">2</span>
                </div>
                <div className="flex border-0 w-12 h-0.5 bg-brown-dark rounded-xl"></div>
                <div className="w-10 h-10 rounded-[50px] bg-gray-300 flex items-center justify-center ">
                    <span className="text-white font-bold">3</span>
                </div>
                <div className="flex border-0 w-12 h-0.5 bg-brown-dark rounded-xl"></div>
                <div className="w-10 h-10 rounded-[50px] bg-gray-300 flex items-center justify-center ">
                    <span className="text-white font-bold">4</span>
                </div>
            </div>
            {children}

        </section>
    )
}

