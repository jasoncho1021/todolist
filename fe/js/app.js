var myurl = "http://localhost:8080/api/todos";
var todo_count;

(function (window) {
	'use strict';
	//All GET
	$('#allId').trigger('click');
	// Your starting point. Enjoy the ride!
})(window);

// COMPLETED CHECKBOX TOGGLE
$('.todo-list').on('click', '.toggle', function() {
	$(this).parents('li').toggleClass('completed');
	parents_class = $(this).parents('li').attr('class');
	//todo_count = parseInt($('.todo-count strong').text());
	console.log(parents_class);
	if(parents_class == 'completed') {
		ChangeTodoStatus($(this).attr('value'), false);
		--todo_count;
	}
	else {
		ChangeTodoStatus($(this).attr('value'), true);
		++todo_count
	}
	$('.todo-count strong').text( todo_count );
});

function ChangeTodoStatus (id, status) {
	
	var data = { 
			"status": status,
	};
	
	$.ajax({
		url: myurl + "/" + id,
		type: "PUT",
		contentType : 'application/json',
		data: JSON.stringify(data),
		// jsonp: "callback",
		success: function( response ) {
			console.log("update success!");
		},
		error: function(jqXHR, exception) {
			alert(jqXHR.status + ' ' + jqXHR.responseText);
		}	
	});		
}

//POST
$(".new-todo").keypress(function (event) {
	if( event.which == 13 ) {
		event.preventDefault();
		CreateTodo();
	}		
	console.log("다른 키가 눌렸니?");
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
			"status": true,
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
								
				$('.todo-list').prepend("<li><div class=\"view\">" +
						"<input class=\"toggle\" type=\"checkbox\" value=\""+ todo.id +"\">" +
						"<label>" + todo.todo + "</label>" +
						"<button class=\"destroy\"></button>" +
						"</div>" +
						"<input class=\"edit\" value=\"Rule the web\">" +
						"</li>");
				
				$('.todo-count strong').text( ++todo_count );
		},
		error: function(jqXHR, exception) {
			alert(jqXHR.status + ' ' + jqXHR.responseText);
		}	
	});		
}

// FILTER 
$('.filters li a').click( function() {
	$('.filters li a').removeClass('selected');
	$(this).addClass('selected');
});	

function AllGet (e) {	
		e.preventDefault();
			
		$.ajax({
			url: myurl,
			type: "GET",
			//contentType : 'application/json',
			// jsonp: "callback",
			success: function( response ) {
				var todoList = response;
				
				todo_count = todoList.length; // 초기화
				if( isNaN(todo_count) )
					todo_count = 0;
				
				$('.todo-list').empty();
				for( var i = 0; i < todoList.length; i++) {
					todo = todoList[i];
					
					var statusText ="";
					var checked ="";
					if( !todo.status ) {
						statusText = " class=\"completed\"";
						checked =" checked";
						todo_count--;
					}
					
					$('.todo-list').prepend("<li"+ statusText + "><div class=\"view\">" +
							"<input class=\"toggle\" type=\"checkbox\" value=\""+ todo.id +"\""+ checked +">" +
							"<label>" + todo.todo + "</label>" +
							"<button class=\"destroy\"></button>" +
							"</div>" +
							"<input class=\"edit\" value=\"Rule the web\">" +
							"</li>");					
				};
								
				$('.todo-count strong').text( todo_count );
			},
			error: function(jqXHR, exception) {
				alert(jqXHR.status + ' ' + jqXHR.responseText);
			}	
		});		
		
		return false;
}


function ActiveGet (e) {
	e.preventDefault();
			
	$.ajax({
		url: myurl + "/" + true,
		type: "GET",
		//contentType : 'application/json',
		// jsonp: "callback",
		success: function( response ) {
			var todoList = response;
			
			todo_count = todoList.length; // 초기화
			if( isNaN(todo_count) )
				todo_count = 0;
			
			$('.todo-list').empty();
			for( var i = 0; i < todoList.length; i++) {
				todo = todoList[i];
					
				$('.todo-list').prepend("<li><div class=\"view\">" +
						"<input class=\"toggle\" type=\"checkbox\" value=\""+ todo.id +"\">" +
						"<label>" + todo.todo + "</label>" +
						"<button class=\"destroy\"></button>" +
						"</div>" +
						"<input class=\"edit\" value=\"Rule the web\">" +
						"</li>");					
			};
							
			$('.todo-count strong').text( todo_count );
		},
		error: function(jqXHR, exception) {
			alert(jqXHR.status + ' ' + jqXHR.responseText);
		}	
	});

	return false;
}

function CompletedGet (e) {
	e.preventDefault();
	
	$.ajax({
		url: myurl + "/" + false,
		type: "GET",
		//contentType : 'application/json',
		// jsonp: "callback",
		success: function( response ) {
			var todoList = response;
					
			$('.todo-list').empty();
			for( var i = 0; i < todoList.length; i++) {
				todo = todoList[i];
					
				$('.todo-list').prepend("<li class=\"completed\"><div class=\"view\">" +
						"<input class=\"toggle\" type=\"checkbox\" value=\""+ todo.id +"\" checked>" +
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
