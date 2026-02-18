package com.praveen.todo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.praveen.todo.model.todo;
import com.praveen.todo.repository.TodoRepository;

@Service
public class TodoService {

    private final TodoRepository repository;

    public TodoService(TodoRepository repository) {
        this.repository = repository;
    }

    public todo create(todo todo) {
        return repository.save(todo);
    }

    public List<todo> getAll(Boolean completed) {
        if (completed != null) {
            return repository.findByCompleted(completed);
        }
        return repository.findAll();
    }

    public todo update(Long id, todo updated) {
        todo todo = repository.findById(id).orElseThrow();
        todo.setTitle(updated.getTitle());
        todo.setDescription(updated.getDescription());
        todo.setCompleted(updated.isCompleted());
        return repository.save(todo);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}