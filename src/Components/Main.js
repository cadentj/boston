import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Slider, Stack, Button, ButtonGroup, Typography, Box, Grid } from '@mui/material';
import Dendrogram from './Dendro.js'
import { randomInt } from 'd3';

import useScrollPosition from '../hooks/useScrollPosition.js'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function generateData(leafCount, averageLinks, valueRange) {
  const newData = {
    type: 'node',
    name: "boss",
    value: getRandomInt(valueRange.min, valueRange.max),
    children: []
  };

  const allLeaves = [];
  for (let i = 0; i < leafCount; i++) {
    const leafName = getRandomInt(0, 1000);
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

// Usage:
const leafCount = 20;
const averageLinks = 2; // not in use
const valueRange = { min: 0, max: 1000 };
const newData = generateData(leafCount, averageLinks, valueRange);
console.log(newData);


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BasicGrid() {

  const [income, setIncome] = useState(30);
  const [assets, setAssets] = useState(30);
  const [houseType, setHouseType] = useState('');

  const handleIncomeChange = (event, newValue) => {
    setIncome(newValue);
  };

  const handleAssetsChange = (event, newValue) => {
    setAssets(newValue);
  };

  const handleHouseTypeChange = (newType) => {
    setHouseType(newType);
  };

  const handleSubmit = () => {
    console.log({ income, assets, houseType });
  };

  const scrollPosition = useScrollPosition();

  return (
    <Box className="page" sx={{}}>
      <Box className="page" sx={{ position: "absolute", zIndex: 50, background: "white" }} id="fade-overlay" />
      <Box className="centered-flex" sx={{ width: "50%", height: "100%", position: "fixed", top: 0, borderColor: "black" }} >
        <Box sx={{pl:35}}>
          <Dendrogram data={newData} width={700} height={500} />
        </Box>
        <Typography variant="body1" color="black">{scrollPosition / window.innerHeight}</Typography>
      </Box>
      <Box className="centered-flex" sx={{ width: "50%", height: "200%", right: 0, position: "absolute", border: 1, borderColor: "black" }} >

      </Box>

    </Box>
  );
}


