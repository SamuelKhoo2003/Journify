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
                <p className="text-center">
                    You were <span className="text-2xl text-green-600 font-extrabold">happy</span> on average last year
                    over 2 entries!
                </p>
                <br></br><br></br>
                <p className="text-center">
                    Our models predict a happiness ranking of <span className="text-2xl text-green-600 font-extrabold">5</span>  over the next month, looks good!
                </p>
            </h3>
            {/* <ColorChanger /> */}
            <OldJournals />
            <div id="newlast" className="section"></div>
        </div>
    );
};

export default Insights;
