import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UserDetails = () => {
  const id = useParams().id;
  const users = useSelector((state) => state.users);

  if (!users) {
    return <p>Loading users... {users}</p>;
  }

  const user = users.find((user) => user.id === id);

  if (!user) {
    return <p>User with id '{id}' could not be found</p>;
  }

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default UserDetails;
