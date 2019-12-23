var lst_of_images = ["face_2", "face_4", "face_5"];
var index = 1;
const len = 8;
var imgItself = $("#my-face");

var summaryLst;

window.setInterval(function() {
  if (len == index + 1) index = 0;
  imgItself.fadeOut(function() {
    $(this)
      .attr("src", "./images/faces/" + "face_" + ++index)
      .fadeIn();
  });
}, 8000);

fetch("json/profile.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    summaryLst = data;
    $("#my-face").attr("src");
    var _index = 0;
    data.summary.en.forEach(element => {
      $("#summary").append(
        $("<li></li>")
          .addClass("bullet-points")
          .attr("id", "summary" + ++_index)
          .text(element)
          .css("text-align", "left")
      );
    });
  })
  .catch(function(error) {
    console.log(error);
  });

$("#lang-setting").on("change", function() {
  if ($(this).is(":checked")) {
    var _index = 0;
    $("#myName").text("김지욱 (Edward)");
    summaryLst.summary.kr.forEach(function(c) {
      $("#summary" + ++_index).text(c);
    });
  } else {
    var _index = 0;
    $("#myName").text("Edward Jiwook Kim");
    summaryLst.summary.en.forEach(function(c) {
      $("#summary" + ++_index).text(c);
    });
  }
});
