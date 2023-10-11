import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ForceGraph from './ForceGraph';
import MultilineChart from './Chart';

import schc from "./SCHC.json";
import vcit from "./VCIT.json";
import portfolio from "./portfolio.json";
import "./styles.css";

const portfolioData = {
    name: "Portfolio",
    color: "#ffffff",
    items: portfolio.map((d) => ({ ...d, date: new Date(d.date) }))
  };
  const schcData = {
    name: "SCHC",
    color: "#d53e4f",
    items: schc.map((d) => ({ ...d, date: new Date(d.date) }))
  };
  const vcitData = {
    name: "VCIT",
    color: "#5e4fa2",
    items: vcit.map((d) => ({ ...d, date: new Date(d.date) }))
  };
  
  const dimensions = {
    width: 600,
    height: 300,
    margin: {
      top: 30,
      right: 30,
      bottom: 30,
      left: 60
    }
  };


export default function StakeholderPage() {
    const [selected, setSelected] = useState(null)
    const [sLink, setSLink] = useState(null)

    return (
        <div>
            <MultilineChart
                data={[portfolioData, schcData, vcitData]}
                dimensions={dimensions}
            />
            {/* <ForceGraph selected={selected} setSLink={setSLink} setSelected={setSelected}/> */}
            {selected && (
                <Paper sx={{ m: 5, p: 3, position: 'absolute', bottom: 0 }}>
                    <Typography variant="h6">
                        You have selected node {selected.id}.
                    </Typography>
                    <Typography>
                        Click on a link to learn more.
                    </Typography>
                    <Typography variant="subtitle1">
                        This node's neighbors are:
                    </Typography>
                    <List>
                        {selected.neighbors.map((neighbor, index) => (
                            <ListItem key={index}>
                                - Node {neighbor.id} {neighbor.id === sLink && "hello"
                                }
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}
            {/* to here */}
            <Paper sx={{ m: 5, p: 2, position: 'absolute', top: 0, left: 0 }}>
                Stakeholder Map of Boston
            </Paper> 
        </div>
    );
}


