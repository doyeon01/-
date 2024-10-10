import React, { useEffect } from 'react';
import { locationArrType } from '../../model/MyPageType';

declare global {
    interface Window {
        kakao: any;
    }
}
interface KakaoMapProps {
    location: locationArrType[]; 
}

const KakaoMap: React.FC<KakaoMapProps> = ({ location }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`; 
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById('map');
                if (mapContainer) {
                    const mapOption = {
                        center: new window.kakao.maps.LatLng(37.551169, 126.985023),
                        level: 3
                    };
                    const map = new window.kakao.maps.Map(mapContainer, mapOption);

                    location.forEach((coords) => {
                        const markerPosition = new window.kakao.maps.LatLng(coords[0], coords[1]);
                        const marker = new window.kakao.maps.Marker({
                            position: markerPosition,
                        });
                        marker.setMap(map);
                    });
                }
            });
        };

        return () => {
            document.body.removeChild(script);
        };
    }, [location]); 

    return (
        <div className="fixed flex items-center justify-center w-screen h-screen z-0 "> 
            <div id="map" className="w-full h-full" /> 
        </div>
    );
};

export default KakaoMap;
