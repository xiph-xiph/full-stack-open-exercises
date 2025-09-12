import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AuthorList from "./pages/AuthorList";
import BookList from "./pages/BookList";
import LibraryHeader from "./components/LibraryHeader";
import NewBook from "./components/NewBook";
import { Container, Stack } from "@mui/material";

const App = () => {
  return (
    <Container>
      <Stack spacing={1}>
        <LibraryHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/authors" element={<AuthorList />} />
        </Routes>
        <NewBook />
      </Stack>
    </Container>
  );
};

export default App;
