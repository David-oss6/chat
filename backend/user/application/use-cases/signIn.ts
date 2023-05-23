import { IUserRepository } from "../../domain/repository/IUserRepository"
import { User } from "../../domain/entities/IUser"

export const signIn = async (newUser: User, userRepository: IUserRepository): Promise<User | null> => {
    const nameExists = await userRepository.findUser(newUser)
    if (!nameExists) await userRepository.createUser(newUser)
    return nameExists
}