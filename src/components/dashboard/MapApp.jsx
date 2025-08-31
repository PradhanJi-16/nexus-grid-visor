import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapApp = () => {
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const roadLayersRef = useRef({});

    useEffect(() => {
        if (!mapContainerRef.current || mapInstanceRef.current) return;

        const map = L.map(mapContainerRef.current).setView([28.6139, 77.2090], 13);
        mapInstanceRef.current = map;

        // Dark tile layer
        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: "abcd",
            maxZoom: 20,
        }).addTo(map);

        // Example road segments (duplicates removed, syntax fixed)
        const roadSegments = {
            todemal_road: {
                name: "Todermal Road",
                coords: [
                    [28.63, 77.2167],
                    [28.6325, 77.218],
                    [28.635, 77.22],
                ],
            },
            outer_ring_road: {
                name: "Outer Ring Road",
                coords: [
                    [28.5455, 77.1921],
                    [28.6250, 77.0800],
                    [28.7100, 77.2250],
                ],
            },
            mg_road: {
                name: "MG Road",
                coords: [
                    [28.5900, 77.2200],
                    [28.5850, 77.2250],
                    [28.5800, 77.2300],
                ],
            },
            bhagwaan_mahavir_maarg: {
                name: "Bhagwaan Mahavir Maarg",
                coords: [
                    [28.6948, 77.1152],
                    [28.6980, 77.1285],
                    [28.7015, 77.1410],
                ],
            },
            inner_ring_road: {
                name: "Inner Ring Road",
                coords: [
                    [28.5670, 77.2420],
                    [28.6650, 77.1400],
                    [28.6670, 77.2290],
                ],
            },
            nh_48_delhi_gurgaon_expressway: {
                name: "NH 48 / Delhi-Gurgaon Expressway",
                coords: [
                    [28.5920, 77.1750],
                    [28.5550, 77.1350],
                    [28.5400, 77.1000],
                ],
            },
            sardar_patel_marg: {
                name: "Sardar Patel Marg",
                coords: [
                    [28.5950, 77.1700],
                    [28.5980, 77.1850],
                    [28.6000, 77.1950],
                ],
            },
            aurobindo_marg: {
                name: "Aurobindo Marg",
                coords: [
                    [28.5680, 77.2080],
                    [28.5450, 77.2050],
                    [28.5250, 77.1860],
                ],
            },
            netaji_subhash_marg: {
                name: "Netaji Subhash Marg",
                coords: [
                    [28.6420, 77.2410],
                    [28.6560, 77.2400],
                    [28.6670, 77.2300],
                ],
            },
            bahadur_shah_zafar_marg: {
                name: "Bahadur Shah Zafar Marg",
                coords: [
                    [28.6320, 77.2450],
                    [28.6350, 77.2430],
                    [28.6380, 77.2415],
                ],
            },
            barapullah_elevated_road: {
                name: "Barapullah Elevated Road",
                coords: [
                    [28.5850, 77.2550],
                    [28.5750, 77.2350],
                    [28.5700, 77.2150],
                ],
            },
            kartavya_path: {
                name: "Kartavya Path",
                coords: [
                    [28.6128, 77.2295],
                    [28.6140, 77.2220],
                    [28.6145, 77.2120],
                ],
            },
            janpath: {
                name: "Janpath",
                coords: [
                    [28.6280, 77.2190],
                    [28.6120, 77.2190],
                    [28.6010, 77.2180],
                ],
            },
        };
        roadLayersRef.current.segments = roadSegments;

        const getRoadColor = (speed) => {
            if (speed > 40) return "#22c55e"; // green
            if (speed > 20) return "#eab308"; // yellow
            return "#ef4444"; // red
        };

        const updateMapVisualization = () => {
            for (const roadId in roadLayersRef.current.segments) {
                const road = roadLayersRef.current.segments[roadId];
                const speed = Math.floor(Math.random() * 55) + 5;
                const color = getRoadColor(speed);

                const popupContent = `
                  <div>
                    <strong>${road.name}</strong>
                    <hr style="margin: 4px 0;" />
                    Avg Speed: <strong style="color:${color}; font-size: 1.1em;">
                      ${speed} km/h
                    </strong>
                  </div>
                `;

                if (!road.layer) {
                    road.layer = L.polyline(road.coords, {
                        color,
                        weight: 5,
                        opacity: 0.8,
                    }).addTo(map);

                    road.layer
                        .bindPopup(popupContent)
                        .on("mouseover", function () {
                            this.openPopup();
                        })
                        .on("mouseout", function () {
                            this.closePopup();
                        });
                } else {
                    road.layer.setStyle({ color }).setPopupContent(popupContent);
                }
            }
        };

        updateMapVisualization();
        const intervalId = setInterval(updateMapVisualization, 5000);

        return () => {
            clearInterval(intervalId);
            map.remove();
            mapInstanceRef.current = null;
        };
    }, []);

    return <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />;
};

export default MapApp;
