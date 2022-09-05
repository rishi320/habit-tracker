import React,{useEffect, useState} from 'react';
import Habit from '../Habit/Habit';
import "./Home.css";

function Home() {
    const [habitInputFlag, setHabitInputFlag] = useState(false);
    const [habit, setHabit] = useState("");
    const [allHabitList, setAllHabitList] = useState({});

    useEffect(()=>{
      if(localStorage.getItem("ALL_HABIT_LIST")){ 
        let arr = localStorage.getItem("ALL_HABIT_LIST");
        let parsed_arr =  JSON.parse(arr)
        console.log("in the useeeffect", parsed_arr); //remove it
        setAllHabitList(parsed_arr);
      }
    },[])
  
   
    const handleClick = () => {
      setHabitInputFlag(true);
    }
  
    const handleAddHabit = () => {
      let new_arr = {...allHabitList};
      setHabitInputFlag(false);
      new_arr[habit] = 0;
      console.log("ibnkjfds", new_arr);
      setAllHabitList(new_arr);
      localStorage.setItem("ALL_HABIT_LIST", JSON.stringify(new_arr))
      setHabit("");
    }

  return (
    <div className='home'>
     <div className="quote__container">
        {/* Add the quote */}
        <p className="quote">
          All big things come from small beginnings. The seed of every habit is a single, tiny decision.
          Success is the product of daily habits—not once-in-a-lifetime transformations.
        </p>
      </div>
      <div className="habit_container">
        {/* give the todo list component and the button */}
        <button className='add_habit' onClick={handleClick}>Add new habit</button>
        {habitInputFlag ? (<div className='habit_input'>
          <input type="text" id="habit" value={habit} onChange={(e) => {
            setHabit(e.target.value);
          }} />
          <button onClick={handleAddHabit}>Add</button>
        </div>) : (null)}
        <div className="habit_list">
         {  Object.keys(allHabitList).length === 0 ?  null : <p>Your Habits</p>}
          {allHabitList !== {} ? (
            Object.keys(allHabitList).map((item, index) => (
              <div key={index}>
                <Habit habitItem={item} habitCount={allHabitList[item]}/>
              </div>
            ))
          ) : (null)}
         
        </div>
      </div>
    </div>
  )
}

export default Home;