import Visualization from '../Components/Visualization';

import { Typography, Box, Grid } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Paper from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

const YEARS = [
    [1790.77, 1810.167],
    [1810.167, 1829.333],
    [1829.333, 1848.5],
    [1848.5, 1867.667],
    [1867.667, 1886.833],
    [1886.833, 1906.0],
    [1906.0, 1925.167],
    [1925.167, 1944.333],
    [1944.333, 1963.5],
    [1963.5, 1982.667],
    [1982.667, 2001.833],
    [2001.833, 2021.0]
].map(year => year.map(y => Math.round(y)));

const RED = "#e6194B"
const ORANGE = '#f58231'
const YELLOW = '#ffe119'
const GREEN = '#3cb44b'
const BLUE = '#4363d8'
const PURPLE = '#911eb4'

const COLORS = [RED, ORANGE, YELLOW, GREEN, BLUE, PURPLE];

function getNewBinBounds(numBins) {
    const totalEntries = YEARS.length;
    const binSize = Math.ceil(totalEntries / numBins);
    const newBins = [];

    for (let i = 0; i < totalEntries; i += binSize) {
        newBins.push([YEARS[i][0], YEARS[Math.min(i + binSize - 1, totalEntries - 1)][1]]);
    }

    return newBins;
}

function createItems(bounds, bins) {
    const items = []
    for (let i = 0; i < bounds.length; i++) {
        items.push({ year: `${bounds[i][0]}-${bounds[i][1]}`, color: COLORS[i] })
    }
    return items
}

export default function Page() {
    const [selected, setSelected] = useState(2)

    const bounds = getNewBinBounds(selected)
    const items = createItems(bounds, selected)

    return (
        <div>
            <Visualization selected={selected} />
            {/* <Box className="page" sx={{ position: 'absolute', top: 0, zIndex: 100 }}> */}
            <Paper sx={{ m: 5, p: 3, position: 'absolute', bottom: 0 }}>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Bins</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue="2"
                        onChange={(event) => setSelected(event.target.value)}
                    >
                        <FormControlLabel value="2" control={<Radio />} label="2" />
                        <FormControlLabel value="3" control={<Radio />} label="3" />
                        <FormControlLabel value="4" control={<Radio />} label="4" />
                        <FormControlLabel value="6" control={<Radio />} label="6" />
                    </RadioGroup>
                </FormControl>
            </Paper>
            <Paper sx={{ m: 5, p: 2, position: 'absolute', top: 0, right: 0 }}>
                <Stack spacing={2}>
                    {items.map((item, index) => (
                        <Paper key={index} elevation={3} sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
                            <Box
                                sx={{
                                    width: 16,
                                    height: 16,
                                    backgroundColor: item.color,
                                    marginRight: 1,
                                }}
                            ></Box>
                            <Typography>{item.year}</Typography>
                        </Paper>
                    ))}
                </Stack>
            </Paper>
            {/* </Box> */}
        </div>
    );
}


