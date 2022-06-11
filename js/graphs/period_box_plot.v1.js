var renderHighlightContestantBoxPlot = function(
    data,
    highlightContestants,
    mappingFunction,
    divId,
    title,
    filterFunction
) {
    var colorList = d3.schemeCategory10.concat(d3.schemeDark2);
    data = d3.filter(data, filterFunction);
    var xData = highlightContestants.slice();
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
            marker: {
                size: 4,
                color: colorList[i]
            },
            fillcolor: colorList[i],
            line: {
                width: 1.5,
                color: 'black'
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
            gridwidth: 1,
            zerolinewidth: 2,
            zeroline: true,
            title: title
        },
        margin: {
            l: 60,
            r: 30,
            b: 80,
            t: 100
        },
        //paper_bgcolor: 'rgb(243, 243, 243)',
        //plot_bgcolor: 'rgb(243, 243, 243)',
        showlegend: false
    };

    Plotly.newPlot(divId, plotData, layout);
}

var renderHighlightContestantRoundLinePlot = function(
    data,
    highlightContestants,
    mappingFunctionLeft,
    mappingFunctionRight,
    divId,
    title,
    filterFunction,
    yAxisLabel
) {
    var traces = [];
    for ( var i = 0; i < highlightContestants.length; i ++ ) {
        var trace = {
            x: ['J', 'DJ'],
            y: [
                d3.mean(d3.map(d3.filter(d3.filter(data, filterFunction), cd => cd['Contestant'] === highlightContestants[i]), mappingFunctionLeft)),
                d3.mean(d3.map(d3.filter(d3.filter(data, filterFunction), cd => cd['Contestant'] === highlightContestants[i]), mappingFunctionRight))
            ],
            type: 'scatter',
            name: highlightContestants[i]
        };
        traces.push(trace);
    }

    layout = {
        title: title,
        yaxis: {
            autorange: true,
            showgrid: true,
            title: {
                text: yAxisLabel
            }
        },
        margin: {
            l: 60,
            r: 30,
            b: 80,
            t: 100
        },
        //paper_bgcolor: 'rgb(243, 243, 243)',
        //plot_bgcolor: 'rgb(243, 243, 243)',
        showlegend: true
    };

    Plotly.newPlot(divId, traces, layout);
};