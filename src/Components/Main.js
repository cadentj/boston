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
    root.children.push({
      type: 'leaf',
      name: item.Name,
      value: item['Position (1 - close 2 - middle 3 - far)'],
      section: item.Section, // Storing the section information
      links: ['Root']
    });
  });

  return root;
}

const sampleData = [
  { Name: 'Family', Page: 'Preparation', Section: 'Wants & Needs', 'Position (1 - close 2 - middle 3 - far)': 1 },
  { Name: 'BHC', Page: 'Preparation', Section: 'Create Your Budget', 'Position (1 - close 2 - middle 3 - far)': 2 },
  { Name: 'Personal Bank', Page: 'Preparation', Section: 'Create Your Budget', 'Position (1 - close 2 - middle 3 - far)': 2 },
  { Name: 'Homebuying Class', Page: 'Preparation', Section: 'Homebuying Education', 'Position (1 - close 2 - middle 3 - far)': 3 },
  { Name: 'Bank Statements', Page: 'Preparation', Section: 'Gather Documents', 'Position (1 - close 2 - middle 3 - far)': 3 },
  { Name: 'Credit Report', Page: 'Preparation', Section: 'Gather Documents', 'Position (1 - close 2 - middle 3 - far)': 3 },
  { Name: 'Tax Returns', Page: 'Preparation', Section: 'Gather Documents', 'Position (1 - close 2 - middle 3 - far)': 3 },
  { Name: 'Pay Stubs', Page: 'Preparation', Section: 'Gather Documents', 'Position (1 - close 2 - middle 3 - far)': 3 }
];

const transformedData = transformData(sampleData);

export default function BasicGrid() {
  const sections = [
    { id: 'Wants & Needs', name: 'Wants & Needs' },
    { id: 'Create Your Budget', name: 'Create Your Budget' },
    { id: 'Homebuying Education', name: 'Homebuying Education' },
    { id: 'Gather Documents', name: 'Gather Documents' }
  ];

  const graphWidth = window.innerWidth / 2 - 150;
  const dendrogramRef = useRef();
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [previousSection, setPreviousSection] = useState(null);

  useEffect(() => {
    const container = document.querySelector('.container-snap');
    
    const handleScroll = () => {
      let activeSectionId = null;
      
      sections.forEach(section => {
        const sectionElement = document.getElementById(section.id);
        const { top, bottom } = sectionElement.getBoundingClientRect();
        
        if (top < window.innerHeight && bottom >= 0) {
          // Section is in the viewport
          activeSectionId = section.id;
        }
      });

      if (activeSectionId && activeSectionId !== activeSection) {
        setPreviousSection(activeSection);
        setActiveSection(activeSectionId);

        // Call revealNodes for the new active section
        console.log(activeSectionId)
        dendrogramRef.current.revealNodes(activeSectionId);


      }
    };
  
    container.addEventListener('scroll', handleScroll);
  
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeSection, sections, previousSection]);

  
  return (
    <Box className="page">
      <Box className="page" sx={{ position: "absolute", zIndex: 50, background: "white" }} id="fade-overlay" />
      <Box className="centered-flex" sx={{ width: "50%", height: "100%", position: "fixed" }}>
        <Box sx={{ pr: 10, pb: 20 }}>
          <Dendrogram ref={dendrogramRef} data={transformedData} width={graphWidth} height={graphWidth} initialSection="Wants & Needs" />
        </Box>
      </Box>
      <ProgressBar sections={sections} />
      <Box className="container-snap" sx={{ width: "50%", height: "100vh", right: 0, position: "absolute" }}>
        {/* Assign IDs and class to your sections */}
        <Section id={sections[0].id} />
        <Section id={sections[1].id} />
        <Section id={sections[2].id} />
        <Section id={sections[3].id} />
      </Box>
    </Box>
  );
}
