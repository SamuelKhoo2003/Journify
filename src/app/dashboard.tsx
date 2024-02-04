'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import './styles/graphs.css';
import MoodGrid from '@/components/ui/moodGrid';
import { getJournalAtDate, getJournalEntries} from '../Helpers/Helper'
import chroma from 'chroma-js';


Chart.register(...registerables);


// CUSTOM COLOR STUFF
const happyColor = localStorage.getItem('happyColor') || '#008000';
const unhappyColor = localStorage.getItem('unhappyColor') || '#FF0000';
const colorScale = chroma.scale([unhappyColor, happyColor]).mode('lch');

// Function to get border color based on data value
const convertSentimentToColor = (sentiment: number, alpha?: number) => {
    //return `rgba(${125 - (sentiment * 10)}, ${125 + (sentiment * 10)}, 0, ${sentiment ?? 1})`;
    const color = colorScale(normaliseSentiment(sentiment)).rgba();
    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha ?? 1})`;
}

//normalise the sentiment (a value between -20 and +20) to be between 0 and 1
const normaliseSentiment = (sentiment: number) => {
    return (sentiment + 20) / 40;
}



// dummy sentiment data
let monthSentiments = [-5, -6.5, -2, 1, -1, 4, 6, 6, 2, -1, -2, 4, 6, 7];
const last7DaysSentiments = [1, 4, 6, 8, 3, 5, 2];


// Function to get month name from a Date object
const getMonthName = (date: Date) => {
    const year = date.getFullYear().toString().substr(-2); // get last two digits of year
    const month = date.toLocaleString('default', { month: 'short' });
    return `${month} '${year}`;
}

// Generate an array of month labels for the past year
const generateLast12Months = () => {
    const months = [];
    let date = new Date();
    for (let i = 0; i < 13; i++) {
        months.unshift(getMonthName(date));
        date.setMonth(date.getMonth() - 1);
    }
    return months;
}

const generateLast7Days = () => {
    const days = [];
    let date = new Date();
    for (let i = 0; i < 7; i++) {
        days.unshift(date.toLocaleString('default', { weekday: 'short' }));
        date.setDate(date.getDate() - 1);
    }
    return days;
}

const getSentimentLast7Days = () => {
    // journal entries data (just do .sentiment for the sentiment values)
    const storedJournalEntries = getJournalEntries();
    const sentiments = [];
    let date = new Date();
    for (let i = 0; i < 7; i++) {
        const str = "" + date.getFullYear() + date.getMonth() + date.getDate();
        if(storedJournalEntries.includes(str)){
            sentiments.unshift(JSON.parse(getJournalAtDate(str)??"{}").sentiment);
        }
        else{
            sentiments.unshift(0);
        }
        date.setDate(date.getDate() - 1);
    }
    return sentiments;
} 

const getSentimentLast12Months = () => {
    // journal entries data (just do .sentiment for the sentiment values)
    const storedJournalEntries = getJournalEntries();
    const sentiments = [];
    let date = new Date();
    for (let i = 0; i < 365; i++) {
        const str = "" + date.getFullYear() + date.getMonth() + date.getDate();
        if(storedJournalEntries.includes(str)){
            sentiments.unshift(JSON.parse(getJournalAtDate(str)??"{}").sentiment);
        }
        else{
            sentiments.unshift(0);
        }
        date.setDate(date.getDate() - 1);
    }
    var monthAverage = [];
    for(var i = 0; i < 12; i++){
        const chunk = sentiments.slice(i * 30, (i * 30) + 30);
        var avg = 0;
        for(var k = 0; k < chunk.length; k++){
            avg += chunk[k];
        }
        avg = avg / 30;
        monthAverage.push(avg);
    }
    //console.log(monthAverage);
    monthSentiments = monthAverage;
    return monthAverage;
} 

function updateThisMonthData() {
    // journal entries data (just do .sentiment for the sentiment values)
    const storedJournalEntries = getJournalEntries();
    // just update the data for the current month
    const date = new Date();
    const str = "" + date.getFullYear() + date.getMonth() + date.getDate();
        if(storedJournalEntries.includes(str)){
        //monthSentiments[12] = monthSentiments[12] + (JSON.parse(getJournalAtDate(str) ?? "{}").sentiment / 28.0);
    }
    
}

