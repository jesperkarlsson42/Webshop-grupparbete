$(function () {
  $(".hamburger-btn").on(function () {
    $(this).toggleClass("active");
    $(".menu").toggleClass("active");
  });
});
