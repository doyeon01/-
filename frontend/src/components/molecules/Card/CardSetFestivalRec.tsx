import React, { useEffect, useState } from 'react';
import { ButtonPersonalInfo } from '../../atoms/button/ButtonPersonalInfo';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DropDown from '../Dropdown/DropDown';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CardSetFestivalRec.css'; 
import { getFestivalData } from '../../../services/api/postFestival';

const CardSetFestivalRec: React.FC = () => {
  const [festivals, setFestivals] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); 
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null); 
  const [pageNo, setPageNo] = useState<number>(1);

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
    fetchInitialData(today);
  }, []);



  const fetchInitialData = async (date: Date) => {
    const eventStartDate: string = date.toISOString().split('T')[0].replace(/-/g, '');
    const areaCode: string | null = selectedPlace;
    try {
      const festivalData = await getFestivalData(pageNo, 30, eventStartDate, areaCode);
      setFestivals(festivalData);
    } catch (error) {
      console.error('Failed to fetch festival data:', error);
    }
  };

  const fetchFestivalData = async (date: Date) => {
    const eventStartDate: string = date.toISOString().split('T')[0].replace(/-/g, '');
    const areaCode: string | null = selectedPlace;
    try {
      const festivalData = await getFestivalData(pageNo, 30, eventStartDate, areaCode);
      setFestivals((prev) => [...prev, ...festivalData]); 
    } catch (error) {
      console.error('Failed to fetch festival data:', error);
    }
  };

  const handleReqApi = async () => {
    if (selectedDate && selectedPlace) {
      setFestivals([]); 
      setPageNo(1); 
      fetchFestivalData(selectedDate);
    }
  };

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4, 
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    autoplay: true, 
    autoplaySpeed: 2000, 
    pauseOnFocus: true, 
    pauseOnHover: true, 
  };

  return (
    <>
      <div className='absolute top-[110px] right-0'>
        <div className="flex items-center justify-end mt-3">
          <DatePicker 
            selected={selectedDate} 
            onChange={(date: Date | null) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="날짜를 선택하세요"
            className="border border-gray-300 rounded px-3 py-2 w-40" 
          />
          <DropDown selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace} />
          <ButtonPersonalInfo label="검색" onClick={handleReqApi} />
        </div>
      </div>
  
      <div className="slider-container mt-5">
        <Slider {...settings}>
          {festivals.map((festival, index) => (
            <div className="flip" key={index}>
              <div className="front" style={{ backgroundImage: `url(${festival.firstimage})` }}>
                <h1 className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm text-center">{festival.title}</h1>
              </div>
              <div className="back">
                <h2>{festival.title}</h2>
                <p>{festival.eventstartdate} ~ {festival.eventenddate}</p>
                <p>{festival.addr1.split(' ').slice(0, 2).join(' ')}</p>
                <p>{festival.addr1.split(' ').slice(2).join(' ')}</p>          
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default CardSetFestivalRec;
