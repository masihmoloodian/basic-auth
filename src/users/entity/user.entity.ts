import { hash } from 'bcrypt'
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'


import { ParentEntity } from '../../shared/base/entity.base'

@Entity('users')
export class UserEntity extends ParentEntity {
    constructor(user?: Partial<UserEntity>) {
        super()
        this.setArgumentToThisObject(user)
    }

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    user_name?: string

    @Column()
    country?: string

    @Column()
    age: number

    @Column()
    password?: string

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await hash(this.password, process.env.SALT_HASH)
        }
    }
    clean(): any {
        const result = this
        delete result.deleted_at
        delete result.updated_at
        delete result.created_at
        delete result.password
        return result
    }
}
