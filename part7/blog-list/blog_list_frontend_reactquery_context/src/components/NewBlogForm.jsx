import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import NotificationContext from "../context/NotificationContext";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const NewBlogForm = ({ closeForm }) => {
  const queryClient = useQueryClient();

  const [_notification, setNotification] = useContext(NotificationContext);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const newBlogMutation = useMutation({
    mutationFn: blogService.addNew,
    onSuccess: (newBlog) => {
      console.log(newBlog);
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      newBlogMutation.mutate({ title, author, url });
      setNotification(`New blog "${title}" by ${author} added.`, false);
      closeForm();
    } catch (error) {
      setNotification(error.response?.data?.error, true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input
            className="titleInput"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div>
          Author:
          <input
            className="authorInput"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>

        <div>
          URL:
          <input
            className="urlInput"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>

        <button type="submit" className="submitButton">
          Create
        </button>
      </form>

      <button onClick={closeForm}>Cancel</button>
    </>
  );
};

NewBlogForm.propTypes = {
  closeForm: PropTypes.func.isRequired,
};

export default NewBlogForm;
