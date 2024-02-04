import React, { useState } from "react";
import clsx from 'clsx';
import { Hobby } from "@/app/types/Hobby";

type StreakCounterProps = {
    hobby: Hobby;
    index: number;
    updateStreakCount: (index: number, toAdd: boolean) => void;
};

const StreakCounter: React.FC<StreakCounterProps> = ({ hobby, index, updateStreakCount }) => {
    const [toAdd, setToAdd] = useState(false);

    const handleClick = () => {
        const newToAdd = !toAdd;
        setToAdd(newToAdd);
        updateStreakCount(index, newToAdd);
    };

    return (  
        <div className= {clsx(
            'text-xl ml-4 mt-3 p-2 rounded-sm flex flex-col items-center justify-center w-12', // Added flexbox classes for centering
            {
                'bg-secondary': !toAdd, // Class when toAdd is false
                'bg-primary': toAdd // Class when toAdd is true
            }
        )} onClick={handleClick}>
            <div>{hobby.count > 0 ? "🔥" : "🥶"}</div>
            <div className="text-sm text-center"> {hobby.count}</div>
        </div>     
    );
};

export default StreakCounter;
