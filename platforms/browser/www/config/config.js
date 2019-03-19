host = 'http://localhost/pusatriyal/';
url = function(pathname) {
	var pathname = pathname.replace(/$\/(.*)/);
	var outp = host + pathname;

	return outp;
}