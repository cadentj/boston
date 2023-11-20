import React from 'react';

import "./section.css"

import StyledAccordion from './StyledAccordion';
import Typography from '@mui/material/Typography';

const Section = ({id}) => {
    return (
        <div id={id} className="budget-section section" style={{ width: '100vw'}}>
            <Typography variant='h3'>Inspection</Typography>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <StyledAccordion
                summary="Resources"
                details={(
                    <div>
                        <a href="http://www.example.com">www.example.com</a>
                        <a href="http://www.example.com">www.example.com</a>
                        <a href="http://www.example.com">www.example.com</a>
                    </div>
                )}
            />
            <StyledAccordion
                summary="Barriers"
                details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
        </div>
    );
};

export default Section;
