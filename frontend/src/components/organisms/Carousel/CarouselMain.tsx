import React, { useEffect, useState } from 'react';
import img1 from '../../../assets/statics/경주.webp';
import img2 from '../../../assets/statics/부산.webp';
import img3 from '../../../assets/statics/부천아트벙커.webp';
import img4 from '../../../assets/statics/서울.webp';
import img5 from '../../../assets/statics/충남태안.webp';
import img6 from '../../../assets/statics/평창무이예술관.webp';
import img7 from '../../../assets/statics/홍천.webp';
import {PlayIcon,PauseIcon,ArrowLeftIcon,ArrowRightIcon} from '../../../assets/icons/svg'

interface TravelItem {
    title: string;
    imageSrc: string;
    backgroundClass: string;
}

const travelData: TravelItem[] = [
    { title: '고즈넉한 매력,\n경주의 고궁 탐방', imageSrc: img1, backgroundClass: '#7CB7F7' },
    { title: '가을감성 풀 충전!\n요즘 뜨는 부산 여행지', imageSrc: img2, backgroundClass: '#FFDBDD' },
    { title: '특별한 복합 문화공간,\n부천 아트벙커B39', imageSrc: img3, backgroundClass: '#D2C7FF' },
    { title: '도시 속 특별한 경험,\n서울 도시여행', imageSrc: img4, backgroundClass: '#7F8EAF' },
    { title: '자연의 신비로 가득한\n충남 태안 가을여행', imageSrc: img5, backgroundClass: '#FFE17D' },
    { title: '메밀꽃 필 무렵,\n평창 무이예술관', imageSrc: img6, backgroundClass: '#9DCEF0' },
    { title: '가족과 함께 유유자적\n홍천 나들이', imageSrc: img7, backgroundClass: '#E5FFB8' },
];

const CarouselMain: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? travelData.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === travelData.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <>
            <div className="relative w-full h-[550px]">
                <div
                    className="absolute inset-0"
                    style={{ backgroundColor: travelData[currentIndex].backgroundClass }}
                >
                    <div className="relative w-full max-w-4xl mx-auto p-8">
                        <div className="flex items-center">
                            <div className="w-1/2 mt-40">
                                <h1 className="text-4xl font-normal mb-2 mt-16">
                                    {travelData[currentIndex].title.split('\n').map((line, i) => (
                                        <span key={i}>
                                            {line}
                                            {i < travelData[currentIndex].title.split('\n').length - 1 && <br />}
                                        </span>
                                    ))}
                                </h1>
                                <button className="text-sm text-gray-500 underline mt-3">자세히 보기</button>
                            </div>
                        </div>
                    </div>
                </div>
                <img
                    src={travelData[currentIndex].imageSrc}
                    className="absolute top-[140px] right-0 w-[724px] h-[487px] object-cover"
                    alt={travelData[currentIndex].title}
                />
            </div>
            <MainButton
                handlePrev={handlePrev}
                handleNext={handleNext}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
            />
        </>
    );
};

interface MainButtonProps {
    handlePrev: () => void;
    handleNext: () => void;
    currentIndex: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const MainButton: React.FC<MainButtonProps> = ({ handlePrev, handleNext, currentIndex, setCurrentIndex }) => {
    const [sec, setSec] = useState(0);
    const [isPlay, setIsPlay] = useState(true);
    const progressWidth = (sec * 22);

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        if (isPlay) {
            intervalId = setInterval(() => {
                setSec(prevSec => (prevSec + 1) % 10);
            }, 1000);
        } else if (!isPlay && intervalId) {
            clearInterval(intervalId);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [isPlay]); 

    useEffect(() => {
        if (sec === 0 && isPlay) {
            setCurrentIndex(prevIndex => (prevIndex + 1) % travelData.length);
        }
    }, [sec, isPlay, setCurrentIndex]); 

    const handlePlayPause = () => {
        setIsPlay(!isPlay);
    };
    const handleClickPrev = () => {
        handlePrev();
        setSec(1);
    };
    const handleClickNext = () => {
        handleNext();
        setSec(1);
    };

    return (
        <div className="flex items-center space-x-4 ml-[320px]">
            <div className="relative w-[200px] h-[3px] bg-gray-300 flex-shrink-0">                
                <div
                    className="absolute top-0 left-0 h-full bg-black "
                    style={{ width: `${progressWidth}px`, transition: 'width 1s linear' }}
                ></div>
            </div>
            <span className='font-extrabold'>{currentIndex + 1}/{travelData.length}</span>
            <span
                onClick={handleClickPrev}
                className="px-4 py-2 font-bold cursor-pointer"
            >
                <ArrowLeftIcon/>
            </span>
            {isPlay ? (
                <span className='font-bold cursor-pointer' onClick={handlePlayPause}><PauseIcon/></span>
            ) : (
                <span className='font-bold cursor-pointer' onClick={handlePlayPause}><PlayIcon/></span>
            )}
            <span
                onClick={handleClickNext}
                className="px-4 py-2 font-bold cursor-pointer"
            >
                <ArrowRightIcon/>
            </span>
        </div>
    );
};

export default CarouselMain;
