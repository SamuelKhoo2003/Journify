'use client'
import React, { useState, useEffect } from 'react';

const ColorChanger: React.FC = () => {
    const [happyColor, setHappyColor] = useState(localStorage.getItem('happyColor') || '#008000');
    const [unhappyColor, setUnhappyColor] = useState(localStorage.getItem('unhappyColor') || '#FF0000');

    useEffect(() => {
        localStorage.setItem('happyColor', happyColor);
        localStorage.setItem('unhappyColor', unhappyColor);
    }, [happyColor, unhappyColor]);

    const handleHappyColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHappyColor(event.target.value);
    };

    const handleUnhappyColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUnhappyColor(event.target.value);
    };

    return (
        <div id='color-pickers' className="flex flex-col items-center justify-between w-4/5">
            <div className="flex justify-center w-full">
                <div className='m-3 flex flex-col items-center'>
                    <label htmlFor="happyColor">Happy Color</label>
                    <input type="color" id="happyColor" value={happyColor} onChange={handleHappyColorChange} />
                </div>

                <div className='m-3 flex flex-col items-center'>
                    <label htmlFor="unhappyColor">Unhappy Color</label>
                    <input type="color" id="unhappyColor" value={unhappyColor} onChange={handleUnhappyColorChange} />
                </div>
            </div>
        </div>
    );
};

export default ColorChanger;
