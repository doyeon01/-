import React, { useState } from 'react';
import { ButtonCompanion } from '../atoms/button/ButtonCompanion';
import ModalCompanionDetail from '../organisms/Modal/ModalCompanionDetail';
import testImg1 from '../../assets/statics/test1.jpg';
import testImg2 from '../../assets/statics/test2.jpg';
import testImg3 from '../../assets/statics/test3.png';
import testImg4 from '../../assets/statics/test4.jpg';
import testImg5 from '../../assets/statics/test5.jpg';
import ModalCompanionChoiceImg from '../organisms/Modal/ModalCompanionChoiceImg';

interface ScheduleItem {
  type: string;
  place: string;
  description: string;
  address: string;
  image: string;
}

interface Comment {
  author: string;
  content: string;
}

interface Details {
  description: string;
  schedule: ScheduleItem[];
  comments: Comment[];
}

interface CompanionData {
  date: string;
  title: string;
  author: string;
  img: string;
  details: Details;
}

const dummyData: CompanionData[] = [
  {
    date: "2024-09-08",
    title: "무등산 같이 오르실 분 구합니다",
    author: "고도연기플룸",
    img: 'https://i.pravatar.cc/150?img=1',
    details: {
      description: "이번에 무등산 올라갈 거에요. 다들 무슨 말씀이신지 이해하시죠? 알단 한 번 느껴볼게요. 지금은 휴식을 취하고 계세요",
      schedule: [
        {
          type: "관광지",
          place: "무등산",
          description: "증심사 쪽에서부터 무등산 중머리재까지 쭉! 내려오기",
          address: "광주광역시 동구 증심사길 177",
          image: testImg1
        },
        {
          type: "음식점",
          place: "백숙집",
          description: "증심사 쪽 백숙집에서 닭백숙 먹기",
          address: "광주광역시 동구 증심사길 177",
          image: testImg2
        },
        {
          type: "카페",
          place: "엔젤리너스",
          description: "증심사쪽 분위기 좋은 카페에서 간단히 식후 커피",
          address: "광주광역시 동구 증심사길 177",
          image: testImg3
        }
      ],
      comments: [
        {
          author: "재광아우리존맛",
          content: "일단 휴식? 너무 좋아요"
        },
        {
          author: "갓동님",
          content: "고수입니다."
        }
      ]
    }
  },
  {
    date: "2024-09-08",
    title: "무등산 같이 가실분 ???",
    author: "갓동님",
    img: 'https://i.pravatar.cc/150?img=2',
    details: {
      description: "무등산 산행 함께 하실 분 구해요. 초보자도 환영합니다!",
      schedule: [
        {
          type: "관광지",
          place: "무등산 정상",
          description: "장불재에서 시작하여 중머리재로 내려오기",
          address: "광주광역시 동구 증심사길 177",
          image: testImg4
        }
      ],
      comments: []
    }
  },
  {
    date: "2024-09-08",
    title: "무등산 오르실 용자 구함",
    author: "고층탑스테프",
    img: 'https://i.pravatar.cc/150?img=3',
    details: {
      description: "같이 무등산 산행하실 분 구합니다. 체력은 필수!",
      schedule: [
        {
          type: "관광지",
          place: "서인봉",
          description: "서인봉까지 왕복 5시간 코스",
          address: "광주광역시 동구 무등산길 177",
          image: testImg5
        }
      ],
      comments: []
    }
  },
  {
    date: "2024-09-08",
    title: "무등산 백숙먹자했잖아",
    author: "재광아우리존맛",
    img: 'https://i.pravatar.cc/150?img=4',
    details: {
      description: "백숙 먹고 싶어서 같이 먹으실 분 구해요. 산책도 하죠?",
      schedule: [
        {
          type: "음식점",
          place: "백숙집",
          description: "백숙 먹고 산책하기",
          address: "광주광역시 동구 증심사길 177",
          image: testImg1
        }
      ],
      comments: []
    }
  }
];

export const CompanionPage: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isChoiceModalOpen, setIsChoiceModalOpen] = useState(false);

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleOpenChoiceModal = () => {
    setIsChoiceModalOpen(true);
  };

  const handleCloseChoiceModal = () => {
    setIsChoiceModalOpen(false);
  };

  return (
    <>
      <div className='fixed w-[300px] h-full bg-white mt-[80px] flex flex-col items-center'>
        <div className='flex flex-col items-center w-full'>
          <input 
            type="text" 
            placeholder="검색어를 입력하세요" 
            className='border-2 border-[#B8B1AB] rounded-lg p-2 mb-2 w-[260px]' 
          />
          <ButtonCompanion label='내 동행 모집하기' onClick={handleOpenChoiceModal} /> 
        </div>
        {dummyData.map((data, index) => {
          const isSelected = index === selectedIndex;
          return (
            <div 
              key={index} 
              className={`flex items-center border-b border-gray-300 py-4 w-full cursor-pointer
                ${isSelected ? 'bg-[#F0F0F3] ' : 'bg-none'}`}
              onClick={() => handleItemClick(index)}  
            >
              <div className={`flex  ${isSelected ? 'bg-[#B6AFA9] text-white' : 'bg-[#F0F0F3] text-black'} 
                  rounded-lg items-center justify-center w-16 h-16 flex-col mr-3`}>
                <div className='font-bold text-[21.75px] leading-none'>{data.date.substring(8, 10)}</div>
                <div className='font-bold text-[17.4px] leading-none'>{data.date.substring(6, 7)}월</div>
              </div>  
              <div className='flex-grow'>
                <div className='font-semibold text-sm'>{data.title}</div>
                <div className='flex flex-row'>
                  <img 
                    src={data.img} 
                    alt={data.title} 
                    className='w-8 h-8 rounded-full object-cover mr-1' 
                  />
                  <div className={`text-xs  mt-2`}>{data.author}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {selectedIndex !== null && (
        <ModalCompanionDetail data={dummyData[selectedIndex]} />
      )}
      {isChoiceModalOpen && (
        <ModalCompanionChoiceImg onClose={handleCloseChoiceModal} />
      )}
    </>
  );
};
