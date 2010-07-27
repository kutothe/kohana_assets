
(function($){
	$.fn.timepicker = function(options) {
		
		var allTimes = [];
		
		var defaults = {
			startHour: 0,
			startMin: 0,
			endHour: 24,
			endMin: 0,
			minuteIncrement: 15,
			scrollHeight: 224
		};
		
		var options = $.extend(defaults, options);
		
		for ( var i = options.startHour; i <= options.endHour; i++ ) {
			var aHour = '';
			var cMin = 0;
			var aAMPM = ( i < 12 ) ? 'am' : 'pm';
			while ( cMin < 60 ) {
				if ( ( i !== options.startHour || (i == options.startHour && cMin >= options.startMin) ) &&
						( i !== options.endHour || (i == options.endHour && cMin < options.endMin) ) ) {
					aHour = i;
					if ( aHour > 12 || aHour == 0 ) { aHour = Math.abs(aHour-12); }
					aMin = cMin;
					if ( aMin < 10 ) { aMin = '0' + aMin; }
					allTimes.push(aHour + ':' + aMin + aAMPM);
				}
				cMin += options.minuteIncrement;
			}
		}
		
		return this.each(function() {
			var obj = $(this);
			obj.autocomplete(allTimes, { minChars:0, max:allTimes.length, matchContains:1, cacheLength:10, selectOnly:1, scrollHeight:options.scrollHeight});
			obj.result(function() {obj.trigger("change");});
		});
		
	};
})(jQuery);
