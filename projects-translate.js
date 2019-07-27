const b = "<b></b>",
    wT = "#websiteText > ",
    cT = "#chessText > ",
    wfT = "#watfoodText > ",
    sT = "#sudokuText > ";

function translate_Korean() {
    const dur_kr = "기간: ",
        rol_kr = "담당: ",
        lang_kr = "언어: ",
        frame_kr = "프레임워크/라이브러리: ";
    // Edward Website
    $title = $(b).text("개인 웹사이트");
    $(wT + ".websiteTitle").text("").append($title);
    $(wT + ".1").text("2019년 6월 12일 - 현재");
    $duration = $(b).text(dur_kr);
    $(wT + ".1").prepend($duration);
    $(wT + ".2").text("풀스텍 개발");
    $role = $(b).text(rol_kr);
    $(wT + ".2").prepend($role);
    $(wT + ".3").text("HTML/CSS, Javascript, PHP, SQL");
    $language = $(b).text(lang_kr);
    $(wT + ".3").prepend($language);
    $(wT + ".4").text("D3, jQuery, Bootstrap, particlejs");
    $framework = $(b).text(frame_kr);
    $(wT + ".4").prepend($framework);

    $("#w1").text("개인 포트폴리오/웹사이트 개설 및 호스팅");
    $("#w2").text("다양한 유저를 위한 반응형 인터페이스 디자인");
    $("#w3").text("다채로운 유저 및 본인 데이터 시각화");

    // Chess
    $title = $(b).text("체스");
    $(cT + ".chessTitle").text("").append($title);
    $(cT + ".1").text("2019년 3월 18일 - 2019년 4월 5일");
    $duration = $(b).text(dur_kr);
    $(cT + ".1").prepend($duration);
    $(cT + ".2").text("소프트웨어 개발");
    $role = $(b).text(rol_kr);
    $(cT + ".2").prepend($role);
    $(cT + ".3").text("Bash, C++");
    $language = $(b).text(lang_kr);
    $(cT + ".3").prepend($language);
    $(cT + ".4").text("X11");
    $framework = $(b).text(frame_kr);
    $(cT + ".4").prepend($framework);

    $("#c1").text("다양한 모드를 지원하는 체스 게임 개발");
    $("#c2").text("난이도별 AI 플레이어 개발, 컴퓨터와의 경기 모드 지원");
    $("#c3").text("옵저버 디자인 패턴을 이용한 알고리즘 구상 및 그래픽 디자인 고안");

    // WATFood
    $(wfT + ".1").text("2019년 1월 13일 - 2019년 1월 15일");
    $duration = $(b).text(dur_kr);
    $(wfT + ".1").prepend($duration);
    $(wfT + ".2").text("프론트엔드 개발");
    $role = $(b).text(rol_kr);
    $(wfT + ".2").prepend($role);
    $(wfT + ".3").text("HTML/CSS, Javascript");
    $language = $(b).text(lang_kr);
    $(wfT + ".3").prepend($language);
    $(wfT + ".4").text("Bootstrap");
    $framework = $(b).text(frame_kr);
    $(wfT + ".4").prepend($framework);

    $("#wf1").text("랜덤 식사 메뉴 선택 웹 애플리케이션 WATFood 공동 개발");
    $("#wf2").text("실용적 유저 인터페이스 디자인 구성");
    $("#wf3").text("Google지도 API를 활용한 유저의 위치 주변 식당 정보 제공");


    // Sudoku
    $title = $(b).text("스도쿠 해결사");
    $(sT + ".watfoodTitle").text("").append($title);
    $(sT + ".1").text("2018년 6월");
    $duration = $(b).text(dur_kr);
    $(sT + ".1").prepend($duration);
    $(sT + ".2").text("풀스텍 개발");
    $role = $(b).text(rol_kr);
    $(sT + ".2").prepend($role);
    $(sT + ".3").text("C, HTML/CSS, Javascript");
    $language = $(b).text(lang_kr);
    $(sT + ".3").prepend($language);
    $(sT + ".4").text("Node.js");
    $framework = $(b).text(frame_kr);
    $(sT + ".4").prepend($framework);

    $("#s1").text("Backtracking 알고리즘을 사용한 효율적인 스도쿠 해결 프로그램 개발");
    $("#s2").text("필수적인 최소한의 기능을 탑재한 디자인 구성");

}

