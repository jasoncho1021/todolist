(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!

})(window);

$(".new_todo").keypress(function (event) {
	if( event.which == 13 ) {
		event.preventDefault();
		
		alert("entered!");
		// post
	}
});

var myurl = "http://localhost:8080/api/todos";

function AllGet (e) {
	
		e.preventDefault();
				 				
		$.ajax({
			url: myurl,
			type: "GET",
			//contentType : 'application/json',
			// jsonp: "callback",
			success: function( response ) {
				var todoList = response;
				
				for( var i = 0; i < todoList.length; i++) {
					todo = todoList[i];
					
					$('.todo-list').append("<li><div class=\"view\">" +
							"<input class=\"toggle\" type=\"checkbox\">" +
							"<label>" + todo.todo + "</label>" +
							"<button class=\"destroy\"></button>" +
							"</div>" +
							"<input class=\"edit\" value=\"Rule the web\">" +
							"</li>");
				};				 						
			},
			error: function(jqXHR, exception) {
				alert(jqXHR.status + ' ' + jqXHR.responseText);
			}	
		});		
		
		return false;
}
