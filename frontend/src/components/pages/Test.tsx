import React, { useEffect, useState } from 'react';
import styles from './Test.module.css';

const images = [
  "https://cdn.mos.cms.futurecdn.net/dP3N4qnEZ4tCTCLq59iysd.jpg",
  "https://i.redd.it/tc0aqpv92pn21.jpg",
  "https://wharferj.files.wordpress.com/2015/11/bio_north.jpg",
  "https://images7.alphacoders.com/878/878663.jpg",
  "https://theawesomer.com/photos/2017/07/simon_stalenhag_the_electric_state_6.jpg",
  "https://da.se/app/uploads/2015/09/simon-december1994.jpg"
];

const titles = [
  "Lossless Youths",
  "Estrange Bond",
  "The Gate Keeper",
  "Last Trace Of Us",
  "Urban Decay",
  "The Migration"
];

const descriptions = [
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim."
];

const Test = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <>
      <ul className={styles.slider}>
        {images.map((image, index) => (
          <li
            key={index}
            className={styles.item}
            style={{
              backgroundImage: index === activeIndex ? `url('${image}')` : 'none',
              opacity: index === activeIndex ? 1 : 0,
              transition: 'opacity 0.75s ease-in-out',
            }}
          >
            <div className={`${styles.content} ${index === activeIndex ? styles.show : ''}`}>
              <h2 className={styles.title}>{titles[index]}</h2>
              <p className={styles.description}>{descriptions[index]}</p>
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

export default Test;
