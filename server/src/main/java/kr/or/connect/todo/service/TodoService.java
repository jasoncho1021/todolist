package kr.or.connect.todo.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.stereotype.Service;

import kr.or.connect.todo.domain.Todo;

@Service
public class TodoService {
	private ConcurrentMap<Integer, Todo> repo = new ConcurrentHashMap<>();
	private AtomicInteger maxId = new AtomicInteger(0);
	
	public Collection<Todo> findAll() {
		Collection<Todo> results = new ArrayList<>();
		for ( Integer key : repo.keySet() ) {
			results.add(repo.get(key));
		}		
		return results;
		/*
		return Arrays.asList(
				new Todo(99, "repo만들기" , true, "3_3_2018"),
				new Todo(100, "ajax All 만들기" , true, "3_4_2018")				
		);
		*/				
	}
	
	public Todo create(Todo todo) {
		Integer id = maxId.addAndGet(1);
		todo.setId(id);
		//todo.setStatus(true);
		repo.put(id, todo);
		return todo;
	}
	
	public boolean update(Todo todo) {
		Todo old = repo.get(todo.getId());
		todo.setDate(old.getDate());
		todo.setTodo(old.getTodo());
		old = repo.put(todo.getId(), todo);
		return old != null;
	}
	
	public boolean delete(Integer id) {
		Todo old = repo.remove(id);
		return old != null;
	}
}
