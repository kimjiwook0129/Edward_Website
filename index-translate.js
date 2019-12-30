function translate_korean() {
  $("#visit-today").text("오늘 방문수");
  $("#visit-month").text("이번달 방문수");
  $("#visit-year").text("올해 방문수");
  $("#visit-total").text("총 방문수");
  $("#clickMeText").text("눌러보세요!");
  $("#clickText1").text("에드워드, 김지욱");
  $("#clickText2").text("안녕하세요? 이곳에선 저에 대해서");
  $("#clickText3").text("더 자세히 아실 수 있어요!");
  $("#dayButton > h4").text("일별");
  $("#monthButton > h4").text("월별");
  $("#yearButton > h4").text("연별");
  $(".users-chart-buttons").width("190px");
  $("#lang-prof-text")
    .text("언어 숙달도")
    .css("font-weight", "bold");
  $("#tool-prof-text")
    .text("소프트웨어/도구 숙달도")
    .css("font-weight", "bold");
  $("#visit-chart-text")
    .text("일일 방문자 추세")
    .css("font-weight", "bold");
  $("#lang-x-axis-text").text("숙달도");
  $("#tool-x-axis-text").text("숙달도");
  $("#lang-y-axis-text").text("언어");
  $("#tool-y-axis-text").text("소프트웨어/도구");
}

if (window.location.href.slice(-3) == "kor") {
  translate_korean();
}

$("#lang-setting").on("change", function() {
  if ($(this).is(":checked")) {
    // From English to Korean
    translate_korean();
  } else {
    // From Korean to English
    $("#visit-today").text("Visits Today");
    $("#visit-month").text("Visits this Month");
    $("#visit-year").text("Visits this Year");
    $("#visit-total").text("Visits Total");
    $("#clickMeText").text("Click Me!");
    $("#clickText1").text("Edward Jiwook Kim");
    $("#clickText2").text("Welcome to my website,");
    $("#clickText3").text("You'll find more about me here!");
    $(".users-chart-buttons").width("218px");
    $("#dayButton > h4").text("Day");
    $("#monthButton > h4").text("Month");
    $("#yearButton > h4").text("Year");
    $("#lang-prof-text")
      .text("Language Proficiency")
      .css("font-weight", "bold");
    $("#tool-prof-text")
      .text("Software/Tool Proficiency")
      .css("font-weight", "bold");
    $("#visit-chart-text")
      .text("Daily Visiter Trend")
      .css("font-weight", "bold");
    $("#lang-x-axis-text").text("Proficiency");
    $("#tool-x-axis-text").text("Proficiency");
    $("#lang-y-axis-text").text("Language");
    $("#tool-y-axis-text").text("Software/Tool");
  }
});
