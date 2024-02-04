import React, { useState } from "react";
import clsx from 'clsx';
import { Hobby } from "@/app/types/Hobby";
import { TrashIcon } from '@radix-ui/react-icons'

type HobbyTextProps = {
    hobby: Hobby;
    index: number;
    deleteHobby: (index: number) => void;
}

const HobbyText: React.FC<HobbyTextProps> = ({hobby, index, deleteHobby}) => {
    const [displayDelete, setDisplayDelete] = useState(false);
    const handleMouseEnter = () => {
        setDisplayDelete(true);
    };

    const handleMouseLeave = () => {
        setDisplayDelete(false);
    };
    const handleClick = () => {
        deleteHobby(index)
    }
    return (
        <div className='flex flex-row  items-center justify-between text-xl mt-3 pl-4 pt-2 pb-2 bg-secondary rounded-sm w-full' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="flex-grow-1"> {hobby.name}</div>
            {displayDelete && <div className= 'flex text-xl h-full rounded-sm items-center justify-center w-12 bg-red-500 hover:bg-red-800 ml-2 mr-2 flex-grow-0' onClick={handleClick}> <TrashIcon/> </div>}
        </div>
    )
}

export default HobbyText;