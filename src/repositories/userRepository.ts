import { User, IUser } from '../models/User';

export const findUserByEmail = (email: string) => {
    return User.findOne({ email });
};

export const findUserById = (id: string) => {
    return User.findById(id);
};

export const createUser = (userData: Partial<IUser>) => {
    const user = new User(userData);
    return user.save();
};
