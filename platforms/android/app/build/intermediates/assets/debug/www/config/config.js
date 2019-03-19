host = 'http://pusatriyal.alamraya.site/';
url = function(pathname) {
	var pathname = pathname.replace(/$\/(.*)/);
	var outp = host + pathname;

	return outp;
}