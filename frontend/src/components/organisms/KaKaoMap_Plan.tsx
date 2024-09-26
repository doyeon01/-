import React, { useEffect, useState, useRef } from 'react';
import Lens from '../../assets/statics/Lens.png'

export interface Props {
    test:Boolean
}

const KaKaoMap_Plan: React.FC<Props> = ({test}) => {
    const [keyword, setKeyword] = useState(''); // 키워드 상태
    const [places, setPlaces] = useState<any[]>([]); // 장소 목록 상태
    const [markers, setMarkers] = useState<any[]>([]); // 마커 상태
    const mapRef = useRef<HTMLDivElement | null>(null); // 지도 DOM 참조
    const [map, setMap] = useState<any>(null);
    const infowindow = useRef<any>(null); // 인포윈도우 참조
    const [placesService, setPlacesService] = useState<any>(null); // 장소 검색 서비스 상태

    const script = document.createElement('script');
    script.type = 'text/javascript'
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_PLAN_API_KEY}&libraries=services&autoload=false`
    script.async = true
    document.body.appendChild(script);


    if (test == true){
    useEffect(() => {
        script.onload = () => {
            console.log('Kakao API 로드됨');
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                    if (mapRef.current) {
                        const mapOption = {
                            center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 중심 좌표
                            level: 3 // 확대 레벨
                        };
                        const createdMap = new window.kakao.maps.Map(mapRef.current, mapOption);
                        setMap(createdMap); // 지도 객체 저장

                        // 인포윈도우 생성
                        infowindow.current = new window.kakao.maps.InfoWindow({ zIndex: 1 });

                        // Places 서비스 객체 생성
                        const ps = new window.kakao.maps.services.Places();
                        
                        setPlacesService(ps);
                    } else {
                        console.error('mapRef.current가 존재하지 않습니다.');
                    }
                });
            } else {
                console.error('Kakao API 로드 실패: window.kakao.maps가 정의되지 않았습니다.');
            }
        };

        script.onerror = () => {
            console.error('Kakao API 스크립트 로드 실패');
        };

        return () => {
            document.body.removeChild(script); // 스크립트 제거
        };
    }, []);

    // 장소 검색 함수
    const searchPlaces = () => {
        if (!keyword.trim()) {
            alert('키워드를 입력해주세요!');
            return;
        }

        if (placesService && map) {
            placesService.keywordSearch(keyword, (data: any, status: any, pagination: any) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    setPlaces(data); // 검색 결과 저장
                    displayMarkers(data); // 마커 표시
                } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
                    alert('검색 결과가 존재하지 않습니다.');
                } else if (status === window.kakao.maps.services.Status.ERROR) {
                    alert('검색 중 오류가 발생했습니다.');
                }
            });
        } else {
            console.error('Kakao Places API나 지도 객체가 아직 로드되지 않았습니다.');
        }
    };

    // 마커 생성 및 지도에 표시하는 함수
    const displayMarkers = (places: any[]) => {
        if (!map || !infowindow.current) return;

        // 기존 마커 제거
        markers.forEach(marker => marker.setMap(null));
        setMarkers([]);

        const bounds = new window.kakao.maps.LatLngBounds();
        const newMarkers: any[] = [];

        places.forEach((place, index) => {
            const position = new window.kakao.maps.LatLng(place.y, place.x);
            const marker = new window.kakao.maps.Marker({
                position,
                map: map
            });

            // 마커 이벤트 추가
            window.kakao.maps.event.addListener(marker, 'mouseover', () => {
                infowindow.current.setContent(`<div style="padding:5px;">${place.place_name}</div>`);
                infowindow.current.open(map, marker);
            });

            window.kakao.maps.event.addListener(marker, 'mouseout', () => {
                infowindow.current.close();
            });

            newMarkers.push(marker); // 새로운 마커 배열에 추가
            bounds.extend(position); // 좌표 범위 확장
        });

        map.setBounds(bounds); // 지도 범위 설정
        setMarkers(newMarkers); // 마커 상태 업데이트
    };

    // 검색 결과 목록 렌더링
    // const renderPlaces = () => {
    //     return places.map((place, index) => (
    //         <li key={index} className="item">
    //             <span className={`markerbg marker_${index + 1}`}></span>
    //             <div className="info">
    //                 <h5>{place.place_name}</h5>
    //                 {place.road_address_name ? (
    //                     <>
    //                         <span>{place.road_address_name}</span>
    //                         <span className="jibun gray">{place.address_name}</span>
    //                     </>
    //                 ) : (
    //                     <span>{place.address_name}</span>
    //                 )}
    //                 <span className="tel">{place.phone}</span>
    //             </div>
    //         </li>
    //     ));
    // };

    const renderPlaces = () => {
        return places.map((place, index) => (
            <li key={index} className="item">
                <span className={`markerbg marker_${index + 1}`}></span>
                <div className="info">
                    {/* place 객체의 전체 정보를 JSON 형식으로 출력 */}
                    <pre>{JSON.stringify(place, null, 2)}</pre>
                </div>
            </li>
        ));
    };
    return (
        <>
            {/* 검색 바 */}
            <div className='w-[350px] h-[calc(100%-20px)] bg-white absolute z-10 ml-[10px] mt-[10px] rounded-[10px] flex flex-col justify-start overflow-hidden items-center'>
              <div className='w-[calc(100%-30px)] h-[45px] border-[#B6AFA9] flex justify-around items-center m-3 border-2 rounded-[5px]' >
                <img src={Lens} alt="" className='m-3'/>
                <input type="text"
                className='w-full'
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                    searchPlaces(); // Enter 키 입력 시 검색 실행
                    }
                }}/>
                <span className='m-3'>✖</span>
              </div>
            {/* 검색 결과 목록 */}
            <div id="menu_wrap" className="bg-white">
                <ul id="placesList">{renderPlaces()}</ul>
            </div>
            </div>

            {/* 지도 표시 영역 */}
            <div id="map" className="w-full h-full" ref={mapRef}></div>


        </>
    );
}




//1페이지
else{
    useEffect(()=>{


        script.onload = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById('map');
                if (mapContainer) {
                    const mapOption = {
                        center: new window.kakao.maps.LatLng(36.76817, 127.9888),
                        level: 13
                    };
                    const map = new window.kakao.maps.Map(mapContainer, mapOption);

                    const markerPosition = new window.kakao.maps.LatLng(36.76817, 127.9888);
                    const marker = new window.kakao.maps.Marker({
                        position: markerPosition, 
                    });
                    marker.setMap(map); 
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
};

export default KaKaoMap_Plan;
