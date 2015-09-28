'use strict';
(function($, localStorage) {

	var byrToUsd, eurToByr, rubToByr, uahToByr;

	var toByr = {};

	var oerParams = {
		url: 'https://openexchangerates.org/api/latest.json?app_id=ea8fd77aebdd496f9a815471963bd01a',
		type: 'GET'
	};

	var setCorrectRates = function(data) {
		var rates = data.rates;
		toByr.eur = rates.BYR / rates.EUR;
		toByr.rub = rates.BYR / rates.RUB;
		toByr.uah = rates.BYR / rates.UAH;
		toByr.amd = rates.BYR / rates.AMD;
		toByr.azn = rates.BYR / rates.AZN;
	};

	var setDefaultRates = function() {
		toByr.eur = 20000;
		toByr.rub = 270;
		toByr.uah = 850;
		toByr.amd = 40;
		toByr.azn = 17000;
	};

	var convertPrices = function() {
		var $spans = $('span'),
			$span,
			price,
			russianRubles,
			euros,
			hryvnias,
			drams,
			manats;

		for (var i = 0, len = $spans.length; i < len; i++) {
			$span = $($spans[i]);
			price = parseInt($span.text().replace(' ', ''), 10);

			euros = (price / toByr.eur).toFixed(1);
			russianRubles = (price / toByr.rub).toFixed(0);
			hryvnias = (price / toByr.uah).toFixed(0);
			drams = (price / toByr.amd).toFixed(0);
			manats = (price / toByr.azn).toFixed(1);

			$span.data('byr', price)
				.data('eur', euros)
				.data('rub', russianRubles)
				.data('uah', hryvnias)
				.data('amd', drams)
				.data('azn', manats);

		}

		if (localStorage) {
			var currency = localStorage.getItem('currency');
			if (currency !== 'byr') {
				$('#' + currency).trigger('click');
			}
		}
	};

	var switchTo = function(currency) {
		var $spans = $('span'),
			$span;

		for (var i = 0, len = $spans.length; i < len; i++) {
			$span = $($spans[i]);

			$span.text($span.data(currency));

		} 

		if (localStorage) {
			localStorage.setItem('currency', currency);
		}
	};

	$("#buttons").on('click', 'label', function() {
		switchTo($(this).text().trim());
	});

	$.ajax(oerParams)
		.done(setCorrectRates)
		.fail(setDefaultRates)
		.always(convertPrices);

})(jQuery, window.localStorage);


