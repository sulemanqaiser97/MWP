import { Column, Model, Table, PrimaryKey, AutoIncrement, AllowNull, HasOne, ForeignKey, BelongsTo, Length } from "sequelize-typescript";

@Table({
    timestamps: true
})
export class profile extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column
    profile_id: number;

    @AllowNull(false)
    @Length({ msg: "Profile Name must be between 6 to 30 characters.", min: 6, max: 30 })
    @Column
    profile_name: string;

    @AllowNull(false)
    @Column
    first_name: string;

    @AllowNull(false)
    @Column
    last_name: string;

    @AllowNull(false)
    @Column
    current_level: number;

}