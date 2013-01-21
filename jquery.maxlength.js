/*
 * jQuery Maxlength
 * http://pioul.fr/jquery-maxlength
 *
 * Copyright 2013, Philippe Masset
 * Dual licensed under the MIT or GPL Version 2 licenses
 */
(function($){
	$.fn.maxlength = function(options){
		var t = $(this);
		t.each(function(){
			options = $.extend(
				{},
				{
					counterContainer: false,
					text: '%left characters left' // %length %maxlength %left
				},
				options
			);
			var t = $(this),
				data = {
					options: options,
					field: t,
					counter: $('<div class="maxlength"></div>'),
					maxLength: parseInt(t.attr("maxlength"), 10),
					lastLength: null,
					updateCounter: function(){
						var length = this.field.val().length,
							text = this.options.text.replace(/\B%(length|maxlength|left)\b/g, $.proxy(function(match, p){
								return (p == 'length')? length : (p == 'maxlength')? this.maxLength : (this.maxLength - length);
							}, this));
						this.counter.html(text);
						if(length != this.lastLength){
							this.updateLength(length);
						}
					},
					updateLength: function(length){
						this.field.trigger("update.maxlength", [{
							element: this.field,
							lastLength: this.lastLength,
							length: length,
							maxLength: this.maxLength,
							left: this.maxLength - length
						}]);
						this.lastLength = length;
					}
				};
			if(data.maxLength){
				data.field
					.data("maxlength", data)
					.bind({
						"keyup change": function(e){
							$(this).data("maxlength").updateCounter();
						},
						"cut paste drop": function(e){
							setTimeout($.proxy(function(){
								$(this).data("maxlength").updateCounter();
							}, this), 1);
						}
					});
				if(options.counterContainer){
					options.counterContainer.append(data.counter);
				} else {
					data.field.after(data.counter);
				}
				data.updateCounter();
			}
		});
		return t;
	};
})(jQuery);