import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUsers } from "../reducers/usersReducer";
import usersService from "../services/users";

const UsersList = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  useEffect(() => {
    usersService.getAll().then((users) => {
      dispatch(setUsers(users));
    });
  }, [dispatch]);

  return (
    <>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td><b>blogs created</b></td>
          </tr>
          {users &&
            users.map((user) => (
              <tr key={user.username}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersList;
