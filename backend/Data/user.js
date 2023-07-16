import bcrypt from "bcryptjs"

const users = [
  {
    firstName:"Admin",
    lastName:"Admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync('123abc123', 10),
    isAdmin: true,
  },
]

export default users