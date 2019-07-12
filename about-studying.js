document.addEventListener("DOMContentLoaded", function(event) {
    fetch('./json/gpa.json').then(function(response) {
        return response.json();
    }).then(function(data) {
        var parsedData = parseData(data);
        drawChart(parsedData);
    })
    .catch(function(err) {
        console.log(err);
    })
});

function parseData(data) {
    var arr = [];
    for (var i in data.highSchool) {
        arr.push({
            term: new term(i),
            value: data.highSchool[i].gpa
        });
    }
    return arr;
}

function drawChart(data) {
var svgWidth = 600, svgHeight = 400;
var margin = { top: 20, right: 20, bottom: 30, left: 50 };
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);
    
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.term)})
    .y(function(d) { return y(d.value)})
    x.domain(d3.extent(data, function(d) { return d.term }));
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
    .text("Price ($)");

g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);
}



////




var num = 2,
    dae_num = 2;
window.setInterval(function() {
    var source_code_waterloo = "./images/schools/waterloo_" + num.toString() + ".jpg",
        source_code_cac = "./images/schools/cac_" + num.toString() + ".jpg",
        source_code_pureun = "./images/schools/pureun_" + num.toString() + ".jpg",
        source_code_ishcmc = "./images/schools/ishcmc_" + num.toString() + ".jpg",
        source_code_sis = "./images/schools/sis_" + num.toString() + ".jpg",
        source_code_daepyong = "./images/schools/daepyong_" + dae_num.toString() + ".jpg";
    
    $("#waterloo-image").fadeOut(function() {
        $(this).attr("src", source_code_waterloo).fadeIn();
    });
    
    $("#cac-image").fadeOut(function() {
        $(this).attr("src", source_code_cac).fadeIn();
    });

    $("#reference-cairo").fadeOut(function() {
        const default_credit = "Map data © ";
        switch(num) {
            case 2:
                $(this).text(default_credit.concat("2015 Google | Yousef Shabana")).fadeIn();              
                break;
            case 3:
                $(this).text(default_credit.concat("2017 Google | Cairo American College")).fadeIn();
                break;
            default:
                $(this).text(default_credit.concat("2016 Google | Yousef Shabana")).fadeIn();
        }
    });
    
    $("#pureun-image").fadeOut(function() {
        $(this).attr("src", source_code_pureun).fadeIn();
    });
    $("#ishcmc-image").fadeOut(function() {
        $(this).attr("src", source_code_ishcmc).fadeIn();
    });
    $("#sis-image").fadeOut(function() {
        $(this).attr("src", source_code_sis).fadeIn();
    });
    $("#daepyong-image").fadeOut(function() {
        $(this).attr("src", source_code_daepyong).fadeIn();
    });
    num = num + 1;
    dae_num = dae_num + 1;
    if (num == 4) num = 1;
    if (dae_num == 3) dae_num = 1;
}, 8000);