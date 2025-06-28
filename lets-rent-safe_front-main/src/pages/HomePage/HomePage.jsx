// src/pages/HomePage/HomePage.jsx

import React, { useState, useRef } from 'react';
import styles from './HomePage.module.scss';
import rentBotImage from '../../assets/images/rentbot.png';

// ВРЕМЕННЫЕ ДАННЫЕ ДЛЯ КАТАЛОГА
const houses = [
  {
    id: 1,
    images: [
      'https://www.mera-project.ru/upload/resize_cache/sprint.editor/daa/625_420_2/daa6ed3c1ba97ce257f873ecee8716e5.jpg',
      'https://www.mera-project.ru/upload/resize_cache/sprint.editor/daa/625_420_2/daa6ed3c1ba97ce257f873ecee8716e5.jpg',
      'https://www.mera-project.ru/upload/resize_cache/sprint.editor/daa/625_420_2/daa6ed3c1ba97ce257f873ecee8716e5.jpg',
    ],
    price: 2200000,
    pricePerM2: 80000,
    area: 50,
    floor: 12,
    floors: 14,
    rooms: 2,
    address: 'Краснодар, ул. Садовая',
    date: '16 июня 16:20',
    isFavorite: false,
  },
  {
    id: 2,
    images: [
        'https://www.mera-project.ru/upload/resize_cache/sprint.editor/daa/625_420_2/daa6ed3c1ba97ce257f873ecee8716e5.jpg',
        'https://www.mera-project.ru/upload/resize_cache/sprint.editor/daa/625_420_2/daa6ed3c1ba97ce257f873ecee8716e5.jpg',
        'https://www.mera-project.ru/upload/resize_cache/sprint.editor/daa/625_420_2/daa6ed3c1ba97ce257f873ecee8716e5.jpg',
    ],
    price: 2200000,
    pricePerM2: 80000,
    area: 50,
    floor: 12,
    floors: 14,
    rooms: 2,
    address: 'Краснодар, ул. Садовая',
    date: '16 июня 16:20',
    isFavorite: true,
  },
  {
    id: 3,
    images: [
        'https://www.mera-project.ru/upload/resize_cache/sprint.editor/daa/625_420_2/daa6ed3c1ba97ce257f873ecee8716e5.jpg',
        'https://www.mera-project.ru/upload/resize_cache/sprint.editor/daa/625_420_2/daa6ed3c1ba97ce257f873ecee8716e5.jpg',
        'https://www.mera-project.ru/upload/resize_cache/sprint.editor/daa/625_420_2/daa6ed3c1ba97ce257f873ecee8716e5.jpg',
    ],
    price: 2200000,
    pricePerM2: 80000,
    area: 50,
    floor: 12,
    floors: 14,
    rooms: 2,
    address: 'Краснодар, ул. Садовая',
    date: '16 июня 16:20',
    isFavorite: true,
  },
  {
    id: 4,
    images: [
        'https://www.mera-project.ru/upload/resize_cache/sprint.editor/daa/625_420_2/daa6ed3c1ba97ce257f873ecee8716e5.jpg',
        'https://www.mera-project.ru/upload/resize_cache/sprint.editor/daa/625_420_2/daa6ed3c1ba97ce257f873ecee8716e5.jpg',
        'https://www.mera-project.ru/upload/resize_cache/sprint.editor/daa/625_420_2/daa6ed3c1ba97ce257f873ecee8716e5.jpg',
    ],
    price: 2200000,
    pricePerM2: 80000,
    area: 50,
    floor: 12,
    floors: 14,
    rooms: 2,
    address: 'Краснодар, ул. Садовая',
    date: '16 июня 16:20',
    isFavorite: true,
  },
];

