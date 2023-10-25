import Page from './Pages/Page';
import { createTheme, ThemeProvider } from '@mui/material';
import StakeholderPage from './Pages/StakeholderPage';
import MadLibs from './Components/Main';
import Cover from './Pages/Cover.js';

import { Navigate, useNavigate, Routes, Route } from 'react-router-dom';


const theme = createTheme({
  typography: {
    // fontFamily: [
    //   'Roboto',
    // ].join(','),
    allVariants: {
      color: 'white'
    },
    // button: {
    //   textTransform: 'none'
    // },
  },
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      
      <Routes>
        <Route path="/" element={<Cover />} />
        <Route path="/*" element={<MainLayoutRoutes />} />
      </Routes>
    </ThemeProvider>
  );
}

const MainLayoutRoutes = () => {

  return (
    <div>
      <Routes>
        <Route path="/narrative" element={<MadLibs  />} />
        <Route path="/graph" element={<StakeholderPage />} />
        <Route path="/housing" element={<Page/>} />
      </Routes>
    </div>
  );
}

export default App;
