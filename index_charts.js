const dataset_lang = [{lang: "C", value: 3.5},
                {lang: "C#", value: 1.5},
                {lang: "C++", value: 5},
                {lang: "HTML/CSS", value: 4.5},
                {lang: "Java", value: 1},
                {lang: "Javascript", value: 4.5},
                {lang: "MATLAB", value: 3},
                {lang: "PHP", value: 2.5},
                {lang: "Python", value: 4},
                {lang: "R", value: 1},
                {lang: "Scheme", value: 3},
                {lang: "SQL", value: 3},
                {lang: "Swift", value: 1.5},
                {lang: "XML", value: 1}]
    dataset_tool = [{tool: "Adobe Photoshop", value: 4},
                {tool: "Android Studio", value: 1.5},
                {tool: "Figma", value: 4},
                {tool: "Google Apps/API", value: 5},
                {tool: "Git", value: 2.5},
                {tool: "InVisionApp", value: 3.5},
                {tool: "JIRA", value: 1.5},
                {tool: "Microsoft Office", value: 4},
                {tool: "MySQL", value: 2},
                {tool: "phpMyAdmin", value: 3.5},
                {tool: "Unity", value: 2},
                {tool: "Visual Studio", value: 5},
                {tool: "Xcode", value: 3.5},
                {tool: "*nix", value: 2.5}],
    langColor = "rgb(97, 184, 255)",
    langColorHover = "rgb(17, 0, 255)",
    toolColor = "rgb(255, 100, 100)",
    toolColorHover = "rgb(255,0,0)",
    margin = {
        top: 17,
        left: 90,
        right: 40,
        bottom: 10
    },
    l = "#language-chart",
    t = "#tool-chart";

function drawProficiencyChart(para) {
    var svg = d3.select(para),

        width = $(para).width() - margin.left - margin.right,
        height = $(para).height() - margin.top - margin.bottom - 50,

        dataSets = para == l ? dataset_lang : dataset_tool;

    var xScale = d3.scaleLinear().range([0, width]),
        yScale = d3.scaleBand().range([0, height]).padding(0.6);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    xScale.domain([0.1, d3.max(dataSets, function(d) {
        return d.value;
    })]);

    yScale.domain(dataSets.map(function(d) {
        return para == l ? d.lang : d.tool;
    }));

    var idName = para == l ? "lang-x-axis-text" : "tool-x-axis-text";

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
        .text("Proficiency")
        .attr("id", idName);

    idName = para == l ? "lang-y-axis-text" : "tool-y-axis-text";
    var yAxisName = para == l ? "Language" : "Software/Tool"
    g.append("g")
        .call(d3.axisLeft(yScale))
        .append("text")
        .attr("y", margin.top)
        .attr("x", -20)
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text(yAxisName)
        .attr("id", idName);

    idName = para == l ? "lang-bar" : "tool-bar";
    var theColor = para == l ? langColor : toolColor;
    var theHoverColor = para == l ? langColorHover : toolColorHover;
    g.selectAll(".bar")
        .data(dataSets)
        .enter().append("rect")
        .attr("class", idName)
        .attr("x", 1)
        .attr("y", function(d) {
            return para == l ? yScale(d.lang) : yScale(d.tool);
        })
        .attr("width", function(d) {
            return xScale(d.value);
        })
        .attr("height", yScale.bandwidth())
        .attr("fill", theColor);

    var someIDs = para == l ? "#langNum" : "#toolNum";

    $("." + idName).hover(function(obj, i) {
        $(this).css("fill", theHoverColor);
        var index = $(para + " rect").index($(this)),
            x_dist = Number($(this).attr("width")) + margin.left + 5,
            y_dist = Number($(this).attr("y")) + margin.top + $(this).attr("height") / 2 + 4;
        $(someIDs).attr("x", x_dist).attr("y", y_dist).text(dataSets[index].value);
    }, function() {
        $(this).css("fill", theColor);
        $(someIDs).text("");
    });
}

$(window).resize(function() {
    d3.select(l).selectAll("g").remove();
    d3.select(t).selectAll("g").remove();
    drawProficiencyChart(l);
    drawProficiencyChart(t);
    if (window.location.href.slice(-3) == "kor") {
        $("#lang-x-axis-text").text("숙달도");
        $("#tool-x-axis-text").text("숙달도");
        $("#lang-y-axis-text").text("언어");
        $("#tool-y-axis-text").text("소프트웨어/도구");
    }
});

drawProficiencyChart(l);
drawProficiencyChart(t);
