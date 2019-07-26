const b = "<b></b>",
    wT = "#waterlooText > ",
    cT = "#cacText > ",
    pT = "#pureunText > .",
    hT = "#hcmcText > .",
    sT = "#sisText > .",
    dT = "#daepyongText > .";

$("#lang-setting").on('change', function() {
    if ($(this).is(':checked')) { // From English to Korean
        const dur_kr = "기간: ",
            reg_kr = "지역: ",
            prog_kr = "전공: ";

        // UW
        $title = $(b).text("워털루 대학교");
        $(wT + ".schoolTitle").text("").append($title);
        $(wT + ".1").text("2017년 9월 7일 - 재학중");
        $duration = $(b).text(dur_kr);
        $(wT + ".1").prepend($duration);
        $(wT + ".2").text("캐나다 온타리오 워털루");
        $region = $(b).text(reg_kr);
        $(wT + ".2").prepend($region);
        $(wT + ".3").text("응용수학, 전산학 옵션");
        $program = $(b).text(prog_kr);
        $(wT + ".3").prepend($program);

        $("#w1").text("전 한국 학생회 (KSA) 임원 [2017년 9월 - 2018년 12월]");
        $("#w2").text("Starterhacks에서 원활한 유저 소통을 위한 온라인 웹 플렛폼 KidsAbility Portal 개발, [2019년 1월]");
        $("#w3").text("입학 장학금: University of Waterloo President's Scholarship of Distinction 수령 [2017년 7월]");

        // CAC
        $title = $(b).text("카이로 미국학교");
        $(cT + ".schoolTitle").text("").append($title);
        $(cT + ".1").text("2013년 2월 24일 - 2017년 6월 2일");
        $duration = $(b).text(dur_kr);
        $(cT + ".1").prepend($duration);
        $(cT + ".2").text("이집트 카이로");
        $region = $(b).text(reg_kr);
        $(cT + ".2").prepend($region);

        $("#c1").text("Senior Mathematics Department Award 수상 [2017년 5월]");
        $("#c2").text("Cayley Mathematics Contest Certificate of Distinction 수상 [2015 4월]");
        $("#c3").text("2017년 졸업생 Top Ten Scholar Award 수상 [2016년 5월, 2017년 5월]");
        $("#c4").text("수강한 IB, AP 전 과목 만점 (IB HL Phys 7, IB HL Math 7, AP Stats 5, 등) [2017년 6월]");
        $("#c5").text("미국 대학수학능력시험 New SAT 1500점 [2016년 12월]");
        $("#c6").text("CAC Varsity Dance [2014년 11월 - 2015년 2월, 2015년 11월 - 2016년 2월]");
        $("#c7").text("CAC Cross-Country [2014년 9월 - 2014년 11월, 2015년 9월 - 2015년 11월]");

        // pureun
        $title = $(b).text("푸른중학교");
        $(pT + "schoolTitle").text("").append($title);
        $(pT + "1").text("2011년 3월 - 2013년 1월 16일");
        $duration = $(b).text(dur_kr);
        $(pT + "1").prepend($duration);
        $(pT + "2").text("대한민국 경기도 화성시");
        $region = $(b).text(reg_kr);
        $(pT + "2").prepend($region);

        // ISHCMC
        $title = $(b).text("호치민시 국제학교");
        $(hT + "schoolTitle").text("").append($title);
        $(hT + "1").text("2010년 8월 10일 - 2010년 12월 17일");
        $duration = $(b).text(dur_kr);
        $(hT + "1").prepend($duration);
        $(hT + "2").text("베트남 호치민시");
        $region = $(b).text(reg_kr);
        $(hT + "2").prepend($region);

        // SIS
        $title = $(b).text("싱가폴 국제학교");
        $(sT + "schoolTitle").text("").append($title);
        $(sT + "1").text("2008년 3월 14일 - 2010년 7월 14일");
        $duration = $(b).text(dur_kr);
        $(sT + "1").prepend($duration);
        $(sT + "2").text("베트남 호치민시");
        $region = $(b).text(reg_kr);
        $(sT + "2").prepend($region);

        //Daepyong
        $title = $(b).text("대평초등학교");
        $(dT + "schoolTitle").text("").append($title);
        $(dT + "1").text("2005년 3월 - 2008년 2월");
        $duration = $(b).text(dur_kr);
        $(dT + "1").prepend($duration);
        $(dT + "2").text("경기도 수원시");
        $region = $(b).text(reg_kr);
        $(dT + "2").prepend($region);

    } else { // From Korean to English
        const dur = "Duration: ",
            reg = "Region: ",
            prog = "Program: ";

        // UW
        $(wT + ".schoolTitle").text("University of Waterloo");
        $(wT + ".1").text("Sep 7, 2017 - Current");
        $duration = $(b).text(dur);
        $(wT + ".1").prepend($duration);
        $(wT + ".2").text("Waterloo, ON, Canada");
        $region = $(b).text(reg);
        $(wT + ".2").prepend($region);
        $(wT + ".3").text("Applied Mathematics, Computing Technology Option");
        $program = $(b).text(prog);
        $(wT + ".3").prepend($program);

        $("#w1").text("Former Korean Student Association (KSA) Executive [Sep 2017 - Dec 2018]");
        $("#w2").text("Developed KidsAbility Portal, an online web platform for user interacion at Starterhacks [Jan 2019]");
        $("#w3").text("Received an entrance scholarship: University of Waterloo President's Scholarship of Distinction [Jul 2017]");

        // CAC
        $(cT + ".schoolTitle").text("Cairo American College");
        $(cT + ".1").text("Feb 24, 2013 - Jun 2, 2017");
        $duration = $(b).text(dur);
        $(cT + ".1").prepend($duration);
        $(cT + ".2").text("Cairo, Egypt");
        $region = $(b).text(reg);
        $(cT + ".2").prepend($region);

        $("#c1").text("Received Senior Mathematics Department Award at CAC Awards Night [May 2017]");
        $("#c2").text("Received Cayley Mathematics Contest Certificate of Distinction (University of Waterloo) [Apr 2015]");
        $("#c3").text("Received Top Ten Scholar Award Class of 2017 at CAC Awards Night [May 2016, May 2017]");
        $("#c4").text("Scored full marks in all IB, AP courses taken (IB HL Phys 7, IB HL Math 7, AP Stats 5, etc) [Jun 2017]");
        $("#c5").text("Scored 1500 in the new Scholastic Aptitude Test (SAT) [Dec 2016]");
        $("#c6").text("CAC Varsity Dance [Nov 2014 - Feb 2015, Nov 2015 - Feb 2016]");
        $("#c7").text("CAC Cross-Country [Sep 2014 – Nov 2014, Sep 2015 – Nov 2015]");

        // Pureun
        $(pT + "schoolTitle").text("Pureun Middle School");
        $(pT + "1").text("Mar 2011 - Jan 16, 2013");
        $duration = $(b).text(dur);
        $(pT + "1").prepend($duration);
        $(pT + "2").text("Hwaseong, Gyeonggi, South Korea");
        $region = $(b).text(reg);
        $(pT + "2").prepend($region);

        // ISHCMC
        $(hT + "schoolTitle").text("International School Ho Chi Minh City");
        $(hT + "1").text("Aug 10, 2010 - Dec 17, 2010");
        $duration = $(b).text(dur);
        $(hT + "1").prepend($duration);
        $(hT + "2").text("Ho Chi Minh City, Vietnam");
        $region = $(b).text(reg);
        $(hT + "2").prepend($region);

        // SIS
        $(sT + "schoolTitle").text("Singapore International School, South Saigon");
        $(sT + "1").text("Mar 14, 2008 - Jul 14, 2010");
        $duration = $(b).text(dur);
        $(sT + "1").prepend($duration);
        $(sT + "2").text("Ho Chi Minh City, Vietnam");
        $region = $(b).text(reg);
        $(sT + "2").prepend($region);

        //Daepyong
        $(dT + "schoolTitle").text("Daepyong Elementary School");
        $(dT + "1").text("Mar 2005 - Feb 2008");
        $duration = $(b).text(dur);
        $(dT + "1").prepend($duration);
        $(dT + "2").text("Suwon, Gyeonggi-do, South Korea");
        $region = $(b).text(reg);
        $(dT + "2").prepend($region);
    }
});