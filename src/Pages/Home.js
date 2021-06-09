import { Button, Paper, MenuItem,
    FormControl,
    Select,
    Card,
    CardContent } from '@material-ui/core';
//import React, { useEffect } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import img from './svgback.svg'
import Tilt from 'react-tilt';
import React, { useState, useEffect } from "react";
import "../App.css";

import InfoBox from "../InfoBox";
import LineGraph from "../LineGraph";
import Table from "../Table";
import { sortData, prettyPrintStat } from "../util";
import numeral from "numeral";
import Map from "../Map";
import "leaflet/dist/leaflet.css";

const Home = () => {
    const [country, setInputCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [countries, setCountries] = useState([]);
    const [mapCountries, setMapCountries] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [casesType, setCasesType] = useState("cases");
    const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
    const [mapZoom, setMapZoom] = useState(3);

    let speak=(x)=>{
        var utter = new SpeechSynthesisUtterance(x);
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
    }
    const useStyles = makeStyles((theme) => ({
        root: {
        //   flexGrow: 1,
        margin:"0",
        padding:"0",
          width: "100%",
          height:"25vh",
        },
        paper:{
            width:"200px",
            height:'100px',
            textAlign:'center',
            padding:"40px",
            background:"rgba(255,255,255,0.2)",
            borderRadius:'10px',
            border:"0.01em solid rgba(255,255,255,0.4)",
            backdropFilter:'blur(2px)',
            fontSize:'2rem',
            color:'#ffffff'
        },
        home: {
            backgroundImage:`url(${img})`,
            //backgroundcolor:'#f5f6fa',
            // backgroundRepeat: "no-repeat",
            //   backgroundAttachment: "fixed",
            //   backgroundSize: "cover",
            // backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1000%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='%230e2a47'%3e%3c/rect%3e%3cpath d='M218.988%2c513.347C256.085%2c511.383%2c278.932%2c476.165%2c295.467%2c442.899C309.834%2c413.996%2c315.248%2c380.437%2c298.878%2c352.619C282.715%2c325.153%2c250.849%2c313.639%2c218.988%2c312.94C185.615%2c312.207%2c151.206%2c321.137%2c132.782%2c348.973C112.472%2c379.658%2c109.978%2c419.225%2c127.069%2c451.813C145.424%2c486.811%2c179.524%2c515.436%2c218.988%2c513.347' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M1158.818429963026 0.5481606328366198L1211.0835019600347 91.0739207929013 1301.6092621200994 38.808848795892395 1249.3441901230906-51.71691136417228z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M1130.7652223450782 174.4551626685591L998.26391844783 263.8284206399797 1087.6371764192504 396.329724537228 1220.1384803164988 306.9564665658074z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M188.35923186606374 272.60967322945964L111.4608121419435 127.98478011099647-33.16408097651967 204.8831998351167 43.73433874760056 349.5080929535799z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M667.714%2c504.52C717.964%2c505.264%2c756.901%2c465.455%2c781.279%2c421.508C804.811%2c379.086%2c814.366%2c327.267%2c788.963%2c285.938C764.484%2c246.111%2c714.388%2c234.12%2c667.714%2c236.741C625.892%2c239.089%2c589.362%2c262.34%2c567.958%2c298.347C546.023%2c335.248%2c541.131%2c379.587%2c559.828%2c418.229C581.325%2c462.658%2c618.363%2c503.789%2c667.714%2c504.52' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M383.273%2c491.046C430.661%2c489.015%2c473.912%2c465.377%2c498.247%2c424.665C523.264%2c382.812%2c525.849%2c332.137%2c504.449%2c288.324C479.909%2c238.082%2c439.185%2c188.734%2c383.273%2c189.273C327.921%2c189.807%2c292.465%2c241.96%2c266.079%2c290.622C241.285%2c336.347%2c223.608%2c390.407%2c249.864%2c435.309C275.938%2c479.9%2c331.665%2c493.258%2c383.273%2c491.046' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1000'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cstyle%3e %40keyframes float1 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-10px%2c 0)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float1 %7b animation: float1 5s infinite%3b %7d %40keyframes float2 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-5px%2c -5px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float2 %7b animation: float2 4s infinite%3b %7d %40keyframes float3 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(0%2c -10px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float3 %7b animation: float3 6s infinite%3b %7d %3c/style%3e%3c/defs%3e%3c/svg%3e")`
            
        },
      }));
      const classes = useStyles();

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
            .then((response) => response.json())
            .then((data) => {
                setCountryInfo(data);
            });
    }, []);

    useEffect(() => {
        const getCountriesData = async () => {
            fetch("https://disease.sh/v3/covid-19/countries")
                .then((response) => response.json())
                .then((data) => {
                    const countries = data.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso2,
                    }));
                    let sortedData = sortData(data);
                    setCountries(countries);
                    setMapCountries(data);
                    setTableData(sortedData);
                });
        };

        getCountriesData();
    }, []);

    console.log(casesType);

    const onCountryChange = async (e) => {
        const countryCode = e.target.value;

        const url =
            countryCode === "worldwide"
                ? "https://disease.sh/v3/covid-19/all"
                : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setInputCountry(countryCode);
                setCountryInfo(data);
                setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                setMapZoom(4);
            });
    };

    //speak("Hello, welcome to, Indian vaccine search portal")
    return (
      <div>
        <div className="Home" className={classes.home}>
        <div style={{textAlign:'center', marginTop:'0px', color:'#ffffff', fontSize:'3rem'}}>Welcome to Indian vaccine search portal</div>
        <div style={{textAlign:'center', marginTop:'0px', color:'#ffffff', fontSize:'1.5rem'}}></div>
        <Grid container  direction="row"
            justify="space-around"
            alignItems="center" className={classes.root} spacing={3}> 
            <Link style={{textDecoration:'none'}} to="/pincode">  
            <Grid item lg={12}>
            <Tilt options={{ scale: 1.2, max: 25, speed: 300, transition: true }}>
            <Paper className={classes.paper} elevation={8}>
                SEARCH BY PINCODE
                <Button>CLICK HERE</Button> 
            </Paper> 
            </Tilt>
            </Grid> 
            


            </Link>


            <Link style={{textDecoration:'none'}} to="/district">
            <Grid item lg={12} >
            <Tilt options={{ scale: 1.2, max: 25, speed: 300, transition: true }}>
            <Paper className={classes.paper} elevation={8}>
                SEARCH BY DISTRICT
                <Button>CLICK HERE</Button>
            </Paper>
            </Tilt>
            </Grid>
            </Link>
        </Grid>
</div>
          <div className="app">
              <div className="app__left">
                  <div className="app__header">
                      <h1>COVID-19 Tracker</h1>
                      <FormControl className="app__dropdown">
                          <Select
                              variant="outlined"
                              value={country}
                              onChange={onCountryChange}
                          >
                              <MenuItem value="worldwide">Worldwide</MenuItem>
                              {countries.map((country) => (
                                  <MenuItem value={country.value}>{country.name}</MenuItem>
                              ))}
                          </Select>
                      </FormControl>
                  </div>
                  <div className="app__stats">
                      <InfoBox
                          onClick={(e) => setCasesType("cases")}
                          title="Coronavirus Cases"
                          isRed
                          active={casesType === "cases"}
                          cases={prettyPrintStat(countryInfo.todayCases)}
                          total={numeral(countryInfo.cases).format("0.0a")}
                      />
                      <InfoBox
                          onClick={(e) => setCasesType("recovered")}
                          title="Recovered"
                          active={casesType === "recovered"}
                          cases={prettyPrintStat(countryInfo.todayRecovered)}
                          total={numeral(countryInfo.recovered).format("0.0a")}
                      />
                      <InfoBox
                          onClick={(e) => setCasesType("deaths")}
                          title="Deaths"
                          isRed
                          active={casesType === "deaths"}
                          cases={prettyPrintStat(countryInfo.todayDeaths)}
                          total={numeral(countryInfo.deaths).format("0.0a")}
                      />
                  </div>
                  <Map
                      countries={mapCountries}
                      casesType={casesType}
                      center={mapCenter}
                      zoom={mapZoom}
                  />
              </div>
              <Card className="app__right">
                  <CardContent>
                      <div className="app__information">
                          <h3>Live Cases by Country</h3>
                          <Table countries={tableData} />
                          <h3>Worldwide new {casesType}</h3>
                          <LineGraph casesType={casesType} />
                      </div>
                  </CardContent>
              </Card>
          </div>
      </div>
    );
};

export default Home;