import React, { useState, useEffect, useRef } from 'react';
import { Box, Button } from '@mui/material';
import Dendrogram from './Dendro.js';
import Section from './Section.js';
import useScrollPosition from '../hooks/useScrollPosition.js';
import ProgressBar from './ProgressBar.js';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const valueRange = { min: 0, max: 1000 };

// New function to transform your specific data format into a hierarchical structure
function transformData(inputData) {
    const root = {
        type: 'node',
        name: 'Root',
        children: []
    };

    inputData.forEach(item => {
        const pageNode = root.children.find(child => child.name === item.Page);
        if (!pageNode) {
            root.children.push({
                type: 'node',
                name: item.Page,
                children: [{
                    type: 'leaf',
                    name: item.Name,
                    value: item['Position (1 - close 2 - middle 3 - far)'],
                    links: ['Root'] // Link to the root node
                }]
            });
        } else {
            pageNode.children.push({
                type: 'leaf',
                name: item.Name,
                value: item['Position (1 - close 2 - middle 3 - far)'],
                links: ['Root'] // Link to the page node
            });
        }
    });

    return root;
}

const sampleData = [
    { Name: 'Family', Page: 'Preparation', Section: 'Wants & Needs', 'Position (1 - close 2 - middle 3 - far)': 1 },
    // ... Add the rest of your data here
];

const transformedData = transformData(sampleData);

export default function BasicGrid() {
    const scrollPosition = useScrollPosition();

    const [data, setData] = useState(outData);

    const [previousScrollPosition, setPreviousScrollPosition] = useState(0);
    const scrollDirection = scrollPosition > previousScrollPosition ? "down" : "up";

    useEffect(() => {
        setPreviousScrollPosition(scrollPosition);
    }, [scrollPosition]);


    const [lastTriggeredPosition, setLastTriggeredPosition] = useState(0);

    const sections = [
        { id: 'section1' },
        { id: 'section2' },
        { id: 'section3' }
    ];


    useEffect(() => {
        const ratio = scrollPosition / window.innerHeight;
        const currentTriggerPosition = Math.floor(ratio / 0.10)
        // console.log(currentTriggerPosition)

        if (currentTriggerPosition !== lastTriggeredPosition && currentTriggerPosition % 1 === 0) {
            if (scrollDirection === "down") {
                handleRevealNext();
            } else if (scrollDirection === "up") {
                handleHidePrevious();
            }
            setLastTriggeredPosition(currentTriggerPosition);
        }
    }, [scrollPosition, scrollDirection]);

    const graphWidth = window.innerWidth / 2 - 150

    const dendrogramRef = useRef();

    const handleRevealNext = () => {
        dendrogramRef.current.revealNextElement();
    };

    const handleHidePrevious = () => {
        dendrogramRef.current.hidePreviousElement();
    };

    const [data, setData] = useState(transformedData);

    // ... the rest of your code

    return (
        <Box className="page" sx={{}}>
            <Box className="page" sx={{ position: "absolute", zIndex: 50, background: "white" }} id="fade-overlay" />
            <Box className="centered-flex" sx={{ width: "50%", height: "100%", position: "fixed" }} >
                <Box sx={{ pr: 10, pb: 20 }}>
                    <Dendrogram ref={dendrogramRef} data={data} width={graphWidth} height={graphWidth} />
                </Box>
            </Box>
            <ProgressBar sections={sections} />
            <Box sx={{ width: "50%", height: "310vh", right: 0, position: "absolute" }}>
                {/* Assign IDs to your sections */}
                <Section id={sections[0].id} />
                <Section id={sections[1].id} />
                <Section id={sections[2].id} />
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }} >
                    <Button variant="outlined" color="secondary">Next</Button>
                </Box>

            </Box>
        </Box>
    );
}
