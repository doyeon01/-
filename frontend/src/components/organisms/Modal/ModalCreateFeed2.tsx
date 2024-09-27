import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';  // sweetalert2 import 추가
import { PictureIcon, LocationIcon, BackIcon } from '../../../assets/icons/svg';
import ButtonLikeCategory from '../../atoms/button/ButtonLikeCategory';
import DaumPostcode from 'react-daum-postcode';
import ModalCreateFeed1 from './ModalCreateFeed1';
import axios from 'axios'; // Axios를 통해 API 호출

export const ModalCreateFeed2: React.FC<{ onClose: () => void, onComplete: () => void }> = ({ onClose, onComplete }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // 이미지
  const [title, setTitle] = useState<string>(''); // 제목
  const [content, setContent] = useState<string>('');  // 내용
  const [selectedCategory, setSelectedCategory] = useState<string>('전체'); // 카테고리
  const [openPostcode, setOpenPostcode] = useState(false); // 주소 선택 모달 상태
  const [calendarlocation, setCalendarLocation] = useState(''); // 주소 상태
  const [schedule, setSchedule] = useState<string>(''); // 선택된 일정 제목 상태
  const [isScheduleSelected, setIsScheduleSelected] = useState(false); // 일정 선택 상태
  const [latitude, setLatitude] = useState<number | null>(null); // 위도 상태
  const [longitude, setLongitude] = useState<number | null>(null); // 경도 상태

  const apikey = import.meta.env.VITE_KAKAO_MAP_API_KEY; // 카카오 API 키


  useEffect(()=>{
    console.log(apikey)
  },[])

  const handle = {
    ImageChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setSelectedImage(e.target.files[0]);
      }
    },
    ImageRemove: () => {
      setSelectedImage(null);
    },
    TitleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTitle(e.target.value);
    },
    ContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    },
    CategoryClick: (category: string) => {
      setSelectedCategory(category);
    },
    clickButton: () => {
      setOpenPostcode(current => !current);
    },
    selectAddress: async (data: any) => {
      setCalendarLocation(data.address);
      setOpenPostcode(false); // 주소 선택 후 창 닫기

      await axios
      .get(`https://dapi.kakao.com/v2/local/search/address.json`, {
        params: { query: data.address },
        headers: {
          Authorization: `KakaoAK ${apikey}`, 
        },
      })
      .then((response) => {
        console.log(response.data.documents); 
      })
      .catch((error) => {
        console.error("Error fetching coordinates:", error); 
      });
    

    //   try {
    //     console.log(data.address)
    //     // 카카오 주소-좌표 변환 API 호출
    //     const result = await axios.get(`https://dapi.kakao.com/v2/local/search/address.json`, {
    //       params: { query: data.address },
    //       headers: {
    //         Authorization: `KakaoAK ${apikey}`, // 카카오 REST API 키
    //       },
    //     });

    //     if (result.data.documents.length > 0) {
    //       const { x, y } = result.data.documents[0]; // x: 경도, y: 위도
    //       setLongitude(Number(x)); // 경도 저장
    //       setLatitude(Number(y));  // 위도 저장
    //       console.log(`위도: ${y}, 경도: ${x}`);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching coordinates:', error);
    //     Swal.fire({
    //       icon: 'error',
    //       title: '좌표 변환 오류',
    //       text: '주소에 대한 위도와 경도를 가져오지 못했습니다.',
    //     });
    //   }
    // },
    // closePostcode: () => {
    //   setOpenPostcode(false); // 모달 닫기
    },
    completeScheduleSelection: (title: string) => {
      setSchedule(title); // 선택된 일정 ID를 상태로 설정
      setIsScheduleSelected(true); // 일정 선택 완료 상태로 변경
    },
    goBackToSchedule: () => {
      setIsScheduleSelected(false); // 게시글 작성 모달에서 일정 선택 모달로 돌아감
    },
    // 완료 버튼 클릭 시 유효성 검사
    validateAndComplete: () => {
      if (!title || !content || !selectedImage || !calendarlocation) {
        Swal.fire({
          icon: 'warning',
          title: '내용을 입력하세요',
          text: '이미지, 제목, 내용, 위치를 모두 작성해 주세요.',
          confirmButtonText: '확인'
        });
      } else {
        onComplete();
      }
    },
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // 검은색 오버레이 클릭 시 모달 닫기
    >
      <div
        className="bg-[#F4F4EE] rounded-lg shadow-lg w-[850px] h-[600px] p-6 relative"
        onClick={(e) => e.stopPropagation()} // 이벤트 버블링 방지 - 모달 내부 클릭 시 상위로 전파 안되게 함
      >
        {!isScheduleSelected ? (
          <ModalCreateFeed1 onSelectSchedule={handle.completeScheduleSelection} onClose={onClose} /> 
        ) : (
          <div className="h-full overflow-y-auto p-4 relative" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <button
              className="absolute top-0 right-0 text-gray-500 hover:text-gray-700"
              onClick={() => onClose()}
            >
              &times;
            </button>

            <div className="flex justify-between items-center mb-6">
              <button onClick={handle.goBackToSchedule}>
                <BackIcon />
              </button>
              <div className="flex-grow text-center text-xl font-semibold">
                [ {schedule} ]  
              </div>
              <button
                className="bg-[#707C60] text-white px-4 py-2 rounded-lg pr-4"
                onClick={handle.validateAndComplete} // 완료 버튼 클릭 시 유효성 검사 후 onComplete 호출
              >
                완료
              </button>
            </div>

            <hr className="border-t border-gray-300 mb-7" />

            <div className="flex space-x-6">
              <div className="flex flex-col items-center justify-center w-1/3">
                {selectedImage ? (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                      className="w-60 h-60 object-cover rounded-lg mb-4"
                    />
                    <button
                      onClick={handle.ImageRemove}
                      className="absolute top-2 right-2 bg-black text-white rounded-full p-1 text-xs"
                    >
                      삭제
                    </button>
                  </div>
                ) : (
                  <PictureIcon />
                )}

                <label className="text-white bg-[#707C60] hover:bg-[#4F5843] text-md py-2 px-10 rounded-lg font-base transition-colors duration-200 cursor-pointer mt-4">
                  사진 올리기
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handle.ImageChange}
                  />
                </label>
              </div>

              <div className="w-[1px] h-[450px] bg-gray-400"></div>

              <div className="flex flex-col w-2/3">
                <div className="mb-4">
                  <div className="flex flex-col items-start">
                    <textarea
                      className="w-full p-2 border rounded-lg resize-none focus:outline-none"
                      spellCheck="false"
                      placeholder="제목을 입력하세요."
                      rows={1}
                      value={title}
                      onChange={handle.TitleChange}
                    />
                    <div className="mt-4 w-full">
                      <hr className="border-gray-300" />
                    </div>
                  </div>
                </div>

                <textarea
                  className="w-full h-[260px] p-4 border rounded-lg resize-none focus:outline-none"
                  placeholder="내용을 입력하세요."
                  spellCheck="false"
                  value={content}
                  onChange={handle.ContentChange}
                />

                <div className="flex justify-center space-x-2 my-4">
                  <ButtonLikeCategory
                    label="# 전체"
                    initialClicked={selectedCategory === '전체'}
                    onClick={() => handle.CategoryClick('전체')}
                    px={2}
                    py={1}
                  />
                  <ButtonLikeCategory
                    label="# 명소"
                    initialClicked={selectedCategory === '명소'}
                    onClick={() => handle.CategoryClick('명소')}
                    px={2}
                    py={1}
                  />
                  <ButtonLikeCategory
                    label="# 숙박"
                    initialClicked={selectedCategory === '숙박'}
                    onClick={() => handle.CategoryClick('숙박')}
                    px={2}
                    py={1}
                  />
                  <ButtonLikeCategory
                    label="# 음식점"
                    initialClicked={selectedCategory === '음식점'}
                    onClick={() => handle.CategoryClick('음식점')}
                    px={2}
                    py={1}
                  />
                  <ButtonLikeCategory
                    label="# 카페"
                    initialClicked={selectedCategory === '카페'}
                    onClick={() => handle.CategoryClick('카페')}
                    px={2}
                    py={1}
                  />
                </div>
                <hr className="border-t border-gray-300 mb-5" />

                <div className="flex gap-2" onClick={handle.clickButton}>
                  <LocationIcon />
                  <p className="text-[#B0B0B0] text-sm">
                    {calendarlocation || '위치 추가'}
                  </p>
                </div>

                {openPostcode && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 relative w-[600px]">
                      <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        onClick={handle.closePostcode}
                      >
                        &times;
                      </button>
                      <DaumPostcode
                        onComplete={handle.selectAddress} // 주소 선택 시 실행
                        autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                      />
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <p>위도: {latitude}</p>
                  <p>경도: {longitude}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
