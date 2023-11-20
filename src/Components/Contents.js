import React from 'react';
import Typography from '@mui/material/Typography';
import StyledAccordion from './StyledAccordion';


export default function Contents({ title, description, resources, barriers }) {
    return (
        <>
            <Typography variant='h3'>{title}</Typography>
            <p>
                {description}
            </p>
            {resources !== "None" &&
                <StyledAccordion
                    summary="Resources"
                    details={(
                        <div>
                            {resources.map((link, index) => (
                                <a key={index} href={link}>{link}</a>
                            ))}
                        </div>
                    )}
                />}
            {barriers !== "None" &&
                <StyledAccordion
                    summary="Barriers"
                    details={barriers} />
            }

        </>
    )
}
