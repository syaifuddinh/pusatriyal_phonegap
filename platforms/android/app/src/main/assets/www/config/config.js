host = 'http://127.0.0.1/newpusatriyal/';
client_secret = 'ara8OfuKd2Z3uTdQh3gj5RyrLAqB7JnwfNlcCisn';
client_id = 2;
grant_type = 'password';

url = function(pathname) {
	var pathname = pathname.replace(/$\/(.*)/);
	var outp = host + pathname;

	return outp;
}
