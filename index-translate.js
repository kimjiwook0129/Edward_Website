$("#lang-setting").on('change', function() {
    if ($(this).is(':checked')) { // From English to Korean
        $("#visit-today").text("오늘 방문수");
        $("#visit-month").text("이번달 방문수");
        $("#visit-year").text("올해 방문수");
        $("#visit-total").text("총 방문수");
    } else { // From Korean to English
        $("#visit-today").text("Visits Today");
        $("#visit-month").text("Visits this Month");
        $("#visit-year").text("Visits this Year");
        $("#visit-total").text("Visits Total");
    }
});