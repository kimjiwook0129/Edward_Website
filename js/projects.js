var projectContainer = $("#project-container");
var projects;
const category = ["duration", "role", "lang", "tool", "lib"];

function renderContext(lan = "en") {
  projects.forEach(function(project) {
    var parentRow = $("#project-id-" + project.id);
    var downDiv = $("<div></div>").addClass("col-sm-5");

    var title = $("<h4></h4>").text(project.name[lan]);

    downDiv.append(title);

    category.forEach(function(cate) {
      if (project[cate][lan] != "") {
        var label =
          lan == "en"
            ? "Frameworks/Libraries Used: "
            : "프레임워크/라이브러리: ";
        switch (cate) {
          case "duration":
            label = lan == "en" ? "Duration: " : "기간: ";
            break;
          case "role":
            label = lan == "en" ? "Role: " : "담당: ";
            break;
          case "lang":
            label = lan == "en" ? "Languages Used: " : "언어: ";
            break;
          case "tool":
            label = lan == "en" ? "Tools Used: " : "도구: ";
        }
        var dur = $("<p></p>")
          .addClass("exp")
          .text(project[cate][lan]);
        $enhanceLabel = $("<b></b>").text(label);
        dur.prepend($enhanceLabel);
        downDiv.append(dur);
      }
    });
    var ul_ = $("<ul></ul>");
    for (var i = 0; i < project.description[lan].length; ++i) {
      var _lst = $("<li></li>")
        .addClass("bullet-points")
        .text(project.description[lan][i])
        .css("text-align", "left");
      ul_.append(_lst);
    }
    downDiv.append(ul_);
    parentRow.append(downDiv);
  });
}

fetch("json/projects.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    projects = data.projects;
    projects.forEach(function(project) {
      var vidRef = $("<p></p>")
        .attr("id", "reference")
        .text(project.video.credit);
      var vidCredit = $("<div></div>").addClass("video-credit");
      vidCredit.append(vidRef);

      var vidSource = $("<source></source>")
        .attr("src", project.video.src)
        .attr("type", "video/mp4");
      var vid = $("<video controls></video>")
        .attr("width", "100%")
        .attr("height", "100%");
      vid.append(vidSource);

      var upDiv = $("<div></div>").addClass("col-sm-7");
      upDiv.append(vid);
      upDiv.append(vidCredit);

      var parentRow = $("<div></div>")
        .addClass("row")
        .attr("id", "project-id-" + project.id);
      parentRow.append(upDiv);
      projectContainer.append(parentRow);
    });
    if (window.location.href.slice(-3) == "kor") renderContext("kr");
    else renderContext();
  })
  .catch(function(error) {
    console.log(error);
  });

$("#lang-setting").on("change", function() {
  projects.forEach(function(project) {
    $("#project-id-" + project.id)
      .children()
      .last()
      .remove();
  });
  if ($(this).is(":checked")) renderContext("kr");
  else renderContext();
});
