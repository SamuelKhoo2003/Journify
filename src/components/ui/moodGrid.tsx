import React from 'react';
import { sentimentsArrayForThisYear, countSentimentsForThisYear } from '../../Helpers/Helper'
import chroma from 'chroma-js';

// CUSTOM COLOR STUFF
const happyColor = localStorage.getItem('happyColor') || '#008000';
const unhappyColor = localStorage.getItem('unhappyColor') || '#FF0000';
const colorScale = chroma.scale([unhappyColor, happyColor]).mode('lch');

// get 5 hex codes from the colour scale
let happiest = colorScale(1).hex();
let happy = colorScale(0.75).hex();
let neutral = colorScale(0.5).hex();
let unhappy = colorScale(0.25).hex();
let unhappiest = colorScale(0).hex();

// Example component to render a "contributions" grid
const MoodGrid: React.FC = () => {
  // Assume a year of contributions (52 weeks x 7 days)
  const weeks = 52;
  const days = 7;

  // Generate an example data set with random contributions count for each day
  const data = sentimentsArrayForThisYear();

  // Function to determine the color based on the contribution count
  const colorForCount = (count: number) => {
    let color;
    if (isNaN(count)) color = '#374151'; // bg-slate-600
    else if (count <= -7) color = unhappiest;
    else if (count <= -4) color = unhappy;
    else if (count === 0) color = neutral; // no contributions
    else if (count <= 4) color = happy; // 1-9 contributions
    else color = happiest; // 30+ contributions

    return color;
};

  return (
    <div className="bg-[#1E293B] p-4 text-white flex-row ml-2 mr-2 rounded-lg">
      <div className="text-sm mb-2">{countSentimentsForThisYear()} journal entries to date</div>
      <div className="flex gap-1.5 justify-center">
        {Array.from({ length: weeks }).map((_, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1.5">
            {Array.from({ length: days }).map((_, dayIndex) => {
              const count = data[weekIndex * days + dayIndex];
              return (
                <div
                  key={dayIndex}
                  className={`w-3 h-3 rounded-sm`}
                  style={{ opacity: isNaN(count) ? 0.3 : 1, backgroundColor: colorForCount(count) }}
                />
              );
            })}
          </div>
        ))}
      </div>
      {/* Legend for contributions */}
      <div className="flex justify-end mt-2">
        <div className="flex items-center">
          <span className="text-xs text-gray-400 mr-2">Negative</span>
          <div className="flex gap-1">
            {[-7, -4, 0, 4, 7].map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm`} style={{ backgroundColor: colorForCount(_)}}/>
            ))}
          </div>
          <span className="text-xs text-gray-400 ml-2">Positive</span>
        </div>
      </div>
    </div>
  );
};

export default MoodGrid;
