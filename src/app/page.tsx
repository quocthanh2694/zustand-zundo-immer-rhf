import Image from "next/image";
import styles from "./page.module.css";
import TodoForm from "./components/TodoForm";
import { CompA } from "./components/CompA";

export default function Home() {
  return (
    <main>
      <h1>Todo List with Undo/Redo</h1>
      <h2>Zustand immer zundo reacthookform</h2>
      <TodoForm />
      <CompA />
    </main>
  );
}
