import { Entity, PrimaryKey, Property } from '@mikro-orm/postgresql'
import { randomUUID } from 'crypto'

@Entity()
export class User {
    @PrimaryKey()
    uuid = randomUUID()

    @Property()
    username: string

    @Property()
    email: string

    @Property()
    password: string

    @Property()
    createdAt = new Date()

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date()
}
