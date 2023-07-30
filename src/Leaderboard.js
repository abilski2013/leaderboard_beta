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
            <tr key={player.playerId}>
                <td>{player.position}</td>
                <td>{player.firstName}</td>
                <td>{player.lastName}</td>
                <td>{player.total}</td>
                <td>{player.currentHole['$numberInt']}</td>
            </tr>
            
        )
    })
  ) : (
    <p className="center"> There are no players yet</p>
  )
  
  
  {leaders && console.log(leaders.leaderboardRows.slice(0,3))}

  return (
    <>
    {leaders && <Top3_scorecards top_3 = {leaders.leaderboardRows.slice(0,3)} tournId = {clickedTournament.tournId} yr = {currentYear} />}

    <table>{current_leaderboard && current_leaderboard}</table>
    </>
    )
}

export default Leaderboard;
