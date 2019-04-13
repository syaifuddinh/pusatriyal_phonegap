host = 'http://192.168.100.8/git/pusatriyal/';
client_secret = 'fxdA99lNFzxwPOFtAVyRVZ75azZR4zeLe4AYziYG';
client_id = 4;
grant_type = 'password';

url = function(pathname) {
    var pathname = pathname.replace(/$\/(.*)/);
    var outp = host + pathname;

    return outp;
}