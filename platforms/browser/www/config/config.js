<<<<<<< HEAD
host = 'http://localhost/pusatriyal/';
=======
host = 'http://192.168.100.16/git/pusatriyal/';
>>>>>>> b23b378d3f1e6a96438feb0616f468f230c71aa2
client_secret = 'HLyFA0xhYBtB1d7ULUX4Ta0guEnrPqLKr5mhSIat';
client_id = 2;
grant_type = 'password';

url = function(pathname) {
    var pathname = pathname.replace(/$\/(.*)/);
    var outp = host + pathname;

    return outp;
}
// // Initialize Firebase
// var config = {
// 	apiKey: "AIzaSyBBP3aTEZ61LMFe933ijJUEz_aWsdorJks",
// 	authDomain: "alamrayasite-pusatriyal.firebaseapp.com",
// 	databaseURL: "https://alamrayasite-pusatriyal.firebaseio.com",
// 	projectId: "alamrayasite-pusatriyal",
// 	storageBucket: "alamrayasite-pusatriyal.appspot.com",
// 	messagingSenderId: "458093057695"
// };
// firebase.initializeApp(config);