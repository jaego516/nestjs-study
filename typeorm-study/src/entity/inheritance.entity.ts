import { ChildEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn } from "typeorm";

// 이건 Entity 등록을 안해줘서 실제 테이블이 생성되지 않음
export class BaseModel{
    @PrimaryGeneratedColumn()
    id : number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

@Entity()
export class BookModel extends BaseModel{
    @Column()
    name: string;
}

@Entity()
export class CarModel extends BaseModel{
    @Column()
    brand: string;
}

@Entity()
@TableInheritance({
    column:{
        name: 'type',
        type: 'varchar',
    }
})
export class SingleBaseModel{
    @PrimaryGeneratedColumn()
    id : number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

@ChildEntity()
export class ComputerModel extends SingleBaseModel{
    @Column()
    brand: string;
}
@ChildEntity()
export class AirplaneModel extends SingleBaseModel{
    @Column()
    country: string;
}