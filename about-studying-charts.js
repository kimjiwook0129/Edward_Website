fetch('json/gpa.json').then((response) => {
    return response.json();
}).then((data) => {
    var parsedDataHigh = parseDataHigh(data),
        parsedDataUni = parseDataUni(data);
    drawChart(parsedDataHigh, parsedDataUni);
}).catch(function (error) {
    console.log(error);
});

function parseDataHigh(data) {
    var arr = [];
    for (var i in data.highSchool) {
        arr.push({
            term: data.highSchool[i].term, // term number
            value: +data.highSchool[i].gpa //convert string to number
        });
    }     
    return arr;
}

function parseDataUni(data) {
    var arr = [];
    for (var i in data.University) {
        arr.push({
            term: data.University[i].term, // term number
            value: +data.University[i].gpa //convert string to number
        });
    }     
    return arr;
}

function drawChart(dataHigh, dataUni) {
    var svgWidth = 630, svgHeight = 400;
    var margin = { top: 20, right: 20, bottom: 50, left: 50 };
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var svg = d3.select('#gpa-line-chart')
        .attr("width", svgWidth)
        .attr("height", svgHeight);
    
    var g = svg.append("g")
        .attr("id","delete-me-to-reset")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
        .rangeRound([0, width]);

    var y = d3.scaleLinear()
        .rangeRound([height, 0])

    var y2 = d3.scaleLinear()
        .rangeRound([height, 0]);

    var line = d3.line()
        .x(function(d) { return x(d.term)})
        .y(function(d) { return y(d.value)})
        x.domain([0.9,8.5]);
        y.domain([2,4.3]);

    var line2 = d3.line()
        .x(function(d) { return x(d.term)})
        .y(function(d) { return y2(d.value)})
        x.domain([0.9, 8.5])
        y2.domain([2.1,4]);

    // x-axis
    g.append("g")
        .call(d3.axisBottom(x))
        .attr("transform", "translate(0," + height + ")")
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "translate(40, 15)")
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Term");

    g.append("g")
        .call(d3.axisLeft(y))
        .style("color","blue")
        .append("text")
        .attr("fill", "blue")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("4.3 Scale");

    g.append("g")
        .call(d3.axisRight(y2))
        .style("color","red")
        .attr("transform", "translate(530, 0)")
        .append("text")
        .attr("fill", "red")
        .attr("transform", "translate(20, 0) rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("4.0 Scale");

    g.append("path")
        .datum(dataHigh)
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);

    g.append("path")
        .datum(dataUni)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line2);

    // Legends
    svg.append("circle")
        .attr("cx",220)
        .attr("cy",380)
        .attr("r", 5)
        .style("fill", "blue");

    svg.append("text")
        .attr("x", 230)
        .attr("y", 381)
        .text("High School GPA")
        .style("font-size", "10px")
        .attr("alignment-baseline","middle");

    svg.append("circle")
        .attr("cx", 345)
        .attr("cy",380)
        .attr("r", 5)
        .style("fill", "red");

    svg.append("text")
        .attr("x", 355)
        .attr("y", 381)
        .text("University GPA")
        .style("font-size", "10px")
        .attr("alignment-baseline","middle");
}
