import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../auth/model/user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) { }

    async findAllUsers(): Promise<User[]> {
        return this.userModel.findAll();
    }

    async deleteUserById(userId: string) {
        return this.userModel.destroy({
            where: { user_id: userId }
        });
    }

}
