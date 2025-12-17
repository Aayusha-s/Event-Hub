import React from 'react'

type MapProps = {
    mapId: number;
    mapUrl?: string;
}

const Map = (
    {
        mapId,
        mapUrl
    }: MapProps
) => {
    return (
        <section>
            <h1 className='mt-9 mb-2 max-w-[400px]
            font-dynapuff my-4 font-bold 
                    text-xl sm:text-xl md:text-xl lg:text-xl'>Event Location</h1>
            <div className='max-w-full h-[250px] border-2 border-brown-normal rounded-xl overflow-hidden p-2'>
                <iframe
                    id={`map-${mapId}`}
                    src={mapUrl}
                    title='Event Location Map'
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: '12px', display: 'block' }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </section>

    )
}

export default Map
