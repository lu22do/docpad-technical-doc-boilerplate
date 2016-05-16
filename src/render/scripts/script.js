$(function() {
  $("#guide").height($(window).height() - 50);

  $("table").addClass("table");

  $('#spyscroll li a').click(function() {
    event.preventDefault();
    $($(this).attr('href'))[0].scrollIntoView();
    return $('#guide').scrollTop($('#guide').scrollTop());
  });

  $(window).resize(function() {
    return $("#guide").height($(window).height() - 50);
  });

  return setTimeout(function() {
    $('#spyscroll').css("visibility", "visible");
    return $('#spyscroll li > ul').css("display", "none");
  }, 200);
});