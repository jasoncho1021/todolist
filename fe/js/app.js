var myurl = "http://localhost:8080/api/todos";

$(".new-todo").keypress(function (event) {
	if( event.which == 13 ) {
		event.preventDefault();
		// post
		CreateTodo();
	}		
	//alert("다른 키가 눌렸니?");
});

function CreateTodo () {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	today = mm+'/'+dd+'/'+yyyy;
	
	var data = { 
			"todo": $('.new-todo').val(),
			"date": today
	};
	
	$.ajax({
		url: myurl,
		type: "POST",
		contentType : 'application/json',
		data: JSON.stringify(data),
		// jsonp: "callback",
		success: function( response ) {
			var todo = response;
								
				$('.todo-list').append("<li><div class=\"view\">" +
						"<input class=\"toggle\" type=\"checkbox\">" +
						"<label>" + todo.todo + "</label>" +
						"<button class=\"destroy\"></button>" +
						"</div>" +
						"<input class=\"edit\" value=\"Rule the web\">" +
						"</li>");			 						
		},
		error: function(jqXHR, exception) {
			alert(jqXHR.status + ' ' + jqXHR.responseText);
		}	
	});		
	
	return false;
}

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

(function (window) {
	'use strict';

	$('#allId').trigger('click'); // 왜 웹문서 전체가?	
	
	// Your starting point. Enjoy the ride!

})(window);
