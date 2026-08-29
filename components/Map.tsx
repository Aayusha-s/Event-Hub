'use client';

import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { geocodeVenue } from '@/lib/geocoding';

type MapProps = {
    mapId: number;
    latitude?: number;
    longitude?: number;
    venue?: string;
    mapUrl?: string;
};

const Map = ({ mapId, latitude, longitude, venue }: MapProps) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<any>(null);
    const [resolvedCoordinates, setResolvedCoordinates] = useState<{ lat: number; lon: number } | null>(null);
    const [isGeocoding, setIsGeocoding] = useState(false);
    const [geocodingError, setGeocodingError] = useState(false);

    const hasValidCoordinates = 
        latitude !== undefined && 
        longitude !== undefined && 
        latitude !== 0 && 
        longitude !== 0;

    // Geocode venue if no valid coordinates
    useEffect(() => {
        if (hasValidCoordinates || !venue) return;

        const performGeocoding = async () => {
            setIsGeocoding(true);
            setGeocodingError(false);
            try {
                const result = await geocodeVenue(venue);
                if (result) {
                    setResolvedCoordinates({ lat: result.latitude, lon: result.longitude });
                } else {
                    setGeocodingError(true);
                }
            } catch (error) {
                console.error('Geocoding error:', error);
                setGeocodingError(true);
            } finally {
                setIsGeocoding(false);
            }
        };

        performGeocoding();
    }, [venue, hasValidCoordinates]);

    // Use either provided coordinates or geocoded coordinates
    const finalLat = hasValidCoordinates ? latitude : resolvedCoordinates?.lat;
    const finalLon = hasValidCoordinates ? longitude : resolvedCoordinates?.lon;
    const canRenderMap = finalLat !== undefined && finalLon !== undefined;

    useEffect(() => {
        if (!mapContainer.current || !canRenderMap) return;

        const initializeMap = async () => {
            try {
                // Dynamically import Leaflet to avoid SSR issues
                const L = await import('leaflet');

                // Ensure marker icons are loaded correctly
                const DefaultIcon = L.icon({
                    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41],
                });
                L.Marker.prototype.options.icon = DefaultIcon;

                // Create map instance
                if (map.current) {
                    map.current.remove();
                }

                map.current = L.map(mapContainer.current!).setView([finalLat!, finalLon!], 13);

                // Add OpenStreetMap tile layer
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; OpenStreetMap contributors',
                    maxZoom: 19,
                }).addTo(map.current);

                // Add marker at event location
                L.marker([finalLat!, finalLon!])
                    .bindPopup(venue ? `<div style="text-align: center;"><strong>${venue}</strong></div>` : '<div style="text-align: center;"><strong>Event Location</strong></div>')
                    .addTo(map.current)
                    .openPopup();

            } catch (error) {
                console.error('Failed to initialize map:', error);
            }
        };

        initializeMap();

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, [finalLat, finalLon, venue, canRenderMap]);

    // Show location info
    const showLocationInfo = !!venue;
    const showMap = canRenderMap && !geocodingError;

    return (
        <section>
            <h2 className='mt-9 mb-4 max-w-[400px] font-dynapuff font-bold text-xl md:text-xl lg:text-xl'>Event Location</h2>
            
            {showLocationInfo && (
                <div className='mb-4'>
                    <p className='text-sm md:text-base text-text-dark font-medium'>{venue}</p>
                </div>
            )}

            {isGeocoding && (
                <div className='max-w-full h-[250px] border-2 border-brown-normal rounded-xl overflow-hidden p-2 flex items-center justify-center bg-surface'>
                    <p className='text-text-light'>Loading map...</p>
                </div>
            )}

            {geocodingError && (
                <div className='max-w-full h-[250px] border-2 border-brown-normal rounded-xl overflow-hidden p-2 flex flex-col items-center justify-center bg-surface'>
                    <p className='text-text-light text-center'>
                        {venue ? `Unable to locate "${venue}" on the map` : 'Location information not available'}
                    </p>
                    {venue && <p className='text-xs text-text-light mt-2'>View on external map</p>}
                </div>
            )}

            {showMap && (
                <div 
                    className='max-w-full h-[250px] border-2 border-brown-normal rounded-xl overflow-hidden p-2'
                    ref={mapContainer}
                    id={`map-${mapId}`}
                />
            )}

            {!showLocationInfo && !isGeocoding && !showMap && (
                <div className='max-w-full h-[250px] border-2 border-brown-normal rounded-xl overflow-hidden p-2 flex items-center justify-center bg-surface'>
                    <p className='text-text-light text-center'>Location information not available</p>
                </div>
            )}
        </section>
    );
};

export default Map;
