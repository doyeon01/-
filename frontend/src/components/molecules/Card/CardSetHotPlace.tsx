import React, { useRef } from 'react';
import styles from './CardSetHotPlace.module.css';
import testImg1 from '../../../assets/statics/test1.jpg';
import testImg2 from '../../../assets/statics/test2.jpg';
import testImg3 from '../../../assets/statics/test3.png';
import testImg4 from '../../../assets/statics/test4.jpg';
import testImg5 from '../../../assets/statics/test5.jpg';

const CardSetHotPlace: React.FC = () => {
  const sliderRef = useRef<HTMLUListElement>(null);

  const cards = [
    { id: 1, img: testImg1 },
    { id: 2, img: testImg2 },
    { id: 3, img: testImg3 },
    { id: 4, img: testImg4 },
    { id: 5, img: testImg5 },
    { id: 6, img: testImg1 },
    { id: 7, img: testImg2 },
    { id: 8, img: testImg3 },
  ];

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (sliderRef.current) {
      const items = Array.from(sliderRef.current.children);
      if (direction === 'next') {
        sliderRef.current.append(items[0]);
      } else if (direction === 'prev') {
        sliderRef.current.prepend(items[items.length - 1]);
      }
    }
  };

  return (
    <div className={styles.container}>
      <ul className={styles.slider} ref={sliderRef}>
        {cards.map(card => (
          <li
            key={card.id}
            className={styles.item}
            style={{ backgroundImage: `url(${card.img})` }}
          />
        ))}
      </ul>
      <nav className={styles.nav}>
        <button className={styles.btn} onClick={() => handleNavigation('prev')}>
          &lt;
        </button>
        <button className={styles.btn} onClick={() => handleNavigation('next')}>
          &gt;
        </button>
      </nav>
    </div>
  );
};

export default CardSetHotPlace;
