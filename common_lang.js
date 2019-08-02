const bN = "-button",
    hF = "href",
    K = "kor",
    E = "eng";

function translateKorean() {
    $("#lang-label").text("한국어");
    $("#home" + bN).text("홈");
    $("#background" + bN).text("배경");
    $temp = $(span).addClass("caret");
    $("#background" + bN).append($temp);
    $("#working" + bN).text("경력");
    $("#traveling" + bN).text("여행");
    $("#studying" + bN).text("학력");
    $("#résumé" + bN).text("이력서");
    $temp = $(span).addClass("caret");
    $("#résumé" + bN).append($temp);
    $("#fulltime" + bN).text("이력서");
    $("#parttime" + bN).text("이력서");
    $("#coop" + bN).text("코업");
    $("#projects" + bN).text("프로젝트");
    $("#reference_total").text("* 모든 이미지/아이콘은 저작자의 허가를 받거나 서비스 이용약관에 따라 사용되었음을 밝힙니다.");
    $("#working" + bN).attr(hF, $("#working" + bN).attr(hF).slice(0, -3) + K);
    $("#traveling" + bN).attr(hF, $("#traveling" + bN).attr(hF).slice(0, -3) + K);
    $("#studying" + bN).attr(hF, $("#studying" + bN).attr(hF).slice(0, -3) + K);
    $("#edward-logo").attr(hF, $("#edward-logo").attr(hF).slice(0, -3) + K);
    $("#home" + bN).attr(hF, $("#home" + bN).attr(hF).slice(0, -3) + K);
    $("#projects" + bN).attr(hF, $("#projects" + bN).attr(hF).slice(0, -3) + K);
}

if (window.location.href.slice(-3) == K) {
    $("#lang-setting").prop("checked", true);
    translateKorean();
}

$("#lang-setting").on('change', function() {
    if ($(this).is(':checked')) { // From English to Korean
        translateKorean();
    } else { // From Korean to English
        $("#lang-label").text("EN(US)");
        $("#home" + bN).text("Home");
        $("#background" + bN).text("Backgrounds");
        $temp = $(span).addClass("caret");
        $("#background" + bN).append($temp);
        $("#working" + bN).text("Working Background");
        $("#traveling" + bN).text("Traveling Background");
        $("#studying" + bN).text("Studying Background");
        $("#résumé" + bN).text("Résumé");
        $temp = $(span).addClass("caret");
        $("#résumé" + bN).append($temp);
        $("#fulltime" + bN).text("Full-time Résumé");
        $("#parttime" + bN).text("Part-time Résumé");
        $("#coop" + bN).text("Co-op Résumé");
        $("#projects" + bN).text("Projects");
        $("#reference_total").text("* All image/icons have been used under each copyright owner's Terms of Service and permitted to be used.");
        $("#working" + bN).attr(hF, $("#working" + bN).attr(hF).slice(0, -3) + E);
        $("#traveling" + bN).attr(hF, $("#traveling" + bN).attr(hF).slice(0, -3) + E);
        $("#studying" + bN).attr(hF, $("#studying" + bN).attr(hF).slice(0, -3) + E);
        $("#edward-logo").attr(hF, $("#edward-logo").attr(hF).slice(0, -3) + E);
        $("#home" + bN).attr(hF, $("#home" + bN).attr(hF).slice(0, -3) + E);
        $("#projects" + bN).attr(hF, $("#projects" + bN).attr(hF).slice(0, -3) + E);
    }
});