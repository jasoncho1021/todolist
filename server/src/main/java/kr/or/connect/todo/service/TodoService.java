package kr.or.connect.todo.service;

import java.awt.print.Book;
import java.util.Arrays;
import java.util.Collection;

import org.springframework.stereotype.Service;

import kr.or.connect.todo.domain.Todo;

@Service
public class TodoService {
	
	public Collection<Todo> findAll() {
		return Arrays.asList(
				new Todo(1, "repo만들기" , true, "3_3_2018"),
				new Todo(2, "ajax All 만들기" , true, "3_4_2018")				
		);				
	}
}
