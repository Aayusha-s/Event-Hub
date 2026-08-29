// Geocoding utility using Nominatim (OpenStreetMap's free geocoding service)
// Cache geocoding results to avoid excessive API calls

interface GeocodingCache {
	[key: string]: { lat: number; lon: number } | null;
}

const cache: GeocodingCache = {};

export interface GeocodeResult {
	latitude: number;
	longitude: number;
}

/**
 * Geocode a venue address using Nominatim
 * Results are cached in memory to avoid repeated requests
 * Returns null if geocoding fails
 */
export const geocodeVenue = async (venueName: string): Promise<GeocodeResult | null> => {
	if (!venueName?.trim()) return null;

	const cacheKey = venueName.toLowerCase().trim();

	// Return cached result if available
	if (cacheKey in cache) {
		const cached = cache[cacheKey];
		return cached ? { latitude: cached.lat, longitude: cached.lon } : null;
	}

	try {
		// Use Nominatim OSM API (respect rate limiting)
		const response = await fetch(
			`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(venueName)}&format=json&limit=1`,
			{
				headers: {
					'User-Agent': 'Vivnt-Event-App/1.0',
				},
			}
		);

		if (!response.ok) {
			cache[cacheKey] = null;
			return null;
		}

		const results = await response.json() as Array<{ lat: string; lon: string }>;

		if (results && results.length > 0) {
			const result = {
				lat: parseFloat(results[0].lat),
				lon: parseFloat(results[0].lon),
			};

			// Cache the result
			cache[cacheKey] = result;

			return {
				latitude: result.lat,
				longitude: result.lon,
			};
		}

		// Cache null result for failed geocoding
		cache[cacheKey] = null;
		return null;
	} catch (error) {
		console.error('[Geocoding] Error geocoding venue:', venueName, error);
		// Cache null on error
		cache[cacheKey] = null;
		return null;
	}
};

/**
 * Clear geocoding cache (useful for testing or if cache grows too large)
 */
export const clearGeocodeCache = () => {
	Object.keys(cache).forEach((key) => delete cache[key]);
};
