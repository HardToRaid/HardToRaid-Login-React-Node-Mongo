import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import { createAccesToken } from '../libs/jwt.js'

export const register = async (req, res) => {
  const { email, password, username } = req.body

  try {
    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
      email,
      username,
      password: passwordHash
    })
    const userSaved = await newUser.save()
    const token = await createAccesToken({ id: userSaved._id })
    res.cookie('token', token)
    res.json({
      id: userSaved.id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updateAt: userSaved.updatedAt
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export const login = (req, res) => res.send('login')
