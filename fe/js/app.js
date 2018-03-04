var myurl = "http://localhost:8080/api/todos";
var todo_count;

(function (window) {
	'use strict';
	// All GET
	$('#allId').trigger('click');
	// Your starting point. Enjoy the ride!
})(window);

// COMPLETED CHECKBOX TOGGLE
$('.todo-list').on('click', '.toggle', function() {
	$(this).parents('li').toggleClass('completed');
	parent_ls_class = $(this).parents('li').attr('class');
	//todo_count = parseInt($('.todo-count strong').text());
	console.log(parent_ls_class);
	if(parent_ls_class == 'completed') {
		ChangeTodoStatus($(this).attr('value'), 0);
		--todo_count;
	}
	else {
		ChangeTodoStatus($(this).attr('value'), 1);
		++todo_count
	}
	$('.todo-count strong').text( todo_count );
});

/*
 * PutPost( myurl, put, data, callbackA)
 * PutPost( myurl, post, data, callbackB)
 * 
 */

function ChangeTodoStatus (id, status) {
	
	var data = { 
			"completed": status,
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
 
/*
 * 
 * var DELETE = {
 * 	delete: function() {
 * 			ajax DELETE
 * 		return ;
 * 	}
 * }
 * 
 * DELETE(myurl+id); // this를 넘길 수 있나??
 * 
 */
// CLEAR COMPLETED
$('.clear-completed').click(function() {
	$('.todo-list li').each(function( index ) {
		if( $(this).attr('class') == 'completed') {
			var id = $(this).find('.toggle').attr('value');
			var element = this;
						
			$.ajax({
				url: myurl + "/" + id,
				type: "DELETE",
				success: function( response ) {
					console.log("delete success!");
					$(element).remove();					
				},
				error: function(jqXHR, exception) {
					alert(jqXHR.status + ' ' + jqXHR.responseText);
				}	
			})
		}	
	});
});

// DELETE
$('.todo-list').on('click', '.destroy', function() {
	
	var id = $(this).siblings('.toggle').attr('value');
	var parent_ls_class = $(this).parents('li').attr('class');
	var element = this;
	
	$.ajax({
		url: myurl + "/" + id,
		type: "DELETE",
		success: function( response ) {
			console.log("delete success!");
			$(element).parents('li').remove();
			if(parent_ls_class != 'completed') {
				$('.todo-count strong').text( --todo_count );	
			}
		},
		error: function(jqXHR, exception) {
			alert(jqXHR.status + ' ' + jqXHR.responseText);
		}	
	})
});

// CREATE
$(".new-todo").keypress(function (event) {
	if( event.which == 13 ) {
		event.preventDefault();
		if ( $.trim( $(this).val() ) != "" ) {
			CreateTodo();	
		}
		$(this).val('');
	}	
});

function CreateTodo () {
	var data = { 
			"todo": $('.new-todo').val(),
			"completed": 1,
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

// FILTER SELECTED EFFECT
$('.filters li a').click( function() {
	$('.filters li a').removeClass('selected');
	$(this).addClass('selected');
});	

/*
 * function AllGet(e) {
 * 		e.preventDefault();
 * 		Get(1, get, myurl);
 * }
 * 
 * function ActiveGet(e) {
 * 		e.preventDefault();
 * 		Get(2, get, myurl + true);
 * }
 * 
 * function CompletedGet(e) {
 * 		e.preventDefault();
 * 		Get(3, get, myurl + false);
 * }
 * 
 */

// ALL GET
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
					if( todo.completed == 0 ) {
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

// ACTIVE GET
function ActiveGet (e) {
	e.preventDefault();
			
	$.ajax({
		url: myurl + "/" + 1,
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

// COMPLETED GET
function CompletedGet (e) {
	e.preventDefault();
	
	$.ajax({
		url: myurl + "/" + 0,
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
