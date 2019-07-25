var dataset_lang = [{lang: "C", value: 3.5},
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
                {lang: "SQL", value: 3}];

const langBarColor = "rgb(97, 184, 255)",
    langBarColorHover = "rgb(17, 0, 255)";


function drawLangChart() {
    d3.select("#language-chart").selectAll("g").remove();
    var svg = d3.select("#language-chart"),
    margin =  {
        top: 20,
        left: 100,
        right: 40,
        bottom: 10
    },
    width = $("#language-chart").width() - margin.left - margin.right,
    height = $("#language-chart").height() - margin.top - margin.bottom;

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
        .text("Proficiency");

    g.append("g")
        .call(d3.axisLeft(yScale))
        .append("text")
        .attr("y", margin.top)
        .attr("x", -20)
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Language");

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
        .attr("fill", langBarColor);

    $(".lang-bar").hover(function(obj, i) {
        $(this).css("fill", langBarColorHover);
        var index = $("#language-chart rect").index($(this)),
            x_dist = Number($(this).attr("width")) + margin.left + 5,
            y_dist = Number($(this).attr("y")) + margin.top + $(this).attr("height") / 2 + 4;

        console.log(index);
        $("#langNum").attr("x", x_dist).attr("y", y_dist).text(dataset_lang[index].value);
    }, function() {
        $(this).css("fill", langBarColor);
        $("#langNum").text("");
    });
}

$( window ).resize(function() {
    drawLangChart();
});

drawLangChart();

