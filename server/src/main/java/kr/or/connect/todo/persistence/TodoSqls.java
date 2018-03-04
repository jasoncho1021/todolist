package kr.or.connect.todo.persistence;

public class TodoSqls {
	static final String DELETE_BY_ID =
			"DELETE FROM todo WHERE id= :id";
	static final String UPDATE =
			"UPDATE todo SET completed = :completed WHERE id = :id";
	static final String SELECT_ALL =
			"SELECT id, todo, completed, date FROM todo ORDER BY date asc;";
	static final String SELECT_BY_STATUS =
			"SELECT id, todo, completed, date FROM todo WHERE completed = :completed ORDER BY date asc";
}
