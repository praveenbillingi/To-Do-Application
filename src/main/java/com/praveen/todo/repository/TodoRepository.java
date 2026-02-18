package com.praveen.todo.repository;

import com.praveen.todo.model.todo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TodoRepository extends JpaRepository<todo, Long> {
    List<todo> findByCompleted(boolean completed);
}