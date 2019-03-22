console.log(window.location.pathname);
var Routing = {
	el : null,
	history : ['dashboard_menu.html'],
	history_push : function(path) {
		this.history.push(path)
		$('#btn-menu').css('display', 'none');
		$('#btn-backward').css('display', 'block');
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
	load_page : function(path) {
		var el = this.el;
		var self = this;
		var path = path.replace;	
		$.ajax({
	      url: path,
	      type    : 'get',
	      success : function(response){
	        el.html(response);
	        self.load_routing()
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
					self.history_push(target);
					self.load_page(target);
				});

			}
		}
	}
}