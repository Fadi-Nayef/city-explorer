import React from 'react';
import axios from 'axios';
import {  } from 'react-bootstrap';

let resultCity='';

 class Location extends React.Component {
    constructor(props){
    super(props);
    this.state ={
        searchCity:'',
        cityData:'',
        mapShow:false,
        errMessage:false
    }
}

getCity = async(e) =>{

    e.preventDefault();

    let urlCity =  `https://eu1.locationiq.com/v1/search.php?key=pk.ff1d94909e22d37284b36bc35b57968a&q=${this.state.searchCity}&format=json`

try {
     resultCity = await axios.get(urlCity);
    
    this.setState({
        cityData:resultCity.data[0],
        mapShow:true
    })

  }
  catch {
    this.setState({
        mapShow:false,
      errMessage:true
    })
  }}

updateSearchCity = (event) =>{
    this.setState({
        searchCity: event.target.value
        
    })
    //  console.log(this.state.searchCity);
  }


    render() {
        return (
            <div>
                <center>
                 <h1>City Explorer</h1>
                 <form onSubmit={this.getCity}>

                     <input type='text' name='Find a City' placeholder='Find a City' onChange={this.updateSearchCity}/>
                  
                    <button type = 'submit' value='Get Location'> Explore </button>
                
                     </form>  
                 
                     <p>{this.state.cityData.display_name}</p> 
                     {/* <p>{this.state.cityData.lat}</p>  */}


                     { this.state.errMessage &&
        <p>try Again</p>
    }
                    
      {this.state.mapShow &&
         <img
         src={`https://maps.locationiq.com/v3/staticmap?key=pk.ff1d94909e22d37284b36bc35b57968a&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=16`} alt=''
         />
        }
        </center>
            </div>
            
        )
    }
}


export default Location;