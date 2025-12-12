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
            <h1 className='text-lg font-dynapuff mt-9 mb-2 max-w-[400px]'>Event Location</h1>
            <div className='max-w-[400px] h-[250px] border-2 border-brown-normal rounded-xl overflow-hidden p-2'>
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
