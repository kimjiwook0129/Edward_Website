## Status ##

1. Domain [도메인]: "www.edwardjiwookkim.com"
2. Hosted by [서버 호스팅]: Hostinger

## Notes on CDNs & npm packages [CDN 사용과 npm 패키지 관련] ##

1. CDNs are used for other frameworks and libraries; however, the repository includes all related packages just in case of losing access to the CDNs.
[프레임워크와 라이브러리는 CDN을 사용함, 그러나 만약 CDN 데이터 엑세스를 손실할 것을 대비해 해당 패키지들은 node_modules에도 위치함.]
2. For both CDN and package, the version of Bootstrap is 3.4.0. But bootstrap.js used to be the version 4.1.0. If broken parts of the UI exist, it is perhaps due to difference in versions. [Framework들 중 부트스트랩은 3.4.0 버전을 사용함. 하지만 bootstrap.min.js 경우 처음에는 4.1.0 버전을 사용함. 고로 UI 이상이 생길시, 밑에 주어진 코드를 각 html metadata 안에 포함. 기초적 UI 문제 원인 제공은 여기서 야기할 가능성 큼.]

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>

3. 