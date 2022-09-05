import React, { useEffect, useState } from 'react';
import "./Habit.css";
import { useNavigate } from 'react-router-dom';


function Habit({habitItem, habitCount}) {
 const navigate = useNavigate();

  return (
    <div className='habit_item' onClick={()=>{
      console.log("asd", habitItem);
      navigate('/calender', {state : habitItem});
    }}>
        <p>{habitItem}</p>
        {habitCount!==0 ? (
          <div className='habit-count'>
            <span>{habitCount}</span>
            <img src="https://img.icons8.com/emoji/48/000000/fire.png"/>
          </div>
        ) : (null)}
       
    </div>
  )
}

export default Habit;