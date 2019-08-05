fetch('json/quotes.json').then((response) => {
    return response.json();
}).then((data) => { // successfully fetched
    const genId = "#quote-generate",
        langId = "#lang-setting",
        length_kr = data.quotes_kor.length,
        length_en = data.quotes.length,
        timeInterval = 7000; // 7s
    var timeLoop; // to clear loop and restart

    function getRandomInt(max) { // generates random Int [0, max)
        return Math.floor(Math.random() * max);
    }

    function genQuote(fadeInTo, lang) { // generate quote
        // English default
        var index = getRandomInt(length_en),
            quo = data.quotes[index].quote,
            who = data.quotes[index].by;
        if (lang == "k") { // Korean: switching variables
            index = getRandomInt(length_kr);
            quo = data.quotes_kor[index].quote;
            who = data.quotes_kor[index].by;
        }
        if (fadeInTo == 0) { // when first generating quote
            $(genId).text("\"" + quo + "\" -" + who).fadeIn();
        } else { // when replacing with other quote
            $(genId).fadeOut(function() {
                $(this).text("\"" + quo + "\" -" + who).fadeIn();
            });
        }
    }

    // Shoot initial Quote
    if ($(langId).is(':checked')) {
        genQuote(0, "k"); // Korean
    } else {
        genQuote(0, "e"); // English
    }
    beginLoop(); // start the loop for generating quotes

    function beginLoop() { // starts the loop of generating quotes
        timeLoop = window.setInterval(function() {
            if ($(langId).is(':checked')) { // Shoot Korean quote
                genQuote(1, "k");
            } else { // Shoot English quote
                genQuote(1, "e");
            }
        }, timeInterval);
    }

    $(langId).on('change', function() { // Instant change when language changes
        if ($(this).is(':checked')) { // In Korean
            genQuote(1, "k");
        } else { // In English
            genQuote(1, "e");
        }
        clearInterval(timeLoop); // clear the existing loop
        beginLoop(); // start a new one
        // new one to apply the same Interval after instantenous change
    });
}).catch(function (error) { // error handling
    console.log(error);
});
