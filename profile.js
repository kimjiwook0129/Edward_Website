var summaryLst;

function renderContext(lang = "en") {
  fetch("json/profile.json")
    .then(response => {
      return response.json();
    })
    .then(data => {
      summaryLst = data;
      $("#myName").text(data.name[lang]);
      var _index = 0;
      data.summary[lang].forEach(element => {
        $("#summary").append(
          $("<li></li>")
            .addClass("bullet-points")
            .attr("id", "summary" + String(++_index))
            .text(element)
            .css("text-align", "left")
        );
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}

$("#lang-setting").on("change", function() {
  if ($(this).is(":checked")) {
    var _index = 0;
    $("#myName").text("김지욱 (Edward)");
    summaryLst.summary.kr.forEach(function(c) {
      $("#summary" + String(++_index)).text(c);
    });
  } else {
    var __index = 0;
    $("#myName").text("Edward Jiwook Kim");
    summaryLst.summary.en.forEach(function(c) {
      $("#summary" + String(++__index)).text(c);
    });
  }
});

if (window.location.href.slice(-3) == "kor") renderContext("kr");
else renderContext();

var index = 1;
const len = 8;

window.setInterval(function() {
  if (len == index + 1) index = 0;
  $("#my-face").fadeOut(function() {
    $(this)
      .attr("src", "./images/faces/" + "face_" + String(++index) + ".jpg")
      .fadeIn();
  });
}, 8000);
