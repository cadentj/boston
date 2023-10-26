import * as React from 'react';
import { useNavigate } from 'react-router-dom';


import { useEffect } from 'react';
import { Typography } from '@mui/material';

export default function Overlay({ home }) {

    let height = window.innerHeight;

    const overlayStyle = {
        position: 'absolute',
        zIndex: 20
    }

    let navigate = useNavigate();


    return (

        <div style={{ ...overlayStyle, ...{ top: height - 57, right: 40, fontSize: '13px', position: "fixed" } }} id="fade-in">
            <a className='cursor' onClick={() => navigate("/housing")}>Housing</a> | <a className='cursor' onClick={() => navigate("/graph")}>Stakeholders</a>
        </div>
    )
}