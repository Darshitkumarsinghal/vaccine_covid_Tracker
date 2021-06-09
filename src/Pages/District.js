import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-dropdown-select';
import ShowList from './ShowPincodeList';
import ShowDistrictList from './ShowDistrictList';
import { Button, Grid } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ClassRounded } from '@material-ui/icons';
import Corona from './corona.svg'
const District = () => {
    let [state_list, setStateList] = useState([])
    let [state_id, setStateId] = useState("")
    let [district, setDistrict] = useState([])
    let [district_id, setDistrictId] = useState("")
    let [searchClicked, setSearchClicked]=useState(false)
    let [ageGroup, setAgeGroup]= useState("")

    useEffect(()=>{
        axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states', {
          })
          .then(function (response) {
            setStateList(response.data.states)
          })
          .catch(function (error) {
            // console.log(error);
          })
    },[])
    useEffect(()=>{
        axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state_id}`, {
          })
          .then(function (response) {
            setDistrict(response.data.districts)
          })
          .catch(function (error) {
            // console.log(error);
          })
    },[state_id])

   


    let onChangeState =(v)=>{
        setStateId(v[0].state_id)
    }

    let onChangeDistrict =(v)=>{
        setDistrictId(v[0].district_id)
    }

    let searchButtonClicked = ()=>{
        if(ageGroup!=""&& district_id!="" && state_id!=""){
            setSearchClicked(true)

        }
        else{
            alert("Enter all fields")
        }
    }
    let handleRadioChange=(e)=>{
        // console.log(e)
        setAgeGroup(e.target.value)
    }
    return (
        <div>
            {/* {console.log(district_id)} */}
            {
                !searchClicked ?
                (
                <Grid style={{height:'100vh', width:'100vw', background:`url(${Corona})`, backgroundRepeat: "no-repeat",
                  backgroundAttachment: "fixed",
                  backgroundSize: "cover",}}
                container
                direction="column"
                justify="center"
                alignItems="center"
                className="District">
                <Select
                    
                    options={state_list}
                    onChange={(values) => onChangeState(values)}
                    labelField="state_name"
                    labelValue="state_id"
                    required
                    placeholder="Select State..."
                    // loading
                    searchable={true}
                    searchBy="state_name"
                    style={{width:"50vw", marginBottom:'10px', border:'1px solid black'}}
                />
                <Select
                    
                    options={district}
                    onChange={(values) => onChangeDistrict(values)}
                    labelField="district_name"
                    labelValue="district_id"
                    required
                    placeholder="Select District..."
                    // loading
                    searchable={true}
                    searchBy="district_name"
                    style={{width:"50vw", border:'1px solid black'}}
                />
                <br/>
                <span>Select age</span>
                <RadioGroup aria-label="quiz" name="quiz" onChange={handleRadioChange}>
                <FormControlLabel value="18" control={<Radio />} label="18+" />
                <FormControlLabel value="45" control={<Radio />} label="45+" />
                </RadioGroup>
                <Button variant="contained"
                color="primary" onClick={searchButtonClicked}>SEARCH</Button>
                </Grid>
                )
                :
                <ShowDistrictList districtID={district_id} ageGroup={ageGroup}/>
            }
            
        </div>
    );
};

export default District;