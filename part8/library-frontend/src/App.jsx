import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import AuthorList from "./pages/AuthorList";
import BookList from "./pages/BookList";
import Recommended from "./pages/Recommended";
import NavigationHeader from "./components/NavigationHeader";
import NewBook from "./pages/NewBook";
import Login from "./pages/Login";
import { Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";

const App = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const handleLogout = () => {
    localStorage.removeItem("library-token");
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("library-token", token);
    } else {
      const storedToken = localStorage.getItem("library-token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, [token]);

  return (
    <Container>
      <Stack spacing={1}>
        <NavigationHeader token={token} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/recommended" element={<Recommended />} />
          <Route path="/authors" element={<AuthorList token={token} />} />
          <Route path="/newbook" element={<NewBook />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
        </Routes>
      </Stack>
    </Container>
  );
};

export default App;
