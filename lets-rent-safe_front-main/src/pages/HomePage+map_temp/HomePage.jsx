import React, {useState} from 'react';
import MapComponent from '../../components/MapComponent/MapComponent.jsx';
import styles from './HomePage.module.scss';


const sampleMarkers = [
    {
        id: 1,
        position: [51.505, -0.09],
        name: 'Cozy London Flat',
        description: 'A beautiful 1-bedroom flat with a view of the city. Recently renovated.',
        type: 'standard',
        // New fields
        imageUrl: 'https://picsum.photos/id/1015/240/120',
        linkUrl: '#',
        linkText: 'Book Now'
    },
    {
        id: 2,
        position: [51.51, -0.1],
        name: 'Luxury Penthouse',
        description: 'The best property in town. Features a private rooftop terrace.',
        type: 'special',
        // New fields
        imageUrl: 'https://picsum.photos/id/103/240/120',
        linkUrl: '#',
    },
    {
        id: 3,
        position: [51.51, -0.12],
        name: 'Modern Studio',
        description: 'Perfect for solo travelers or couples. Close to public transport.',
        type: 'standard',
        // This one has no image or link, showing it's optional
    },
    {
        id: 4,
        position: [51.495, -0.08],
        name: 'Spacious Family Home',
        description: 'A 3-bedroom home ideal for families. Includes a backyard.',
        type: 'standard',
        imageUrl: 'https://picsum.photos/id/1048/240/120',
        linkUrl: '#',
        linkText: 'View Property'
    },
];


const HomePage = () => {


    // Example of a custom map style from CartoDB
    const cartoDbTileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
    const [filter, setFilter] = useState('all'); // 'all', 'standard', 'special'
    return (
        <div className={styles.page}>
            <h1>Главная страница</h1>
            <p>Добро пожаловать в наш React-шаблон!</p>
            <p>Это содержимое главной страницы. Вы можете разместить здесь любой контент.</p>
            <h1>Our Properties Map</h1>
            <p>A flexible and interactive map of rental properties.</p>

            <div className="filter-controls">
                <span>Filter by: </span>
                <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
                <button onClick={() => setFilter('standard')} className={filter === 'standard' ? 'active' : ''}>Standard</button>
                <button onClick={() => setFilter('special')} className={filter === 'special' ? 'active' : ''}>Special</button>
            </div>

            <MapComponent
                center={[51.505, -0.09]}
                zoom={13}
                markersData={sampleMarkers}
                activeFilter={filter}
                // You can swap this to the default OpenStreetMap by removing the prop
                tileUrl={cartoDbTileUrl}
            />
        </div>
    );
};

export default HomePage;