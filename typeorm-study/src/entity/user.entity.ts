import { Column, CreateDateColumn, Entity, Generated, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm'
import { ProfileModel } from './profile.entity';
import { PostModel } from './post.entity';

export enum Role{
    USER = 'user',
    ADMIN = 'admin,'
}

@Entity()
export class UserModel{
    // ID
    // 자동으로 ID를 생성한다.
    // @PrimaryGeneratedColumn()

    // @PrimaryColumn()
    // 이건 일반적인 pk
    // Primary Column은 모든 테이블에서 기본적으로 존재해야한다.
    // 테이블 안에서 각각의 Row를 구분 할 수 있는 칼럼이다.

    // @PrimaryGeneratedColumn('uuid')
    // PrimaryGeneratedColumn -> 순서대로 위로 올라간다.
    // 1, 2, 3, 4, 5 ...

    // UUID
    // asdfjbnasdf12345-asdfasdf-21q35asdfasdf-22345234 이런 형태
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
    // 제목
    // @Column({
    //     // 데이터베이스에서 인지하는 칼럼 타입
    //     // 자동으로 유추됨
    //     type: 'varchar',
    //     // 데이터베이스 칼럼 이름
    //     name: 'title',
    //     // 값의 길이
    //     // 입력할 수 있는 글의 길이
    //     length: 255,
    //     // null 이 가능한지
    //     nullable: true,
    //     // true면 처음 저장할때만 값 지정 가능
    //     // 이후에는 값 변경 불가능
    //     update: true,
    //     // find()를 실행할 때 기본으로 값을 불러올지
    //     // 기본값이 true
    //     select: false,
    //     // 기본값으로 넣어줄 것 설정
    //     default: 'default value',
    //     // 칼럼 중에서 유일무이한 값이 되어야 하는지
    //     unique: false, // pk는 이게 true
    // })
    // title: string;

    // 특정 값들로 칼럼을 제한하고 싶을 때 enum을 쓴다.
    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role;
    // 데이터 생성 일자
    // 데이터가 생성되는 날짜와 시간이 자동으로 찍힌다.
    @CreateDateColumn()
    createAt: Date;

    // 데이터 업데이트 일자
    // 데이터가 업데이트되는 날짜와 시간이 자동으로 찍힌다.
    @UpdateDateColumn()
    updateAt: Date;

    // 데이터가 업데이트 될때마다 1씩 올라간다.
    // 처음 생성되면 값은 1이다.
    // save() 함수가 몇번 불렸는지 기억한다.
    @VersionColumn()
    version: number;

    @Column()
    @Generated('uuid')
    additionalId: string;

    @OneToOne(()=> ProfileModel, (profile)=>profile.user)
    profile: ProfileModel;

    @OneToMany(()=>PostModel, (post) => post.author)
    posts: PostModel[];
}