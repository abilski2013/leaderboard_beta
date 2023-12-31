import React, { useState, useEffect } from 'react';
import Top3_chart from './Top3_chart';

function Top3_scorecards({ top_3, tournId, yr }) {

    const [apiResults, setApiResults] = useState({});

    useEffect(() => {
        
        const fetchDataFromApi = async (object) => {

            const url = `https://live-golf-data.p.rapidapi.com/scorecard?orgId=1&tournId=${tournId}&year=${yr}&playerId=${object.playerId}`;

            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_API_KEY}`,
                    'X-RapidAPI-Host': 'live-golf-data.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const data = await response.json();

                setApiResults((prevResults) => ({
                    ...prevResults,
                    [object.playerId]: data,
                }));

            } catch (error) {
                console.error('Error fetching data from API:', error);
            }
        };

        top_3.forEach((object) => {
            fetchDataFromApi(object);
        });
        
    }, []);

    // console.log(apiResults);

    const shouldPassProp = Object.keys(apiResults).length === 3;

    return (
        <>
            <h1>Current Leaders</h1>
            <div>
                {shouldPassProp && <Top3_chart t3_scorecards = {apiResults}/>}
            </div>
        </>
    )
}

export default Top3_scorecards;