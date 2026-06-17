import { register} from "../services/auth.service.js";

export async function registerUser(req, res) {
    const { name, email } = req.body;

    try {
        const user = await register({name, email})
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }


}