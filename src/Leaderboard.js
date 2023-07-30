import React, { useState, useEffect } from 'react';
import { getISOWeekYear } from 'date-fns';
import Top3_scorecards from './Top3_scorecards';



function Leaderboard( { clickedTournament } ) {

  const currentYear = getISOWeekYear(new Date());

  const [leaders, setLeaders] = useState(null);

  useEffect(() => {
    const url = `https://live-golf-data.p.rapidapi.com/leaderboard?orgId=1&tournId=${clickedTournament.tournId}&year=${currentYear}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_API_KEY}`,
            'X-RapidAPI-Host': 'live-golf-data.p.rapidapi.com'
        }
    };

    try {
        fetch(url, options)
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data.leaderboardRows);
                setLeaders(data);
            })

    } catch (error) {
        console.error(error);
    }

  }, [clickedTournament]);


  const current_leaderboard = leaders && leaders.leaderboardRows.length ? (
    leaders.leaderboardRows.map(player => {
        return (
            <div className="collection-item" key={player.playerId}>
            <span>{player.firstName}</span>
            <span>{player.lastName}</span>
            <span>{player.total}</span>
            </div>
        )
    })
  ) : (
    <p className="center"> There are no players yet</p>
  )
  
  
  {leaders && console.log(leaders.leaderboardRows.slice(0,3))}

  return (
    <>
    {leaders && <Top3_scorecards top_3 = {leaders.leaderboardRows.slice(0,3)} tournId = {clickedTournament.tournId} yr = {currentYear} />}


    <h1>{current_leaderboard && current_leaderboard}</h1>
    </>
    )
}

export default Leaderboard;
