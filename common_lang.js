$("#lang-setting").on('change', function() {
    if ($(this).is(':checked')) { // From English to Korean
        $("#lang-label").text("한국어");
        $("#home-button").text("홈");
        $("#background-button").text("배경");
        $temp = $(span).addClass("caret");
        $("#background-button").append($temp);
        $("#working-button").text("경력");
        $("#traveling-button").text("여행");
        $("#studying-button").text("학력");
        $("#résumé-button").text("이력서");
        $temp = $(span).addClass("caret");
        $("#résumé-button").append($temp);
        $("#fulltime-button").text("이력서");
        $("#parttime-button").text("이력서");
        $("#coop-button").text("코업");
        $("#projects-button").text("프로젝트");
    } else { // From Korean to English
        $("#lang-label").text("EN(US)");
        $("#home-button").text("Home");
        $("#background-button").text("Backgrounds");
        $temp = $(span).addClass("caret");
        $("#background-button").append($temp);
        $("#working-button").text("Working Background");
        $("#traveling-button").text("Traveling Background");
        $("#studying-button").text("Studying Background");
        $("#résumé-button").text("Résumé");
        $temp = $(span).addClass("caret");
        $("#résumé-button").append($temp);
        $("#fulltime-button").text("Full-time Résumé");
        $("#parttime-button").text("Part-time Résumé");
        $("#coop-button").text("Co-op Résumé");
        $("#projects-button").text("Projects");
    }
});