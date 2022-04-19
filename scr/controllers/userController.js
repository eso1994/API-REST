import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userValidations from '../services/userValidations.js'

class UserController {

    static registerUser = async (req, res) => {

        let { email, password, confirmPassword } = req.body;

        let users = userValidations(res, email, password, confirmPassword);

        if(!users.valid)
            return;

        let userExists = await User.findOne({ email: email });

        if(userExists)
            return res.status(422).json({ msg: "This e-mail already registered. Please use another one."});

        let salt = await bcrypt.genSalt(12);
        let passwordHash = await bcrypt.hash(password, salt);

        const user = new User({
            email,
            password: passwordHash,
        });

        try {
            await user.save()

            res.status(201).json({ msg: 'User registered successfully'})

        } catch (error) {
            console.log(error)

            res.status(500).json({ msg: 'There was an error on the server. Please try again later'})            
        }
    }

    static loginUser = async (req, res) => {

        let { email, password } = req.body;

        if (!email)
            return res.status(422).json({ msg: 'E-mail is required!' });

        if (!password)
            return res.status(422).json({ msg: 'Password is required!' });

        let user = await User.findOne({ email: email, ativo: true });

        if (!user)
            return res.status(404).json({ msg: "User not found" });

        let checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword)
            return res.status(422).json({ msg: 'Invalid password' });

        try {
            let secret = process.env.SECRET;

            let token = jwt.sign(
                {
                    id: user._id
                },
                secret,
            );

            res.status(200).json({ msg: 'Authentication performed successfully', id: user._id, token: token })

        } catch (error) {
            console.log(error)

            res.status(500).json({ msg: 'There was an error on the server.Please try again later'})
        }
    }

    static listUser = (req, res) => {
        User.find((_, user) => {
            res.status(200).json(user)
        })
    }

    static deleteUser = async (req, res) => {
        let { id } = req.params;

        User.findById(id, (err, user) => {
            if(!err) {
                user.ativo = false;
                User.findByIdAndUpdate(id, user, err => {
                    if(!err){
                        res.status(200).json({ msg: 'User deleted successfully' })
                    } else {
                        res.status(500).json({ msg: 'There was an error on the server. Please try again later.' })
                    }
                })
            } else {
                res.status(404).send(err)
            }
        })
    }
}

export default UserController;