import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import View from './View';


const HomeScreen = () => {
    const handleLogout =()=>{
        window.sessionStorage.clear(true);
        window.location.reload();
    }


    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    
    return (
        <div className="AdminLogin">
        <button className='btn btn-dark' onClick={handleLogout}>LogOut</button>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} centered>
            <Tab label="View" />
        </Tabs>
        </Box>
        {
            (value===0) && <View />
        }
        </div>
    );
}

export default HomeScreen