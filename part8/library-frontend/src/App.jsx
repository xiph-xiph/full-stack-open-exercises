import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AuthorList from "./pages/AuthorList";
import BookList from "./pages/BookList";
import NavigationHeader from "./components/NavigationHeader";
import NewBook from "./pages/NewBook";
import Login from "./pages/Login";
import { Container, Stack } from "@mui/material";
import { useState } from "react";

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <Container>
      <Stack spacing={1}>
        <NavigationHeader token={token} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/authors" element={<AuthorList />} />
          <Route path="/newbook" element={<NewBook />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Stack>
    </Container>
  );
};

export default App;
