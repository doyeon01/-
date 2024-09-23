import React ,{ useEffect, useMemo } from 'react'

const KaKaoMap_Plan: React.FC = () => {

    useEffect(()=>{
        const script = document.createElement('script');
        script.type = 'text/javascript'
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_PLAN_API_KEY}&autoload=false`
        script.async = true
        document.body.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById('map');
                if (mapContainer) {
                    const mapOption = {
                        center: new window.kakao.maps.LatLng(36.76817, 127.9888),
                        level: 13
                    };
                    const map = new window.kakao.maps.Map(mapContainer, mapOption);

                    // const markerPosition = new window.kakao.maps.LatLng(36.76817, 127.9888);
                    // const marker = new window.kakao.maps.Marker({
                    //     position: markerPosition, 
                    // });
                    // marker.setMap(map); 
                }
            });
        }
        return () => {
            document.body.removeChild(script);
        };
    },[])
  return (
    <>
        <div id='map' className='w-full h-full'></div>
    </>
  )
}

export default KaKaoMap_Plan