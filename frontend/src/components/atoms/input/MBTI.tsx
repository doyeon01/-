import IMG_Bear from '../../../assets/statics/Char_Bear.png'
import IMG_Cheetar from '../../../assets/statics/Char_Cheetar.png'
import IMG_duck from '../../../assets/statics/Char_duck.png'
import IMG_Fox from '../../../assets/statics/Char_Fox.png'
import IMG_Hippo from '../../../assets/statics/Char_Hippo.png'
import IMG_Koala from '../../../assets/statics/Char_Koala.png'
import IMG_Otter from '../../../assets/statics/Char_Otter.png'
import IMG_Panda from '../../../assets/statics/Char_Panda.png'
import IMG_Penguine from '../../../assets/statics/Char_Penguine.png'
import IMG_Rabiit from '../../../assets/statics/Char_Rabiit.png'
import IMG_Racoon from '../../../assets/statics/Char_Racoon.png'
import IMG_Seal from '../../../assets/statics/Char_Seal.png'
import IMG_Squrriel from '../../../assets/statics/Char_Squrriel.png'
import IMG_Wolf from '../../../assets/statics/Char_Wolf.png'
import IMG_RacoonDog from '../../../assets/statics/Char_RacoonDog.png'
import IMG_Rhino from '../../../assets/statics/Char_Rhino.png'

