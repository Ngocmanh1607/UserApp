import React from 'react';
import MapView, { UrlTile } from 'react-native-maps';

const HereMap = () => {
    const hereTileUrl = 'https://2.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?apikey=7sef-qPLms2vVRE4COs57FGzk4LuYC20NtU6TCd13kU';

    return (
        <MapView
            style={{ flex: 1 }}
            initialRegion={{
                latitude: 52.5160,
                longitude: 13.3779,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
            }}
        >
            <UrlTile
                urlTemplate={hereTileUrl}
                maximumZ={19}
                tileSize={256}
            />
        </MapView>
    );
};

export default HereMap;