const Dashboard = () => {
    var date = new Date();
    const str = "" + date.getFullYear() + date.getMonth() + date.getDate();
    const [senti, setSenti] = useState(getJournalAtDate(str));
    if(getJournalAtDate(str) != senti){
        setSenti(getJournalAtDate(str));
    }
    
    //
    // CHART 1 (12 months)
    //
    updateThisMonthData();

    const chartContainer = useRef(null);
    const chartRef = useRef<Chart<"line", number[], string> | null>(null);
    getSentimentLast12Months();
    // Dummy sentiment analysis data
    const sentimentData = {
        labels: generateLast12Months(),
        datasets: [
            {
                label: 'Sentiment',
                data: monthSentiments,
                backgroundColor: (context: { dataset: { data: { [x: string]: number; }; }; dataIndex: string | number; }) => convertSentimentToColor(context.dataset.data[context.dataIndex]),
                borderColor: (context: { dataset: { data: { [x: string]: number; }; }; dataIndex: string | number; }) => convertSentimentToColor(context.dataset.data[context.dataIndex]),
                borderWidth: 3,
                tension: 0.4,
            }
        ],
    };

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            if (chartRef.current) {
                chartRef.current.destroy();  // destroy previous chart instance
            }
            const newChartInstance = new Chart<"line", number[], string>(chartContainer.current, {
                type: 'line',
                data: sentimentData,
                options: {
                    scales: {
                        y: {
                            suggestedMin: -2,
                            suggestedMax: 2
                        }
                    },
                    plugins: {
                        legend: {
                            display: false, 
                        },             
                        animation: {
                            easing: 'linear',
                            duration: 500
                        }
                    }
                }
            });

            chartRef.current = newChartInstance;
        }
    }, [senti]);

    // 
    // CHART 2 (7 days)
    //

    const chartContainer2 = useRef(null);
    const chartRef2 = useRef<Chart<"line", number[], string> | null>(null);
    // Dummy sentiment analysis data
    var sentimentData2 = {
        labels: generateLast7Days(),
        datasets: [
            {
                label: 'Sentiment',
                data: getSentimentLast7Days(),
                backgroundColor: (context: { dataset: { data: { [x: string]: number; }; }; dataIndex: string | number; }) => convertSentimentToColor(context.dataset.data[context.dataIndex]),
                borderColor: (context: { dataset: { data: { [x: string]: number; }; }; dataIndex: string | number; }) => convertSentimentToColor(context.dataset.data[context.dataIndex]),
                borderWidth: 3,
                tension: 0.4,
            }
        ],
    };
    
    useEffect(() => {
        if (chartContainer2 && chartContainer2.current) {
            if (chartRef2.current) {
                chartRef2.current.destroy();  // destroy previous chart instance
            }
            const newChartInstance2 = new Chart<"line", number[], string>(chartContainer2.current, {
                type: 'line',
                data: sentimentData2,
                options: {
                    plugins: {
                        legend: {
                            display: false,
                        },
                        
                    },
                    scales: {
                        y: {
                            suggestedMin: -10,
                            suggestedMax: 10
                        }
                    },
                    animation: {
                        easing: 'linear',
                        duration: 500
                    }
                }
            });

            chartRef2.current = newChartInstance2;
        }
    }, [senti]);
    return (
        <div className="flex min-h-screen flex-col items-center justify-between .h-screen w-4/5">
            <div id="d" className="section align-top"></div>
            <div id="dashboard">
                <h2 className='text-4xl mb-3 ml-2' style={{ color: '#D9C4B3' }}>Your Moods</h2>
                <div id='graph-holder' className="align-top flex content-center w-[80vw] mb-3">
                    <div className='m-2 w-1/2 rounded-lg p-3 bg-stone-200'>
                        <h3 className='text-xl pr-2 ml-1 mb-2' style={{ color: '#A98876' }}>Last 7 days</h3>
                        <canvas id='chart2' className='' ref={chartContainer2} />
                    </div>
                    <div className='m-2 w-1/2 rounded-lg p-3 bg-stone-200'>
                        <h3 className='text-xl pr-2 ml-1 mb-2' style={{ color: '#A98876' }}>Last 12 Months</h3>
                        <canvas id='chart1' className='' ref={chartContainer} />
                    </div>
                </div>
                <MoodGrid/>
            </div>
            <div></div>             {/* please dont delete this  */}
        </div>
    );
};

export default Dashboard;