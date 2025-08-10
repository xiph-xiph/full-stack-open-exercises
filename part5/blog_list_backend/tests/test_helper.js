const testBlogList = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }
]

const blogToBeEdited = {
  title: 'Please edit me',
  author: 'Please edit me',
  url: 'Please edit me',
  likes: 0
}

const testUsers = [
  {
    username: 'johndoe',
    name: 'John Doe',
    passwordHash: '$2b$10$abcdefghijklmno1234567890fakeHash1'
  },
  {
    username: 'janesmithx',
    name: 'Jane Smith',
    passwordHash: '$2b$10$abcdefghijklmno1234567890fakeHash2'
  },
  {
    username: 'mikejohnson',
    name: 'Mike Johnson',
    passwordHash: '$2b$10$abcdefghijklmno1234567890fakeHash3'
  },
  {
    username: 'sarahwilson',
    name: 'Sarah Wilson',
    passwordHash: '$2b$10$abcdefghijklmno1234567890fakeHash4'
  },
  {
    username: 'alexbrown',
    name: 'Alex Brown',
    passwordHash: '$2b$10$abcdefghijklmno1234567890fakeHash5'
  },
  {
    username: 'emilydavis',
    name: 'Emily Davis',
    passwordHash: '$2b$10$abcdefghijklmno1234567890fakeHash6'
  }
]

const newTestUser = {
  username: 'gavinhankers1',
  name: 'Gavin Hankers',
  password: 'S3cureP@ssw0rd6!'
}

const newTestUser2 = {
  username: 'janedoe99',
  name: 'Jane Doe',
  password: 'An0ther$ecureP@ss'
}

export default { testBlogList, blogToBeEdited, testUsers, newTestUser, newTestUser2 }