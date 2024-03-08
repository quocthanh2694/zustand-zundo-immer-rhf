"use client";

import useStore from "@/store";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoForm = () => {
  const { todos, addTodo, removeTodo, toggleTodoCompletion } = useStore(
    (state) => state
  );
  const { undo, redo } = useStore.temporal.getState();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ text: string; length: string }>();

  useEffect(() => {
    reset({ length: todos.length?.toString() });
  }, [todos]);

  const onSubmit = (data: { text: string }) => {
    console.log("data", data);
    addTodo(data.text + todos.length);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button type="button" onClick={() => undo()}>
        undo
      </button>
      <button type="button" onClick={() => redo()}>
        redo
      </button>
      <br />
      <input
        type="text"
        {...register("text", { required: true, onChange: (e)=>{console.log('change heelo', e.target.value)} })}
        placeholder="Add Todo"
      />

      {errors.text && <span className="error">Text is required</span>}
      <button type="submit">Add</button>
      <br />

      <label htmlFor="">todo length</label>
      <input
        type="text"
        {...register("length", { required: false })}
        placeholder="Todo lengths"
      />
      <br />

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => toggleTodoCompletion(todo.id)}
            />
            {todo.completed ? <s>{todo.text}</s> : todo.text}
            <button type="button" onClick={() => removeTodo(todo.id)}>
              x
            </button>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default TodoForm;
