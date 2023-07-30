import React, { useState, useEffect } from 'react';
import { getISOWeek, getISOWeekYear } from 'date-fns';
import Leaderboard from './Leaderboard';

function DisplayCurrentEvents() {

  // pass tournament state to prop for scorecards top 5

  const currentWeek = getISOWeek(new Date());
  const currentYear = getISOWeekYear(new Date());

  const [tournaments, setTournaments] = useState(null);
  const [clickedTournament, setclickedTournament] = useState(null);
 
  useEffect(() => {
    const url = `https://live-golf-data.p.rapidapi.com/schedule?orgId=1&year=${currentYear}`;
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
                console.log(data.schedule);
                setTournaments(data.schedule);
            })

    } catch (error) {
        console.error(error);
    }

  }, []);

  const currentWeekTournament = tournaments && tournaments.filter(
            (tournament) => tournament['date']['weekNumber'] === currentWeek.toString()
          );

  console.log(currentWeekTournament);

  const buttonList = currentWeekTournament && currentWeekTournament.length ? (
    currentWeekTournament.map(tournament => {
        return (
            <div key={tournament.tournId}>
            <button onClick={() => setclickedTournament(tournament)}>{tournament.name}</button>
            </div>
        )
    })
  ) : (
    <p className="center"> There are no tournaments</p>
  )

  console.log(clickedTournament);

  return (
    <>
    <div>
        Current Week Events (click one):
        {buttonList}
        <h1>{clickedTournament && clickedTournament.name}</h1>
        {clickedTournament && <h3>Winner's Share: ${clickedTournament['winnersShare']['$numberInt']}</h3>}
        {clickedTournament && <Leaderboard clickedTournament={clickedTournament} />}
    </div>
    </>
  )
}

export default DisplayCurrentEvents;
