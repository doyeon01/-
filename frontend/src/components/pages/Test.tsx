import React, { useState } from 'react';
import img1 from '../../assets/statics/mainCarousel1.jpg';
import img2 from '../../assets/statics/mainCarousel2.jpg';
import img3 from '../../assets/statics/mainCarousel3.jpg';
import styles from './Test.module.css';

interface TravelItem {
    title: string;
    imageSrc: string;
    description: string;
}

const travelData: TravelItem[] = [
    { title: '제주도의 푸른밤', imageSrc: img1, description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim."
    },
    { title: '푸른 산책로', imageSrc: img2, description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim."
    }, 
    { title: '신비로운 숲', imageSrc: img3, description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim."
    },
    { title: '은은한 저녁', imageSrc: img1, description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim."
    }, 
    { title: '산의 정적', imageSrc: img2, description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim."
    }, 
];

export const Test: React.FC = () => {
    const [data, setData] = useState(travelData);

    const handleNextClick = () => {
      setData((prevData) => {
        const firstItem = prevData[0];
        return [...prevData.slice(1), firstItem];
      });
    };
  
    const handlePrevClick = () => {
      setData((prevData) => {
        const lastItem = prevData[prevData.length - 1];
        return [lastItem, ...prevData.slice(0, prevData.length - 1)];
      });
    };
  
    return (
      <>
        <ul className={styles.slider}>
          {data.map((item, index) => (
            <li
              key={index}
              className={styles.item}
              style={{ backgroundImage: `url('${item.imageSrc}')` }}
            >
              <div
                className={`${styles.content}`}
                style={{ opacity: index === 1 ? 1 : 0 }}
              >
                <h2 className={styles.title}>{item.title}</h2>
                <p className={styles.description}>{item.description}</p>
                <button>Read More</button>
              </div>
            </li>
          ))}
        </ul>
        <nav className={styles.nav}>
          <button className={`${styles.btn} ${styles.prev}`} onClick={handlePrevClick}>
            이전
          </button>
          <button className={`${styles.btn} ${styles.next}`} onClick={handleNextClick}>
            다음
          </button>
        </nav>
      </>
    );
  };
