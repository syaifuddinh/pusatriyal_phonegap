host = 'http://192.168.100.16/git/pusatriyal/';
client_secret = '5eNF7RSv03L9jGL5RCrQorjLLgZ31fkqdHt2CBnP';
client_id = 6;
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
// firebase.initializeApp(config);