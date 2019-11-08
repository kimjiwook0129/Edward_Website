var schoolContainer = $("#school-container");
var schools;
const category = ["duration","region","program"];

function renderContext(num = 0) {
    schools.forEach(function (school) {
        var parentRow = $("#school-id-" + school.id);
        var downDiv = $("<div></div>").addClass("col-sm-8");
        var lan = num == 0 ? "en" : "kr";
        var title = $("<h4></h4>").addClass("schoolTitle").text(school.name[lan]),
            label,
            dur;
            
        downDiv.append(title);
        
        category.forEach(function(cate) {
            if (school[cate][lan] != "") {
                switch (cate) {
                    case "duration":
                        label = num == 0 ? "Duration: " : "기간: ";
                        break;
                    case "region":
                        label = num == 0 ? "Region: " : "지역: ";
                        break;
                    default: // "program"
                        label = num == 0 ? "Program: " : "전공: ";
                }
                dur = $("<p></p>").addClass("exp").text(school[cate][lan]);
                $enhanceLabel = $("<b></b>").text(label);
                dur.prepend($enhanceLabel);
                downDiv.append(dur);
            }
        });
        dur = $("<ul></ul>");
        for (var i = 0; i < school.description[lan].length; ++i) {
            var _lst = $("<li></li>").addClass("bullet-points")
                .text(school.description[lan][i]).css("text-align", "left");
            dur.append(_lst);
        }
        downDiv.append(dur);
        parentRow.append(downDiv);
    });
}

function setImageInterval(imgContents, eachSchool) {
    var timeInterval = 8000; // 8s
    var imgItself = imgContents.find(".image-container > .image-itself");
    var imgCred = imgContents.find(".image-credit > #reference");
    window.setInterval(function() {
        var index = eachSchool.images.map(function(i) { return i.src; }).indexOf(imgItself.attr("src"));
        var len = eachSchool.images.length;
        if (len == index + 1) index = -1;
        imgItself.fadeOut(function() {
            $(this).attr("src", eachSchool.images[index + 1].src).fadeIn();
        });
        imgCred.fadeOut(function() {
            $(this).text(eachSchool.images[index + 1].credit).fadeIn();
        });
    }, timeInterval);
}

fetch('json/education.json').then((response) => {
    return response.json();
}).then((data) => {
    schools = data.schools;
    schools.forEach(function (school) {
        var imgRef = $("<p></p>").attr("id", "reference").text(school.images[0].credit);
        var imgCredit = $("<div></div>").addClass("image-credit");
        imgCredit.append(imgRef);
        
        var img = $("<img>").addClass("image-itself").attr("src",school.images[0].src).css("width","100%").attr("alt",school.name.en);
        var imgContainer = $("<div></div>").addClass("image-container");
        imgContainer.append(img);

        var upDiv = $("<div></div>").addClass("col-sm-4");
        upDiv.append(imgContainer);
        upDiv.append(imgCredit);

        setImageInterval(upDiv, school);
        
        var parentRow = $("<div></div>").addClass("row").attr("id", "school-id-" + school.id);
        parentRow.append(upDiv);
        schoolContainer.append(parentRow);
    });
    if (window.location.href.slice(-3) == "kor") {
        renderContext(1);
    } else {
        renderContext();
    }
}).catch(function (error) {
    console.log(error);
});

$("#lang-setting").on('change', function() {
    schools.forEach(function(school) {
        $("#school-id-" + school.id).children().last().remove();
    });
    if ($(this).is(':checked')) { // Korean
        renderContext(1);
    } else { // English
        renderContext();
    }
});