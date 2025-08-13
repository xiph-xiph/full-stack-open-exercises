import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
describe('Blog component', () => {
  test('Contains title and author when not clicked, but not url, likes, or user', () => {
    const blog = {
      title: 'Test Blog For Testing',
      author: 'Professor Docter Test Kees',
      url: 'www.tralala.com',
      likes: 4,
      user: {
        username: 'starlord982',
        name: 'Heinz Doofenshmirtz'
      }
    }

    const { container } = render(<Blog blog={ blog } />)
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent(/Test Blog For Testing/)
    expect(div).toHaveTextContent(/Professor Docter Test Kees/)
    expect(div).not.toHaveTextContent(/www.tralala.com/)
    expect(div).not.toHaveTextContent(/4/)
    expect(div).not.toHaveTextContent(/starlord982/)
    expect(div).not.toHaveTextContent(/Heinz Doofenshmirtz/)
  })

  test('Contains title, author, url, likes, and user\'s name when clicked', async () => {
    const blog = {
      title: 'Test Blog For Testing',
      author: 'Professor Docter Test Kees',
      url: 'www.tralala.com',
      likes: 4,
      user: {
        username: 'starlord982',
        name: 'Heinz Doofenshmirtz'
      }
    }

    const { container } = render(<Blog blog={ blog } />)
    const div = container.querySelector('.blog')
    const button = container.querySelector('.visButton')

    const user = userEvent.setup()
    await user.click(button)

    expect(div).toHaveTextContent(/Test Blog For Testing/)
    expect(div).toHaveTextContent(/Professor Docter Test Kees/)
    expect(div).toHaveTextContent(/www.tralala.com/)
    expect(div).toHaveTextContent(/likes: 4/)
    expect(div).toHaveTextContent(/Heinz Doofenshmirtz/)
    expect(div).not.toHaveTextContent(/starlord982/)
  })
})
