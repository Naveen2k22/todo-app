import Todo from "../components/todo";
import { TodoContextProvider } from "../context/todoContext";

const Home = () => {
  return (
    <section className="mx-auto max-w-screen-xl p-4">
      <TodoContextProvider>
        <Todo />
      </TodoContextProvider>
    </section>
  );
};

export default Home;
