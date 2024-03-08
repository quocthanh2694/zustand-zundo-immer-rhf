import { create } from "zustand";
import { temporal } from "zundo";
import { immer } from "zustand/middleware/immer";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type State = {
  todos: Todo[];
};

type Actions = {
  addTodo: (text: string) => void;
  toggleTodoCompletion: (id: number) => void;
  removeTodo: (id: number) => void;
};

const initialState: State = {
  todos: [],
};
// slice version: https://docs.pmnd.rs/zustand/guides/typescript#slices-pattern
const useStore = create<State & Actions>()(
  temporal(
    immer((set) => ({
      todos: initialState.todos,
      addTodo: (text: string) =>
        set((draft) => {
          console.log('draft"', text);
          draft.todos.push({ id: Date.now(), text, completed: false });
        }),
      toggleTodoCompletion: (id: number) =>
        set((draft) => {
          const index = draft.todos.findIndex((todo) => todo.id === id);
          if (index !== -1) {
            draft.todos[index].completed = !draft.todos[index].completed;
          }
        }),
      removeTodo: (id: number) =>
        set((state) => {
          state.todos = state.todos.filter((x) => x.id != id);
        }),
    }))
  )
);

export default useStore;