if (window.location.href.slice(-3) == "kor") {
    translate_Korean();
}

$("#lang-setting").on('change', function() {
    if ($(this).is(':checked')) { // From English to Korean
        translate_Korean();
    } else { // From Korean to English
        const dur = "Duration: ",
            rol = "Role: ",
            lang = "Languages Used: ",
            frame = "Frameworks/Libraries Used: ";

        // Edward Website
        $(wT + ".websiteTitle").text("Personal Website");
        $(wT + ".1").text("Jun 12, 2019 - Current");
        $duration = $(b).text(dur);
        $(wT + ".1").prepend($duration);
        $(wT + ".2").text("Full-Stack Developer");
        $role = $(b).text(rol);
        $(wT + ".2").prepend($role);
        $(wT + ".3").text("HTML/CSS, Javascript, PHP, SQL");
        $language = $(b).text(lang);
        $(wT + ".3").prepend($language);
        $(wT + ".4").text("D3, jQuery, Bootstrap, particlesjs");
        $framework = $(b).text(frame);
        $(wT + ".4").prepend($framework);

        $("#w1").text("Constructed a personal portfolio/website from scratch and hosted online");
        $("#w2").text("Applied highly responsive and user-friendly interface");
        $("#w3").text("Visualized personal and users' data for the users' interests");

        // Chess
        $(cT + ".chessTitle").text("Chess");
        $(cT + ".1").text("Mar 18, 2019 - Apr 5, 2019");
        $duration = $(b).text(dur);
        $(cT + ".1").prepend($duration);
        $(cT + ".2").text("Software Development");
        $role = $(b).text(rol);
        $(cT + ".2").prepend($role);
        $(cT + ".3").text("Bash, C++");
        $language = $(b).text(lang);
        $(cT + ".3").prepend($language);
        $(cT + ".4").text("X11");
        $framework = $(b).text(frame);
        $(cT + ".4").prepend($framework);

        $("#c1").text("Developed a Chess game which supports multiple modes collaboratively");
        $("#c2").text("Deployed computer simulation feature, AI players, at different difficulties");
        $("#c3").text("Designed graphics and implemented algorithms utilizing Observer pattern");

        // WATFood
        $(wfT + ".1").text("Jan 13, 2019 - Jan 15, 2019");
        $duration = $(b).text(dur);
        $(wfT + ".1").prepend($duration);
        $(wfT + ".2").text("Front-End Development");
        $role = $(b).text(rol);
        $(wfT + ".2").prepend($role);
        $(wfT + ".3").text("HTML/CSS, Javascript");
        $language = $(b).text(lang);
        $(wfT + ".3").prepend($language);
        $(wfT + ".4").text("Bootstrap");
        $framework = $(b).text(frame);
        $(wfT + ".4").prepend($framework);

        $("#wf1").text("Co­developed WATFood, a random food picking web application for the users to choose their menu");
        $("#wf2").text("Visualized pragmatic user­ interface");
        $("#wf3").text("Applied Google Maps API to display the restaurants around the users' location for better UX");

        // Sudoku
        $(sT + ".sudokuTitle").text("Sudoku");
        $(sT + ".1").text("June 2018");
        $duration = $(b).text(dur);
        $(sT + ".1").prepend($duration);
        $(sT + ".2").text("Full-Stack Developer");
        $role = $(b).text(rol);
        $(sT + ".2").prepend($role);
        $(sT + ".3").text("C, HTML/CSS, Javascript");
        $language = $(b).text(lang);
        $(sT + ".3").prepend($language);
        $(sT + ".4").text("Node.js");
        $framework = $(b).text(frame);
        $(sT + ".4").prepend($framework);

        $("#s1").text("Utilized backtracking algorithm to develop an efficient Sudoku puzzle solving program");
        $("#s2").text("Simplified features to maximize the application's primary purpose of displaying solution");
    }
});