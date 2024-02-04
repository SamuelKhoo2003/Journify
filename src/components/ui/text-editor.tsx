import React, { useMemo, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../app/styles/textbox.css";
import { getJournalAtDate, getJournalEntries, setJournal } from '../../Helpers/Helper'
import chroma from 'chroma-js';

var sentiment = require('wink-sentiment');

// THIS WHOLE PART LOADS THE PREV JOURNAL
var prevJournal = "";
const storedJournalEntries = getJournalEntries();
const date = new Date();
const str = "" + date.getFullYear() + date.getMonth() + date.getDate();
if (storedJournalEntries.includes(str)) {
    prevJournal = JSON.parse(getJournalAtDate(str) ?? "{}").text;
}

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


function runthispls(content: string) {
    // THIS REMOVES ALL HTML TAGS
    const adjustedContent = content.replace(/(<([^>]+)>)/ig, '');
    // Get Sentiment score
    const sentimentValue = sentiment(adjustedContent).score;

    const textbox = document.getElementsByClassName("ql-container")[0] as HTMLDivElement;
    const toolbar = document.getElementsByClassName("ql-toolbar")[0] as HTMLDivElement;
    
    //remove old border colors (can be generated)
    
    // change the css of the color-sentiment class based on sentiment value
    textbox.style.borderColor = convertSentimentToColor(sentimentValue);
    //textbox.style.boxShadow = "0 0 0 3px " + convertSentimentToColor(sentimentValue, 0.2);
    textbox.style.boxShadow = `
    ${convertSentimentToColor(sentimentValue, 0.25)} 0px 54px 55px, 
    ${convertSentimentToColor(sentimentValue, 0.12)} 0px -12px 30px, 
    ${convertSentimentToColor(sentimentValue, 0.12)} 0px 4px 6px, 
    ${convertSentimentToColor(sentimentValue, 0.17)} 0px 12px 13px, 
    ${convertSentimentToColor(sentimentValue, 0.09)} 0px -3px 5px
`;
    toolbar.style.borderColor = convertSentimentToColor(sentimentValue);
    //toolbar.style.boxShadow = "0 0 0 3px " +convertSentimentToColor(sentimentValue, 0.2);
    toolbar.style.boxShadow = `
    ${convertSentimentToColor(sentimentValue, 0.25)} 0px 54px 55px, 
    ${convertSentimentToColor(sentimentValue, 0.12)} 0px -12px 30px, 
    ${convertSentimentToColor(sentimentValue, 0.12)} 0px 4px 6px, 
    ${convertSentimentToColor(sentimentValue, 0.17)} 0px 12px 13px, 
    ${convertSentimentToColor(sentimentValue, 0.09)} 0px -3px 5px
`;
}

export default function TextEditor() {
    const [value, setValue] = useState(prevJournal);

    if(value != null){
        // THIS REMOVES ALL HTML TAGS
        const adjustedValue = value.replace(/(<([^>]+)>)/ig, '');

        // Get Sentiment score
        const sentimentValue = sentiment(adjustedValue).score;

        console.log(sentimentValue)
        // Set journal
        setJournal(adjustedValue, sentimentValue);
    }
    

    const modules = useMemo(() => {
        return {
            toolbar: [
                [{ header: [1, 2, 3, false] }],
                [{ 'font': [] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                ['link', 'image'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ 'align': [] }],
                ['blockquote', 'code-block'],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                ['clean'],
            ],
        };
    }, []);

    // Run your function whenever the text changes
    useEffect(() => {
        runthispls(value);
    }, [value]);

    return (
        <div>
            <ReactQuill
                modules={modules}
                theme="snow"
                value={value}
                onChange={(e) => setValue(e)}
                className="h-[60vh] max-w-4/5 rounded-lg"
            ></ReactQuill>
        </div>
    );

}