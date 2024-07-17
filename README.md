# ABstore 프로젝트

### 📖 프로젝트 개요
ABstore는 Node.js로 구현된 체인코드 프로젝트로, 블록체인 기술을 사용하여 음원 거래 및 관리 서비스를 제공합니다.
<br/><br/>

### 🚀 프로젝트 목표
- 체인코드를 통해 사용자 등록, 로그인, 음원 등록, 수정, 삭제, 거래 등의 기능을 구현
- 클라이언트를 AngularJS 프레임워크를 사용하고 REST API를 통한 API 통신
- API 통신을 통해 가져온 데이터를 프론트에서 보여주도록 설계
<br/><br/><br/>

## 📝 프로젝트 설명

### 💼 ABstore의 기능
1. 포인트 충전, 환전 기능
<img width=100% src="https://github.com/est3Jun/dev-mode/blob/fc11c941cc9bd79a9b31c43a74ae01fab5bcb4c6/application/client/images/%EC%B6%A9%EC%A0%84%ED%95%98%EA%B8%B0.PNG">
<img width=100% src="https://github.com/est3Jun/dev-mode/blob/fc11c941cc9bd79a9b31c43a74ae01fab5bcb4c6/application/client/images/%ED%99%98%EC%A0%84.PNG">
<img width=100% src="https://github.com/est3Jun/dev-mode/blob/7990cdc36ba7437ee275cc2823ca0048f5c70432/application/client/images/%ED%99%98%EC%A0%84%20%ED%99%95%EC%9D%B8.PNG">
2. 음원 등록, 수정, 삭제
<img width=100% src="https://github.com/est3Jun/dev-mode/blob/f61fb4412b93d2626d1ac7f214dbdf12f321e622/application/client/images/%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80%20%EB%A6%AC%EB%A9%94%EC%9D%B4%ED%81%AC.PNG">
<img width=100% src="https://github.com/est3Jun/dev-mode/blob/fc11c941cc9bd79a9b31c43a74ae01fab5bcb4c6/application/client/images/asasasas.PNG">
<img width=100% src="https://github.com/est3Jun/dev-mode/blob/7990cdc36ba7437ee275cc2823ca0048f5c70432/application/client/images/%EC%9D%8C%EC%9B%90%EC%82%AD%EC%A0%9C.PNG">
3. 유저 간 음원 거래 기능
4. 음원 검색 및 조회
<br/><br/>

### 🗺 기술 설계도

### 💻 기술 스택
- **OS:** &nbsp;&nbsp;![Windows 11](https://img.shields.io/badge/Windows%2011-%230079d5.svg?style=for-the-badge&logo=Windows%2011&logoColor=white) ![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)
- **Container 배포:** &nbsp;&nbsp;![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
- **FrameWork:** &nbsp;&nbsp;![AngularJS](https://img.shields.io/badge/angularjs-%23E23237.svg?style=for-the-badge&logo=angularjs&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- **Style:** &nbsp;&nbsp;![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
- **Language:** &nbsp;&nbsp;![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- **Tools:** &nbsp;&nbsp;![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
<br/><br/>

### ✨ 주요 기능 및 이미지
📌 Home<br/>
- **메뉴바:** 로고와 각종 기능들을 이용할 수 있는 메뉴 바 구현<br/>
- **광고:** 사용자에게 어떻게 사용하는지와 사용하고 싶도록 디자인 구현<br/><br/><br/>

📌 음원 등록 및 수정<br/>
- **음원 등록:** 음원 정보 입력 후 등록<br/>
- **음원 수정:** 기존 음원 정보 수정<br/><br/><br/>

📌 음원 거래<br/>
- **음원 전송:** 보내는 유저와 받는 유저의 ID를 입력 후 전송<br/><br/><br/>

📌 음원 검색<br/>
- **음원 검색:** 사용자 ID를 통해 음원 검색<br/><br/><br/>

## ⚙️ 프로젝트 설치 및 실행 방법

### 📝 Prerequisites
- Oracle VM VirtualBox 6.1
- Ubuntu 22.04.x
- cURL
- Docker Community Edition CE 23.0.6
- Docker Compose 1.27.4 이상
- Git 2.9.x 이상
- Node.js 12.13.1
- npm 5.6.0
- VSCode v1.28

### 📦 설치 방법
⚡ 우분투 환경의 IP를 확인하여 코드 수정 후 진행<br/><br/>
우분투 환경에서 서버 설치<br/>

```sh
// 하이퍼레저 패브릭 샘플 및 바이너리 다운로드
cd ~/go/src
curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.2.2 1.4.9

// 프로젝트 다운
cd $GOPATH/src/
rm -rf abstore
git clone <repository-url>
cd $GOPATH/src/abstore/basic-network
cp -r $GOPATH/src/fabric-samples/bin/ ./

// 체인코드 인증서 발급 및 설치, 서버 실행
cd $GOPATH/src/abstore
./network.sh clean
./network.sh dev
./network.sh installCC dev abstore
./network.sh startSDK
윈도우 환경에서 클라이언트 설치<br/>

git clone <repository-url>
cd abstore
npm install
npm start

🏰Client, Server repository
📱 <a href="<client-repo-url>">Client</a></br>
💻 <a href="<server-repo-url>">Server</a></br>
