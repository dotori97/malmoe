
# npm start 로 실행
# npm( Node Package Manager) : node.js에서 사용하는 모듈들을 패키지로 만들어 관리하고 배포하는 역할을 한다.
# npm init : description, author 등을 입력받아 package.json 작성해준다.
# Express는 웹 및 모바일 애플리케이션을 위한 기능을 제공하는 간결하고 유연한 Node.js 웹 애플리케이션 프레임워크
# pg : PostgreSQL
# Sequelize : DB 작업을 쉽게 할 수 있도록 도와주는 ORM(Object-Relational Mapping) 라이브러리 
# ORM : 자바스크립트 객체와 관계형 데이터베이스를 서로 연결해주는 도구
# Sequelize CLI(The Sequelize command line interface) : 데이터베이스 작업을 할 수 있는 툴 (마이그레이션, 시드, 모델)
npm init -y 
npm i express nodemon pg sequelize sequelize-cli

# clone 한 경우는 
npm install
# npm i jest

# sequelize init 을 하게되면, 몇가지 폴더(config, migrations, models, seeders)와, 파일들이 생성
npx sequelize-cli init

controllers 폴더 생성
dao 폴더 생성 : data access object
services 폴더 생성 : 복잡한 비지니스로직 담는곳
routes 폴더 생성

# npm start로 backend/frontend 함께실행하기
package.json 수정 
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },

# bsmj 20241126
npm install cors
npm install express-validator
npm install bcryptjs
npm install jsonwebtoken

create table users (
    id integer primary key autoincrement,
    eamil varchar,
    password varchar,
    name varchar,
    address varchar 
)

backend/
├── node_modules/           # NPM 패키지가 설치되는 폴더
├── controllers/            # API 비즈니스 로직
│   ├── userController.js   # 사용자 관련 API 로직
│   ├── dictionaryController.js # 사전 관련 API 로직
│   └── loginController.js  # 로그인 관련 API 로직
├── models/                 # Sequelize 모델 (DB 테이블)
│   ├── index.js            # Sequelize 모델 초기화
│   ├── user.js             # user 테이블 모델
│   ├── dictionary.js       # dictionary 테이블 모델
│   └── category.js         # category 테이블 모델
│   └── login.js            # login 테이블 모델
├── routes/                 # API 라우트
│   ├── userRoutes.js       # 사용자 관련 라우트
│   ├── dictionaryRoutes.js # 사전 관련 라우트
│   └── loginRoutes.js      # 로그인 관련 라우트
├── index.js               # 서버 실행 및 라우트 연결
├── .env                   # 환경 변수 파일 (DB 연결 정보 등)
├── package.json           # 프로젝트 설정 파일
└── package-lock.json      # NPM 잠금 파일
