var NAME;
var IMAGES;
var SUMMARY;

function renderContext(lan = "en") {
  $("#myName").text(NAME[lan]);
  $("#summary").empty();

  SUMMARY[lan].forEach(element => {
    $_li = $("<li></li>")
      .addClass("bullet-points")
      .text(element.context + (element.link == null ? "" : "..."))
      .css("text-align", "left");
    if (element.link) {
      $_lan_setting = lan == "en" ? "eng" : "kor";
      $_a = $("<a></a>")
        .attr("href", element.link + "?lang=" + $_lan_setting)
        .text(lan == "en" ? "more" : "더 보기");
      $_li.append($_a);
    }
    $("#summary").append($_li);
  });
}

function setImageInterval(_images) {
  var face_index = 0;
  var face_len = _images.length;
  window.setInterval(function() {
    $("#my-face").fadeOut(function() {
      $(this)
        .attr("src", _images[face_index].src)
        .fadeIn();
    });
    $("#face-reference").fadeOut(function() {
      $(this)
        .text(_images[face_index].credit)
        .fadeIn();
    });
    ++face_index;
    if (face_len <= face_index) face_index = 0;
  }, 8000);
}

fetch("json/profile.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    NAME = data.name;
    SUMMARY = data.summary;
    setImageInterval(data.images);
    if (window.location.href.slice(-3) == "kor") {
      renderContext("kr");
    } else {
      renderContext();
    }
  })
  .catch(function(error) {
    console.log(error);
  });

$("#lang-setting").on("change", function() {
  if ($(this).is(":checked")) {
    // Korean
    renderContext("kr");
  } else {
    // English
    renderContext();
  }
});
