import React, { useEffect, useState, useRef } from 'react';
import styles from './CardSetFestivalRec.module.css';
import { ButtonPersonalInfo } from '../../atoms/button/ButtonPersonalInfo';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DropDown from '../Dropdown/DropDown';
import { getFestivalData } from '../../../services/api/postFestival';

const CardSetFestivalRec: React.FC = () => {
  const [festivals, setFestivals] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); 
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null); 
  const [pageNo, setPageNo] = useState<number>(1);
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
    fetchInitialData(today);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPageNo((prev) => prev + 1); 
      }
    });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loader]);

  useEffect(() => {
    if (pageNo > 1) {
      const today = new Date();
      fetchFestivalData(today);
    }
  }, [pageNo]);

  const fetchInitialData = async (date: Date) => {
    const eventStartDate: string = date.toISOString().split('T')[0].replace(/-/g, '');
    const areaCode: string | null = selectedPlace;
    try {
      const festivalData = await getFestivalData(pageNo, 10, eventStartDate, areaCode);
      setFestivals(festivalData);
    } catch (error) {
      console.error('Failed to fetch festival data:', error);
    }
  };

  const fetchFestivalData = async (date: Date) => {
    const eventStartDate: string = date.toISOString().split('T')[0].replace(/-/g, '');
    const areaCode: string | null = selectedPlace;
    try {
      const festivalData = await getFestivalData(pageNo, 10, eventStartDate, areaCode);
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

  return (
    <>
      <div className="flex items-center justify-center mb-4">
        <div className="flex">
          <DatePicker 
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="날짜를 선택하세요"
            className="border border-gray-300 rounded px-3 py-2 w-40" 
          />
        </div>        
        <DropDown selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace} />
        <ButtonPersonalInfo label="검색" onClick={handleReqApi} />
      </div>

      <div className="flex flex-wrap -mx-2">
        {festivals.map((festival, index) => (
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 px-2 mb-4" key={index}>
            <div className={styles.flip}>
              <div className={styles.front} style={{ backgroundImage: `url(${festival.firstimage})` }}>
                <h1 className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm text-center">{festival.title}</h1>
              </div>
              <div className={styles.back}>
                <h2>{festival.title}</h2>
                <p>{festival.eventstartdate} ~ {festival.eventenddate}</p>
                <p>{festival.addr1.split(' ').slice(0, 2).join(' ')}</p>
                <p>{festival.addr1.split(' ').slice(2).join(' ')}</p>          
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='mb-60'></div>
      <div ref={loader} /> 
    </>
  );
};

export default CardSetFestivalRec;
