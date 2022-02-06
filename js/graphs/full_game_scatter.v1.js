var fullGameScatter = function(
    containerId,
    data,
    xField,
    xDomain,
    xAxisLabel,
    yField,
    yDomain,
    yAxisLabel,
    colorFunction,
    opacityFunction,
    labelFunction,
    width,
    height,
    margin
) {
    var svg = d3.select(containerId)
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    x.domain(xDomain);
    y.domain(yDomain);

    svg.selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", function(d) { return x(d[xField]); })
        .attr("cy", function(d) { return y(d[yField]); })
        .style("stroke", "black")
        .style("fill", colorFunction)
        .style("opacity", opacityFunction);

    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(labelFunction)
        .attr("x", function(d) {
            return x(d[xField]) + 7;
        })
        .attr("y", function(d) {
            return y(d[yField]) + 2;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", colorFunction);

    svg.append("g")
        .attr("transform", "translate(0," + y(0) + ")")
        .call(d3.axisBottom(x).ticks(10));

    svg.append("text")             
        .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text(xAxisLabel);

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(yAxisLabel);

    return svg;
};