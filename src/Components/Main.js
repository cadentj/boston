import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Slider, Stack, Button, ButtonGroup, Typography, Box, Grid } from '@mui/material';
import Dendrogram from './Dendro.js'

import Section from './Section.js';
import { randomInt } from 'd3';

import useScrollPosition from '../hooks/useScrollPosition.js'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const valueRange = { min: 0, max: 1000 };

function generateInitialData(leafCount = 10, averageLinks = 2, valueRange = { min: 0, max: 1000 }) {
  const newData = {
    type: 'node',
    name: "boss",
    value: getRandomInt(valueRange.min, valueRange.max),
    children: []
  };

  const allLeaves = [];
  for (let i = 0; i < leafCount; i++) {
    const leafName = `Node ${getRandomInt(0, 1000)}`;
    if (!allLeaves.includes(leafName)) {
      allLeaves.push(leafName);
      const leaf = {
        type: 'leaf',
        name: leafName,
        value: getRandomInt(valueRange.min, valueRange.max),
        links: []
      };
      newData.children.push(leaf);
    }
  }

  newData.children.forEach(leaf => {
    const linkCount = getRandomInt(0, averageLinks);
    for (let i = 0; i < linkCount; i++) {
      const randomLeafName = allLeaves[getRandomInt(0, allLeaves.length - 1)];
      if (randomLeafName !== leaf.name && !leaf.links.includes(randomLeafName)) {
        leaf.links.push(randomLeafName);
      }
    }
  });

  return newData;
}



export default function BasicGrid() {

  const scrollPosition = useScrollPosition();

  const [data, setData] = useState(generateInitialData());

  const addNewNodesAndEdges = () => {
    // Generate a new leaf/node.
    const newNode = {
      type: 'leaf',
      name: `Node${getRandomInt(0, 1000)}`,
      value: getRandomInt(valueRange.min, valueRange.max),
      links: []
    };

    // Get a list of current leaf names. This includes the new leaf we just added.
    const currentLeafNames = data.children.map(child => child.name).concat([newNode.name]);

    // Randomly generate links for this node. Here, we're creating between 1 to 3 links for demonstration purposes.
    const newLinksCount = getRandomInt(1, 3);

    for (let i = 0; i < newLinksCount; i++) {
      const randomLeafName = currentLeafNames[getRandomInt(0, currentLeafNames.length - 1)];

      // Avoid linking to itself and avoid duplicate links.
      if (randomLeafName !== newNode.name && !newNode.links.includes(randomLeafName)) {
        newNode.links.push(randomLeafName);
      }
    }

    // Update the data state with the new node, which will trigger a re-render.
    setData(prevData => {
      return { ...prevData, children: [...prevData.children, newNode] };
    });
  };

  const removeNodesAndEdges = () => {
    setData(prevData => {
      const newChildren = [...prevData.children];
      newChildren.pop();  // Remove the last node
      return { ...prevData, children: newChildren };
    });
  };

  const [previousScrollPosition, setPreviousScrollPosition] = useState(0);
  const scrollDirection = scrollPosition > previousScrollPosition ? "down" : "up";

  useEffect(() => {
    setPreviousScrollPosition(scrollPosition);
  }, [scrollPosition]);


  const [lastTriggeredPosition, setLastTriggeredPosition] = useState(0);


  useEffect(() => {
    const ratio = scrollPosition / window.innerHeight;
    const currentTriggerPosition = Math.floor(ratio / 0.25) * 0.25;

    if (currentTriggerPosition !== lastTriggeredPosition && currentTriggerPosition % 0.25 === 0) {
      if (scrollDirection === "down") {
        addNewNodesAndEdges();
      } else if (scrollDirection === "up") {
        removeNodesAndEdges();
      }
      setLastTriggeredPosition(currentTriggerPosition);
    }
  }, [scrollPosition, scrollDirection]);


  return (
    <Box className="page" sx={{}}>
      <Box className="page" sx={{ position: "absolute", zIndex: 50, background: "white" }} id="fade-overlay" />
      <Box className="centered-flex" sx={{ width: "50%", height: "100%", position: "fixed" }} >
        <Box sx={{ pl: 30 }}>
          <Dendrogram data={data} width={700} height={500} />
        </Box>
      </Box>
      <Box sx={{ width: "50%", height: "300vh", right: 0, pr: 10, position: "absolute" }} >
        <Section />
        <Section />
        <Section />
      </Box>

    </Box>
  );
}


