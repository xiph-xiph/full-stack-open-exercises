import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../store";
import NewBlogForm from "./NewBlogForm";

describe("NewBlogForm component", () => {
  test("Calls the addBlogToList function passed as prop with the right details when a new blog is created.", async () => {
    vi.mock("../services/blogs", () => ({
      default: {
        addNew: vi.fn().mockResolvedValue({
          title: "Test Title",
          author: "Test Author",
          url: "http://test.com",
        }),
      },
    }));
    const addBlogToList = vi.fn();
    const setNotification = vi.fn();
    const closeForm = vi.fn();

    const { container } = render(
      <Provider store={store}>
        <NewBlogForm
          addBlogToList={addBlogToList}
          closeForm={closeForm}
          setNotification={setNotification}
        />
      </Provider>,
    );
    const titleInput = container.querySelector(".titleInput");
    const authorInput = container.querySelector(".authorInput");
    const urlInput = container.querySelector(".urlInput");
    const submitButton = container.querySelector(".submitButton");

    const user = userEvent.setup();

    await user.type(titleInput, "Test Title");
    await user.type(authorInput, "Test Author");
    await user.type(urlInput, "http://test.com");
    await user.click(submitButton);

    expect(addBlogToList).toHaveBeenCalledWith({
      title: "Test Title",
      author: "Test Author",
      url: "http://test.com",
    });
  });
});
