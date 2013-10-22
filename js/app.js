/* --------------- some logging --------------- */
	// log if debug is on
	var debug = new Boolean(true);
	logger("Debug is " + debug.valueOf());
	function logger(msg){
		if(debug==true){
			log(msg);
		}
	}
 	logger('app.js loaded');

/* --------------- loader functions --------------- */

function show_loaded_page(){
    $('html, body').animate({scrollTop:0}, 0, function(){
        $('#main').fadeIn('fast');
    });
}
function load_page(page){
    $('#main').fadeOut('fast', function() {
        $('#main').load( page + '.htm', {limit: 25},  function(responseText, textStatus, req) {
	        if (textStatus == "error") {
	          logger('loading error page');
	          load_page('error');
	        } else {
	            show_loaded_page();
	        }
        });
    });
}
/* --------------- app States --------------- */
    var appState = function(state,msg){
    	if(state==undefined){state="home"};
    	logger(state);
		load_page(state);
    };

/* --------------- Sammy routes --------------- */
    (function($) {
      var app = $.sammy(function() {
        this.get('/', function() {
            appState();
        });
        this.get('#/', function() {
            appState();
        });
        this.get('#/:page', function() {
            appState(this.params['page']);
        });
      });
      $(function() {
        app.run()
      });
    })(jQuery);
