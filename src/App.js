import Page from './Page';
import StakeholderPage from './StakeholderPage';
import { createTheme, ThemeProvider } from '@mui/material';
import { pink } from '@mui/material/colors';

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
      <StakeholderPage />
    </ThemeProvider>
  );
}

export default App;
