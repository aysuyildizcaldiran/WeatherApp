import GetLocation, { isLocationError, Location, LocationErrorCode } from 'react-native-get-location';
import { YOUR_GOOGLE_MAPS_API_KEY } from '../theme';

type Coordinates = {
    latitude: number;
    longitude: number;
};

export const requestLocation = async (
    setLoading: (loading: boolean) => void,
    setLocation: (location: Location | null) => void,
    setError: (error: LocationErrorCode | null) => void,
    getCityFromCoordinates: (coords: Coordinates) => Promise<void>
) => {
    setLoading(true);
    setLocation(null);
    setError(null);

    try {
        const newLocation = await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 30000,
            rationale: {
                title: 'Location permission',
                message: 'The app needs the permission to request your location.',
                buttonPositive: 'Ok',
            },
        });
        setLoading(false);
        setLocation(newLocation);
        await getCityFromCoordinates({
            latitude: newLocation.latitude,
            longitude: newLocation.longitude,
        });
    } catch (ex) {
        if (isLocationError(ex)) {
            const { code } = ex;
            setError(code);
        } else {
            console.warn(ex);
        }
        setLoading(false);
        setLocation(null);
    }
};

export const getCityFromCoordinates = async ({ latitude, longitude }: Coordinates): Promise<string> => {
    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${YOUR_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        if (data.results.length > 0) {
            const addressComponents = data.results[0].address_components;
            const cityInfo = addressComponents.find((component: any) =>
                component.types.includes('locality')
            );
            return cityInfo ? cityInfo.long_name : 'City not found';
        }
    } catch (error) {
        console.error(error);
        return 'Error fetching city';
    }
};
