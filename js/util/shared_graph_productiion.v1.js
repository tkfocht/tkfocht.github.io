var renderSharedGraphs = function(
    data,
    colorFunction,
    opacityFunction,
    labelFunction,
    legendContestants,
    legendColors,
    width,
    height,
    margin
) {

    var addLegend = function(
        svg,
        xTranslation = 175,
        yTranslation = 0
    ) {
        var legend = svg.append("g")
            .attr("transform", "translate(" + (xTranslation - width) + "," + yTranslation + ")")
            .attr("font-size", 13)
            .attr("text-anchor", "start")
            .selectAll("g")
            .data(legendContestants)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 16 + ")"; });
        legend.append("circle")
            .attr("cx", width - 142)
            .attr("cy", 4)
            .attr("r", 5)
            .attr("fill", legendColors)
            .attr("stroke", "black");
        legend.append("text")
            .attr("x", width - 133)
            .attr("y", 5.5)
            .attr("dy", "0.22em")
            .text(d => (d));
    }

    //Speed and Solo
    var soloGameMax = Math.ceil(d3.max(d3.map(data, d => +d['Total Exp Uncontested'])));
    var speedGameMin = Math.floor(d3.min(d3.map(data, d => +d['Total Expected Buzz Difference'])));
    var speedGameMax = Math.ceil(d3.max(d3.map(data, d => +d['Total Expected Buzz Difference'])));
    var speedSoloGameScatterSvg = fullGameScatter(
        '#scatter-speed-solo-game',
        data,
        'Total Exp Uncontested', [0, soloGameMax], 'Solo',
        'Total Expected Buzz Difference', [speedGameMin,speedGameMax], 'Speed',
        colorFunction, opacityFunction, labelFunction,
        width, height, margin
    );
    addLegend(speedSoloGameScatterSvg, width, 0);

    var soloRoundMax = Math.ceil(d3.max(d3.map(data, d => d3.max([+d['J! Exp Uncontested'], +d['DJ! Exp Uncontested']]))));
    var speedRoundMin = Math.floor(d3.min(d3.map(data, d => d3.min([+d['J! Expected Buzz Difference'], +d['DJ! Expected Buzz Difference']]))));
    var speedRoundMax = Math.ceil(d3.max(d3.map(data, d => d3.max([+d['J! Expected Buzz Difference'], +d['DJ! Expected Buzz Difference']]))));
    var speedSoloByRoundScatterSvg = byRoundScatter(
        '#scatter-speed-solo-combined',
        data,
        ['J! Exp Uncontested','DJ! Exp Uncontested'], [0, soloRoundMax], 'Solo',
        ['J! Expected Buzz Difference','DJ! Expected Buzz Difference'], [speedRoundMin,speedRoundMax], 'Speed',
        colorFunction, opacityFunction, labelFunction,
        width, height, margin
    );
    addLegend(speedSoloByRoundScatterSvg, width, 0);

    var buzScorePerAttGameMin = 100 * Math.floor(d3.min(d3.map(data, d => +d['Total Score/Attempt'])) / 100.0);
    var buzScorePerAttGameMax = 100 * Math.ceil(d3.max(d3.map(data, d => +d['Total Score/Attempt'])) / 100.0);
    //ATT vs $/ATT
    var attAttSvg = fullGameScatter(
        '#scatter-att-score-att',
        data,
        'Total Attempt', [0, 60], 'Att',
        'Total Score/Attempt', [buzScorePerAttGameMin,buzScorePerAttGameMax], 'Buz$/Att',
        colorFunction, opacityFunction, labelFunction,
        width, height, margin
    );
    addLegend(attAttSvg);

    var buzScorePerAttRoundMin = 100 * Math.floor(d3.min(d3.map(data, d => d3.min([+d['J! Score/Attempt'], +d['DJ! Score/Attempt']]))) / 100.0);
    var buzScorePerAttRoundMax = 100 * Math.ceil(d3.max(d3.map(data, d => d3.max([+d['J! Score/Attempt'], +d['DJ! Score/Attempt']]))) / 100.0);
    //ATT vs $/ATT by Round
    var attAttByRoundSvg = byRoundScatter(
        '#scatter-att-score-att-by-round',
        data,
        ['J! Attempts','DJ! Attempts'], [0, 30], 'Att',
        ['J! Score/Attempt','DJ! Score/Attempt'], [buzScorePerAttRoundMin,buzScorePerAttRoundMax], 'Buz$/Att',
        colorFunction, opacityFunction, labelFunction,
        width, height, margin
    );
    addLegend(attAttByRoundSvg);
    
    var buzScorePerBuzGameMin = 100 * Math.floor(d3.min(d3.map(data, d => +d['Total Score/Buzz'])) / 100.0);
    var buzScorePerBuzGameMax = 100 * Math.ceil(d3.max(d3.map(data, d => +d['Total Score/Buzz'])) / 100.0);
    //ATT vs $/BUZ
    var attBuzSvg = fullGameScatter(
        '#scatter-att-score-buzz',
        data,
        'Total Attempt', [0, 60], 'Att',
        'Total Score/Buzz', [buzScorePerBuzGameMin,buzScorePerBuzGameMax], 'Buz$/Buz',
        colorFunction, opacityFunction, labelFunction,
        width, height, margin
    );
    addLegend(attBuzSvg);

    //ATT vs $/BUZ by Round
    var buzScorePerBuzRoundMin = 100 * Math.floor(d3.min(d3.map(data, d => d3.min([+d['J! Score/Buzz'], +d['DJ! Score/Buzz']]))) / 100.0);
    var buzScorePerBuzRoundMax = 100 * Math.ceil(d3.max(d3.map(data, d => d3.max([+d['J! Score/Buzz'], +d['DJ! Score/Buzz']]))) / 100.0);
    var attBuzByRoundSvg = byRoundScatter(
        '#scatter-att-score-buzz-by-round',
        data,
        ['J! Attempts','DJ! Attempts'], [0, 30], 'Att',
        ['J! Score/Buzz','DJ! Score/Buzz'], [buzScorePerBuzRoundMin,buzScorePerBuzRoundMax], 'Buz$/Buz',
        colorFunction, opacityFunction, labelFunction,
        width, height, margin
    );
    addLegend(attBuzByRoundSvg);

    //ATT vs Buz
    var buzGameMax = Math.ceil(d3.max(d3.map(data, d => +d['Total Buzz'])));
    var attBuzPctSvg = fullGameScatter(
        '#scatter-att-buzz',
        data,
        'Total Attempt', [0, 60], 'Att',
        'Total Buzz', [0, buzGameMax], 'Buz',
        colorFunction, opacityFunction, labelFunction,
        width, height, margin
    );
    addLegend(attBuzPctSvg);

    //ATT vs Buz by round
    var buzRoundMax = Math.ceil(d3.max(d3.map(data, d => d3.max([+d['J! Buzzes'], +d['DJ! Buzzes']]))));
    var attBuzPctByRoundSvg = byRoundScatter(
        '#scatter-att-buzz-by-round',
        data,
        ['J! Attempts','DJ! Attempts'], [0, 30], 'Att',
        ['J! Buzzes','DJ! Buzzes'], [0, buzRoundMax], 'Buz',
        colorFunction, opacityFunction, labelFunction,
        width, height, margin
    );
    addLegend(attBuzPctByRoundSvg);
}