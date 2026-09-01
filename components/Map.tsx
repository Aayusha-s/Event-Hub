import React from 'react'

type MapProps = {
    mapId: number;
    mapUrl?: string;
};

const Map = ({ mapId, mapUrl }: MapProps) => {
    if (!mapUrl) return null;

    return (
        <section>
            <h2 className='mt-9 mb-4 max-w-[400px] font-dynapuff font-bold text-xl md:text-xl lg:text-xl'>Event Location</h2>
            <div className='max-w-full h-[250px] overflow-hidden rounded-xl border-2 border-brown-normal'>
                <iframe
                    id={`map-${mapId}`}
                    src={mapUrl}
                    title='Event Location Map'
                    width='100%'
                    height='100%'
                    style={{ border: 0, borderRadius: '12px', display: 'block' }}
                    allowFullScreen={false}
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                />
            </div>
        </section>
    );
};

export default Map;
