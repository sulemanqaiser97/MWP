import { Column, Model, Table, PrimaryKey, AutoIncrement, AllowNull, HasOne, ForeignKey, BelongsTo, Length } from "sequelize-typescript";
import { User } from "src/modules/auth/model/user.model";
import { profile } from "src/modules/profile/model/profile.model";

@Table({
    timestamps: true
})
export class user_profile_mapping extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column
    mapping_id: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column
    user_id: number;

    @ForeignKey(() => profile)
    @AllowNull(false)
    @Column
    profile_id: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => profile)
    profile: profile;
}