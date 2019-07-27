fetch('json/quotes.json').then((response) => {
    return response.json();
}).then((data) => {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    const genId = "#quote-generate",
        langId = "#lang-setting",
        length_kr = data.quotes_kor.length,
        length_en = data.quotes.length;

    var index_kr = getRandomInt(length_kr),
        index_en = getRandomInt(length_en),
        timeInterval = 7000;

    // Shoot Korean quotes
    if ($(langId).is(':checked')) $(genId).text("\"" + data.quotes_kor[index_kr].quote + "\" -" + data.quotes_kor[index_kr].by).fadeIn();
    // Shoot English quotes
    else $(genId).text("\"" + data.quotes[index_en].quote + "\" -" + data.quotes[index_en].by).fadeIn();

    window.setInterval(function() {
        if ($(langId).is(':checked')) { // Shoot Korean quotes
            index_kr = getRandomInt(length_kr);
            $(genId).fadeOut(function() {
                $(this).text("\"" + data.quotes_kor[index_kr].quote + "\" -" + data.quotes_kor[index_kr].by).fadeIn();
            });
        } else { // Shoot English quotes
            index_en = getRandomInt(length_en);
            $(genId).fadeOut(function() {
                $(this).text("\"" + data.quotes[index_en].quote + "\" -" + data.quotes[index_en].by).fadeIn();
            });
        }
    }, timeInterval);
}).catch(function (error) {
    console.log(error);
});