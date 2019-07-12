var num = 2,
    cbg_num = 2;
const default_credit = "Map data © ";
window.setInterval(function() {
    var source_code_waterloo = "./images/schools/waterloo_" + num.toString() + ".jpg",
        source_code_cbg = "./images/companies/cbg_" + cbg_num.toString() + ".jpg";
    
    $("#tutor-image").fadeOut(function() {
        $(this).attr("src", source_code_waterloo).fadeIn();
    });

    $("#reference-tutor").fadeOut(function() {
        switch(num) {
            // put some random images of Egypt
            case 2:
                $(this).text().fadeIn();              
                break;
            case 3:
                $(this).text(default_credit.concat("2017 Google | Cairo American College")).fadeIn();
                break;
            default:
                $(this).text(default_credit.concat("2016 Google | Yousef Shabana")).fadeIn();
        }
    });

    $("#cbg-image").fadeOut(function() {
        $(this).attr("src", source_code_cbg).fadeIn();
        $(this).attr("alt", "CBG");
    });


    num = num + 1;
    cbg_num++;
    if (cbg_num == 3) cbg_num = 1;
    if (num == 4) num = 1;
}, 8000);