import React, { useEffect, useState } from 'react';
import img1 from '../../../assets/statics/mainCarousel1.jpg';
import img2 from '../../../assets/statics/mainCarousel2.jpg';
import img3 from '../../../assets/statics/mainCarousel3.jpg';

interface TravelItem {
    title: string;
    imageSrc: string;
    backgroundClass: string;
}

const travelData: TravelItem[] = [
    { title: '제주도의 푸른밤', imageSrc: img1, backgroundClass: '#8a9873' },
    { title: '푸른 산책로', imageSrc: img2, backgroundClass: '#8fa6a6' },
    { title: '신비로운 숲', imageSrc: img3, backgroundClass: '#a3b59d' }, 
    { title: '은은한 저녁', imageSrc: img1, backgroundClass: '#b8a99b' },
    { title: '산의 정적', imageSrc: img2, backgroundClass: '#d7c3b1' },
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
                <div className='absolute inset-0' style={{ backgroundColor: travelData[currentIndex].backgroundClass }}>
                    <div className="relative w-full max-w-4xl mx-auto p-8">
                        <div className="flex items-center">
                            <div className="w-1/2 mt-40">
                                <h1 className="text-3xl font-bold mb-2">{travelData[currentIndex].title}</h1>
                                <button className="text-sm text-gray-500 underline">자세히 보기</button>
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
        setSec(1)
    }
    const handleClickNext = () => {
        handleNext();
        setSec(1)
    }

    return (
        <div className="flex items-center space-x-4 ml-[320px]">
            <div className="relative w-[200px] h-[2px] bg-gray-300 flex-shrink-0">
                <div
                    className="absolute top-0 left-0 h-full bg-black"
                    style={{ width: `${progressWidth}px`, transition: 'width 1s linear' }}
                ></div>
            </div>
            <span>{currentIndex + 1}/{travelData.length}</span>
            <span
                onClick={handleClickPrev}
                className="px-4 py-2 font-bold cursor-pointer"
            >
                ←
            </span>
            {isPlay ? (
                <span className='font-bold cursor-pointer' onClick={handlePlayPause}>∥</span>
            ) : (
                <span className='font-bold cursor-pointer' onClick={handlePlayPause}>▷</span>
            )}
            <span
                onClick={handleClickNext}
                className="px-4 py-2 font-bold cursor-pointer"
            >
                →
            </span>
        </div>
    );
};

export default CarouselMain;
