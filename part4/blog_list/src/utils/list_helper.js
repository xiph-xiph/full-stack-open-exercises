// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((previous, current) => (previous + current.likes), 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((previous, current) => (
    previous.likes < current.likes
      ? current
      : previous
  ), { likes: -1 })
}

const mostBlogs = (blogs) => {
  const authorCounts = {}
  blogs.forEach((blog) => {
    if (blog.author in authorCounts) {
      authorCounts[blog.author] += 1
    } else {
      authorCounts[blog.author] = 1
    }
  })

  const topAuthor = Object.entries(authorCounts)
    .reduce((previous, current) => (
      previous[1] < current[1]
        ? current
        : previous
    ), ['john', 0])

  return {
    author: topAuthor[0],
    blogs: topAuthor[1]
  }
}

export default {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}