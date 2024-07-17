# Dev Mode

Dev Mode는 Hyperledger Fabric을 기반으로 블록체인 네트워크와 스마트 컨트랙트를 개발하기 위한 프로젝트입니다. 이 저장소는 다양한 네트워크 구성 및 체인코드 배포 방법을 제공합니다.

## Features

- Hyperledger Fabric 네트워크 설정
- 스마트 컨트랙트 배포 및 관리
- Hyperledger Explorer 통합

## Prerequisites

- Docker
- Docker Compose
- Node.js
- npm

## Installation

1. 저장소를 클론합니다.
    ```bash
    git clone https://github.com/buseonghyeon/dev-mode.git
    cd dev-mode
    ```
2. 필요한 패키지를 설치합니다.
    ```bash
    npm install
    ```

## Usage

### 네트워크 시작하기

1. 네트워크를 시작합니다.
    ```bash
    ./network.sh up
    ```
2. 채널을 생성합니다.
    ```bash
    ./network.sh createChannel
    ```
3. 체인코드를 배포합니다.
    ```bash
    ./network.sh deployCC
    ```

### Hyperledger Explorer 사용하기

1. Explorer를 시작합니다.
    ```bash
    cd explorer
    docker-compose up -d
    ```

## Directory Structure

- `application/`: 블록체인 애플리케이션 코드
- `basic-network/`: 기본 네트워크 구성 파일
- `chaincode/abstore/`: 샘플 체인코드
- `explorer/`: Hyperledger Explorer 설정 파일
- `.vscode/`: VS Code 설정 파일

## Contributing

기여를 환영합니다! 기여하려면 [CONTRIBUTING.md](CONTRIBUTING.md)를 참조하세요.

## License

이 프로젝트는 [MIT 라이센스](LICENSE)를 따릅니다.
