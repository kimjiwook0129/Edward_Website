var fulltimeContainer = $("#fulltime-container"),
  parttimeLongtermContainer = $("#parttime-container > #longterm"),
  parttimeShorttermContainer = $("#parttime-container > #shortterm");

var works_fulltime, works_partLong, works_partShort;

var shortterm_rows_arr = [];

const sections = ["works_fulltime", "works_partLong"];

const category = ["organization", "duration", "region"],
  category_short = ["role", "organization", "duration", "region"];

function renderContext(lan = "en") {
  $("#fullTimeText").text(lan == "en" ? "Full-time Employment" : "풀타임 근무");
  $("#partTimeText").text(
    lan == "en" ? "Part-time Employment" : "파트타임 근무"
  );
  $("#longTermText").text(lan == "en" ? "Long-term" : "장기");
  $("#shortTermText").text(lan == "en" ? "Short-term" : "단기");

  sections.forEach(function(section) {
    (section == "works_fulltime" ? works_fulltime : works_partLong).forEach(
      function(work) {
        var idVal =
          section == "works_fulltime" ? "#fulltime-id-" : "#parttime-long-id-";
        var parentRow = $(idVal + work.id);
        var downDiv = $("<div></div>").addClass("col-sm-8");
        var title = $("<h4></h4>")
          .addClass("positionTitle")
          .text(work.position[lan]);

        downDiv.append(title);

        category.forEach(function(cate) {
          if (work[cate][lan] != "") {
            var label = lan == "en" ? "Region: " : "지역: ";
            switch (cate) {
              case "organization":
                label = lan == "en" ? "Organization: " : "회사/단체: ";
                break;
              case "duration":
                label = lan == "en" ? "Duration: " : "기간: ";
            }
            var dur = $("<p></p>")
              .addClass("exp")
              .text(work[cate][lan]);
            $enhanceLabel = $("<b></b>").text(label);
            dur.prepend($enhanceLabel);
            downDiv.append(dur);
          }
        });
        var ul = $("<ul></ul>");
        for (var i = 0; i < work.description[lan].length; ++i) {
          var _lst = $("<li></li>")
            .addClass("bullet-points")
            .text(work.description[lan][i])
            .css("text-align", "left");
          ul.append(_lst);
        }
        downDiv.append(ul);
        parentRow.append(downDiv);
      }
    );
  });

  works_partShort.forEach(function(work) {
    var row_num = Math.floor((work.id - 1) / 3) + 1;
    if (work.id % 3 == 1) {
      shortterm_rows_arr.push("#row-id-" + row_num);
      var newRow = $("<div></div>")
        .addClass("row")
        .attr("id", "row-id-" + row_num);
      parttimeShorttermContainer.append(newRow);
    }
    var outerContainer = $("<div></div>")
      .addClass("shortterm-container")
      .addClass("col-sm-4")
      .addClass("col-xs-12");
    var innerContainer = $("<div></div>").addClass("inner-shortterm-container");
    category_short.forEach(function(cate) {
      if (work[cate][lan] != "") {
        var label = lan == "en" ? "Region: " : "지역: ";
        switch (cate) {
          case "role":
            label = lan == "en" ? "Role: " : "담당: ";
            break;
          case "organization":
            label = lan == "en" ? "Organization: " : "회사/단체: ";
            break;
          case "duration":
            label = lan == "en" ? "Duration: " : "기간: ";
        }
        var dur = $("<p></p>")
          .addClass("exp")
          .text(work[cate][lan]);
        $enhanceLabel = $("<b></b>").text(label);
        dur.prepend($enhanceLabel);
        innerContainer.append(dur);
      }
    });
    outerContainer.append(innerContainer);
    var parentRow = $("#row-id-" + row_num);
    parentRow.append(outerContainer);
  });
}

function setImageInterval(imgContents, eachWork) {
  var imgItself = imgContents.find(".image-container > .image-itself");
  var imgCred = imgContents.find(".image-credit > #reference");
  if (eachWork.images.length > 1) {
    window.setInterval(function() {
      var index = eachWork.images
        .map(function(i) {
          return i.src;
        })
        .indexOf(imgItself.attr("src"));
      var len = eachWork.images.length;
      if (len == index + 1) index = -1;
      imgItself.fadeOut(function() {
        $(this)
          .attr("src", eachWork.images[index + 1].src)
          .fadeIn();
      });
      imgCred.fadeOut(function() {
        $(this)
          .text(eachWork.images[index + 1].credit)
          .fadeIn();
      });
    }, 8000); // 8s
  }
}

fetch("json/work.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    works_fulltime = data.works.fulltime;
    works_partLong = data.works.parttime.longterm;
    works_partShort = data.works.parttime.shortterm;

    sections.forEach(function(section) {
      (section == "works_fulltime" ? works_fulltime : works_partLong).forEach(
        function(work) {
          var imgRef = $("<p></p>")
            .attr("id", "reference")
            .text(work.images[0].credit);
          var imgCredit = $("<div></div>").addClass("image-credit");
          imgCredit.append(imgRef);

          var img = $("<img>")
            .addClass("image-itself")
            .attr("src", work.images[0].src)
            .css("width", "100%")
            .attr("alt", work.position.en);
          var imgContainer = $("<div></div>").addClass("image-container");
          imgContainer.append(img);

          var upDiv = $("<div></div>").addClass("col-sm-4");
          upDiv.append(imgContainer);
          upDiv.append(imgCredit);

          setImageInterval(upDiv, work);

          var idVal =
            section == "works_fulltime" ? "fulltime-id-" : "parttime-long-id-";
          var parentRow = $("<div></div>")
            .addClass("row")
            .attr("id", idVal + work.id);
          parentRow.append(upDiv);
          if (section == "works_fulltime") fulltimeContainer.append(parentRow);
          else parttimeLongtermContainer.append(parentRow);
        }
      );
    });
    if (window.location.href.slice(-3) == "kor") renderContext("kr");
    else renderContext();
  })
  .catch(function(error) {
    console.log(error);
  });

$("#lang-setting").on("change", function() {
  sections.forEach(function(section) {
    var idVal =
      section == "works_fulltime" ? "#fulltime-id-" : "#parttime-long-id-";
    (section == "works_fulltime" ? works_fulltime : works_partLong).forEach(
      function(work) {
        $(idVal + work.id)
          .children()
          .last()
          .remove();
      }
    );
  });
  while (shortterm_rows_arr.length != 0) $(shortterm_rows_arr.pop()).remove();
  if ($(this).is(":checked")) renderContext("kr");
  else renderContext();
});
