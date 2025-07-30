import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 as uuidv4 } from 'uuid'

@Entity({ abstract: true })
export abstract class BaseEntity {
    @PrimaryKey({ type: 'uuid' })
    id = uuidv4()

    @Property({ fieldName: 'created_at' })
    createdAt = new Date()

    @Property({ fieldName: 'updated_at' })
    updatedAt = new Date()

    @Property({ fieldName: 'deleted_at' })
    deletedAt = new Date()
}
