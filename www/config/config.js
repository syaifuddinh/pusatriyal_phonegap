host = 'http://192.168.100.21/git/pusatriyal/';
client_secret = 'ara8OfuKd2Z3uTdQh3gj5RyrLAqB7JnwfNlcCisn';
client_id = 2;
grant_type = 'password';

url = function(pathname) {
	var pathname = pathname.replace(/$\/(.*)/);
	var outp = host + pathname;

	return outp;
}
