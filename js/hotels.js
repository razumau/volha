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
		toByr.eur = 22700;
		toByr.rub = 300;
		toByr.uah = 730;
		toByr.amd = 42;
		toByr.azn = 12500;
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
            var text = $span.data(currency).toString();
            if (text.length >= 5) {
                text = text.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
            }
			$span.text(text);
		}

		if (localStorage) {
			localStorage.setItem('currency', currency);
		}
	};

	$("#buttons").on('click', 'label', function() {
		switchTo($(this).text().trim());
		$("#buttons > label").removeClass('active');
		$(this).addClass('active');
	});

	$.ajax(oerParams)
		.done(setCorrectRates)
		.fail(setDefaultRates)
		.always(convertPrices);

})(jQuery, window.localStorage);


