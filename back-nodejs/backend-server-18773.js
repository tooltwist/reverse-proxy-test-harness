var express = require('express');
var app = express();
var serveStatic = require('serve-static');

// Get the server-specific details
var CCODE = process.env.CCODE;
var PORT = process.env.PORT ? process.env.PORT : 1081;
console.log('CCODE=' + CCODE);
console.log('PORT=' + PORT);

app.get('/ttsvr/hello', function (req, res) {
	res.header("Content-Type", "text/html");
	var html = '';
	html += '<html>';
	html += '<head>';
	html += '	<link href="/ttsvr/hello.css" rel="stylesheet"/>';
	html += '</head>';
	html += '<body>';
	html += '<h1>/ttsvr<span/>/hello</h1>';
	html += '(Express framework)<br><br>';
	html += 'TESTS (Nothing below here should say /ttsvr<span/>/)<hr/><br/>';
	html += '1. text in HTML:<br>';
	html += '<div class="result">/ttsvr/</div>';
	html += '2. link to HTML (hover over link and look at status message):<br>';
	html += '<div class="result"><a href="/ttsvr/hello.html">Some page</a></div>';
	html += '3. Image in HTML:<br>';
	html += '<div class="result"><img src="/ttsvr/pass.png"/></div>';
	html += '4. Image in CSS file:<br>';
	html += '<div class="result"><div class="myimage"></div></div>';
	html += '5. Text inserted by Javascript file:<br>';
	html += '<div class="result"><script src="/ttsvr/hello.js"></script></div>';
	html += '<hr/>';

	html += 'View styesheet: <a href="/ttsvr/hello.css" target="blank">/ttsvr/hello.css</a><br>';
	html += 'View javascript: <a href="/ttsvr/hello.js" target="blank">/ttsvr/hello.js</a><br>';
	html += '<br/>Switch to static page: <a href="/ttsvr/hello.html">/ttsvr/hello.html</a><br>';
	html += 'Switch country: <a href="/">here</a>';
	html += '</body>';
	html += '</html>';


	res.send(html);
//	res.send('Hello and <a href="/ttsvr/goodbye">goodbye</a> from ' + CCODE + '<br/><br/><a href="/">go home</a>');
})

app.get('/ttsvr/goodbye', function (req, res) {
	//res.contentType('text/html0');
	//res.header("Content-Type", "text/html1");
	res.set("Content-Type", "text/html");
	res.send('Goodbye and <a href="/ttsvr/hello">hello</a> from ' + CCODE + '<br/><br/><a href="/">go home</a>');
})

app.use(serveStatic('public'));
//app.use(serveStatic('public', {'index': ['default.html', 'default.htm']}))

var server = app.listen(PORT, function () {


	var host = server.address().address
	var port = server.address().port

	console.log(CCODE + " listening at http://%s:%s", host, port)

})
