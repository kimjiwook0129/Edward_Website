$("#lang-setting").on('change', function() {
    if ($(this).is(':checked')) { // From English to Korean
        $("#so-far-statement").text("지금까지 제가 가본 곳은...");
        $("#continents-text").text("대륙");
        $("#countries-text").text("국가");
        $("#cities-text").text("도시");
        $("#CL").text("현위치");
        $("#PL").text("살았던 곳");
        $("#PT").text("여행갔던 곳");
        $("#PV").text("가봤던 곳");
    } else { // From Korean to English
        $("#so-far-statement").text("So far, I have been to...");
        $("#continents-text").text("CONTINENTS");
        $("#countries-text").text("COUNTRIES");
        $("#cities-text").text("CITIES");
        $("#CL").text("Current Location");
        $("#PL").text("Place Lived");
        $("#PT").text("Place Traveled");
        $("#PV").text("Place Visited");
    }
});