var num = 2;
const default_credit = "Map data © ";
window.setInterval(function() {
    var src_tutor = "./images/companies/tutor_" + num.toString() + ".jpg",
        src_cbg = "./images/companies/cbg_" + num.toString() + ".jpg",
        src_sheridan = "./images/companies/sheridan_" + num.toString() + ".jpg";
    
    $("#tutor-image").fadeOut(function() {
        $(this).attr("src", src_tutor).fadeIn();
    });

    $("#reference-tutor").fadeOut(function() {
        var p = "Photo by © ",
            q = " on Unsplash";
        if (num == 2) $(this).text(p + "John Moeses Bauan" + q).fadeIn(); 
        else $(this).text(p + "Oscar Nord" + q).fadeIn(); 
    });

    $("#cbg-image").fadeOut(function() {
        $(this).attr("src", src_cbg).fadeIn();
    });

    $("#sheridan-image").fadeOut(function() {
        $(this).attr("src", src_sheridan).fadeIn();
    });

    $("#reference-sheridan").fadeOut(function() {
        var p = " Google | Sheridan College";
        if (num == 2) {
            $(this).text(default_credit.concat("2016" + p)).fadeIn();
        } else {
            $(this).text(default_credit.concat("2012" + p)).fadeIn();
        }
    });
    num++;
    if (num == 3) num = 1;
}, 8000);