export const NEKR: React.FC = () => {
  const items = [
    "자연을 선호하며, 유명한 자연 명소에서 휴식을 즐기는 유형입니다.",
    "주로 자연 속에서 재충전하는 시간을 가지며, 트레킹이나 산책처럼 가벼운 활동을 하면서 풍경을 감상합니다.",
    "여행의 주된 목적은 경험을 통해 내면의 성장을 이루는 것이며, 감각적인 경험을 소중히 여깁니다.무리한 일정보다는 느긋하게 자연을 즐기며 여유로운 여행을 선호합니다.",
    "잘 알려진 자연 관광지를 찾아 편안한 숙소에서 휴식을 취하고, 그곳의 자연을 만끽하는 데 중점을 둡니다."
  ];
    return (
    <>
      <img src={IMG_Bear} alt="" className='pb-3'/>
      <div className='text-center text-[30px] text-[#9C1D05] font-bold pb-4'>자연을 사랑하는 곰</div>
      <div className="p-4">
      <ul className="list-disc pl-5 space-y-4">
        {items.map((item, index) => (
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </div>
    </>);
  };

export const CPKA: React.FC = () => {
  const items = [
    "도시를 선호하며, 유명한 관광지를 적극적으로 체험하고 기록하는 유형입니다. 주로 유명한 랜드마크를 빠짐없이 방문하고, 그곳에서 할 수 있는 다양한 활동에 참여합니다.",
    "도시 투어, 미술관 방문, 현지 음식 탐방 등을 계획하며, 체험을 통해 즐거움을 얻습니다.",
    "촬영에도 관심이 많아 여행 중 만나는 모든 순간을 사진으로 남기고, 소셜 미디어나 블로그에 공유하는 것을 즐깁니다.",
    "여행을 철저하게 계획하며, 가능한 많은 활동과 장소를 소화하려고 합니다."
  ];
    return (
    <>
      <img src={IMG_Cheetar} alt="" className='pb-3'/>
      <div className='text-center text-[30px] text-[#9C1D05] font-bold pb-4'>활기찬 치타</div>
      <div className="p-4">
      <ul className="list-disc pl-5 space-y-4">
        {items.map((item, index) => (
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </div>
    </>);
  };
  
export const NPUR: React.FC = () => {
  const items = [
    "잘 알려지지 않은 자연 속에서 조용히 휴식하고, 사진으로 그 순간을 기록하는 것을 즐기는 유형입니다.", 
    "유명한 관광지보다 사람이 적고 평온한 자연을 찾아 휴식을 취합니다.",
    "한적한 숲속이나 호숫가에서 느긋한 시간을 보내며, 주변의 아름다움을 사진으로 남기고 그 순간을 오랫동안 간직하려고 합니다.", 
    "휴식과 촬영을 적절히 조화시키며, 자연의 고요함을 느끼고 스스로를 재충전하는 시간이 중요한 이들에게, 촬영은 자연과의 교감을 기록하는 중요한 수단입니다."
  ];
    return (
    <>
      <img src={IMG_duck} alt="" className='pb-3'/>
      <div className='text-center text-[30px] text-[#9C1D05] font-bold pb-4'>비밀스러운 오리</div>
      <div className="p-4">
      <ul className="list-disc pl-5 space-y-4">
        {items.map((item, index) => (
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </div>
    </>);
  };
export const CEUA: React.FC = () => {
  const items = [
    "잘 알려지지 않은 도시의 숨겨진 명소를 탐험하며 체험 활동을 통해 경험을 쌓는 유형입니다.",
    "관광객이 잘 찾지 않는 카페, 골목길, 예술적 공간을 찾아다니며, 그곳에서 현지인처럼 느끼고 활동하는 것을 좋아합니다.",
    "도시 속에서 색다른 체험 활동에 참여하고, 이를 통해 새로운 문화를 배웁니다. 촬영보다는 현지에서의 경험을 중시하며, 다양한 사람들과의 교류를 통해 여행에서 얻는 의미를 더욱 깊이 느낍니다.",
    "여행 후에도 그곳에서 얻은 교훈을 일상에 적용하려고 합니다. " ];
    return (
    <>
      <img src={IMG_Fox} alt="" className='pb-3'/>
      <div className='text-center text-[30px] text-[#9C1D05] font-bold pb-4'>독창적인 여우</div>
      <div className="p-4">
      <ul className="list-disc pl-5 space-y-4">
        {items.map((item, index) => (
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </div>
    </>);
  };
export const NEKA: React.FC = () => {
  const items = [
    "자연 속에서 모험적인 체험 활동과 경험을 즐기는 유형입니다. 하이킹, 래프팅, 서핑 등 다양한 야외 활동을 통해 몸을 움직이며, 자연과 함께하는 도전을 즐깁니다.",
    "유명한 국립공원이나 자연 명소에서의 활동을 계획하며, 그 과정에서 자신을 시험하고 성취감을 느낍니다.",
    "경험을 통해 얻은 교훈을 소중히 여기며, 여행을 통해 내면적 성장을 추구합니다.",
    "촬영보다는 체험을 중시하며, 그 순간을 온전히 느끼고 여행을 통해 얻은 경험을 일상으로 가져가려는 성향이 강합니다."
  ];
    return (
    <>
      <img src={IMG_Wolf} alt="" className='pb-3'/>
      <div className='text-center text-[30px] text-[#9C1D05] font-bold pb-4'>도전적인 늑대</div>
      <div className="p-4">
      <ul className="list-disc pl-5 space-y-4">
        {items.map((item, index) => (
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </div>
    </>);
  };
export const CPKR: React.FC = () => {
  const items = [
    "도시 속에서 여유롭게 휴식을 취하고, 그 순간을 촬영하는 것을 즐기는 유형입니다.",
    "유명한 관광지나 카페, 호텔에서 느긋한 시간을 보내며, 도시의 풍경을 사진으로 남기는 것을 중요하게 생각합니다.",
    "도시의 유명한 명소를 배경으로 인생 샷을 남기고, 주변 사람들과 공유하는 것을 좋아합니다.",
    "지나치게 많은 활동보다는 편안한 일정 속에서 촬영을 통해 기억을 남기고, 그 과정에서 휴식을 취합니다.",
    "여행 후에도 남긴 사진을 보며 그 순간을 다시 떠올리며 만족을 느낍니다."
  ];
    return (
    <>
      <img src={IMG_Hippo} alt="" className='pb-3'/>
      <div className='text-center text-[30px] text-[#9C1D05] font-bold pb-4'>우아한 하마</div>
      <div className="p-4">
      <ul className="list-disc pl-5 space-y-4">
        {items.map((item, index) => (
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </div>
    </>);
  };
export const NEUR: React.FC = () => {
  const items = [
    "잘 알려지지 않은 자연 속에서 조용히 휴식을 취하고, 경험을 통해 내면의 성장을 이루는 유형입니다.",
     "한적한 자연 속에서 자신만의 시간을 보내며, 자연의 소리를 들으며 사색하는 것을 좋아합니다.",
     "유명하지 않은 장소를 찾아 조용히 휴식을 취하며, 자연과 교감하는 시간을 갖습니다.",
     "촬영보다는 그 순간을 느끼고 경험하는 데 집중하며, 여행을 통해 자신을 돌아보고 재충전하는 시간을 가지려 합니다.",
     "고요한 자연 속에서의 휴식과 내면의 성찰이 이들에게는 중요한 여행의 목적입니다."
  ];
    return (
    <>
      <img src={IMG_Koala} alt="" className='pb-3'/>
      <div className='text-center text-[30px] text-[#9C1D05] font-bold pb-4'>고요한 코알라</div>
      <div className="p-4">
      <ul className="list-disc pl-5 space-y-4">
        {items.map((item, index) => (
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </div>
    </>);
  };
export const CEUR: React.FC = () => {
  const items = [
    "도시 속에서도 잘 알려지지 않은 곳에서 휴식을 취하고, 새로운 경험을 쌓는 유형입니다.",
    "사람들로 붐비는 관광지 대신 현지인들만 아는 카페나 한적한 공원을 찾아 느긋한 시간을 보냅니다.",
    "그 과정에서 도시의 일상적인 모습을 체험하고, 새로운 경험을 통해 여행의 의미를 찾습니다.",
    "주로 촬영보다는 그 순간을 직접 느끼고, 차분한 분위기 속에서 휴식을 취하는 데 집중합니다.",
    "여행 중에 얻은 경험을 소중하게 여기며, 그 경험을 통해 내면적으로 성장하려고 합니다."
  ];
    return (
    <>
      <img src={IMG_Otter} alt="" className='pb-3'/>
      <div className='text-center text-[30px] text-[#9C1D05] font-bold pb-4'>차분한 수달</div>
      <div className="p-4">
      <ul className="list-disc pl-5 space-y-4">
        {items.map((item, index) => (
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </div>
    </>);
  };
export const NPKA: React.FC = () => {
  const items = [
    "자연 속에서 모험적인 체험 활동을 즐기고, 그 순간을 촬영하는 것을 중요하게 생각하는 유형입니다.",
    "유명한 자연 명소에서 하이킹, 서핑, 스카이다이빙 등의 활동을 즐기며, 그 순간을 사진으로 남겨 추억으로 간직합니다.",
    "체험 활동을 통해 얻은 성취감과 도전의 순간을 기록하는 것이 중요하며, 그 기록을 통해 자신이 이룬 성과를 되돌아보는 것을 좋아합니다.",
    "SNS나 개인 기록을 통해 여행의 추억을 공유하며, 촬영을 통해 자신이 경험한 자연의 아름다움을 다른 사람들과 나누려 합니다."
  ];
    return (
    <>
      <img src={IMG_Panda} alt="" className='pb-3'/>
      <div className='text-center text-[30px] text-[#9C1D05] font-bold pb-4'>모험적인 판다</div>
      <div className="p-4">
      <ul className="list-disc pl-5 space-y-4">
        {items.map((item, index) => (
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </div>
    </>);
  };
export const CPUA: React.FC = () => {
  const items = [
    "도시 속에서 잘 알려지지 않은 장소를 찾아다니며, 다양한 체험 활동과 촬영을 즐기는 유형입니다.",
    "유명하지 않은 골목이나 카페, 현지인들만 아는 공간에서 활동하며, 그 순간을 사진으로 기록하는 것을 좋아합니다.",
    "촬영한 사진을 SNS에 올리거나 블로그에 기록하며, 자신만의 독특한 경험을 공유합니다.",
    "체험 활동을 통해 도시 속의 새로운 면을 발견하고, 그 과정에서 여행의 의미를 찾습니다.",
    "여행지에서 만난 사람들과 교류하며 그곳의 문화를 배우고, 그 경험을 소중히 여기며 기록으로 남깁니다."
  ];
    return (
    <>
      <img src={IMG_Penguine} alt="" className='pb-3'/>
      <div className='text-center text-[30px] text-[#9C1D05] font-bold pb-4'>탐구적인 펭귄</div>
      <div className="p-4">
      <ul className="list-disc pl-5 space-y-4">
        {items.map((item, index) => (
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </div>
    </>);
  };
export const CEKR: React.FC = () => {
  const items = [
    "도시 속에서 여유롭게 휴식을 취하며, 새로운 경험을 통해 내면의 성장을 추구하는 유형입니다.",
    "유명한 관광지를 방문하되, 느긋한 속도로 도시를 즐기며 과도한 활동보다는 편안한 일정을 선호합니다.",
    "도심 속 카페에서 여유를 즐기거나, 유명한 공원에서 산책을 하며 도시의 일상적인 모습을 체험합니다.",
    "여행을 통해 느낀 감정과 경험을 중요하게 생각하며, 촬영보다는 그 순간의 경험을 중시합니다.",
    "새로운 경험을 통해 자신을 성장시키고, 여행의 의미를 찾아가는 시간을 가집니다."
  ];
    return (
    <>
      <img src={IMG_Rabiit} alt="" className='pb-3'/>
      <div className='text-center text-[30px] text-[#9C1D05] font-bold pb-4'>느긋한 토끼</div>
      <div className="p-4">
      <ul className="list-disc pl-5 space-y-4">
        {items.map((item, index) => (
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </div>
    </>);
  };
export const CEKA: React.FC = () => {
  const items = [
    "도시 속에서 유명한 관광지와 다양한 체험 활동을 즐기며, 경험을 중시하는 유형입니다.",
    "박물관, 랜드마크, 공연장 등 다양한 장소를 방문하며 도시의 문화를 체험하는 것을 좋아합니다.",
    "체험 활동을 통해 새로운 것을 배우고, 그 경험을 통해 얻는 지식을 중요시합니다.",
    "촬영보다는 그 순간을 온전히 느끼고, 경험을 통해 더 넓은 시야를 가지려 합니다.",
    "도시의 다양한 면모를 경험하며, 여행 중 만난 사람들과의 교류를 소중히 여기고, 그 과정을 통해 자신을 성장시키려 합니다"
  ];
    return (
    <>
      <img src={IMG_Racoon} alt="" className='pb-3'/>
      <div className='text-center text-[30px] text-[#9C1D05] font-bold pb-4'>영리한 라쿤</div>
      <div className="p-4">
      <ul className="list-disc pl-5 space-y-4">
        {items.map((item, index) => (
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </div>
    </>);
  };
export const NPKR: React.FC = () => {
  const items = [
    "자연 속에서 평온한 시간을 보내며, 그 순간을 사진으로 기록하는 유형입니다.",
    "유명한 자연 명소에서 휴식을 취하며, 아름다운 풍경을 카메라에 담아 추억으로 남기는 것을 좋아합니다.",
    "주로 자연 속에서 느긋하게 시간을 보내면서도, 그곳의 경치를 사진으로 기록하는 데 많은 시간을 할애합니다.",
    "촬영을 통해 자신만의 여행 기록을 남기고, 그 사진을 보며 여행의 여운을 오래 간직합니다.",
    "자연 속에서의 평온한 순간을 기록하고, 그 경험을 사진을 통해 다른 사람들과 공유하기도 합니다."
  ];
    return (
    <>
      <img src={IMG_Seal} alt="" className='pb-3'/>
      <div className='text-center text-[30px] text-[#9C1D05] font-bold pb-4'>평온한 물개</div>
      <div className="p-4">
      <ul className="list-disc pl-5 space-y-4">
        {items.map((item, index) => (
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </div>
    </>);
  };
export const NEUA: React.FC = () => {
  const items = [
    "잘 알려지지 않은 자연 속에서 모험적인 체험 활동을 즐기고, 그 경험을 소중히 여기는 유형입니다.",
    "하이킹, 캠핑, 서핑 등의 야외 활동을 통해 자연을 탐험하며, 그 과정에서 새로운 것을 배우고 성취감을 느낍니다.",
    "촬영보다는 그 순간의 경험을 중요하게 생각하며, 자연 속에서 스스로를 시험하는 과정을 통해 내면적 성장을 추구합니다.",
    "잘 알려지지 않은 장소를 찾고, 그곳에서 얻는 새로운 경험을 소중히 여기며, 그 경험을 통해 삶의 새로운 시각을 얻으려 합니다."
  ];
    return (
    <>
      <img src={IMG_Squrriel} alt="" className='pb-3'/>
      <div className='text-center text-[30px] text-[#9C1D05] font-bold pb-4'>탐험적인 다람쥐</div>
      <div className="p-4">
      <ul className="list-disc pl-5 space-y-4">
        {items.map((item, index) => (
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </div>
    </>);
  };
export const CPUR: React.FC = () => {
  const items = [
    "도시 속에서 잘 알려지지 않은 장소에서 휴식을 취하며, 그 순간을 촬영하는 유형입니다.",
    "현지인들이 즐기는 한적한 카페나 골목길에서 여유롭게 시간을 보내며, 그곳의 고요한 분위기를 사진으로 기록하는 것을 즐깁니다.",
    "복잡한 관광 명소보다는 조용한 곳에서 시간을 보내며, 그곳에서 발견한 특별한 순간을 사진으로 남깁니다.",
    "촬영을 통해 자신만의 여행 경험을 기록하고, 그 사진을 SNS나 개인 기록에 남기며 특별한 기억을 간직하려 합니다."
  ];
    return (
    <>
      <img src={IMG_RacoonDog} alt="" className='pb-3'/>
      <div className='text-center text-[30px] text-[#9C1D05] font-bold pb-4'>여유로운 너구리</div>
      <div className="p-4">
      <ul className="list-disc pl-5 space-y-4">
        {items.map((item, index) => (
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </div>
    </>);
  };
export const NPUA: React.FC = () => {
  const items = [
    "잘 알려지지 않은 자연 속에서 모험적인 활동을 즐기고, 그 순간을 사진으로 남기는 것을 중요하게 생각하는 유형입니다.",
    "하이킹, 트레킹, 캠핑 등 다양한 야외 활동을 하며 자연을 탐험하고, 그 경험을 사진으로 기록합니다.",
    "잘 알려지지 않은 장소에서 모험을 즐기며, 그곳의 독특한 경치를 카메라에 담아 추억으로 남깁니다.",
    "촬영한 사진은 여행의 기록이자 성취의 증거로 간직하며, 그 순간을 통해 자신이 이룬 것들을 돌아보는 것을 좋아합니다."
  ];
    return (
    <>
      <img src={IMG_Rhino} alt="" className='pb-3'/>
      <div className='text-center text-[30px] text-[#9C1D05] font-bold pb-4'>모험적인 코뿔소</div>
      <div className="p-4">
      <ul className="list-disc pl-5 space-y-4">
        {items.map((item, index) => (
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </div>
    </>);
  };