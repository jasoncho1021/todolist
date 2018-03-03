package kr.or.connect.todo.domain;

public class Todo {
	private Integer id;
	private String todo;
	private Boolean status; // true == active, false == completed
	private String date;
	
	public Todo() {
	}
	
	public Todo(Boolean status) {
		this.status = status;
	}
	
	public Todo(String todo, Boolean status,String date) {
		this.todo = todo;
		this.status = status;
		this.date = date;
	}
	
	public Todo(Integer id, String todo, Boolean status, String date) {
		this.id = id;
		this.todo = todo;
		this.status = status;
		this.date = date;
	}	

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTodo() {
		return todo;
	}

	public void setTodo(String todo) {
		this.todo = todo;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "Todo [id=" + id + ", todo=" + todo + ", status=" + status + ", date=" + date + "]";
	}	
	
}
