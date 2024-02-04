'use client'
import React, { useState, useEffect } from 'react';
import { NewHobbyDrawer } from '@/components/ui/newHobby';
import StreakCounter from '@/components/ui/streakCounter';
import HobbyText from '@/components/ui/HobbyText';
import {getHobbies, saveHobbies} from '../Helpers/Helper'
const HobbyTracker = () => {
  const [hobbies, setHobbies] = useState(getHobbies());
  const updateStreakCount = (index: number, toAdd: boolean) => {
    
  const newHobbies = hobbies.map((hobby, i) => 
    toAdd ? (i === index ? { ...hobby, count: hobby.count + 1 } : hobby):
            (i === index ? { ...hobby, count: Math.max(hobby.count -1, 0)} : hobby)
  );
  setHobbies(newHobbies);
  };
  const deleteHobby = (index: number) => {
    // Using filter to remove the item at the given index
    const newHobbies = hobbies.filter((_, i) => i !== index);
    setHobbies(newHobbies);
  };

  useEffect(() => {
    saveHobbies(hobbies);
  }, [hobbies]); // Save hobbies when they change

 

  return (
    <div className="flex min-h-screen w-1/2 z-50 flex-col items-center justify-between">
      <div id="hobby" className="section align-top"></div>
      <div className='flex flex-col w-4/5'> 
          <div className ="text-4xl mb-5" style={{ color: '#D9C4B3' }}>How's your day?</div>
          {hobbies.length > 0 ? (
              // hobbies.map((hobby, index) => (
              //   <div key={index} className="flex flex-row ">
              //     <HobbyText hobby={hobby} index={index} deleteHobby={deleteHobby}/>
              //     <StreakCounter hobby={hobby} index={index} updateStreakCount={updateStreakCount}/>
              //   </div>
              // ))
                <div key={hobbies.length - 1} className="flex flex-row ">
                  <HobbyText hobby={hobbies[hobbies.length-1]} index={hobbies.length - 1} deleteHobby={deleteHobby}/>
                  {/* <StreakCounter hobby={hobbies[hobbies.length-1]} index={hobbies.length-1} updateStreakCount={updateStreakCount}/> */}
                </div>
            ) : (
              <div>
                <div className='text-xl text-center border-yellow-900 border-1 bg-stone-400 p-5 py-10 rounded-lg' style={{ backgroundColor: '#A98876' }}><span style={{ color: '#D9C4B3' }}>Describe your day in one word!</span></div>
              </div>
            )}
            <NewHobbyDrawer hobbies={hobbies} setHobbies={setHobbies}/>
        </div>
      <div></div>
    </div>
  );
};

export default HobbyTracker;