const HouseImagesSlider = ({ images }) => {
  const [active, setActive] = useState(0);
  const imagesRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Отключение выделения текста
  const setUserSelect = (value) => {
    document.body.style.userSelect = value;
    document.body.style.webkitUserSelect = value;
    document.body.style.msUserSelect = value;
    document.body.style.mozUserSelect = value;
  };

  const onMouseDown = e => {
    if (window.innerWidth < 900) return;
    isDragging.current = true;
    startX.current = e.pageX - imagesRef.current.offsetLeft;
    scrollLeft.current = imagesRef.current.scrollLeft;
    imagesRef.current.style.cursor = 'grabbing';
    setUserSelect('none');
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (imagesRef.current) imagesRef.current.style.cursor = 'grab';
    setUserSelect('');
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };
  const onMouseLeave = () => {
    isDragging.current = false;
    if (imagesRef.current) imagesRef.current.style.cursor = 'grab';
    setUserSelect('');
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };
  const onMouseMove = e => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - imagesRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    imagesRef.current.scrollLeft = scrollLeft.current - walk;
  };

  React.useEffect(() => {
    if (window.innerWidth >= 900 && imagesRef.current) {
      imagesRef.current.style.cursor = 'grab';
    }
  }, []);

  const scrollTo = idx => {
    setActive(idx);
    if (imagesRef.current) {
      const img = imagesRef.current.children[idx];
      if (img) img.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  return (
    <div className={styles.houseImages}>
      <div
        ref={imagesRef}
        className={styles.houseImagesInner}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt="Фото дома"
            draggable={false}
            onClick={() => scrollTo(idx)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
    const [search, setSearch] = useState('');

    // Фильтрация домов по поиску
    const filteredHouses = houses.filter(house =>
      house.address.toLowerCase().includes(search.toLowerCase())
    );

    const handleSearchChange = (e) => {
      setSearch(e.target.value);
    };
    const handleSearchKeyDown = (e) => {
      if (e.key === 'Enter') {
        console.log('Поиск:', search);
      }
    };

    return (
        <div className={styles.page}>
            <div className={styles.searchContainer}>
                <div className={styles.searchPromoRow}>
                    <div className={styles.searchBar}>
                        <span className={styles.searchIcon}>
                            {/* Лупа SVG */}
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9" r="7" stroke="#888" strokeWidth="2" />
                                <line x1="15.4142" y1="15" x2="19" y2="18.5858" stroke="#888" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </span>
                        <input
                            className={styles.searchInput}
                            type="text"
                            placeholder="Поиск во всех регионах"
                            value={search}
                            onChange={handleSearchChange}
                            onKeyDown={handleSearchKeyDown}
                        />
                        <span className={styles.filterIcon}>
                            {/* Иконка фильтра */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect y="5" width="24" height="2" rx="1" fill="#222" />
                                <rect y="11" width="24" height="2" rx="1" fill="#222" />
                                <rect y="17" width="24" height="2" rx="1" fill="#222" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.promoButtonsRow}>
                <div className={styles.promoButton}>
                    <img src={rentBotImage} alt="RentBot" className={styles.promoIcon} />
                    <div>
                        <div className={styles.promoTitle}>RentBot</div>
                        <div className={styles.promoSubtitle}>Помощник по подбору жилья</div>
                    </div>
                </div>
                <div className={styles.promoButton}>
                    <span className={styles.promoIcon}>
                        {/* SVG карта */}
                        <svg width="34" height="45" viewBox="0 0 34 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 0.0188933C14.7418 -0.0933213 12.4863 0.29526 10.378 1.15976C8.26965 2.02427 6.35492 3.34564 4.75635 5.03931C3.15778 6.73297 1.9106 8.76161 1.09464 10.9954C0.278681 13.2291 -0.0880813 15.6188 0.0178324 18.0113C0.0178324 23.679 4.26337 29.2566 6.38614 31.5057C8.50891 33.7547 17 45 17 45C17 45 25.4911 33.7547 27.6139 31.5057C29.7366 29.2566 33.9822 23.679 33.9822 18.0113C34.0881 15.6188 33.7213 13.2291 32.9054 10.9954C32.0894 8.76161 30.8422 6.73297 29.2436 5.03931C27.6451 3.34564 25.7304 2.02427 23.622 1.15976C21.5137 0.29526 19.2582 -0.0933213 17 0.0188933ZM17 25.3208C15.6355 25.3208 14.3017 24.8921 13.1671 24.0889C12.0326 23.2857 11.1483 22.1442 10.6261 20.8085C10.104 19.4729 9.96736 18.0032 10.2336 16.5853C10.4998 15.1674 11.1568 13.865 12.1217 12.8428C13.0865 11.8205 14.3158 11.1244 15.6541 10.8424C16.9923 10.5603 18.3795 10.7051 19.6401 11.2583C20.9008 11.8115 21.9782 12.7484 22.7363 13.9504C23.4944 15.1525 23.899 16.5657 23.899 18.0113C23.899 18.9712 23.7206 19.9217 23.3738 20.8085C23.0271 21.6954 22.519 22.5011 21.8783 23.1799C21.2377 23.8586 20.4772 24.397 19.6401 24.7644C18.8031 25.1317 17.906 25.3208 17 25.3208Z" fill="#E18650"/>
                        </svg>
                    </span>
                    <div>
                        <div className={styles.promoTitle}>Карта</div>
                        <div className={styles.promoSubtitle}>Смотрите жильё<br/>прямо на карте</div>
                    </div>
                </div>
            </div>

            {/* КАТАЛОГ ДОМОВ */}
            <div className={styles.catalog}>
              {filteredHouses.map(house => (
                <div className={styles.houseCard} key={house.id}>
                  <HouseImagesSlider images={house.images} />
                  <div className={styles.houseInfo}>
                    <div className={styles.housePrice}>
                      <span style={{fontWeight: 600, fontSize: '1.15rem'}}> {house.price.toLocaleString()} ₽</span>
                      <span style={{color: '#4CAF50', marginLeft: 8, fontSize: '0.98rem'}}>▲ {house.pricePerM2.toLocaleString()} ₽/м²</span>
                    </div>
                    <div className={styles.houseMeta}>
                      {house.area} м² &nbsp;|&nbsp; {house.floor} этаж из {house.floors} &nbsp;|&nbsp; {house.rooms}-комнаты
                    </div>
                    <div className={styles.houseAddress}>{house.address}</div>
                    <div className={styles.houseDate}>{house.date}</div>
                  </div>
                </div>
              ))}
            </div>
        </div>
    );
};

export default HomePage;