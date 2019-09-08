generateVisit(0); // Start with generating daily visit chart

function generateVisit(para) {
    d3.select("#delete-me-to-reset").remove();
    fetch('json/counts.json').then((response) => {
        return response.json();
    }).then((data) => {
        drawChart(data, para);
    }).catch(function (error) {
        console.log(error);
    });
}

function drawChart(dataOriginal, para = 0) {
    var data = [],
        dataSet;
    switch(para) {
        case 0:
            dataSet = dataOriginal.counts_day;
            break;
        case 1:
            dataSet = dataOriginal.counts_month;
            break;
        default:
            dataSet = dataOriginal.counts_year;
    }
    for (var i in dataSet) {
        data.push({
            date: new Date(i),
            value: +dataSet[i]
        });
    }

    d3.select("#visit-chart").selectAll("g").remove();
    var svgWidth = $("#visit-chart").width(),
        svgHeight = $("#visit-chart").height(),
        margin = {top: 0, right: 10, bottom: 30, left: 50},
        width = svgWidth - margin.left - margin.right,
        height = svgHeight - margin.top - margin.bottom;

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
        .x(function(d) {
            return x(d.date);
        })
        .y(function(d) {
            return y(d.value);
        })
        x.domain(d3.extent(data, function(d) {
            return d.date
        }));
        y.domain(d3.extent(data, function(d) {
            return d.value
        }));

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