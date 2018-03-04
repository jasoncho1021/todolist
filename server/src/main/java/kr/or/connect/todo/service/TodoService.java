package kr.or.connect.todo.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;

import org.springframework.stereotype.Service;

import kr.or.connect.todo.domain.Todo;
import kr.or.connect.todo.persistence.TodoDao;

@Service
public class TodoService {
	private TodoDao dao;
	
	public TodoService(TodoDao dao) {
		this.dao = dao;
	}
	
	public Collection<Todo> findAll() {			
		return dao.selectAll();
	}
	
	public Collection<Todo> findByStatus(Integer completed) {
		return dao.selectByStatus(completed);
	}
	
	public Todo create(Todo todo) {
		Calendar calendar = Calendar.getInstance();
		Date now = calendar.getTime();
		Timestamp currentTimestamp = new java.sql.Timestamp(now.getTime());
		todo.setDate(currentTimestamp);
		
		Integer id = dao.insert(todo);
		todo.setId(id);
		return todo;
	}
	
	public boolean update(Todo todo) {
		int affected = dao.update(todo);
		return affected == 1;
	}
	
	public boolean delete(Integer id) {
		int affected = dao.deleteById(id);
		return affected == 1;
	}
}
