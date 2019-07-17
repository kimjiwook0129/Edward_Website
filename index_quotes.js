fetch('json/quotes.json').then((response) => {
    return response.json();
}).then((data) => {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    var quote_kr_index = getRandomInt(data.quotes_kor.length),
        quote_en_index = getRandomInt(data.quotes.length);

    if ($("#lang-setting").is(':checked')) { // Shoot Korean quotes
        $("#quote-generate").text("\"" + data.quotes_kor[quote_kr_index].quote + "\" -" + data.quotes_kor[quote_kr_index].by).fadeIn();
    } else { // Shoot English quotes
        $("#quote-generate").text("\"" + data.quotes[quote_en_index].quote + "\" -" + data.quotes[quote_en_index].by).fadeIn();
    }
    window.setInterval(function() {
        if ($("#lang-setting").is(':checked')) { // Shoot Korean quotes
            quote_kr_index = getRandomInt(data.quotes_kor.length);
            $("#quote-generate").fadeOut(function() {
                $(this).text("\"" + data.quotes_kor[quote_kr_index].quote + "\" -" + data.quotes_kor[quote_kr_index].by).fadeIn();
            });
        } else { // Shoot English quotes
            quote_en_index = getRandomInt(data.quotes.length);
            $("#quote-generate").fadeOut(function() {
                $(this).text("\"" + data.quotes[quote_en_index].quote + "\" -" + data.quotes[quote_en_index].by).fadeIn();
            });
        }
    }, 7000);
}).catch(function (error) {
    console.log(error);
});