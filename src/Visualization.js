import React from 'react';
import { Map } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { Box } from "@mui/material"

const RED = [230, 75, 25];
const ORANGE = [245, 130, 48];
const YELLOW = [255, 225, 25];
const GREEN = [60, 180, 75];
const BLUE = [0, 130, 200];
const PURPLE = [145,30,180];

// Source data CSV
const DATA_URL = require('./data.json'); // eslint-disable-line

const INITIAL_VIEW_STATE = {
    longitude: -71.0815,
    latitude: 42.3256,
    zoom: 11,
    maxZoom: 16,
    pitch: 35,
    bearing: 0
}

function getColor(value, selected) {
    // cast value to int
    value = parseInt(value);
    const binSize = 12 / selected;
    const binNumber = Math.ceil(value / binSize);

    const colors = [RED, ORANGE, YELLOW, GREEN, BLUE,PURPLE];
    return colors[(binNumber - 1)];
}

export default function Visualization({
    data = DATA_URL,
    radius = 30,
    mapStyle = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json',
    selected
}) {

    console.log(selected)
    const layers = [new ScatterplotLayer({
        id: 'scatter-plot',
        data,
        radiusScale: radius,
        radiusMinPixels: 0.25,
        getPosition: d => [d[0], d[1], 0],
        getFillColor: d => getColor(d[2], selected),
        getRadius: 1,
        updateTriggers: {
            getFillColor: selected
        }
    })];

    return (
        <Box sx={{ height: "100vh", display: "flex", overflow: "clip", position: "sticky", top: 0 }}>
            <DeckGL
                layers={layers}
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
            >
                <Map
                    reuseMaps
                    mapLib={maplibregl}
                    mapStyle={mapStyle}
                    preventStyleDiffing={true}
                >

                </Map>
            </DeckGL>
        </Box >
    )

}
