const dataset_lang = [{lang: "C", value: 3.5},
                {lang: "C#", value: 1.5},
                {lang: "C++", value: 5},
                {lang: "HTML", value: 4.5},
                {lang: "CSS", value: 4},
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

function drawLangChart() {
    var svg = d3.select(l),
    
    width = $(l).width() - margin.left - margin.right,
    height = $(l).height() - margin.top - margin.bottom - 50;

    var xScale = d3.scaleLinear().range([0, width]),
        yScale = d3.scaleBand().range([0, height]).padding(0.6);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    xScale.domain([0.1, d3.max(dataset_lang, function(d) {
        return d.value;
    })]);

    yScale.domain(dataset_lang.map(function(d) {
        return d.lang;
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
        .text("Proficiency")
        .attr("id", "lang-x-axis-text");

    g.append("g")
        .call(d3.axisLeft(yScale))
        .append("text")
        .attr("y", margin.top)
        .attr("x", -20)
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Language")
        .attr("id", "lang-y-axis-text");

    g.selectAll(".bar")
        .data(dataset_lang)
        .enter().append("rect")
        .attr("class", "lang-bar")
        .attr("x", 1)
        .attr("y", function(d) {
            return yScale(d.lang);
        })
        .attr("width", function(d) {
            return xScale(d.value);
        })
        .attr("height", yScale.bandwidth())
        .attr("fill", langColor);

    $(".lang-bar").hover(function(obj, i) {
        $(this).css("fill", langColorHover);
        var index = $(l + " rect").index($(this)),
            x_dist = Number($(this).attr("width")) + margin.left + 5,
            y_dist = Number($(this).attr("y")) + margin.top + $(this).attr("height") / 2 + 4;
        $("#langNum").attr("x", x_dist).attr("y", y_dist).text(dataset_lang[index].value);
    }, function() {
        $(this).css("fill", langColor);
        $("#langNum").text("");
    });
}

function drawToolChart() {
    var svg = d3.select(t),
    
    width = $(t).width() - margin.left - margin.right,
    height = $(t).height() - margin.top - margin.bottom - 50;

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
        .text("Proficiency")
        .attr("id", "tool-x-axis-text");

    g.append("g")
        .call(d3.axisLeft(yScale))
        .append("text")
        .attr("y", margin.top)
        .attr("x", -20)
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Software/Tool")
        .attr("id", "tool-y-axis-text");

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
        .attr("fill", toolColor);

    $(".tool-bar").hover(function(obj, i) {
        $(this).css("fill", toolColorHover);
        var index = $(t + " rect").index($(this)),
            x_dist = Number($(this).attr("width")) + margin.left + 5,
            y_dist = Number($(this).attr("y")) + margin.top + $(this).attr("height") / 2 + 3.5;
        $("#toolNum").attr("x", x_dist).attr("y", y_dist).text(dataset_tool[index].value);
    }, function() {
        $(this).css("fill", toolColor);
        $("#toolNum").text("");
    });
}

$( window ).resize(function() {
    d3.select(l).selectAll("g").remove();
    d3.select(t).selectAll("g").remove();
    drawLangChart();
    drawToolChart();
    if (window.location.href.slice(-3) == "kor") {
        $("#lang-x-axis-text").text("숙달도");
        $("#tool-x-axis-text").text("숙달도");
        $("#lang-y-axis-text").text("언어");
        $("#tool-y-axis-text").text("소프트웨어/도구");
    }
});

drawLangChart();
drawToolChart();
