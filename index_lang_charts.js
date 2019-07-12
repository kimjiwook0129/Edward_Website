var dataset_lang = [{lang: "C", value: 3.5},
                {lang: "C#", value: 1.5},
                {lang: "C++", value: 5},
                {lang: "HTML", value: 4.5},
                {lang: "CSS", value: 4},
                {lang: "Javascript", value: 4.5},
                {lang: "MATLAB", value: 3},
                {lang: "PHP", value: 2.5},
                {lang: "Python", value: 4},
                {lang: "R", value: 1},
                {lang: "Scheme", value: 3},
                {lang: "SQL", value: 3}];

var svg = d3.select("#language-chart"),
    margin = 40,
    marginHori = 50,
    width = 890 - marginHori,
    height = 270 - margin;
        
var xScale = d3.scaleBand().range([0, width]).padding(0.5),
    yScale = d3.scaleLinear().range([height, 0]);
    
var g = svg.append("g")
    .attr("transform", "translate(" + 70 + "," + 20 + ")");
        
xScale.domain(dataset_lang.map(function(d) { return d.lang; }));
yScale.domain([0, d3.max(dataset_lang, function(d) { return d.value; })]);

g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
    .append("text")
    .attr("y", height - 200)
    .attr("x", width - 800)
    .attr("text-anchor", "end")
    .attr("stroke", "black")
    .text("Language");

g.append("g")
    .call(d3.axisLeft(yScale).tickFormat(function(d){
        return d;
    })
    .ticks(10))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "-5.1em")
    .attr("text-anchor", "end")
    .attr("stroke", "black")
    .text("Proficiency");
    
g.selectAll(".bar")
    .data(dataset_lang)
    .enter().append("rect")
    .attr("class", "lang-bar")
    .attr("x", function(d) { 
        return xScale(d.lang);
    })
    .attr("y", function(d) {
        return yScale(d.value);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) {
        return height - yScale(d.value);
    })
    .attr("fill", "rgb(97, 184, 255)");

$(".lang-bar").hover(function(obj, i) {
    $(this).css("fill", "rgb(17,0,255)");
}, function() {
    $(this).css("fill", "rgb(97, 184, 255)");
});
