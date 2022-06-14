import React, { useEffect, useState } from "react";
import WeatherCard from "./weathercard";
import './style.css'
const Weather = () => {

 const [searchValue, setSearchValue] = useState("pune");
 const [tempValue, setTempValue] = useState({ });


    const getWeatherValue = async() =>{
        try{
          let url =`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=f2cc31724f9f475bdf0d92b5703cdb18`;
          let res =await fetch(url);

          let data =await res.json();
         

        const{temp,humidity,pressure} = data.main;
        const{main:weathermood} =data.weather[0];
        const{name} = data;
        const{speed} =data.wind;
        const{country, sunset} =data.sys;

        const NewWeatherObject ={
           temp,
           humidity,
           name,
           pressure,
           weathermood,
           speed,
           country,sunset
           
        }
        setTempValue(NewWeatherObject);

        }catch(error){
            console.log(error);
        }
      
    };




   useEffect(() =>{
       getWeatherValue();
   },[]);

    return(
      <>
       <div className="wrap">
               <div className="search">
                   <input 
                     type="search"
                     id="search"
                     className="searchTerm"
                     placeholder="search...."
                     value={searchValue}
                     onChange={(e)=>
                         setSearchValue(e.target.value)
                     }
                   />

                   <button type="search" className="searchButton" onClick={getWeatherValue} >
                        SEARCH YOUR LOCATION
                   </button>
               </div>
               </div>



            <WeatherCard   tempValue={tempValue}/>
                  


                



       
      
      </>
    )
}

export default Weather;