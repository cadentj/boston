import React from 'react';
import Box from '@mui/material/Box';

const ProgressBar = ({ sections }) => {

  // Determine which section is currently in view
  const currentSectionIndex = sections.findIndex((section) => {
    const element = document.getElementById(section.id);
    if (element) {
      const rect = element.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom >= 0;
    }
    return false;
  });

  const handleClick = (id) => {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box sx={{
      position: 'fixed',
      top: '50%',
      right: '20px',
      transform: 'translateY(-50%)',
      zIndex: 1000
    }}>
      {sections.map((section, index) => (
        <Box key={section.id} onClick={() => handleClick(section.id)} sx={{ cursor: 'pointer' }}>
          <Box sx={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: currentSectionIndex === index ? 'black' : 'grey',
            margin: '10px 0'
          }} />
          {/* {index < sections.length - 1 && (
            <Box sx={{
              width: '2px',
              height: '20px',
              background: 'grey',
              margin: '0 auto'
            }} />
          )} */}
        </Box>
      ))}
    </Box>
  );
};

export default ProgressBar;
