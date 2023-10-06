import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ForceGraph from './ForceGraph';


export default function StakeholderPage() {
    const [selected, setSelected] = useState(null)
    const [sLink, setSLink] = useState(null)

    return (
        <div>
            <ForceGraph selected={selected} setSLink={setSLink} setSelected={setSelected}/>
            {/* rewrite the below */}
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


