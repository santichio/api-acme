import { Entity, Property } from '@mikro-orm/core'

import { BaseEntity } from 'src/common/database/Base.entity'

@Entity({ tableName: 'TB_USERS' })
export class UserEntity extends BaseEntity {
    @Property({ fieldName: 'username' })
    username: string

    @Property({ fieldName: 'email' })
    email: string

    @Property({ fieldName: 'password' })
    password: string
}
