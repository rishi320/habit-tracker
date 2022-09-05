import React,{useEffect, useState} from 'react';
import Calender from '../Calender/Calender';
import "./CalenderPage.css";
import { useLocation,useNavigate } from 'react-router-dom';


function CalenderPage(props) {
   const navigate = useNavigate();
   const location = useLocation();
   const [allHabits, setAllHabits] = useState();
   const [item, setItem] = useState(location.state);
   const [showButton, setShowButton] = useState(false);
   const [dateObj, setDateObj] = useState({});


 useEffect(()=>{
  if(localStorage.getItem("ALL_HABIT_LIST")){ 
    let arr = localStorage.getItem("ALL_HABIT_LIST");
    let parsed_arr =  JSON.parse(arr)
    console.log("in the useeeffect", parsed_arr[location.state]); //remove it
    setAllHabits(parsed_arr);
  }
 },[])

 const handleButton = (flag)=>{
  
   let habits = {...allHabits};
   flag ? habits[item] = habits[item] + 1 : habits[item] = 0 ;
   console.log("iiiii",habits);
   localStorage.setItem("ALL_HABIT_LIST",JSON.stringify(habits) );
   setShowButton(false);
   navigate("/");
   let obj = {...dateObj};
   obj[Object.keys(obj)[0]] = true;

  console.log("svsdfgsrgrfg", obj);
  setDateObj(obj);
  // const el1 = document.getElementById(`id ${todayDate}`)
  // el1.style.backgroundColor = "#FFEBAD";
  // el1.style.cursor =  "not-allowed";
  // console.log("innnnnnnnnnnnnnnnnnn", el1);

 }
 const handleOnClickDay = (date)=>{
   console.log("DATE",date);
   let obj = {...dateObj}
   obj[date] = false;
   console.log("innnnnnnnnnnnsakd;d", obj);
  setDateObj(obj);
  setShowButton(true);
 }
  console.log("in ", location.state)
  return (
    <div className='calender-page-main'>
      <Calender dayClick={handleOnClickDay} />
      {showButton  &&  <div className='buttons-container'>
        <button className='green-button' onClick={()=>{
          handleButton(true)
        }}>Finished</button>
        <button className='red-button' onClick={()=>{ handleButton(false)}}>Unfinished</button>
      </div>}
     
    </div>
  )
}

export default CalenderPage;