
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';
import { makeStyles } from '@material-ui/core';







function App() {


const useStyles = makeStyles(() => ({
  App: {
    backgroundColor:"#14161a",
    color:"white",
    minHeight:"100vh"
  },
}));
const classes =useStyles();


  return (
    <BrowserRouter>
    <div className={classes.App}>
      
    <Header/>

     <Routes>
     
       <Route path="/react/cryptotracker/" element={<HomePage/>} />
       <Route path="/react/cryptotracker/coins/:id" element={<CoinPage/>} />
       
     </Routes>
      
    </div>
    
    </BrowserRouter>
  );
}

export default App;
