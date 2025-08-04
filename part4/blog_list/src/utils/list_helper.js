// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((previous, current) => (previous + current.likes), 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((previous, current) =>
    previous.likes < current.likes
      ? current
      : previous,
  { likes: -1 })
}


export default {
  dummy,
  totalLikes,
  favoriteBlog
}