import User from '../models/User.js';
import validator from 'email-validator';

export default async function registerController (req, res) {
  res.render('register')
}
export async function PostRegisterController(req, res) {
  console.log(req.body)
  const { firstName, lastName, email, password, password_confirm } = req.body;

  const errors = [];
  try {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      password_confirm.trim() === ""
  ) {
    const errorMessage = "Tous les champs sont obligatoires !"
    res.redirect(`/add?error=${encodeURIComponent(errorMessage)}`)
    return;
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.render('register', { error: 'Cet utilisateur existe déjà.' });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    await newUser.save();

    res.redirect('/login');
  }
  catch (err) {
    res.status(500).send(`Erreur lors de la création du user : ${err.message}`);
  }
} catch (err){
  res.status(500).send(`Erreur lors de la création du user : ${err.message}`);

}}