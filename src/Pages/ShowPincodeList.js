import { Button, Grid, Paper, Radio } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './style.css'

const ShowList = (props) => {
    let speak = (x)=>{
        let utter = new SpeechSynthesisUtterance(x);
    
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
    }

    return (
        
        <div className="DataShowing"> 
        {/* {console.log(props.available)} */}
        <h2 style={{textAlign:'center', color:'#2B2B52'}}>{`Showing Result for Age: ${props.ageGroup} +`}</h2>
            {
                props.data.map(d => {
                    return (
                        <Paper className="pincode_data" elevation={5}>
                            <h2 style={{color:'#2C3335'}}>{d.name}</h2>
                            <h3 style={{color:'#2C3335'}}>{`Address: ${d.address}`}</h3>
                            {
                                d.sessions.map(a => {
                                    // console.log(a)
                                    
                                    return (
                                        a["min_age_limit"]==props.ageGroup
                                        ?
                                        <a target="_blank" href="https://selfregistration.cowin.gov.in/" style={{textDecoration:'none'}}> 
                                        <Grid container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="center"
                                        // spacing={2}
                                        className={
                                            a["available_capacity"] > 0
                                                ? "Available"
                                                : "NotAvailable"
                                        }>
                                            <Grid item lg={4} md={4} sm={12} xs={12}><h4 style={{textAlign:'center'}}><span className="title">Date: </span>{`${a.date}`}</h4></Grid>
                                            <Grid item lg={4} md={4} sm={12} xs={12}><div>
                                                <h3 style={{textAlign:'center'}}><span className="title">Dose1 Availability:</span>{` ${a["available_capacity_dose1"]}`}</h3>
                                                <h3 style={{textAlign:'center'}}><span className="title">Dose2 Availability:</span>{` ${a["available_capacity_dose2"]}`}</h3>
                                            </div></Grid>
                                            <Grid item lg={4} md={4} sm={12} sx={12}><h4 style={{textAlign:'center'}}><span className="title">Vaccine:</span><span style={{fontStyle:'bold'}}>{` ${a["vaccine"]}`}</span></h4></Grid>
                                            
                                            
                                        </Grid>
                                        </a>
                                        :
                                        <h5 style={{textAlign:'center'}}>NOT AVAILABLE</h5>
                                    )
                                    
                                })
                            }
                         <small style={{fontSize:'0.7rem'}}>CLICK to visit COWIN portal</small>   
                        </Paper>
                    )
                })

                
            }
            
            {
                props.available ? speak("vaccine is available, please scroll, you'll find green") : speak("sorry vaccine is not available, stay here, we will notify you once the vaccine is available")
            }
        </div>
    );

};


export default ShowList;