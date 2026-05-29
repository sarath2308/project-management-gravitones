import { HttpStatus } from "../constant/http.status.js";
import { Messages } from "../constant/message.js";
import { AppError } from "../utils/error/app.error.js";
import { comparePassword, hashPassword } from "../utils/password/password.service.js";
import { generateToken } from "../utils/token/token.service.js";

export class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  } 

    async register(userData) { 
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new AppError(Messages.USER_EXISTS, HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await hashPassword(userData.password);
        userData.password = hashedPassword;
        const user = await this.userRepository.create(userData);
        const token = generateToken({ id: user._id, role: user.role });
        const resultUser={
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
        return { user: resultUser, token };
    }  

    async login(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new AppError(Messages.INVALID_CREDENTIALS, HttpStatus.BAD_REQUEST);
        }
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            throw new AppError(Messages.INVALID_CREDENTIALS, HttpStatus.BAD_REQUEST);
        }
        const token = generateToken({ id: user._id, role: user.role });
        const resultUser={
            _id: user._id,
            name: user.name,    
            email: user.email,
            role: user.role
        }
        return { user: resultUser, token };
    }
}