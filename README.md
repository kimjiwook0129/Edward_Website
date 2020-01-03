## Project [프로젝트]

This project is both my personal website and porfolio. [이 프로젝트는 제 개인 웹사이트 겸 포트폴리오 입니다.]

## Status [현황]

1. Domain [도메인]: www.edwardjiwookkim.com
2. Hosted by [서버 호스팅]: Hostinger (June 2019 ~ June 2023 [2019년 6월 ~ 2023년 6월])

## Development Environment [개발환경 구축]

Instructions to get the development environment up and running. [개발환경 구축을 위한 설명]

Clone the repository: [저장소 복제]

    git clone https://github.com/j533kim/Edward_Website.git

Navigate to the website directory: [웹사이트 디렉터리]

    cd Edward_Website

Install required packages: [필수 package들 설치]

    npm install

### Setting Up Local Database Server [로컬 데이터베이스 구축]

Within the root directory, create a file called 'dbaccess.json' with the contents: [루트 디렉터리에 해당 내용을 지닌 'dbaccess.json' 이름의 파일 생성]

    {
        "hostname": "XXX.X.X.X",
        "username": "XXXXXXX",
        "password": "XXXXXXX",
        "database": "XXXXXXX"
    }

Please do not push credentials and secrets to the repository ('.gitignore' file is set to not push 'dbaccess.json' by default). [credentials 및 암호는 저장소에 push 하지말것 ('.gitignore' 파일이 'dbaccess.json'을 push하지 않도록 이미 설정됨)]

### Notes on CDNs & npm packages [CDN 사용과 npm 패키지 관련]

1.  CDNs are used for other frameworks and libraries; however, the repository includes all related packages just in case of losing access to the CDNs.
    [프레임워크와 라이브러리는 CDN을 사용함, 그러나 만약 CDN 데이터 엑세스를 손실할 것을 대비해 해당 패키지들은 node_modules에도 위치함.]

2.  For both CDN and package, the version of Bootstrap is 3.4.0. But bootstrap.js used to be the version 4.1.0. If broken parts of the UI exist, it is perhaps due to difference in versions. [Framework들 중 부트스트랩은 3.4.0 버전을 사용함. 하지만 bootstrap.min.js 경우 처음에는 4.1.0 버전을 사용함. 고로 UI 이상이 생길시, 밑에 주어진 코드를 각 html metadata 안에 포함할 것. 기초적 UI 문제 원인 제공은 여기서 야기할 가능성이 큼.]

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>

## Author [저작자]

- **Edward Jiwook Kim [김지욱]** - _Initial work_ - (https://github.com/j533kim)
