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
    var speedSoloGameScatterSvg = fullGameScatter(
        '#scatter-speed-solo-game',
        data,
        'Total Exp Uncontested', [0, 20], 'Solo',
        'Total Expected Buzz Difference', [-12,20], 'Speed',
        colorFunction, opacityFunction, labelFunction,
        width, height, margin
    );
    addLegend(speedSoloGameScatterSvg, width, 0);

    var speedSoloByRoundScatterSvg = byRoundScatter(
        '#scatter-speed-solo-combined',
        data,
        ['J! Exp Uncontested','DJ! Exp Uncontested'], [0, 16], 'Solo',
        ['J! Expected Buzz Difference','DJ! Expected Buzz Difference'], [-10,12], 'Speed',
        colorFunction, opacityFunction, labelFunction,
        width, height, margin
    );
    addLegend(speedSoloByRoundScatterSvg, width, 0);

    //ATT vs $/ATT
    var attAttSvg = fullGameScatter(
        '#scatter-att-score-att',
        data,
        'Total Attempt', [0, 60], 'Att',
        'Total Score/Attempt', [-200,800], 'Buz$/Att',
        colorFunction, opacityFunction, labelFunction,
        width, height, margin
    );
    addLegend(attAttSvg);

    //ATT vs $/ATT by Round
    var attAttByRoundSvg = byRoundScatter(
        '#scatter-att-score-att-by-round',
        data,
        ['J! Attempts','DJ! Attempts'], [0, 30], 'Att',
        ['J! Score/Attempt','DJ! Score/Attempt'], [-400,1200], 'Buz$/Att',
        colorFunction, opacityFunction, labelFunction,
        width, height, margin
    );
    addLegend(attAttByRoundSvg);
    
    //ATT vs $/BUZ
    var attBuzSvg = fullGameScatter(
        '#scatter-att-score-buzz',
        data,
        'Total Attempt', [0, 60], 'Att',
        'Total Score/Buzz', [-300,1200], 'Buz$/Buz',
        colorFunction, opacityFunction, labelFunction,
        width, height, margin
    );
    addLegend(attBuzSvg);

    //ATT vs $/BUZ by Round
    var attBuzByRoundSvg = byRoundScatter(
        '#scatter-att-score-buzz-by-round',
        data,
        ['J! Attempts','DJ! Attempts'], [0, 30], 'Att',
        ['J! Score/Buzz','DJ! Score/Buzz'], [-750,1500], 'Buz$/Buz',
        colorFunction, opacityFunction, labelFunction,
        width, height, margin
    );
    addLegend(attBuzByRoundSvg);

    //ATT vs Buzz%
    var attBuzPctSvg = fullGameScatter(
        '#scatter-att-buzz-pct',
        data,
        'Total Attempt', [0, 60], 'Att',
        'Total Buzz %', [0, 100], 'Buz%',
        colorFunction, opacityFunction, labelFunction,
        width, height, margin
    );
    addLegend(attBuzPctSvg);

    //ATT vs Buzz% by round
    var attBuzPctByRoundSvg = byRoundScatter(
        '#scatter-att-buzz-pct-by-round',
        data,
        ['J! Attempts','DJ! Attempts'], [0, 30], 'Att',
        ['J! Buzz %','DJ! Buzz %'], [0, 100], 'Buz%',
        colorFunction, opacityFunction, labelFunction,
        width, height, margin
    );
    addLegend(attBuzPctByRoundSvg);
}