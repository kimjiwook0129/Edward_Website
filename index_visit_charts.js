fetch('json/counts.json').then((response) => {
    return response.json();
}).then((data) => {
    var parsedData = parseData(data, 0);
    drawChart(parsedData);
}).catch(function (error) {
    console.log(error);
});

function generateVisit(para) {
    d3.select("#delete-me-to-reset").remove();
    fetch('json/counts.json').then((response) => {
        return response.json();
    }).then((data) => {
        dataGlobal = data;
        paraGlobal = para;
        var parsedData = parseData(data, para);
        drawChart(parsedData);
    }).catch(function (error) {
        console.log(error);
    });
}

function parseData(data, para = 0) {
    var arr = [];
    if (para == 0) {
        for (var i in data.counts_day) {
            arr.push({
                date: new Date(i), //date
                value: +data.counts_day[i] //convert string to number
            });
        }
    } else if (para == 1) {
        for (var i in data.counts_month) {
            arr.push({
                date: new Date(i), //date
                value: +data.counts_month[i] //convert string to number
            });
        }
    } else {
        for (var i in data.counts_year) {
            arr.push({
                date: new Date(i), //date
                value: +data.counts_year[i] //convert string to number
            });
        }
    }
    return arr;
}

function drawChart(data) {
    d3.select("#visit-chart").selectAll("g").remove();
    var svgWidth = $("#visit-chart").width(),
        svgHeight = $("#visit-chart").height(),
        margin = {
            top: 20,
            right: 10,
            bottom: 30,
            left: 50
        };
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var svg = d3.select('.visits-chart')
        .attr("width", svgWidth)
        .attr("height", svgHeight);
    
    var g = svg.append("g")
        .attr("id","delete-me-to-reset")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.date)})
    .y(function(d) { return y(d.value)})
    x.domain(d3.extent(data, function(d) { return d.date }));
    y.domain(d3.extent(data, function(d) { return d.value }));

g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .select(".domain")
    .remove();

g.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Visiters");

g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);
}