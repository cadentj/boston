import Page from './Pages/Page';
import { createTheme, ThemeProvider } from '@mui/material';
import StakeholderPage from './Pages/StakeholderPage';
import MadLibs from './Components/Main';
import Cover from './Pages/Cover.js';

import { Navigate, useNavigate, Routes, Route } from 'react-router-dom';
import Overlay from './Components/Overlay';

import PreparationPage from './Pages/PreparationPage';
import { ExplorationContents } from './Components/ExplorationContents';
import ExplorationPage from './Pages/ExplorationPage';
import ApplicationPage from './Pages/ApplicationPage';
import FinalizationPage from './Pages/FinalizationPage';


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
      {/* <Overlay /> */}
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
        <Route path="/preparation" element={<PreparationPage />} />
        <Route path="/exploration" element={<ExplorationPage />} />
        <Route path="/application" element={<ApplicationPage />} />
        <Route path="/finalization" element={<FinalizationPage />} />
      </Routes>
    </div>
  );
}

export default App;
