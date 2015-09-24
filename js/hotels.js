(function($) {

	var byrToUsd, eurToByr, rubToByr;



	$.ajax({
		url: 'https://1openexchangerates.org/api/latest.json?app_id=ea8fd77aebdd496f9a815471963bd01a',
		type: 'GET'
	})
	.done(function(data) {
		var rates = data.rates;
		eurToByr = rates.BYR / rates.EUR;
		rubToByr = rates.BYR / rates.RUB;
	})
	.fail(function() {
		eurToByr = 20000;
		rubToByr = 270;
	})
	.always(function() {
		var $spans = $('span'),
			$span,
			price,
			russianRubles,
			euros;

		for (var i = 0, len = $spans.length; i < len; i++) {
			$span = $($spans[i]);
			price = parseInt($span.text().replace(' ', ''), 10);

			euros = (price / eurToByr).toFixed(1);
			russianRubles = (price / rubToByr).toFixed(0);

			$span.data('byr', price)
				.data('eur', euros)
				.data('rub', russianRubles)


			$span.text(euros);

			/*$span.attr("title", euros + ' <i class="fa fa-eur"></i><br/>' +
				russianRubles + ' <i class="fa fa-rub"></i>');*/
		}
	});

})(jQuery);