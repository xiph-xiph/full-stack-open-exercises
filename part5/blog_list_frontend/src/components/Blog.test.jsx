import { render } from '@testing-library/react'
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
})
