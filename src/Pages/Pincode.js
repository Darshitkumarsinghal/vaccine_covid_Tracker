import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Grid, Link } from '@material-ui/core';
import axios from 'axios';
import Home from './Home';
import ShowPincodeList from './ShowPincodeList';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Corona from './corona.svg'



const Pincode = () => {
    let myref = React.createRef()
    let [pincode, setPin] = useState("")
    let [data,setData] = useState([])
    let [ageGroup, setAgeGroup]= useState("")
    var today_date = new Date();
    var dd = String(today_date.getDate()).padStart(2, '0');
    var mm = String(today_date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today_date.getFullYear();
    today_date = dd + '-' + mm + '-' + yyyy;


    const [time, setTime] = useState(Date.now());
    let [isError, setError] = useState(true)
    let [isAvailable, setIsAvailable] = useState(false)


    useEffect(() => {
      const interval = setInterval(() => setTime(Date.now()), 2700000);
      return () => {
        clearInterval(interval);
      };
    }, []);

    useEffect(()=>{
        axios.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin', {
            params: {
              pincode:String(pincode),
              date:String(today_date)
            }
          })
          .then(function (response) {
            // console.log(response.data.centers)
            setData(response.data.centers)
          })
          .catch(function (error) {
            // console.log(error);
          })

    },[pincode, time])

    useEffect(()=>{
      data.forEach(d=>{
        // console.log(d)
        d.sessions.forEach(a=>
            {
                // console.log(a)
                if(a["min_age_limit"]==ageGroup){
                  if(a["available_capacity"] > 0 ){
                    setIsAvailable(true)
                }
              }
                
            }
        )
    })
    },[data])


    let SearchPin=()=>{
        if(myref.current.value.length!=6 ||  ageGroup=="")
            alert("Enter 6 digit PIN & age")
        else if(!Number(myref.current.value))
            alert("Only Number allowed")
        else{
            setPin(myref.current.value);
            setError(false)
        }
    }

    let handleRadioChange=(e)=>{
      // console.log(e)
      setAgeGroup(e.target.value)
    }
    return (
        <div>
            {
            isError
            ?
            <Grid style={{height:'100vh', width:'100vw', background:`url(${Corona})`, backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",}}
            container
            direction="column"
            justify="center"
            alignItems="center"
            className="Pincode">
            <Grid item>
              <TextField id="outlined-basic" label="Pincode" variant="outlined" inputRef={myref}/>
            </Grid>
            <br/>
            <span>Select age</span>
            <Grid item>
            <RadioGroup aria-label="quiz" name="quiz" onChange={handleRadioChange}>
              <FormControlLabel value="18" control={<Radio />} label="18+" />
              <FormControlLabel value="45" control={<Radio />} label="45+" />
            </RadioGroup>
            <Button
                variant="contained"
                color="primary"
                onClick={SearchPin}
            >
                Send
            </Button>
            </Grid>
            </Grid>
            :
            <ShowPincodeList data={data} ageGroup={ageGroup} available={isAvailable}/>
}
        </div>
    );
};


export default Pincode;