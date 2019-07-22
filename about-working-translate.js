const b = "<b></b>",
    cT = "#cbgText > ",
    sT = "#sheridanText > ",
    tT = "#tutorText > ";

$("#lang-setting").on('change', function() {
    if ($(this).is(':checked')) { // From English to Korean
        const org_kr = "회사/단체: ",
            dur_kr = "기간: ",
            reg_kr = "지역: ";
        $("#fullTimeText").text("풀타임 (주 35시간 이상 근무)");
        $("#partTimeText").text("파트타임 (주 35시간 이하 근무)");
        $("#reference").text("* 모든 이미지/아이콘들은 저작자의 허가 받거나 혹은 서비스 이용약관에 따라 사용되었음을 밝힙니다.");

        // cbg
        $title = $(b).text("개발자 / 데이터 분석가");
        $(cT + ".positionTitle").text("").append($title);
        $(cT + ".1").text("Centre for Biodiversity Genomics, 구웰프 대학 소속");
        $organization = $(b).text(org_kr);
        $(cT + ".1").prepend($organization);
        $(cT + ".2").text("2019년 5월 6일 - 2019년 8월 23일");
        $duration = $(b).text(dur_kr);
        $(cT + ".2").prepend($duration);
        $(cT + ".3").text("캐나다 온타리오 구웰프");
        $region = $(b).text(reg_kr);
        $(cT + ".3").prepend($region);
        $("#c1").text("Visualized DNA barcode data workflow by deploying a dashboard by the extensive use of Google Apps and their APIs");
        $("#c2").text("Retrieved Barcode Of Life Data (BOLD) System's taxonomy data of DNA-based species using MediaWiki API");
        $("#c3").text("Improved the files upload UI of mBRAVE, platform for the multiplex based on high-throughput sequencing (HTS) instruments");

        // sheridan
        $title = $(b).text("컴퓨터 수학 조교");
        $(sT + ".positionTitle").text("").append($title);
        $(sT + ".1").text("Library and Learning Services, Sheridan College");
        $organization = $(b).text(org_kr);
        $(sT + ".1").prepend($organization);
        $(sT + ".2").text("2018년 5월 4일 - 2018년 8월 17일");
        $duration = $(b).text(dur_kr);
        $(sT + ".2").prepend($duration);
        $(sT + ".3").text("캐나다 온타리오 옥빌");
        $region = $(b).text(reg_kr);
        $(sT + ".3").prepend($region);
        $("#s1").text("Managed approximately 40% of the campus's computer mathematics course tutorials and 100% of drop-in sessions independently as the only computer mathematics learning assistant at campus");
        $("#s2").text("Analyzed the campus library learning centre's Database Management System (DBMS) SharePoint and redesigned its supplementary models with the representation of their practicalities");
        $("#s3").text("Produced question packets for Calculus and Computer Mathematics courses, which professors requested to incorporate into the course materials, constructing creative applications of the courses");

        // tutor
        $title = $(b).text("수학/물리 개인 과외");
        $(tT + ".positionTitle").text("").append($title);
        $(tT + ".1").text("Self-employed");
        $organization = $(b).text(org_kr);
        $(tT + ".1").prepend($organization);
        $(tT + ".2").text("2017년 1월 - 2018년 4월");
        $duration = $(b).text(dur_kr);
        $(tT + ".2").prepend($duration);
        $(tT + ".3").text("이집트 카이로 | 캐나다 온타리오 워털루");
        $region = $(b).text(reg_kr);
        $(tT + ".3").prepend($region);
        $("#t1").text("Interacted with students in wide age range from 4th grade to first-year Undergraduate student");
        $("#t2").text("Experienced in teaching calculus, pre-calculus, algebra, physics: mechanics fundamentals, and Python");
        $("#t3").text("Mastered diverse and efficient teaching skills through years of teaching face-to-face and using webcam");

    } else { // From Korean to English
        const org = "Organization: ",
            dur = "Duration: ",
            reg = "Region: ";
        $("#fullTimeText").text("Full-time Employment");
        $("#partTimeText").text("Part-time Employment");
        $("#reference").text("* All images/icons have been used under each copyright owner's Terms of Service and have been permitted to be used.");

        // cbg
        $(cT + ".positionTitle").text("Programmer & Data Analyst Intern");
        $(cT + ".1").text("Centre for Biodiversity Genomics, University of Guelph");
        $organization = $(b).text(org);
        $(cT + ".1").prepend($organization);
        $(cT + ".2").text("May 6, 2019 - Aug 23, 2019");
        $duration = $(b).text(dur);
        $(cT + ".2").prepend($duration);
        $(cT + ".3").text("Guelph, ON, Canada");
        $region = $(b).text(reg);
        $(cT + ".3").prepend($region);
        $("#c1").text("Visualized DNA barcode data workflow by deploying a dashboard by the extensive use of Google Apps and their APIs");
        $("#c2").text("Retrieved Barcode Of Life Data (BOLD) System's taxonomy data of DNA-based species using MediaWiki API");
        $("#c3").text("Improved the files upload UI of mBRAVE, platform for the multiplex based on high-throughput sequencing (HTS) instruments");

        // sheridan
        $(sT + ".positionTitle").text("Computer Mathematics Learning Assistant");
        $(sT + ".1").text("Library and Learning Services, Sheridan College");
        $organization = $(b).text(org);
        $(sT + ".1").prepend($organization);
        $(sT + ".2").text("May 4, 2018 - Aug 17, 2018");
        $duration = $(b).text(dur);
        $(sT + ".2").prepend($duration);
        $(sT + ".3").text("Oakville, ON, Canada");
        $region = $(b).text(reg);
        $(sT + ".3").prepend($region);
        $("#s1").text("Managed approximately 40% of the campus's computer mathematics course tutorials and 100% of drop-in sessions independently as the only computer mathematics learning assistant at campus");
        $("#s2").text("Analyzed the campus library learning centre's Database Management System (DBMS) SharePoint and redesigned its supplementary models with the representation of their practicalities");
        $("#s3").text("Produced question packets for Calculus and Computer Mathematics courses, which professors requested to incorporate into the course materials, constructing creative applications of the courses");

        // tutor
        $(tT + ".positionTitle").text("Mathematics/Physics Private Tutor");
        $(tT + ".1").text("Self-employed");
        $organization = $(b).text(org);
        $(tT + ".1").prepend($organization);
        $(tT + ".2").text("Jan 2017 - Apr 2018");
        $duration = $(b).text(dur);
        $(tT + ".2").prepend($duration);
        $(tT + ".3").text("Cairo, Egypt | Waterloo, ON, Canada");
        $region = $(b).text(reg);
        $(tT + ".3").prepend($region);
        $("#t1").text("Interacted with students in wide age range from 4th grade to first-year Undergraduate student");
        $("#t2").text("Experienced in teaching calculus, pre-calculus, algebra, physics: mechanics fundamentals, and Python");
        $("#t3").text("Mastered diverse and efficient teaching skills through years of teaching face-to-face and using webcam");
    }
});