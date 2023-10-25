import React, { useState, useEffect } from "react"
import { useTrail, useSpring, a } from "@react-spring/web"
import { Typography, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"

import "../styles/cover.css"

const TitleTrail = ({ open, children }) => {
    const items = React.Children.toArray(children)
    const trail = useTrail(items.length, {
        config: { mass: 5, tension: 2000, friction: 200, duration: 250 },
        opacity: open ? 1 : 0,
        y: open ? 0 : 100,
        height: open ? 110 : 0,
        delay: 500,
        transform: `perspective(600px) rotateX(${0}deg)`,
        from: { opacity: 0, y: 100, transform: `perspective(600px) rotateX(${-90}deg)`, height: 0 },
    })
    return (
        <Box>
            {trail.map(({ height, ...style }, index) => (
                <a.div key={index} className="title-trail" style={style} >
                    <a.div style={{ height }}>{items[index]}</a.div>
                </a.div>
            ))}
        </Box>
    )
}

const FadeInComponent = ({ children }) => {
    const fadeIn = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: 1250,
    });

    return <a.div style={fadeIn}>{children}</a.div>;
};

export default function App() {
    const [open] = useState(true)
    const [visible, setVisible] = useState(false)

    let navigate = useNavigate();

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );


    function openPage(page) {
        setVisible(true)
        setTrigger(true)
    }

    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        let interval;
        if (trigger) {
            interval = setInterval(() => navigate("/narrative"), 1000);
        }
        return () => clearInterval(interval);
    }, [trigger]);

    return (
        <div>
            {visible && <Box className="page" sx={{ position: "absolute", zIndex: 50, background: "white" }} id="fade-in" />}
            <div className={"centered-flex page"} onClick={() => openPage("/narrative")}>
                <Box sx={{ width: "50%" }} >
                    <TitleTrail open={open}>
                        <Typography variant='h1' color="black">YOUR</Typography>
                        <Typography variant='h1' color="black">HOMEBUYING</Typography>
                        <Typography variant='h1' color="black">JOURNEY</Typography>
                    </TitleTrail>
                    <FadeInComponent>
                        <Typography variant='body1' color="black">CLICK TO CONTINUE</Typography>
                    </FadeInComponent>
                </Box>
            </div>
        </div>
    )
}
