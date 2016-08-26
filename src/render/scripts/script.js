
function setContentPosition() {
  // Set height of content area for spyscroll to work
  $("#content").height($(window).height() - $("#topbar").height());

  // Ajust margin-top to dynamically adapt to topbar size (cannot be done in CSS dynamically)
  $("body").css("margin-top", $("#topbar").height());
}

$(function() {
  setContentPosition();

  $("table").addClass("table");

  $(window).resize(function() {
    setContentPosition();
  });

  /*
   * Spyscroll stuff
   *
   * Start by rendering a spyscroll with all elements (but hidden) to let spyscroll
   * build its index. Then the sub-headers (e.g. links to h3) elements can be removed from
   * the DOM to keep it compact and the whole thing can be shown.
   * The sub-header's display is controlled via CSS when scrolling.
   */
  $('[data-spy="scroll"]').scrollspy({ target: '#spyscroll',
                                       options: {offset: $("#topbar").height()} });
  $('#spyscroll li > ul').css("display", "none");
  $('#spyscroll').css("visibility", "visible");

  $('#spyscroll li a').click(function() {
    $($(this).attr('href'))[0].scrollIntoView();
    location.hash = $(this).attr('href');
    event.preventDefault();
  });

});
