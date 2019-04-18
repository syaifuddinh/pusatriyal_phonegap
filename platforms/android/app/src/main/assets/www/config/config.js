host = 'http://192.168.100.9/git/pusatriyal/';
client_secret = 'ara8OfuKd2Z3uTdQh3gj5RyrLAqB7JnwfNlcCisn';
client_id = 2;
grant_type = 'password';

url = function(pathname) {
    var pathname = pathname.replace(/$\/(.*)/);
    var outp = host + pathname;

    return outp;
}
// Initialize Firebase
var config = {
	apiKey: "AIzaSyBBP3aTEZ61LMFe933ijJUEz_aWsdorJks",
	authDomain: "alamrayasite-pusatriyal.firebaseapp.com",
	databaseURL: "https://alamrayasite-pusatriyal.firebaseio.com",
	projectId: "alamrayasite-pusatriyal",
	storageBucket: "alamrayasite-pusatriyal.appspot.com",
	messagingSenderId: "458093057695"
};
firebase.initializeApp(config);