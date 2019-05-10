host = 'http://192.168.100.19/git/pusatriyal/';
client_secret = 'HLyFA0xhYBtB1d7ULUX4Ta0guEnrPqLKr5mhSIat';
client_id = 2;
grant_type = 'password';

url = function(pathname) {
    var pathname = pathname.replace(/$\/(.*)/);
    var outp = host + pathname;

    return outp;
}

