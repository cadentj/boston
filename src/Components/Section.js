import React from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Box, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Section() {
    const title = "Lorem Ipsum"

    const paragraph = "Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "

    const subParagraph = "Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor. Suspendisse sed nisi lacus sed. Mauris rhoncus aenean vel elit scelerisque."
    return (
        <Box className="centered-flex" sx={{ width: '70%', height: '100vh', margin: '0 auto', overflowY: 'auto' }} >
            <Box width="100%">
                <Typography variant="h4" gutterBottom>
                    {title}
                </Typography>
            </Box>
            <Typography variant="body1" paragraph>
                {paragraph}
            </Typography>
            <Stack mt={3}>
                <Box>
                    <Typography variant="h6" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {subParagraph}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h6" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {subParagraph}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h6" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {subParagraph}
                    </Typography>
                </Box>
            </Stack>
            {/* {dropdowns.map((dropdown, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel-content-${index}`}
                        id={`panel-header-${index}`}
                    >
                        <Typography variant="h6">
                            {dropdown.title}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body2">
                            {dropdown.content}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))} */}
        </Box>
    );
}

export default Section;
