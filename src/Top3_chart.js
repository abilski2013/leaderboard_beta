import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function Top3_chart({ t3_scorecards }) {
    console.log(t3_scorecards);

    // format data
    const data = [];

    for (const pid of Object.keys(t3_scorecards)) {
      const playerData = {
        player_id: t3_scorecards[pid],
        scores: [],
        pars: [],
        to_par: [],
        cumulative_to_par: [],
        tourny_hole: []
      };
      // console.log(pid);
      var start_score = 0;
      var count_hole = 0;
      for (const round of t3_scorecards[pid]) {
        // console.log(round.currentRoundScore);
        for (const holes of Object.keys(round['holes'])) {
          const score = round['holes'][holes]['holeScore']['$numberInt'];
          const par = round['holes'][holes]['par']['$numberInt']
          const vs_par = score - par;
          playerData.scores.push(score);
          playerData.pars.push(par);
          playerData.to_par.push(vs_par);
          start_score = start_score + vs_par;
          count_hole = count_hole + 1;
          playerData.cumulative_to_par.push(start_score);
          playerData.tourny_hole.push(count_hole);
        }
      }

      data.push(playerData);
    }


    console.log(data);

    const chartRef = useRef();

    const width = 1000;
    const height = 500;
    const padding = 20;

    useEffect(() => {

      const xScale = d3.scaleLinear()
                    .domain([1, 72])
                    .range([(0+padding), (width-padding)]);


      const yScale = d3.scaleLinear()
                    .domain([-30, 10])
                    .range([(0+padding), (height-padding)]);


      const svg = d3.select(chartRef.current)
        .attr("width", width-padding-padding)
        .attr("height", height-padding-padding)
        .append("g");

      const line = d3.line()
        .x((d, i) => xScale(i))
        .y(d => yScale(d))
        .curve(d3.curveMonotoneX);

      data.forEach(item => {
        svg.append("path")
        .datum(item['cumulative_to_par'])
        .attr("fill", "none")
        .attr("stroke", getRandomColor())
        .attr("stroke-width", 2)
        .attr("d", line);

      });

      const xAxis = d3.axisBottom(xScale)
      const yAxis = d3.axisLeft(yScale)

      d3.select('#xaxis').remove()
      d3.select(chartRef.current)
            .append('g')
            .attr('transform', `translate(0, ${height-padding})`)
            .attr('id','xaxis')
            .call(xAxis)

      d3.select('#yaxis').remove()
      d3.select(chartRef.current)
            .append('g')
            .attr('transform', `translate(0, 0)`)
            .attr('id','yaxis')
            .call(yAxis)

      function getRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
      }

// eslint-disable-next-line
    }, []);

    return (
      <svg ref={chartRef} viewBox='0 0 1000 500'></svg>
    );
    };
      


export default Top3_chart