var dataset_tool = [{tool: "Adobe Photoshop", value: 4},
                    {tool: "Figma", value: 4},
                    {tool: "Google Apps/API", value: 5},
                    {tool: "Git", value: 2.5},
                    {tool: "InVisionApp", value: 3.5},
                    {tool: "Microsoft Office", value: 4},
                    {tool: "MySQL", value: 2},
                    {tool: "phpMyAdmin", value: 3.5},
                    {tool: "Unity", value: 2},
                    {tool: "Visual Studio", value: 5},
                    {tool: "Xcode", value: 3.5},
                    {tool: "*nix", value: 2.5}];

const toolBarColor = "rgb(255, 100, 100)",
    toolBarColorHover = "rgb(255,0,0)";

function drawToolChart() {
    d3.select("#tool-chart").selectAll("g").remove();
    var svg = d3.select("#tool-chart"),
    margin =  {
        top: 20,
        left: 100,
        right: 40,
        bottom: 10
    },
    width = $("#tool-chart").width() - margin.left - margin.right,
    height = $("#tool-chart").height() - margin.top - margin.bottom;

    var xScale = d3.scaleLinear().range([0, width]),
        yScale = d3.scaleBand().range([0, height]).padding(0.6);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    xScale.domain([0.1, d3.max(dataset_tool, function(d) {
        return d.value;
    })]);

    yScale.domain(dataset_tool.map(function(d) {
        return d.tool;
    }));

    g.append("g")
        .attr("transform", "translate(0," + margin.top + ")")
        .call(d3.axisTop(xScale).tickFormat(function(d) {
            return d;
        })
        .ticks(10))
        .append("text")
        .attr("dy", "-5.1em")
        .attr("y", margin.top + 10)
        .attr("x", width + 35)
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Proficiency");

    g.append("g")
        .call(d3.axisLeft(yScale))
        .append("text")
        .attr("y", margin.top)
        .attr("x", -20)
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Software");

    g.selectAll(".bar")
        .data(dataset_tool)
        .enter().append("rect")
        .attr("class", "tool-bar")
        .attr("x", 1)
        .attr("y", function(d) {
            return yScale(d.tool);
        })
        .attr("width", function(d) {
            return xScale(d.value);
        })
        .attr("height", yScale.bandwidth())
        .attr("fill", toolBarColor);

    $(".tool-bar").hover(function(obj, i) {
        $(this).css("fill", toolBarColorHover);
        var index = $("#tool-chart rect").index($(this)),
            x_dist = Number($(this).attr("width")) + margin.left + 5,
            y_dist = Number($(this).attr("y")) + margin.top + $(this).attr("height") / 2 + 3.5;
        $("#toolNum").attr("x", x_dist).attr("y", y_dist).text(dataset_tool[index].value);
    }, function() {
        $(this).css("fill", toolBarColor);
        $("#toolNum").text("");
    });
}

$( window ).resize(function() {
    drawToolChart();
});

drawToolChart();

