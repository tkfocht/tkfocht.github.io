var renderHighlightContestantBoxPlot = function(
    data,
    highlightContestants,
    mappingFunction,
    divId,
    title,
    dTick,
    filterFunction
) {
    data = d3.filter(data, filterFunction);
    var xData = highlightContestants;
    var yData = d3.map(xData, cid => d3.map(d3.filter(data, cd => cd['Contestant'] === cid), mappingFunction));
    var dateData = d3.map(xData, cid => d3.map(d3.filter(data, cd => cd['Contestant'] === cid), cd1 => dateFormat(cd1['Date'])));
    xData.push('Others');
    yData.push(d3.map(d3.filter(data, cd => !highlightContestants.includes(cd['Contestant'])), mappingFunction));
    dateData.push(d3.map(d3.filter(data, cd => !highlightContestants.includes(cd['Contestant'])), cd1 => cd1['Contestant'] + " " + dateFormat(cd1['Date'])));

    var plotData = [];
    for ( var i = 0; i < xData.length; i ++ ) {
        var result = {
            type: 'box',
            y: yData[i],
            name: xData[i],
            text: dateData[i],
            boxpoints: 'all',
            jitter: 0.3,
            whiskerwidth: 0.2,
            fillcolor: 'cls',
            marker: {
                size: 3
            },
            line: {
                width: 1
            }
        };
        plotData.push(result);
    };

    layout = {
        title: title,
        yaxis: {
            autorange: true,
            showgrid: true,
            zeroline: true,
            dtick: dTick,
            gridcolor: 'rgb(255, 255, 255)',
            gridwidth: 1,
            zerolinecolor: 'rgb(255, 255, 255)',
            zerolinewidth: 2
        },
        margin: {
            l: 40,
            r: 30,
            b: 80,
            t: 100
        },
        paper_bgcolor: 'rgb(243, 243, 243)',
        plot_bgcolor: 'rgb(243, 243, 243)',
        showlegend: false
    };

    Plotly.newPlot(divId, plotData, layout);
}