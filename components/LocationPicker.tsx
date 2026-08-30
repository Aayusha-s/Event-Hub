'use client';

import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { geocodeVenue } from '@/lib/geocoding';

interface LocationPickerProps {
    onLocationSelect: (location: { latitude: number; longitude: number; venueName: string }) => void;
    initialVenue?: string;
    initialLat?: number;
    initialLon?: number;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect, initialVenue, initialLat, initialLon }) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<any>(null);
    const marker = useRef<any>(null);
    const [searchQuery, setSearchQuery] = useState(initialVenue || '');
    const [selectedLocation, setSelectedLocation] = useState<{ name: string; lat: number; lon: number } | null>(
        initialLat && initialLon && initialLat !== 0 && initialLon !== 0 
            ? { name: initialVenue || 'Selected Location', lat: initialLat, lon: initialLon } 
            : null
    );
    const [isSearching, setIsSearching] = useState(false);
    const [searchSuggestions, setSearchSuggestions] = useState<Array<{ name: string; lat: number; lon: number }>>([]);

    // Initialize map
    useEffect(() => {
        if (!mapContainer.current) return;

        const initializeMap = async () => {
            try {
                const L = await import('leaflet');

                if (map.current) {
                    map.current.remove();
                }

                // Kathmandu Valley center as default
                const defaultLat = 27.7172;
                const defaultLon = 85.3240;
                const startLat = selectedLocation?.lat || initialLat || defaultLat;
                const startLon = selectedLocation?.lon || initialLon || defaultLon;

                map.current = L.map(mapContainer.current!).setView([startLat, startLon], 13);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; OpenStreetMap contributors',
                    maxZoom: 19,
                }).addTo(map.current);

                // Add click listener
                map.current.on('click', async (e: any) => {
                    const { lat, lng } = e.latlng;
                    await addMarker(lat, lng, L);
                });

                // Add initial marker if location selected
                if (selectedLocation) {
                    await addMarker(selectedLocation.lat, selectedLocation.lon, L);
                }

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
    }, []);

    const addMarker = async (lat: number, lon: number, L: any) => {
        if (!map.current || !mapContainer.current) return;

        // Remove existing marker
        if (marker.current) {
            map.current.removeLayer(marker.current);
        }

        // Add new marker
        const DefaultIcon = L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
        });

        marker.current = L.marker([lat, lon], { icon: DefaultIcon })
            .addTo(map.current)
            .bindPopup('Event Location')
            .openPopup();

        // Center map on new marker
        map.current.setView([lat, lon], 15);

        // Reverse geocode to get location name
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
                {
                    headers: {
                        'User-Agent': 'Vivnt-Event-App/1.0',
                    },
                }
            );

            if (response.ok) {
                const data = await response.json() as { address?: { name?: string; road?: string; suburb?: string; city?: string; county?: string } };
                const locationName = 
                    data.address?.name ||
                    data.address?.road ||
                    data.address?.suburb ||
                    data.address?.city ||
                    'Selected Location';

                setSelectedLocation({ name: locationName, lat, lon });
                onLocationSelect({ latitude: lat, longitude: lon, venueName: locationName });
            } else {
                setSelectedLocation({ name: 'Selected Location', lat, lon });
                onLocationSelect({ latitude: lat, longitude: lon, venueName: 'Selected Location' });
            }
        } catch (error) {
            console.error('Reverse geocoding error:', error);
            setSelectedLocation({ name: 'Selected Location', lat, lon });
            onLocationSelect({ latitude: lat, longitude: lon, venueName: 'Selected Location' });
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=5`,
                {
                    headers: {
                        'User-Agent': 'Vivnt-Event-App/1.0',
                    },
                }
            );

            if (response.ok) {
                const results = await response.json() as Array<{ lat: string; lon: string; display_name: string }>;
                setSearchSuggestions(
                    results.map((r) => ({
                        name: r.display_name,
                        lat: parseFloat(r.lat),
                        lon: parseFloat(r.lon),
                    }))
                );
            }
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const selectSuggestion = async (suggestion: { name: string; lat: number; lon: number }) => {
        setSelectedLocation(suggestion);
        setSearchSuggestions([]);
        setSearchQuery(suggestion.name);

        // Add marker to map
        if (map.current && mapContainer.current) {
            const L = await import('leaflet');
            await addMarker(suggestion.lat, suggestion.lon, L);
        }

        onLocationSelect({
            latitude: suggestion.lat,
            longitude: suggestion.lon,
            venueName: suggestion.name,
        });
    };

    return (
        <div className='space-y-3'>
            <div>
                <label className='block mb-2 text-sm font-medium text-text-dark'>
                    Event Location
                    <span className='text-red-500'>*</span>
                </label>
                <div className='relative'>
                    <div className='flex gap-2 mb-2'>
                        <input
                            type='text'
                            placeholder='Search for a venue or location...'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className='flex-1 rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring'
                        />
                        <button
                            type='button'
                            onClick={handleSearch}
                            disabled={isSearching}
                            className='px-4 py-3 bg-brown-normal text-white rounded-xl hover:bg-brown-dark disabled:opacity-50 transition-colors font-semibold'
                        >
                            {isSearching ? 'Searching...' : 'Search'}
                        </button>
                    </div>

                    {searchSuggestions.length > 0 && (
                        <div className='absolute top-full left-0 right-0 mt-1 bg-white border-2 border-brown-normal rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto'>
                            {searchSuggestions.map((suggestion, idx) => (
                                <button
                                    key={idx}
                                    type='button'
                                    onClick={() => selectSuggestion(suggestion)}
                                    className='w-full text-left px-4 py-2 hover:bg-brown-light transition-colors text-sm text-text-dark border-b last:border-b-0'
                                >
                                    <div className='font-medium'>{suggestion.name.split(',')[0]}</div>
                                    <div className='text-xs text-text-dark/60'>{suggestion.name.split(',').slice(1).join(',').trim()}</div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {selectedLocation && (
                    <p className='text-sm text-green-700 mt-2 font-semibold'>
                        ✓ Location selected: {selectedLocation.name}
                    </p>
                )}
            </div>

            <div className='text-sm text-text-light mb-2'>
                Click on the map or search to select your event location
            </div>

            <div
                ref={mapContainer}
                className='w-full h-96 rounded-xl border-2 border-brown-normal overflow-hidden'
                id='location-picker-map'
            />

            {selectedLocation && (
                <div className='bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-800'>
                    <strong>Coordinates:</strong> {selectedLocation.lat.toFixed(6)}, {selectedLocation.lon.toFixed(6)}
                </div>
            )}
        </div>
    );
};

export default LocationPicker;
