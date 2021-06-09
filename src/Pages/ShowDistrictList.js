import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Paper } from '@material-ui/core';
import './style.css'

const ShowDistrictList = (props) => {
    let [mydata, setMyData] = useState([])
    let [isAvailable, setIsAvailable] = useState(false)

    // console.log(props)
    var today_date = new Date();
    var dd = String(today_date.getDate()).padStart(2, '0');
    var mm = String(today_date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today_date.getFullYear();
    today_date = dd + '-' + mm + '-' + yyyy;

    const [time, setTime] = useState(Date.now());

    useEffect(() => {
      const interval = setInterval(() => setTime(Date.now()), 2700000);
      return () => {
        clearInterval(interval);
      };
    }, []);


    useEffect(()=>{
        axios.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict', {
            params:{
                district_id: String(props.districtID),
                date: String(today_date)
            }
          })
          .then(function (response) {
            //   console.log(response)
            setMyData(response.data.centers)
          })
          .catch(function (error) {
            // console.log(error);
          })
    },[time])

    useEffect(()=>{
      mydata.forEach(d=>{
        d.sessions.forEach(a=>
            {
              // console.log(d.name+"...."+a["available_capacity"]+"...."+a["min_age_limit"])
              if(a["min_age_limit"]==props.ageGroup){
                if(a["available_capacity"] > 0 ){
                  setIsAvailable(true)
                }
              }
            }
        )
    })
    },[mydata])


    let speak = (x)=>{
      let utter = new SpeechSynthesisUtterance(x);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
  }


    return (
        <div className="DataShowing">
            <h2 style={{textAlign:'center',marginBottom:'50px', color:'#2B2B52'}}>{`Showing Result for Age: ${props.ageGroup} +`}</h2>
            {
                mydata.length>=0 ?
                mydata.map(d=>{
                    return(
                        <Paper className="pincode_data" elevation={10}>
                        <h2 style={{color:'#2C3335', fontWeight:'10em'}}>{d.name}</h2>
                        <h3 style={{color:'#2C3335', }}>{`Address: ${d.address}`}</h3>
                        {
                            d.sessions.map(a=>{
                                   { 
                                      return(
                                        a["min_age_limit"]==props.ageGroup
                                        ?
                                            <a target="_blank" href="https://selfregistration.cowin.gov.in/" style={{textDecoration:'none'}}> 
                                            <Grid 
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignItems="center"
                                            className={
                                                a["available_capacity"] > 0
                                                    ? "Available"
                                                    : "NotAvailable"}
                                            >
                                            <Grid item lg={4} md={4} sm={12} xs={12}><h4 style={{textAlign:'center'}}><span className="title">Date: </span>{`${a.date}`}</h4></Grid>
                                            <Grid item lg={4} md={4} sm={12} xs={12}><div>
                                                <h3 style={{textAlign:'center'}}><span className="title">Dose1 Availability:</span>{` ${a["available_capacity_dose1"]}`}</h3>
                                                <h3 style={{textAlign:'center'}}><span className="title">Dose2 Availability:</span>{` ${a["available_capacity_dose2"]}`}</h3>
                                            </div></Grid>
                                            <Grid item lg={4} md={4} sm={12} xs={12}><h4 style={{textAlign:'center'}}><span className="title">Vaccine:</span><span style={{fontStyle:'bold'}}>{` ${a["vaccine"]}`}</span></h4></Grid>
                                            
                                            </Grid>
                                            </a>
                                        :
                                        <h5 style={{textAlign:'center'}}>NOT AVAILABLE</h5>
                                      ) 
                                    }
                            })
                        }
                        <small style={{fontSize:'0.7rem'}}>CLICK to visit COWIN portal</small>   
                        </Paper>
                    )
                })
                :(<h1>LOADEDING.</h1>)
            }
             {
              isAvailable ? speak("vaccine is available, please scroll, you'll find green") : speak("sorry vaccine is not available, stay here, we will notify you once the vaccine is available")
            }
        </div>
       
    );
};

export default ShowDistrictList;