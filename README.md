
This project provides a test harness for experimenting with Reverse Proxies and Multi-tenanting.

For an overvire see https://github.com/tooltwist/documentation/wiki/Multi-tenanting-with-a-Reverse-Proxy.


# Configuration
- Apache as a reverse proxy, running inside a Docker container.
- Three back end NodeJS Express servers, supporting ToolTwist-like URLs, with static and dynamic responses.


Once fired up, this project uses Apache to route requests to the backend servers, and remap the URLs in the responses:

    http://dockerIP:8080/au/* -> http://server:9001/ttsvr/*  
    http://dockerIP:8080/nz/* -> http://server:9002/ttsvr/*
    http://dockerIP:8080/us/* -> http://server:9003/ttsvr/*  
   

The three different URLs go to different web servers, that are actually the same applicatiion, that use `/ttsvr/` as the webapp name. The files returned (HTML, Javascript, CSS, etc) may also have `/ttsvr/` in their URLS, and these should be remapped as required.


# Setting Up
Pre-requistes: Docker NodeJS  

First, get the Docker image downloading (After the first time, this will start very fast):

    $ cd front-apache
    $ ./start.sh
    
While the image is downloading, open another tab in Terminal are determine the IP address of the current machine:

    $ ifconfig
    en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500
    ...
    inet 192.168.200.3 netmask 0xffffff00 broadcast 192.168.200.255
    ...

In this example it is `192.168.200.3`. Edit `apache-config.conf` and replace the address in the ProxyPass and ProxyPassReverse definitions.

    ProxyPass		http://192.168.200.3:9003/ttsvr/
    ProxyPassReverse	http://192.168.200.3:9003/ttsvr/

After start.sh finishes, confirm Apache is running:

    $ docker ps
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                  NAMES
    56f404c7fbdf        mysite              "/bin/sh -c '/usr/sbi"   3 seconds ago       Up 3 seconds        0.0.0.0:8080->80/tcp   mysite

Now start the backend servers:

    $ cd ../back-nodejs
    $ npm install
    ...
    $ ./start.js
    CCODE=au
    PORT=9001
    au listening at http://:::9001
    CCODE=nz
    PORT=9002
    nz listening at http://:::9002
    CCODE=us
    PORT=9003
    us listening at http://:::9003

You can now run the test page (substitute in the IP address of Docker if required):

    $ open http://192.168.99.100:8080/


## The test page
On the first screen, choose a country. (BTW, This page was served up from within Apache, as a PHP page.)

![2016-08-09_23-02-03](https://cloud.githubusercontent.com/assets/848697/17521368/a29ae58e-5e85-11e6-8827-b48d261426cb.png)

On the country page, everything  below the heading should have /ttsvr/ replaced with the country code, and there should be two images as shown here.

![2016-08-09_23-04-05](https://cloud.githubusercontent.com/assets/848697/17521371/a590cb28-5e85-11e6-9809-883c5159be3d.png)

If you click on links to view the stylesheet or Javascript, you should similarly see that /ttsvr/ has been replaced.

## References
https://medium.com/dev-tricks/apache-and-php-on-docker-44faef716150#.1eq3hw8vd
