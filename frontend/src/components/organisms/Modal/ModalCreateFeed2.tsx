import { useState } from 'react';
import Swal from 'sweetalert2';  
import { PictureIcon, LocationIcon, BackIcon } from '../../../assets/icons/svg';
import ButtonLikeCategory from '../../atoms/button/ButtonLikeCategory';
import DaumPostcode from 'react-daum-postcode';
import ModalCreateFeed1 from './ModalCreateFeed1';
import axios from 'axios'; 
import { FeedCreate } from '../../../services/api/FeedService';
import { useRecoilValue } from 'recoil';
import { UserId } from '../../../Recoil/atoms/Auth';

export const ModalCreateFeed2: React.FC<{ onClose: () => void, onComplete: () => void }> = ({ onClose, onComplete }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // 이미지
  const [title, setTitle] = useState<string>(''); // 제목
  const [placeName, setPlaceName] = useState<string>('');// 장소
  const [content, setContent] = useState<string>('');  // 내용
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // 카테고리
  const [openPostcode, setOpenPostcode] = useState(false); // 주소 선택 모달 상태
  const [calendarlocation, setCalendarLocation] = useState(''); // 주소 상태
  const [schedule, setSchedule] = useState<string>(''); // 선택된 일정 제목 상태
  const [totalPlanId, setTotalPlanId] = useState<number>(0);
  const [isScheduleSelected, setIsScheduleSelected] = useState(false); // 일정 선택 상태
  const [latitude, setLatitude] = useState<number | null>(null); // 위도 상태
  const [longitude, setLongitude] = useState<number | null>(null); // 경도 상태
  const userId = useRecoilValue(UserId);

  const apikey = import.meta.env.VITE_KAKAO_SPOT_API_KEY; 

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
    PlaceNameChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setPlaceName(e.target.value);
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

      await axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
        params: { query: data.address }, 
        headers: {
          Authorization: `KakaoAK ${apikey}`,
        },
      })
      .then((res) => {
        const result = res.data.documents[0];
        setLongitude(Number(result.x));
        setLatitude(Number(result.y));
      })
      .catch((error) => {
        console.error(error); 
      });
    },
    completeScheduleSelection: (id: number, title: string) => {
      setTotalPlanId(id);
      setSchedule(title); // 선택된 일정 ID를 상태로 설정
      setIsScheduleSelected(true); // 일정 선택 완료 상태로 변경
    },
    goBackToSchedule: () => {
      setIsScheduleSelected(false); // 게시글 작성 모달에서 일정 선택 모달로 돌아감
    },
    validateAndComplete: () => {
      if (!title || !content || !selectedImage || !calendarlocation || !latitude || !longitude || !placeName) {
        Swal.fire({
          icon: 'warning',
          title: '내용을 입력하세요',
          text: '이미지, 제목, 장소, 내용, 위치를 모두 작성해 주세요.',
          confirmButtonText: '확인'
        });
        return;
      }

      const data = new FormData();

      const jsonData = {
          totalPlanId,
          placeName,
          title,
          content,
          address1: calendarlocation,    
          address2: calendarlocation, 
          longitude,
          latitude,
          placeType: selectedCategory,
          userId
      };

      const jsonBlob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });

      
      data.append('data', jsonBlob);
      data.append('image', selectedImage);

      Swal.fire({
        title: '피드 생성 중입니다...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      FeedCreate(data)
        .then(() => {
          console.log('피드 생성 완료');
          Swal.fire({
            icon: 'success',
            title: '피드 생성이 완료되었습니다!',
            confirmButtonText: '확인',
          }).then(() => {
            onComplete();
          });
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: '피드 생성에 실패했습니다.',
            text: '다시 시도해주세요.',
            confirmButtonText: '확인'
          });
        });
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
              className="absolute top-[-5px] right-0 text-gray-500 hover:text-gray-700"
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
                className="bg-[#645e59] text-white px-4 py-2 rounded-lg pr-4"
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

                <label className="text-white bg-[#645e59] hover:bg-[#4F5843] text-md py-2 px-10 rounded-lg font-base transition-colors duration-200 cursor-pointer mt-4">
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

                <div className="mb-4">
                  <div className="flex flex-col items-start">
                    <textarea
                      className="w-full p-2 border rounded-lg resize-none focus:outline-none"
                      spellCheck="false"
                      placeholder="장소를 입력하세요."
                      rows={1}
                      value={placeName}
                      onChange={handle.PlaceNameChange}
                    />
                    <div className="mt-4 w-full">
                      <hr className="border-gray-300" />
                    </div>
                  </div>
                </div>

                <textarea
                  className="w-full h-[200px] p-4 border rounded-lg resize-none focus:outline-none"
                  placeholder="내용을 입력하세요."
                  spellCheck="false"
                  value={content}
                  onChange={handle.ContentChange}
                />

                <div className="flex justify-center space-x-2 my-4">
                  <ButtonLikeCategory
                    label="# 명소"
                    initialClicked={selectedCategory === 'TOURIST_ATTRACTION'}
                    onClick={() => handle.CategoryClick('TOURIST_ATTRACTION')}
                    px={2}
                    py={1}
                  />
                  <ButtonLikeCategory
                    label="# 숙박"
                    initialClicked={selectedCategory === 'ACCOMMODATION'}
                    onClick={() => handle.CategoryClick('ACCOMMODATION')}
                    px={2}
                    py={1}
                  />
                  <ButtonLikeCategory
                    label="# 음식점"
                    initialClicked={selectedCategory === 'RESTAURANT'}
                    onClick={() => handle.CategoryClick('RESTAURANT')}
                    px={2}
                    py={1}
                  />
                  <ButtonLikeCategory
                    label="# 카페"
                    initialClicked={selectedCategory === 'CAFE'}
                    onClick={() => handle.CategoryClick('CAFE')}
                    px={2}
                    py={1}
                  />
                  <ButtonLikeCategory
                    label="# 기타"
                    initialClicked={selectedCategory === 'ETC'}
                    onClick={() => handle.CategoryClick('ETC')}
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
                        onClick={() => setOpenPostcode(false)} // 여기에 onClick 추가
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

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
