(function($) {

	var byrToUsd, eurToByr, rubToByr, uahToByr;

	var oerParams = {
		url: 'https://openexchangerates.org/api/latest.json?app_id=ea8fd77aebdd496f9a815471963bd01a',
		type: 'GET'
	};

	var setCorrectRates = function(data) {
		var rates = data.rates;
		eurToByr = rates.BYR / rates.EUR;
		rubToByr = rates.BYR / rates.RUB;
		uahToByr = rates.BYR / rates.UAH;
	}

	var setDefaultRates = function() {
		eurToByr = 20000;
		rubToByr = 270;
		uahToByr = 850;
	}

	var convertPrices = function() {
		var $spans = $('span'),
			$span,
			price,
			russianRubles,
			euros,
			hryvnias;

		for (var i = 0, len = $spans.length; i < len; i++) {
			$span = $($spans[i]);
			price = parseInt($span.text().replace(' ', ''), 10);

			euros = (price / eurToByr).toFixed(1);
			russianRubles = (price / rubToByr).toFixed(0);
			hryvnias = (price / uahToByr).toFixed(0);

			$span.data('byr', price)
				.data('eur', euros)
				.data('rub', russianRubles)
				.data('uah', hryvnias);


			//$span.text(euros);
		}
	};

	var switchTo = function(currency) {
		var $spans = $('span'),
			$span;

		for (var i = 0, len = $spans.length; i < len; i++) {
			$span = $($spans[i]);

			$span.text($span.data(currency));

		} 
	}

	$("#buttons").on('click', 'label', function() {
		switchTo($(this).text().trim());
	})

	$.ajax(oerParams)
		.done(setCorrectRates)
		.fail(setDefaultRates)
		.always(convertPrices);

})(jQuery);


