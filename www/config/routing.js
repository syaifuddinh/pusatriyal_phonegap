var Routing = {
	el : null,
	history : ['dashboard_menu.html'],
	history_push : function(path) {
		var x = this.history.indexOf(path);
		if(x == - 1) {
			this.history.push(path);
		}
		else {
			var length = this.history.length;
			x += 1;
			this.history.splice(x, length);
		}
		if(this.history.length == 1) {
			
			$('#btn-menu').css('display', 'block');
			$('#btn-backward').css('display', 'none');
		}
		else {
			
			$('#btn-menu').css('display', 'none');
			$('#btn-backward').css('display', 'block');
		}
	},	
	history_pop : function() {
		this.history.pop();
		if(this.history.length == 1) {
			
			$('#btn-menu').css('display', 'block');
			$('#btn-backward').css('display', 'none');
		} 
	},
	backward : function() {
		this.history_pop();
		var lastrank = this.history.length - 1;
		var target = this.history[lastrank];
		this.load_page(target);
					

	},
	init : function(el) {
		el = $(el);
		this.el = el;
		this.load_page('dashboard_menu.html');
	},
	load_page : function(path, option = {} ) {
		var el = this.el;
		var self = this;
		var path = path.replace(/$\/(.*)/, '$1');
		self.history_push(path);	
		$.ajax({
	      url: path,
	      type    : 'get',
	      success : function(response){
	        el.html(response);
	        self.load_routing();
	        if( option.callback != undefined ) {
	        	option.callback( option.dom );
	        }
	      },
	      error: function(jqXHR, exception) {
	        if (jqXHR.status === 0) {
	            alert('Not connect.\n Verify Network.');
	        } else if (jqXHR.status == 404) {
	            alert('Requested page not found. [404]');
	        } else if (jqXHR.status == 500) {
	            alert('Internal Server Error [500].');
	        } else if (exception === 'parsererror') {
	            alert('Requested JSON parse failed.');
	        } else if (exception === 'timeout') {
	            alert('Time out error.');
	        } else if (exception === 'abort') {
	            alert('Ajax request aborted.');
	        } else {
	            alert('Uncaught Error.\n' + jqXHR.responseText);
	        }
	      }
	    });
	},
	load_routing : function() {
		var unit;
		var units = $('[pusatriyal-role="routing"]');
		var load_routing = this.load_routing;
		el = this.el;
		var self = this;
		if(units.length > 0) {
			for(x = 0;x < units.length;x++) {
				unit = $( units[x] );
				unit.click(function(){
					var target = $(this).attr('pusatriyal-target');
					var callback = $(this).attr('pusatriyal-callback');
					var dom = this;
					var construct = {
						'dom' : dom,
						'callback' : window[callback],
					};
					
					self.load_page(target, construct);

				});

			}
		}
	}
}

document.addEventListener('backbutton', Routing.backward, false);
document.addEventListener('menubutton', function() {
	$('#btn-menu').trigger('click');
});


