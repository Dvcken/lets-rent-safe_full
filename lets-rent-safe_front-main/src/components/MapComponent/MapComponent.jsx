// src/components/MapComponent/MapComponent.jsx

import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
import PropTypes from 'prop-types';

// Import Leaflet's CSS
import 'leaflet/dist/leaflet.css';
// Import MarkerCluster's CSS
import '../../styles/markerCluster.scss';


import styles from './MapComponent.module.scss';

// --- Fix for default marker icon ---
// This is a common issue with Webpack/React where the default icon paths are not resolved correctly.
// We manually import them and set them on the L.Icon.Default prototype.
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;
// --- End of fix ---

/**
 * A highly customizable map component using React-Leaflet.
 * @param {object} props - The component props.
 * @param {number[]} props.center - The initial center of the map [latitude, longitude].
 * @param {number} props.zoom - The initial zoom level of the map.
 * @param {string} props.tileUrl - The URL for the map tiles (e.g., OpenStreetMap, CartoDB).
 * @param {object[]} props.markersData - An array of marker objects.
 * @param {string} props.activeFilter - A string to filter markers by their 'type' property. Use 'all' to show all.
 */
// NEW: A dedicated component for rendering the custom popup content.
const CustomPopup = ({ marker }) => (
    <div className={styles.popupContainer}>
        {/* Conditionally render an image if imageUrl is provided */}
        {marker.imageUrl && (
            <img
                src={marker.imageUrl}
                alt={marker.name}
                className={styles.popupImage}
            />
        )}
        <div className={styles.popupContent}>
            <h3 className={styles.popupTitle}>{marker.name}</h3>
            <p className={styles.popupDescription}>{marker.description}</p>
            {/* Conditionally render a link if linkUrl is provided */}
            {marker.linkUrl && (
                <a
                    href={marker.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.popupLink}
                >
                    {marker.linkText || 'View Details'}
                </a>
            )}
        </div>
    </div>
);
const MapComponent = ({
                          center,
                          zoom,
                          tileUrl,
                          markersData,
                          activeFilter,
                      }) => {
    // Memoize the filtered markers to avoid re-calculating on every render
    const filteredMarkers = useMemo(() => {
        if (activeFilter === 'all') {
            return markersData;
        }
        return markersData.filter(marker => marker.type === activeFilter);
    }, [markersData, activeFilter]);

    // Example of creating a custom icon for a specific marker type
    const createCustomIcon = (markerType) => {
        if (markerType === 'special') {
            return new L.Icon({
                iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/markers/marker-icon-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
        }
        return DefaultIcon;
    };

    return (
        <div className={styles.mapWrapper}>
            <MapContainer
                center={center}
                zoom={zoom}
                className={styles.leafletContainer}
            >
                <TileLayer
                    url={tileUrl}
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                <MarkerClusterGroup>
                    {filteredMarkers.map(marker => (
                        <Marker
                            key={marker.id}
                            position={marker.position}
                            icon={createCustomIcon(marker.type)}
                        >
                            {/* UPDATED: Added minWidth and maxWidth to the Popup */}
                            {/* This is the key fix to ensure the popup is large enough for our content. */}
                            <Popup minWidth={280} maxWidth={350}>
                                <CustomPopup marker={marker} />
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
        </div>
    );
};


// Define prop types for better component API and error checking
MapComponent.propTypes = {
    center: PropTypes.arrayOf(PropTypes.number).isRequired,
    zoom: PropTypes.number.isRequired,
    tileUrl: PropTypes.string,
    markersData: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        position: PropTypes.arrayOf(PropTypes.number).isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        type: PropTypes.string,
        // New optional properties for the popup
        imageUrl: PropTypes.string,
        linkUrl: PropTypes.string,
        linkText: PropTypes.string,
    })).isRequired,
    activeFilter: PropTypes.string,
};

MapComponent.defaultProps = {
    tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    activeFilter: 'all',
    markersData: [],
};

export default MapComponent;