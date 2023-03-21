import $ from "jquery";
$(document).on("click", ".footer-links-wrapper h3", function () {
  if (window.innerWidth <= 768) {
    $(this).next().slideToggle();
    $(this).toggleClass("expanded");
  }
});

$(window).on("resize", function () {
  window.location.reload(false);
});
