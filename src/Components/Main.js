import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Dendrogram from './Dendro.js';
import Section from './Section.js';
import useScrollPosition from '../hooks/useScrollPosition.js';
import ProgressBar from './ProgressBar.js';
import StyledAccordion from './StyledAccordion.js';
import Contents from './Contents.js';

import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import "./section.css"

// New function to transform your specific data format into a hierarchical structure
function transformData(inputData) {
  const root = {
    type: 'node',
    name: 'You',
    children: []
  };

  inputData.forEach(item => {
    root.children.push({
      type: 'leaf',
      name: item.name,
      value: item['Position'],
      section: item.section, // Storing the section information
      links: ['Root']
    });
  });

  return root;
}

function extractSections(preparation) {
  const sectionMap = new Map();
  const sections = [];

  preparation.forEach(item => {
    const sectionId = item.section;
    if (!sectionMap.has(sectionId)) {
      sectionMap.set(sectionId, true);
      sections.push({ id: sectionId, name: sectionId });
    }
  });

  return sections;
}

const pageOrder = ["Preparation", "Exploration", "Application", "Closing"];

export default function BasicGrid({ data, contents }) {
  const transformedData = transformData(data);
  const sections = extractSections(data);


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
        dendrogramRef.current.revealNodes(activeSectionId);


      }
    };

    container.addEventListener('scroll', handleScroll);

    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeSection, sections, previousSection]);

  const navigate = useNavigate();

  // Use navigate to change the route

  const location = useLocation().pathname
  console.log(location)
  const nextPage = () => {
    navigate("/exploration")
    // You can use navigate with a string path
    if (location === "/preparation") {
      navigate('/exploration')
    } else if (location === "/exploration") {
      navigate('/application')
    } else if (location === "/application") {
      navigate('/finalization')
    } else if (location === "/finalization") {
      navigate('/exploration')
    }
  };

  return (
    <Box className="page">
      {/* <Box className="page" sx={{ position: "absolute", zIndex: 50, background: "white" }} id="fade-overlay" /> */}
      <Box className="centered-flex" sx={{ width: "50%", height: "100%", position: "fixed" }}>
        <Box sx={{ pr: 10, pb: 20 }}>
          <Dendrogram ref={dendrogramRef} data={transformedData} width={graphWidth} height={graphWidth} initialSection={data[0].section} />
        </Box>
      </Box>
      <ProgressBar sections={sections} activeSection={activeSection} />
      <Box className="container-snap" sx={{ width: "38vw", height: "100vh", right: 0, position: "absolute", borderColor: "black" }}>
        {contents.map(({ section, description, resources, barriers }, index) => (

          <Box
            key={index + 1}
            className="section budget-section"
            sx={{
              width: '30vw',
              height: '100vh',
              margin: '10px',
            }}
            id={section}
          >
            <Contents title={section} description={description} barriers={barriers} resources={resources} />
            {(index === sections.length - 1) && <Box sx={{ width: "100%", mt: 10, display: "flex", justifyContent: "center" }} >
              <Button variant="outlined" color="secondary" onClick={nextPage}>Next</Button>
            </Box>}
          </Box>
        ))}

      </Box>
    </Box>
  );
}
