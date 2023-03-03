import * as bcrypt from 'bcrypt';

export const AuthHelper = {
    async encryptPassword(password: string): Promise<string> {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash;
    },

    async matchPassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
