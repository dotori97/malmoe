module.exports = (sequelize, DataTypes) => {
    const Dictionary = sequelize.define('Dictionary', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true, // 자동 증가
            primaryKey: true, // 기본 키
        },
        email: {
            type: DataTypes.STRING(255), // 255
            allowNull: false,  
            validate: {
                isEmail: true, // Sequelize validation
            },
        },
        word: {
            type: DataTypes.STRING(255),
            allowNull: false, 
        },
        des: {
            type: DataTypes.STRING(8000), // TEXT 타입, 긴 데이터 지원
            allowNull: true,
        },
        des_json: {
            type: DataTypes.STRING(8000), // TEXT 타입, 긴 데이터 지원
            allowNull: true,
        },
        c_id: {
            type: DataTypes.INTEGER, // INTEGER 타입
            allowNull: true,
            references: { // 외래 키 설정
                model: 'categorys', // Category 테이블 이름 (소문자로 맞춤)
                key: 'c_id', // Category 테이블의 c_id 컬럼
            },
            onUpdate: 'CASCADE', // 부모 데이터 변경 시 연쇄 반영
            onDelete: 'SET NULL', // 부모 데이터 삭제 시 NULL로 설정
        },       
        memo: {
            type: DataTypes.STRING(255), // VARCHAR(255)
            allowNull: true,
        },
        url: {
            type: DataTypes.STRING(2083), // URL 최대 길이
            allowNull: true,
        },
        input_type: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1, //1:TEXT, 2:음성, 3:이미지 
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10,
        },
        c_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },  
        u_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },  
    }, {
        tableName: "dictionarys",
        timestamps: false, // createdAt, updatedAt 자동 생성 비활성화 
        indexes: [
            {
                unique: true, // 유니크 인덱스 설정
                fields: ['email', 'word'], // email과 word의 조합을 유니크로 설정
            },
        ],
    });
    return Dictionary;
}
    