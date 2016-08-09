
Experiments with mod-rewrite on Apache, to front end urls like these:

   localhost:8080/au/*
   localhost:8080/us/*
   localhost:8080/nz/*

The three different URLs go to different web servers, that use /ttsvr/ as
the webapp name. The files returned (HTML, Javascript, CSS, etc) may also
have /ttsvr/ in their URLS, and these should be remapped as required.

References:
https://medium.com/dev-tricks/apache-and-php-on-docker-44faef716150#.1eq3hw8vd
