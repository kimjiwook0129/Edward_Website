## Notes on CDNs & npm packages ##

1. Website uses CDNs for other frameworks; however, the repository includes all related packages just in case of losing access to the CDNs.
2. For both CDN and package, the version of Bootstrap is 3.4.0. But bootstrap.js used to be the version 4.1.0. If broken parts of the UI exist, it is perhaps due to difference in versions. Original:

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
