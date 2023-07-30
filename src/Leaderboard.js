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
            'X-RapidAPI-Key': '6a6cf0efc8mshd2e48323358f56ap1fb08djsn384fcbea4fd7',
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

  // when the prop changes, go fetch the players for the tournament id

  // set state for players data null at first, then update to top 5 players

  // when state changes, fetch to api again and get the scorecards

  // set line thickness state to number 1 guy, 

  // on click change the state of line thickness for the guy clicked on

  // Display the names to top 5

  // display the line charts of their scorecard data 


  return (
    <>
    {leaders && <Top3_scorecards top_3 = {leaders.leaderboardRows.slice(0,3)} tournId = {clickedTournament.tournId} yr = {currentYear} />}


    <h1>{current_leaderboard && current_leaderboard}</h1>
    </>
    )
}

export default Leaderboard;
