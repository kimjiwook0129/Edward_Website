fetch('json/quotes.json').then((response) => {
    return response.json();
}).then((data) => { // Json successfully fetched
    const genId = "#quote-generate",
        langId = "#lang-setting",
        length_kr = data.quotes_kor.length,
        length_en = data.quotes.length,
        timeInterval = 7000; // 7s
    var timeLoop; // For clearing loop and restart [Pointer]

    function getRandomInt(max) { // Generates random Int [0, max)
        return Math.floor(Math.random() * max);
    }

    function genQuote(fadeInTo, lang) { // Generate quote
        var index = getRandomInt(length_en), // Default: English
            quo = data.quotes[index].quote,
            who = data.quotes[index].by;
        if (lang == "k") { // Korean: Switching variables
            index = getRandomInt(length_kr);
            quo = data.quotes_kor[index].quote;
            who = data.quotes_kor[index].by;
        }
        switch (fadeInTo) { 
            case 0: // Generating quote for the first time
                $(genId).text("\"" + quo + "\" -" + who).fadeIn();
                break;
            default: // Replacing with other quote
                $(genId).fadeOut(function() {
                    $(this).text("\"" + quo + "\" -" + who).fadeIn();
                });
        }
    }

    if ($(langId).is(':checked')) { // Shoot initial Quote
        genQuote(0, "k"); // Korean
    } else {
        genQuote(0, "e"); // English
    }

    beginLoop(); // Start quote generating loop

    function beginLoop() { // Loop for generating quotes
        timeLoop = window.setInterval(function() {
            if ($(langId).is(':checked')) { // Korean quote
                genQuote(1, "k");
            } else { // English quote
                genQuote(1, "e");
            }
        }, timeInterval);
    }

    $(langId).on('change', function() { // Instant quote change when language changes
        if ($(this).is(':checked')) { // Korean
            genQuote(1, "k");
        } else { // English
            genQuote(1, "e");
        }
        clearInterval(timeLoop); // Clear the existing loop
        beginLoop(); // Start a new loop
        // New loop to apply the consistent interval after language change
    });
}).catch(function (error) { // Error handling
    console.log(error);
});
