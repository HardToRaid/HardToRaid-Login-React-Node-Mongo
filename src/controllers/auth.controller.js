import User from '../models/user.model.js'

export const register = async (req, res) => {
  const { email, password, username } = req.body

  try {
    const newUser = new User({
      email,
      username,
      password
    })
    await newUser.save()
    // console.log(newUser)
  } catch (error) {
    console.log(error)
  }

  res.send('registrando')
}
export const login = (req, res) => res.send('login')
