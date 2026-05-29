import { HttpStatus } from "../constant/http.status.js";

export class AuthController
{
    constructor(authService)
    {
        this.authService = authService;
    }

    async register(req, res)
    {
        const { name, email, password } = req.validated.body;
        const { user, token } = await this.authService.register({ name, email, password });
        res.cookie("access_token", token, { httpOnly: true, secure: false });
        res.status(HttpStatus.CREATED).json({ user });
    }

    async login(req, res)
    {
        const { email, password } = req.validated.body;
        const { user, token } = await this.authService.login(email, password);
        res.cookie("access_token", token, { httpOnly: true, secure: false });
        res.status(HttpStatus.OK).json({ user });
    }
}