$ ->
	$("#guide").height($(window).height() - 50)
	$("table").addClass("table")
	$('#spyscroll li a').click ->
		event.preventDefault()
		$($(this).attr('href'))[0].scrollIntoView()
		$('#guide').scrollTop($('#guide').scrollTop())
	$(window).resize( ->
		$("#guide").height($(window).height() - 50)
	)
	# $('#spyscroll').on 'activate.bs.scrollspy', () ->
	# 	$('[data-spy="scroll"]').each () ->
	# 		$(this).scrollspy('refresh')
	setTimeout -> 
		$('#spyscroll').css("visibility", "visible")
		$('#spyscroll li > ul').css("display", "none")
	, 200