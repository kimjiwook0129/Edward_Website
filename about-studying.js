/*document.addEventListener("DOMContentLoaded", function(event) {
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
*/

var num = 2,
    dae_num = 2;
window.setInterval(function() {
    const default_credit = "Map data © ",
        you = "Yousef Shabana",
        cairoC = "Cairo American College",
        goo = " Google | ",
        s = "src",
        i = "-image",
        j = ".jpg",
        direct = "./images/schools/";

    var src_waterloo = direct + "waterloo_" + dae_num.toString() + j,
        src_cac = direct + "cac_" + dae_num.toString() + j,
        src_pureun = direct + "pureun_" + num.toString() + j,
        src_ishcmc = direct + "ishcmc_" + num.toString() + j,
        src_sis = direct + "sis_" + num.toString() + j,
        src_daepyong = direct + "daepyong_" + dae_num.toString() + j;
    
    $("#waterloo" + i).fadeOut(function() {
        $(this).attr(s, src_waterloo).fadeIn();
    });
    
    $("#cac" + i).fadeOut(function() {
        $(this).attr(s, src_cac).fadeIn();
    });

    $("#reference-cairo").fadeOut(function() {
        if (dae_num == 2) $(this).text(default_credit.concat("2016" + goo + you)).fadeIn();
        else $(this).text(default_credit.concat("2015" + goo + cairoC)).fadeIn();
    });
    
    $("#pureun" + i).fadeOut(function() {
        $(this).attr(s, src_pureun).fadeIn();
    });
    $("#ishcmc" + i).fadeOut(function() {
        $(this).attr(s, src_ishcmc).fadeIn();
    });
    $("#sis" + i).fadeOut(function() {
        $(this).attr(s, src_sis).fadeIn();
    });
    $("#daepyong" + i).fadeOut(function() {
        $(this).attr(s, src_daepyong).fadeIn();
    });
    num++;
    dae_num++;
    if (num == 4) num = 1;
    if (dae_num == 3) dae_num = 1;
}, 8000);