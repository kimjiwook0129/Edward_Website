const div = "<div></div>",
    li = "<li></li>",
    ul = "<ul></ul>",
    button = "<button></button>",
    a = "<a></a>",
    span = "<span></span>",
    p = "<p></p>",
    label = "<label></label>",
    input = "<input>",
    fa = "fa fa-",
    tIcon = " transparent_icon";

// Navbar

$chi = $(div).addClass("container-fluid");
$("#navbar").append($chi);
$par = $chi;
$chi = $(div).addClass("navbar-header");
$par.append($chi);
$par = $chi;
$chi = $(button).attr("type","button").addClass("navbar-toggle").attr("data-toggle","collapse").attr("data-target","#myNavbar").attr("id","collapse-navbar-button");
$par.append($chi);
$par = $chi;

for (var i = 0; i < 3; i++) $par.append($(span).addClass("icon-bar"));

$par = $(".navbar-header");
$chi = $(a).text("EDWARD").addClass("navbar-brand").attr("id","edward-logo").attr("href","index.php?lang=eng");
$par.append($chi);

$par = $(".container-fluid");
$chi = $(div).addClass("collapse navbar-collapse").attr("id","myNavbar");
$par.append($chi);

$par = $chi;
$chi = $(ul).addClass("nav navbar-nav navbar-right");
$par.append($chi);

$par = $chi;
$chi = $(li).addClass("active");
$par.append($chi);

$par = $chi;
$chi = $(a).text("Home").attr("href","index.php?lang=eng").attr("id","home-button");
$par.append($chi);

$par = $par.parent();
$chi = $(li).addClass("dropdown");
$par.append($chi);

$par = $chi;
$chi = $(a).text("Backgrounds").addClass("dropdown-toggle").attr("data-toggle","dropdown").attr("id","background-button");
$par.append($chi);

$par = $chi;
$chi = $(span).addClass("caret");
$par.append($chi);

$par = $par.parent();
$chi = $(ul).addClass("dropdown-menu");
$par.append($chi);

$par = $chi;

$par.append($(li).append($(a).text("Working Background").attr("href","about-working.html?lang=eng").attr("id","working-button")));
$par.append($(li).append($(a).text("Traveling Background").attr("href","about-traveling.html?lang=eng").attr("id","traveling-button")));
$par.append($(li).append($(a).text("Educational Background").attr("href","about-studying.html?lang=eng").attr("id", "studying-button")));

$par = $(".active").parent();
$chi = $(li).addClass("dropdown");
$par.append($chi);

$par = $chi;
$chi = $(a).text("Résumé").addClass("dropdown-toggle").attr("data-toggle","dropdown").attr("id","résumé-button");
$temp = $(span).addClass("caret");
$chi.append($temp);
$par.append($chi);

$chi = $(ul).addClass("dropdown-menu");
$par.append($chi);

$par = $chi;
/*
$chi = $(li);
$par.append($chi);
$chi.append($(a).text("Full-time Résumé").attr("href","documents/résumé/fulltime.pdf").attr("target","_blank").attr("id","fulltime-button"));

$chi = $(li);
$par.append($chi);
$chi.append($(a).text("Part-time Résumé").attr("href","documents/résumé/fulltime.pdf").attr("target","_blank").attr("id", "parttime-button"));
*/
$chi = $(li);
$par.append($chi);
$chi.append($(a).text("Co-op Résumé").attr("href","documents/résumé/fulltime.pdf").attr("target","_blank").attr("id", "coop-button"));

$par = $(".active").parent();
$chi = $(li).append($(a).text("Projects").attr("href", "projects.html?lang=eng").attr("id","projects-button"));
$par.append($chi);

// Footer

$(".footer-container").append($(div).addClass("top-options"));
$par = $(div).addClass("mid-options");
$(".footer-container").append($par);

$chi = $(p).text("Copyright © 2019 Jiwook Kim").addClass("copyright");
$par.append($chi);

$par = $(div).addClass("bottom-options");
$(".footer-container").append($par);

function mediaLink(parent, host, link) {
    parent.append($(a).addClass(fa + host + tIcon).attr("href",link).attr("target","_blank"));
}
mediaLink($par, "facebook", "https://www.facebook.com/jiwook.kim.7773");
mediaLink($par, "instagram", "https://www.instagram.com/kimjiwook129/");
mediaLink($par, "linkedin", "https://www.linkedin.com/in/jiwook-kim/");
mediaLink($par, "youtube", "https://www.youtube.com/channel/UCRbFENcMzbCHXQEdVBYKfFA?view_as=subscriber");
mediaLink($par, "github", "https://github.com/j533kim");

// language slider
$par = $("body");
$chi = $(label).addClass("switch").css("text-align", "center");
$par.append($chi);

$par = $chi;
$chi = $(input).attr("type", "checkbox").attr("id", "lang-setting");
$par.append($chi);

$chi = $(span).addClass("slider round");
$par.append($chi);

$par = $("body");
$chi = $(div).attr("id","lang-label-container");
$temp = $(p).attr("id","lang-label").text("EN(US)");
$chi.append($temp);
$par.append($chi);

$("#reference_total").text("* All image/icons have been used under each copyright owner's Terms of Service and permitted to be used.");