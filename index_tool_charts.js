var dataset_tool = [{tool: "Adobe Photoshop", value: 4},
                    {tool: "Figma", value: 4},
                    {tool: "Google Apps/API", value: 5},
                    {tool: "Git", value: 2.5},
                    {tool: "InVisionApp", value: 3.5},
                    {tool: "Microsoft Office", value: 4},
                    {tool: "MySQL", value: 2},
                    {tool: "phpMyAdmin", value: 3.5},
                    {tool: "Unity", value: 2},
                    {tool: "*nix", value: 2.5}];

var svg = d3.select("#tool-chart"),
    margin = 40,
    marginHori = 50,
    width = 890 - marginHori,
    height = 270 - margin;
        
var xScale = d3.scaleBand().range([0, width]).padding(0.5),
    yScale = d3.scaleLinear().range([height, 0]);
    
var g = svg.append("g")
    .attr("transform", "translate(" + 70 + "," + 20 + ")");
        
xScale.domain(dataset_tool.map(function(d) { return d.tool; }));
yScale.domain([0, d3.max(dataset_tool, function(d) { return d.value; })]);

g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
    .append("text")
    .attr("y", height - 200)
    .attr("x", width - 800)
    .attr("text-anchor", "end")
    .attr("stroke", "black")
    .text("Tool");

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
    .data(dataset_tool)
    .enter().append("rect")
    .attr("class", "tool-bar")
    .attr("x", function(d) { 
        return xScale(d.tool);
    })
    .attr("y", function(d) {
        return yScale(d.value);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) {
        return height - yScale(d.value);
    })
    .attr("fill", "rgb(255, 89, 89)");


$(".tool-bar").hover(function(obj, i) {
    $(this).css("fill", "rgb(255,0,0)");
}, function() {
    $(this).css("fill", "rgb(255, 89, 89)");
});