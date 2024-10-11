import React, { useEffect, useState, useRef } from 'react';
import Lens from '../../assets/statics/Lens.png'
import Mini_Vector from '../../assets/statics/Mini_Vector.png'
import { FeedClusterType } from '../../model/SearchingFeedType';

export interface Props {
    isSearch:Boolean
    clusters?: FeedClusterType[]
    index?: number
}

const KaKaoMap_Plan: React.FC<Props> = ({isSearch, clusters, index}) => {
    const [keyword, setKeyword] = useState(''); // 키워드 상태
    const [places, setPlaces] = useState<any[]>([]); // 장소 목록 상태
    const [markers, setMarkers] = useState<any[]>([]); // 마커 상태
    const mapRef = useRef<HTMLDivElement | null>(null); // 지도 DOM 참조
    const [map, setMap] = useState<any>(null);
    const infowindow = useRef<any>(null); // 인포윈도우 참조
    const [placesService, setPlacesService] = useState<any>(null); // 장소 검색 서비스 상태
    const [searchinTab, setSearchingTab] = useState(false)

    const [_, setDragging] = useState(false);

    // const [storedData, setStoredData] = useState(null); // 로컬 스토리지 데이터를 상태로 저장
    

    const script = document.createElement('script');
    script.type = 'text/javascript'
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_PLAN_API_KEY}&libraries=services&autoload=false`
    script.async = true
    document.body.appendChild(script);

    const handleSearchingTab = () => {
        setSearchingTab(searchinTab => !searchinTab)
    } 

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, place: any) => {
        setDragging(true);
        e.dataTransfer.setData('place', JSON.stringify(place));
    };
    
    const handleDragEnd = () => {
        setDragging(false);
    };


    if (isSearch == true){
        // useEffect(() => {
        //     console.log('check');
            
        //     const handleStorageChange = () => {
        //         const stored = localStorage.getItem(`schedule_${index}`);
        //         if (stored && stored.length > 0) {
        //             setStoredData(JSON.parse(stored)); // 로컬 스토리지 데이터를 상태로 업데이트
        //         }
        //     };
        
        //     // 원래 localStorage.setItem을 저장
        //     const originalSetItem = localStorage.setItem;
        
        //     // localStorage.setItem을 오버라이드하여 같은 탭에서의 변경을 감지
        //     localStorage.setItem = function (key: string, value: string) {
        //         originalSetItem.call(this, key, value); // 인자를 명시적으로 전달
        //         if (key === `schedule_${index}`) {
        //             handleStorageChange();  // 직접 스토리지 변경을 감지
        //         }
        //     };
        
        //     // storage 이벤트 리스너 등록 (다른 탭에서의 변경 감지)
        //     window.addEventListener('storage', handleStorageChange);
        
        //     // 컴포넌트 언마운트 시 이벤트 리스너 해제 및 원래 setItem 복원
        //     return () => {
        //         window.removeEventListener('storage', handleStorageChange);
        //         localStorage.setItem = originalSetItem; // 원래의 setItem으로 복원
        //     };
        // }, [index]);
    
    useEffect(() => {
        script.onload = () => {
            console.log('Kakao API 로드됨');
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                    if (mapRef.current) {
                        if (clusters && clusters.length>0){
                            const mapOption = {
                                center: new window.kakao.maps.LatLng(clusters[0].latitude, clusters[0].longitude), // 중심 좌표
                                // center: new window.kakao.maps.LatLng(37.6, 127), // 중심 좌표
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

    useEffect(() => {
        if (!map || !infowindow.current) return;

        // 기존 마커 초기화 (지도에서 제거)
        markers.forEach(marker => marker.setMap(null));

        if (index) {
            const stored = localStorage.getItem(`schedule_${index}`);
            if (stored && stored.length > 0) {
                const parsedStore = JSON.parse(stored);
                const newMarkers: any[] = [];

                parsedStore.forEach((items: any) => {
                    const markerPosition = new window.kakao.maps.LatLng(
                        items.y || items.latitude, 
                        items.x || items.longitude
                    );

                    const marker = new window.kakao.maps.Marker({
                        position: markerPosition
                    });

                    // 지도에 마커를 표시
                    marker.setMap(map);

                    // 새 마커 배열에 추가
                    newMarkers.push(marker);

                    // 마커 이벤트 추가
                    window.kakao.maps.event.addListener(marker, 'mouseover', () => {
                        infowindow.current.setContent(`<div style="padding:5px;">${items.place_name||items.placeName}</div>`);
                        infowindow.current.open(map, marker);
                    });

                    window.kakao.maps.event.addListener(marker, 'mouseout', () => {
                        infowindow.current.close();
                    });
                });

                // 마커 상태를 새로운 마커 배열로 업데이트
                setMarkers(newMarkers);
            }
        }
    }, [, index, map]); // map도 의존성 배열에 포함해야 제대로 작동)
    //storedData

    // 장소 검색 함수
    const searchPlaces = () => {
        if (!keyword.trim()) {
            alert('키워드를 입력해주세요!');
            return;
        }

        if (placesService && map) {
            placesService.keywordSearch(keyword, (data: any, status: any, pagination: any) => {
                console.log(pagination);
                
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
            console.log(index);
            
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
    const renderPlaces = () => {
        return places.map((place, index) => (
            <li key={index} className="flex items-start w-full border-b border-gray-200 py-2">
                <div className={`ml-4 cursor-move`} draggable
                    onDragStart={(e) => handleDragStart(e, place)}
                    onDragEnd={handleDragEnd}>
                    <p className='text-blue-400 text-[18px] cursor-pointer hover:underline hover:underline-offset-1' onClick={() => window.open(place.place_url, '_blank')}>{place.place_name}</p>
                    {place.road_address_name ? (
                        <>
                            <span className='text-[15px] text-gray-400'>{place.road_address_name}</span>
                        </>
                    ) : (
                        <span className='text-[15px] text-gray-400'>{place.address_name}</span>
                    )}
                </div>
            </li>
        ));
    };

    return (
        <>
            {/* 검색 바 */}
            <div id='box' className={`w-[350px] h-[calc(100%-20px)] bg-white absolute z-10 ml-[10px] mt-[10px] rounded-[10px] flex flex-col justify-start items-center transition-transform duration-300 ease-in-out transform ${searchinTab ? 'translate-x-0' : '-translate-x-[360px]'}`}>
            <div className='w-[calc(100%-30px)] h-[45px] border-[#B6AFA9] flex justify-around items-center m-3 border-2 rounded-[5px]' >
                <img src={Lens} alt="" className='m-3'/>
                <input type="text"
                className='w-full outline-none focus:border-transparent'
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                    searchPlaces(); // Enter 키 입력 시 검색 실행
                    }
                }}/>
                {keyword && (
                    <span 
                    id='xbutton'
                    className='m-3 cursor-pointer'
                    onClick={() => {
                        setKeyword('');  // 입력 필드 공백으로 설정
                        setPlaces([]);   // 검색 결과 초기화
                    }}
                    >✖</span>
                )}
            </div>
            {/* 검색 결과 목록 */}
            <ul id="placesList" className='flex flex-col items-start w-full overflow-y-auto scrollbar-thin'>{renderPlaces()}</ul>
            <div id='folding'className='w-[23px] h-[45px] bg-white flex justify-center items-center rounded-r-lg absolute z-20 top-1/2 -right-[23px] border cursor-pointer' onClick={handleSearchingTab}>
                <img src={Mini_Vector} className={`${searchinTab ? '' : 'transform scale-x-[-1]'}`}/>
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
                    if(clusters && clusters.length>0){
                        const positions = clusters.map(items => ({
                            lat: items.latitude,
                            lng: items.longitude
                        }));
                        console.log(positions);
                        
                        positions.forEach(position => {
                            const markerPosition = new window.kakao.maps.LatLng(position.lat, position.lng);
            
                            const marker = new window.kakao.maps.Marker({
                                position: markerPosition
                            });
            
                            // 지도에 마커를 표시
                            marker.setMap(map);
                        })
                    }
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
