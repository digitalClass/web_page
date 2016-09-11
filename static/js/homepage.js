$(document).ready(function(){
		// set up hover panels
		// although this can be done without JavaScript, we've attached these events
		// because it causes the hover to be triggered when the element is tapped on a touch device
		$('.hover').hover(function(){
			$(this).addClass('flip');
		},function(){
			$(this).removeClass('flip');
		});
		$('.panel').click(function(){
				var course_id = $(this)[0].id;
				location.href = "/course/"+course_id.toString();
		});
	});
