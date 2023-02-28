import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Heading } from "./components/Heading";
import { TodoCard } from "./components/TodoCard";
import { AddNewTodo } from "./components/AddNewTodo";
import { TodoForm } from "./components/TodoForm";
import { useModal } from "./hooks/useModal";
import { useList } from "./hooks/useList";

function App() {
  const { list, reloadData } = useList();

  const { openModal, open, close } = useModal();

  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="sm">
        <Heading />
        <AddNewTodo onOpen={open} onClose={close} isOpen={openModal}>
          <TodoForm onSubmit={reloadData} onClose={close} />
        </AddNewTodo>

        {list.map((item) => {
          return (
            <TodoCard
              key={item.title}
              title={item.title}
              description={item.description}
              id={item._id}
              onDetele={reloadData}
            />
          );
        })}
      </Container>
    </div>
  );
}

export default App;
