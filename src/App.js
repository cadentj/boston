import Page from './Pages/Page';
import { createTheme, ThemeProvider } from '@mui/material';
import StakeholderPage from './Pages/StakeholderPage';
import MadLibs from './Components/Main';
import Cover from './Pages/Cover.js';

import { Navigate, useNavigate, Routes, Route } from 'react-router-dom';
import Overlay from './Components/Overlay';


const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
    ].join(','),
  },
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Overlay />
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
        <Route path="/narrative" element={<MadLibs />} />
        <Route path="/graph" element={<StakeholderPage />} />
        <Route path="/housing" element={<Page />} />
      </Routes>
    </div>
  );
}

export default App;
