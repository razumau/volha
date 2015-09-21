(function($) {

	//$.ajax();
	//
	
	var $spans = $('[rel~=tooltip]'),
		$span,
		belarusianRubles,
		russianRubles,
		euros;

	for (var i = 0, len = $spans.length; i < len; i++) {
		$span = $spans[i];
		belarusianRubles = parseInt($span.text(), 10);
		$spans[i].attr("title", euros + ' <i class="fa fa-eur"></i><br/>' +
			russianRubles + ' <i class="fa fa-rub"></i>');
	}

})(jQuery);