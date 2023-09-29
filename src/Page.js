import Visualization from './Visualization';

import { Typography, Box, Grid } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Paper from '@mui/material/Card';

import { useState } from 'react';

export default function Page() {

    const [selected, setSelected] = useState(2)

    return (
        <div>
            <Visualization selected={selected}/>
            {/* <Box className="page" sx={{ position: 'absolute', top: 0, zIndex: 100 }}> */}
                <Paper sx={{m:5, p:3, position: 'absolute', bottom: 0 }}>
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
            {/* </Box> */}
        </div>
    );
}


