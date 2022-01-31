import {CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

import { HistoricalChart } from '../Config/api';
import { CryptoState } from '../CryptoContex';



const CoinInfo = ({coin}) => {

 const [historicPrice,setHistoricPrice] = useState();
 const [historicDate,setHistoricDate] = useState();

 // eslint-disable-next-line no-unused-vars
 const [days,setDays] = useState(1);

 const { currency } = CryptoState();



 const fetchHistoricData = async () => {
const  data  = await axios.get(HistoricalChart(coin.id, days, currency));
  //const  data  = await axios.get('https://api.coingecko.com/api/v3/coins');
  setHistoricPrice(data.data.prices.map((priceAll)=>{ return Math.floor(priceAll[1])}));
  setHistoricDate(data.data.prices.map((priceAll)=>{ return new Date(priceAll[0]).toLocaleTimeString()}));
 
};


 useEffect(() => {
  fetchHistoricData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
 },[currency, days]);


console.log(historicDate);


 const darkTheme = createTheme({
   palette:{
     primary:{
       main:"#fff",
     },
     type:"dark",
   },
 });




const graphData= {
  options: {
    chart: {
      id: 'apexchart-example'
    },
    xaxis: {
      categories: historicDate
    },

    fill: {
      colors: ['#F44336', '#E91E63', '#9C27B0']
    }
  },

  series: [{
    name: 'series-1',
    data: historicPrice
  }]
}


 const useStyles = makeStyles((theme) => ({

  container: {
    width:"75%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    marginTop:25,
    padding:40,
    [theme.breakpoints.down("md")] : {
      width:"100%",
      marginTop:0,
      padding:20,
      paddingTop:0,
    },
  },
  
  chart:{
    width:"100%",
    display:"flex",
    flexDirection:"column",
    padding:40,
    [theme.breakpoints.down("md")]:{

      width:"100%",
      marginTop:0,
      padding:20,
      paddingTop:0,
    }

  }

 }));
 

 const classes = useStyles();

  return (
  
  <ThemeProvider theme={darkTheme}>
    <div className={classes.container}>
      {
        !historicPrice?(
          <CircularProgress
          style={{ color:"gold" }}
          size={250}
          thickness={1}
          
          />
        ) : (
          <>
  
  <Chart options={graphData.options} series={graphData.series} type="line" className={classes.chart} style={{color:"black"}}/>
          </>
        )
      }
    </div>
  </ThemeProvider>
    )
};

export default CoinInfo;

