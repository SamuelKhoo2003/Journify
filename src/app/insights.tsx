import React from 'react';
import { averageSentimentForPastYear, countJournalEntriesLastYear, calculateRegressionForLast30Days, formatToTwoDecimals} from '../Helpers/Helper'
import ColorChanger from './color-changer';
import OldJournals from './old-journals';

const Insights = () => {
    const { regressionResult, predictedSentiment } = calculateRegressionForLast30Days();
    return (
        <div className="flex min-h-screen flex-col items-center justify-between w-4/5">
            <div id="notlast" className="section"></div>
            <h2 className="text-4xl" style={{ color: '#D9C4B3' }}>Your Insights</h2>
            <h3 className="text-2xl happiness-info" style={{ color: '#D9C4B3' }}>
                {/* <span className="text-2xl font-extrabold">{formatToTwoDecimals(averageSentimentForPastYear())} </span> */}
                You were <span className="text-2xl text-green-500 font-extrabold">happy</span> on average last year
                over <span className="text-2xl font-extrabold">{formatToTwoDecimals(countJournalEntriesLastYear())}</span> entries!
                <br></br><br></br>
                Our models predict a happiness value of <span className="text-2xl font-extrabold">{predictedSentiment}</span> next month. {regressionResult > 0 ? "Looks good!" : "Take it easy!"}
            </h3>
            {/* <ColorChanger /> */}
            <OldJournals/>
            <div id="newlast" className="section"></div>
        </div>

    );
};

export default Insights;
