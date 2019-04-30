!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("@firebase/app")):"function"==typeof define&&define.amd?define(["@firebase/app"],t):t((e=e||self).firebase)}(this,function(H){"use strict";try{(function(){H=H&&H.hasOwnProperty("default")?H.default:H;var r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};function o(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var i=function(){return(i=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function p(i,s,a,c){return new(a||(a=Promise))(function(e,t){function n(e){try{o(c.next(e))}catch(e){t(e)}}function r(e){try{o(c.throw(e))}catch(e){t(e)}}function o(t){t.done?e(t.value):new a(function(e){e(t.value)}).then(n,r)}o((c=c.apply(i,s||[])).next())})}function b(n,r){var o,i,s,e,a={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return e={next:t(0),throw:t(1),return:t(2)},"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(t){return function(e){return function(t){if(o)throw new TypeError("Generator is already executing.");for(;a;)try{if(o=1,i&&(s=2&t[0]?i.return:t[0]?i.throw||((s=i.return)&&s.call(i),0):i.next)&&!(s=s.call(i,t[1])).done)return s;switch(i=0,s&&(t=[2&t[0],s.value]),t[0]){case 0:case 1:s=t;break;case 4:return a.label++,{value:t[1],done:!1};case 5:a.label++,i=t[1],t=[0];continue;case 7:t=a.ops.pop(),a.trys.pop();continue;default:if(!(s=0<(s=a.trys).length&&s[s.length-1])&&(6===t[0]||2===t[0])){a=0;continue}if(3===t[0]&&(!s||t[1]>s[0]&&t[1]<s[3])){a.label=t[1];break}if(6===t[0]&&a.label<s[1]){a.label=s[1],s=t;break}if(s&&a.label<s[2]){a.label=s[2],a.ops.push(t);break}s[2]&&a.ops.pop(),a.trys.pop();continue}t=r.call(n,a)}catch(e){t=[6,e],i=0}finally{o=s=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}([t,e])}}}function n(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),s=[];try{for(;(void 0===t||0<t--)&&!(r=i.next()).done;)s.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return s}var s="FirebaseError",a=Error.captureStackTrace,c=function(e,t){if(this.code=e,this.message=t,a)a(this,u.prototype.create);else try{throw Error.apply(this,arguments)}catch(e){this.name=s,Object.defineProperty(this,"stack",{get:function(){return e.stack}})}};c.prototype=Object.create(Error.prototype),(c.prototype.constructor=c).prototype.name=s;var u=function(){function e(e,t,n){this.service=e,this.serviceName=t,this.errors=n,this.pattern=/\{\$([^}]+)}/g}return e.prototype.create=function(e,r){void 0===r&&(r={});var t,n=this.errors[e],o=this.service+"/"+e;t=void 0===n?"Error":n.replace(this.pattern,function(e,t){var n=r[t];return void 0!==n?n.toString():"<"+t+"?>"}),t=this.serviceName+": "+t+" ("+o+").";var i=new c(o,t);for(var s in r)r.hasOwnProperty(s)&&"_"!==s.slice(-1)&&(i[s]=r[s]);return i},e}();function d(e,t){var n=new f(e,t);return n.subscribe.bind(n)}var e,f=function(){function e(e,t){var n=this;this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(function(){e(n)}).catch(function(e){n.error(e)})}return e.prototype.next=function(t){this.forEachObserver(function(e){e.next(t)})},e.prototype.error=function(t){this.forEachObserver(function(e){e.error(t)}),this.close(t)},e.prototype.complete=function(){this.forEachObserver(function(e){e.complete()}),this.close()},e.prototype.subscribe=function(e,t,n){var r,o=this;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");void 0===(r=function(e,t){if("object"!=typeof e||null===e)return!1;for(var n=0,r=t;n<r.length;n++){var o=r[n];if(o in e&&"function"==typeof e[o])return!0}return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:n}).next&&(r.next=h),void 0===r.error&&(r.error=h),void 0===r.complete&&(r.complete=h);var i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(function(){try{o.finalError?r.error(o.finalError):r.complete()}catch(e){}}),this.observers.push(r),i},e.prototype.unsubscribeOne=function(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))},e.prototype.forEachObserver=function(e){if(!this.finalized)for(var t=0;t<this.observers.length;t++)this.sendOne(t,e)},e.prototype.sendOne=function(e,t){var n=this;this.task.then(function(){if(void 0!==n.observers&&void 0!==n.observers[e])try{t(n.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}})},e.prototype.close=function(e){var t=this;this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(function(){t.observers=void 0,t.onNoObservers=void 0}))},e}();function h(){}var l,t,v,g,y=((e={})["only-available-in-window"]="This method is available in a Window context.",e["only-available-in-sw"]="This method is available in a service worker context.",e["should-be-overriden"]="This method should be overriden by extended classes.",e["bad-sender-id"]="Please ensure that 'messagingSenderId' is set correctly in the options passed into firebase.initializeApp().",e["permission-default"]="The required permissions were not granted and dismissed instead.",e["permission-blocked"]="The required permissions were not granted and blocked instead.",e["unsupported-browser"]="This browser doesn't support the API's required to use the firebase SDK.",e["notifications-blocked"]="Notifications have been blocked.",e["failed-serviceworker-registration"]="We are unable to register the default service worker. {$browserErrorMessage}",e["sw-registration-expected"]="A service worker registration was the expected input.",e["get-subscription-failed"]="There was an error when trying to get any existing Push Subscriptions.",e["invalid-saved-token"]="Unable to access details of the saved token.",e["sw-reg-redundant"]="The service worker being used for push was made redundant.",e["token-subscribe-failed"]="A problem occured while subscribing the user to FCM: {$message}",e["token-subscribe-no-token"]="FCM returned no token when subscribing the user to push.",e["token-subscribe-no-push-set"]="FCM returned an invalid response when getting an FCM token.",e["token-unsubscribe-failed"]="A problem occured while unsubscribing the user from FCM: {$message}",e["token-update-failed"]="A problem occured while updating the user from FCM: {$message}",e["token-update-no-token"]="FCM returned no token when updating the user to push.",e["use-sw-before-get-token"]="The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.",e["invalid-delete-token"]="You must pass a valid token into deleteToken(), i.e. the token from getToken().",e["delete-token-not-found"]="The deletion attempt for token could not be performed as the token was not found.",e["delete-scope-not-found"]="The deletion attempt for service worker scope could not be performed as the scope was not found.",e["bg-handler-function-expected"]="The input to setBackgroundMessageHandler() must be a function.",e["no-window-client-to-msg"]="An attempt was made to message a non-existant window client.",e["unable-to-resubscribe"]="There was an error while re-subscribing the FCM token for push messaging. Will have to resubscribe the user on next visit. {$message}",e["no-fcm-token-for-resubscribe"]="Could not find an FCM token and as a result, unable to resubscribe. Will have to resubscribe the user on next visit.",e["failed-to-delete-token"]="Unable to delete the currently saved token.",e["no-sw-in-reg"]="Even though the service worker registration was successful, there was a problem accessing the service worker itself.",e["incorrect-gcm-sender-id"]="Please change your web app manifest's 'gcm_sender_id' value to '103953800507' to use Firebase messaging.",e["bad-scope"]="The service worker scope must be a string with at least one character.",e["bad-vapid-key"]="The public VAPID key is not a Uint8Array with 65 bytes.",e["bad-subscription"]="The subscription must be a valid PushSubscription.",e["bad-token"]="The FCM Token used for storage / lookup was not a valid token string.",e["bad-push-set"]="The FCM push set used for storage / lookup was not not a valid push set string.",e["failed-delete-vapid-key"]="The VAPID key could not be deleted.",e["invalid-public-vapid-key"]="The public VAPID key must be a string.",e["use-public-key-before-get-token"]="The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used.",e["public-vapid-key-decryption-failed"]="The public VAPID key did not equal 65 bytes when decrypted.",e),w=new u("messaging","Messaging",y),m=new Uint8Array([4,51,148,247,223,161,235,177,220,3,162,94,21,113,219,72,211,46,237,237,178,52,219,183,71,58,12,143,196,204,225,111,60,140,132,223,171,182,102,62,242,12,212,139,254,227,249,118,47,20,28,99,8,106,111,45,177,26,149,176,206,55,192,156,110]),k="https://fcm.googleapis.com";function T(e,t){if(null==e||null==t)return!1;if(e===t)return!0;if(e.byteLength!==t.byteLength)return!1;for(var n=new DataView(e),r=new DataView(t),o=0;o<e.byteLength;o++)if(n.getUint8(o)!==r.getUint8(o))return!1;return!0}function S(e){var t=new Uint8Array(e);return btoa(String.fromCharCode.apply(String,function(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(n(arguments[t]));return e}(t)))}function _(e){return S(e).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}(t=l||(l={})).TYPE_OF_MSG="firebase-messaging-msg-type",t.DATA="firebase-messaging-msg-data",(g=v||(v={})).PUSH_MSG_RECEIVED="push-msg-received",g.NOTIFICATION_CLICKED="notification-clicked";var P=function(){function e(){}return e.prototype.getToken=function(u,d,f){return p(this,void 0,void 0,function(){var t,n,r,o,i,s,a,c;return b(this,function(e){switch(e.label){case 0:t=_(d.getKey("p256dh")),n=_(d.getKey("auth")),r="authorized_entity="+u+"&endpoint="+d.endpoint+"&encryption_key="+t+"&encryption_auth="+n,T(f.buffer,m.buffer)||(o=_(f),r+="&application_pub_key="+o),(i=new Headers).append("Content-Type","application/x-www-form-urlencoded"),s={method:"POST",headers:i,body:r},e.label=1;case 1:return e.trys.push([1,4,,5]),[4,fetch(k+"/fcm/connect/subscribe",s)];case 2:return[4,e.sent().json()];case 3:return a=e.sent(),[3,5];case 4:throw e.sent(),w.create("token-subscribe-failed");case 5:if(a.error)throw c=a.error.message,w.create("token-subscribe-failed",{message:c});if(!a.token)throw w.create("token-subscribe-no-token");if(!a.pushSet)throw w.create("token-subscribe-no-push-set");return[2,{token:a.token,pushSet:a.pushSet}]}})})},e.prototype.updateToken=function(u,d,f,h,l){return p(this,void 0,void 0,function(){var t,n,r,o,i,s,a,c;return b(this,function(e){switch(e.label){case 0:t=_(h.getKey("p256dh")),n=_(h.getKey("auth")),r="push_set="+f+"&token="+d+"&authorized_entity="+u+"&endpoint="+h.endpoint+"&encryption_key="+t+"&encryption_auth="+n,T(l.buffer,m.buffer)||(o=_(l),r+="&application_pub_key="+o),(i=new Headers).append("Content-Type","application/x-www-form-urlencoded"),s={method:"POST",headers:i,body:r},e.label=1;case 1:return e.trys.push([1,4,,5]),[4,fetch(k+"/fcm/connect/subscribe",s)];case 2:return[4,e.sent().json()];case 3:return a=e.sent(),[3,5];case 4:throw e.sent(),w.create("token-update-failed");case 5:if(a.error)throw c=a.error.message,w.create("token-update-failed",{message:c});if(!a.token)throw w.create("token-update-no-token");return[2,a.token]}})})},e.prototype.deleteToken=function(s,a,c){return p(this,void 0,void 0,function(){var t,n,r,o,i;return b(this,function(e){switch(e.label){case 0:t="authorized_entity="+s+"&token="+a+"&pushSet="+c,(n=new Headers).append("Content-Type","application/x-www-form-urlencoded"),r={method:"POST",headers:n,body:t},e.label=1;case 1:return e.trys.push([1,4,,5]),[4,fetch(k+"/fcm/connect/unsubscribe",r)];case 2:return[4,e.sent().json()];case 3:if((o=e.sent()).error)throw i=o.error.message,w.create("token-unsubscribe-failed",{message:i});return[3,5];case 4:throw e.sent(),w.create("token-unsubscribe-failed");case 5:return[2]}})})},e}();function M(e){for(var t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),r=new Uint8Array(n.length),o=0;o<n.length;++o)r[o]=n.charCodeAt(o);return r}var D="undefined",C="fcm_token_object_Store";function I(){var t=indexedDB.open(D);t.onerror=function(e){},t.onsuccess=function(e){!function(n){if(n.objectStoreNames.contains(C)){var e=n.transaction(C).objectStore(C),r=new P,o=e.openCursor();o.onerror=function(e){console.warn("Unable to cleanup old IDB.",e)},o.onsuccess=function(){var e=o.result;if(e){var t=e.value;r.deleteToken(t.fcmSenderId,t.fcmToken,t.fcmPushSet),e.continue()}else n.close(),indexedDB.deleteDatabase(D)}}}(t.result)}}var O=function(){function e(){this.dbPromise=null}return e.prototype.get=function(t){return this.createTransaction(function(e){return e.get(t)})},e.prototype.getIndex=function(t,n){return this.createTransaction(function(e){return e.index(t).get(n)})},e.prototype.put=function(t){return this.createTransaction(function(e){return e.put(t)},"readwrite")},e.prototype.delete=function(t){return this.createTransaction(function(e){return e.delete(t)},"readwrite")},e.prototype.closeDatabase=function(){return p(this,void 0,void 0,function(){return b(this,function(e){switch(e.label){case 0:return this.dbPromise?[4,this.dbPromise]:[3,2];case 1:e.sent().close(),this.dbPromise=null,e.label=2;case 2:return[2]}})})},e.prototype.createTransaction=function(s,a){return void 0===a&&(a="readonly"),p(this,void 0,void 0,function(){var t,r,o,i;return b(this,function(e){switch(e.label){case 0:return[4,this.getDb()];case 1:return t=e.sent(),r=t.transaction(this.objectStoreName,a),o=r.objectStore(this.objectStoreName),[4,(n=s(o),new Promise(function(e,t){n.onsuccess=function(){e(n.result)},n.onerror=function(){t(n.error)}}))];case 2:return i=e.sent(),[2,new Promise(function(e,t){r.oncomplete=function(){e(i)},r.onerror=function(){t(r.error)}})]}var n})})},e.prototype.getDb=function(){var r=this;return this.dbPromise||(this.dbPromise=new Promise(function(e,t){var n=indexedDB.open(r.dbName,r.dbVersion);n.onsuccess=function(){e(n.result)},n.onerror=function(){r.dbPromise=null,t(n.error)},n.onupgradeneeded=function(e){return r.onDbUpgrade(n,e)}})),this.dbPromise},e}();var N=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.dbName="fcm_token_details_db",e.dbVersion=3,e.objectStoreName="fcm_token_object_Store",e}return o(e,t),e.prototype.onDbUpgrade=function(e,t){var n=e.result;switch(t.oldVersion){case 0:(r=n.createObjectStore(this.objectStoreName,{keyPath:"swScope"})).createIndex("fcmSenderId","fcmSenderId",{unique:!1}),r.createIndex("fcmToken","fcmToken",{unique:!0});case 1:I();case 2:var r,o=(r=e.transaction.objectStore(this.objectStoreName)).openCursor();o.onsuccess=function(){var e=o.result;if(e){var t=e.value,n=i({},t);t.createTime||(n.createTime=Date.now()),"string"==typeof t.vapidKey&&(n.vapidKey=M(t.vapidKey)),"string"==typeof t.auth&&(n.auth=M(t.auth).buffer),"string"==typeof t.auth&&(n.p256dh=M(t.p256dh).buffer),e.update(n),e.continue()}}}},e.prototype.getTokenDetailsFromToken=function(t){return p(this,void 0,void 0,function(){return b(this,function(e){if(!t)throw w.create("bad-token");return E({fcmToken:t}),[2,this.getIndex("fcmToken",t)]})})},e.prototype.getTokenDetailsFromSWScope=function(t){return p(this,void 0,void 0,function(){return b(this,function(e){if(!t)throw w.create("bad-scope");return E({swScope:t}),[2,this.get(t)]})})},e.prototype.saveTokenDetails=function(t){return p(this,void 0,void 0,function(){return b(this,function(e){if(!t.swScope)throw w.create("bad-scope");if(!t.vapidKey)throw w.create("bad-vapid-key");if(!t.endpoint||!t.auth||!t.p256dh)throw w.create("bad-subscription");if(!t.fcmSenderId)throw w.create("bad-sender-id");if(!t.fcmToken)throw w.create("bad-token");if(!t.fcmPushSet)throw w.create("bad-push-set");return E(t),[2,this.put(t)]})})},e.prototype.deleteToken=function(n){return p(this,void 0,void 0,function(){var t;return b(this,function(e){switch(e.label){case 0:return"string"!=typeof n||0===n.length?[2,Promise.reject(w.create("invalid-delete-token"))]:[4,this.getTokenDetailsFromToken(n)];case 1:if(!(t=e.sent()))throw w.create("delete-token-not-found");return[4,this.delete(t.swScope)];case 2:return e.sent(),[2,t]}})})},e}(O);function E(e){if(e.fcmToken&&("string"!=typeof e.fcmToken||0===e.fcmToken.length))throw w.create("bad-token");if(e.swScope&&("string"!=typeof e.swScope||0===e.swScope.length))throw w.create("bad-scope");if(e.vapidKey&&(!(e.vapidKey instanceof Uint8Array)||65!==e.vapidKey.length))throw w.create("bad-vapid-key");if(e.endpoint&&("string"!=typeof e.endpoint||0===e.endpoint.length))throw w.create("bad-subscription");if(e.auth&&!(e.auth instanceof ArrayBuffer))throw w.create("bad-subscription");if(e.p256dh&&!(e.p256dh instanceof ArrayBuffer))throw w.create("bad-subscription");if(e.fcmSenderId&&("string"!=typeof e.fcmSenderId||0===e.fcmSenderId.length))throw w.create("bad-sender-id");if(e.fcmPushSet&&("string"!=typeof e.fcmPushSet||0===e.fcmPushSet.length))throw w.create("bad-push-set")}var x=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.dbName="fcm_vapid_details_db",e.dbVersion=1,e.objectStoreName="fcm_vapid_object_Store",e}return o(e,t),e.prototype.onDbUpgrade=function(e){e.result.createObjectStore(this.objectStoreName,{keyPath:"swScope"})},e.prototype.getVapidFromSWScope=function(n){return p(this,void 0,void 0,function(){var t;return b(this,function(e){switch(e.label){case 0:if("string"!=typeof n||0===n.length)throw w.create("bad-scope");return[4,this.get(n)];case 1:return[2,(t=e.sent())?t.vapidKey:void 0]}})})},e.prototype.saveVapidDetails=function(n,r){return p(this,void 0,void 0,function(){var t;return b(this,function(e){if("string"!=typeof n||0===n.length)throw w.create("bad-scope");if(null===r||65!==r.length)throw w.create("bad-vapid-key");return t={swScope:n,vapidKey:r},[2,this.put(t)]})})},e.prototype.deleteVapidDetails=function(n){return p(this,void 0,void 0,function(){var t;return b(this,function(e){switch(e.label){case 0:return[4,this.getVapidFromSWScope(n)];case 1:if(!(t=e.sent()))throw w.create("delete-scope-not-found");return[4,this.delete(n)];case 2:return e.sent(),[2,t]}})})},e}(O),K="messagingSenderId",A=function(){function e(e){var t=this;if(!e.options[K]||"string"!=typeof e.options[K])throw w.create("bad-sender-id");this.messagingSenderId=e.options[K],this.tokenDetailsModel=new N,this.vapidDetailsModel=new x,this.iidModel=new P,this.app=e,this.INTERNAL={delete:function(){return t.delete()}}}return e.prototype.getToken=function(){return p(this,void 0,void 0,function(){var t,n,r,o,i;return b(this,function(e){switch(e.label){case 0:if("denied"===(t=this.getNotificationPermission_()))throw w.create("notifications-blocked");return"granted"!==t?[2,null]:[4,this.getSWRegistration_()];case 1:return n=e.sent(),[4,this.getPublicVapidKey_()];case 2:return r=e.sent(),[4,this.getPushSubscription(n,r)];case 3:return o=e.sent(),[4,this.tokenDetailsModel.getTokenDetailsFromSWScope(n.scope)];case 4:return(i=e.sent())?[2,this.manageExistingToken(n,o,r,i)]:[2,this.getNewToken(n,o,r)]}})})},e.prototype.manageExistingToken=function(t,n,r,o){return p(this,void 0,void 0,function(){return b(this,function(e){switch(e.label){case 0:return function(e,t,n){if(!n.vapidKey||!T(t.buffer,n.vapidKey.buffer))return!1;var r=e.endpoint===n.endpoint,o=T(e.getKey("auth"),n.auth),i=T(e.getKey("p256dh"),n.p256dh);return r&&o&&i}(n,r,o)?Date.now()<o.createTime+6048e5?[2,o.fcmToken]:[2,this.updateToken(t,n,r,o)]:[4,this.deleteTokenFromDB(o.fcmToken)];case 1:return e.sent(),[2,this.getNewToken(t,n,r)]}})})},e.prototype.updateToken=function(o,i,s,a){return p(this,void 0,void 0,function(){var t,n,r;return b(this,function(e){switch(e.label){case 0:return e.trys.push([0,4,,6]),[4,this.iidModel.updateToken(this.messagingSenderId,a.fcmToken,a.fcmPushSet,i,s)];case 1:return t=e.sent(),n={swScope:o.scope,vapidKey:s,fcmSenderId:this.messagingSenderId,fcmToken:t,fcmPushSet:a.fcmPushSet,createTime:Date.now(),endpoint:i.endpoint,auth:i.getKey("auth"),p256dh:i.getKey("p256dh")},[4,this.tokenDetailsModel.saveTokenDetails(n)];case 2:return e.sent(),[4,this.vapidDetailsModel.saveVapidDetails(o.scope,s)];case 3:return e.sent(),[2,t];case 4:return r=e.sent(),[4,this.deleteToken(a.fcmToken)];case 5:throw e.sent(),r;case 6:return[2]}})})},e.prototype.getNewToken=function(r,o,i){return p(this,void 0,void 0,function(){var t,n;return b(this,function(e){switch(e.label){case 0:return[4,this.iidModel.getToken(this.messagingSenderId,o,i)];case 1:return t=e.sent(),n={swScope:r.scope,vapidKey:i,fcmSenderId:this.messagingSenderId,fcmToken:t.token,fcmPushSet:t.pushSet,createTime:Date.now(),endpoint:o.endpoint,auth:o.getKey("auth"),p256dh:o.getKey("p256dh")},[4,this.tokenDetailsModel.saveTokenDetails(n)];case 2:return e.sent(),[4,this.vapidDetailsModel.saveVapidDetails(r.scope,i)];case 3:return e.sent(),[2,t.token]}})})},e.prototype.deleteToken=function(r){return p(this,void 0,void 0,function(){var t,n;return b(this,function(e){switch(e.label){case 0:return[4,this.deleteTokenFromDB(r)];case 1:return e.sent(),[4,this.getSWRegistration_()];case 2:return(t=e.sent())?[4,t.pushManager.getSubscription()]:[3,4];case 3:if(n=e.sent())return[2,n.unsubscribe()];e.label=4;case 4:return[2,!0]}})})},e.prototype.deleteTokenFromDB=function(n){return p(this,void 0,void 0,function(){var t;return b(this,function(e){switch(e.label){case 0:return[4,this.tokenDetailsModel.deleteToken(n)];case 1:return t=e.sent(),[4,this.iidModel.deleteToken(t.fcmSenderId,t.fcmToken,t.fcmPushSet)];case 2:return e.sent(),[2]}})})},e.prototype.getPushSubscription=function(t,n){return t.pushManager.getSubscription().then(function(e){return e||t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:n})})},e.prototype.requestPermission=function(){throw w.create("only-available-in-window")},e.prototype.useServiceWorker=function(e){throw w.create("only-available-in-window")},e.prototype.usePublicVapidKey=function(e){throw w.create("only-available-in-window")},e.prototype.onMessage=function(e,t,n){throw w.create("only-available-in-window")},e.prototype.onTokenRefresh=function(e,t,n){throw w.create("only-available-in-window")},e.prototype.setBackgroundMessageHandler=function(e){throw w.create("only-available-in-sw")},e.prototype.delete=function(){return p(this,void 0,void 0,function(){return b(this,function(e){switch(e.label){case 0:return[4,Promise.all([this.tokenDetailsModel.closeDatabase(),this.vapidDetailsModel.closeDatabase()])];case 1:return e.sent(),[2]}})})},e.prototype.getNotificationPermission_=function(){return Notification.permission},e.prototype.getTokenDetailsModel=function(){return this.tokenDetailsModel},e.prototype.getVapidDetailsModel=function(){return this.vapidDetailsModel},e.prototype.getIidModel=function(){return this.iidModel},e}();var V="FCM_MSG",W=function(n){function e(e){var t=n.call(this,e)||this;return t.bgMessageHandler=null,self.addEventListener("push",function(e){t.onPush(e)}),self.addEventListener("pushsubscriptionchange",function(e){t.onSubChange(e)}),self.addEventListener("notificationclick",function(e){t.onNotificationClick(e)}),t}return o(e,n),e.prototype.onPush=function(e){e.waitUntil(this.onPush_(e))},e.prototype.onSubChange=function(e){e.waitUntil(this.onSubChange_(e))},e.prototype.onNotificationClick=function(e){e.waitUntil(this.onNotificationClick_(e))},e.prototype.onPush_=function(a){return p(this,void 0,void 0,function(){var t,n,r,o,i,s;return b(this,function(e){switch(e.label){case 0:if(!a.data)return[2];try{t=a.data.json()}catch(e){return[2]}return[4,this.hasVisibleClients_()];case 1:return e.sent()?[2,this.sendMessageToWindowClients_(t)]:(n=this.getNotificationData_(t))?(r=n.title||"",[4,this.getSWRegistration_()]):[3,3];case 2:return o=e.sent(),i=n.actions,s=Notification.maxActions,i&&s&&i.length>s&&console.warn("This browser only supports "+s+" actions.The remaining actions will not be displayed."),[2,o.showNotification(r,n)];case 3:return this.bgMessageHandler?[4,this.bgMessageHandler(t)]:[3,5];case 4:return e.sent(),[2];case 5:return[2]}})})},e.prototype.onSubChange_=function(e){return p(this,void 0,void 0,function(){var t,n,r,o;return b(this,function(e){switch(e.label){case 0:return e.trys.push([0,2,,3]),[4,this.getSWRegistration_()];case 1:return t=e.sent(),[3,3];case 2:throw n=e.sent(),w.create("unable-to-resubscribe",{message:n});case 3:return e.trys.push([3,5,,8]),[4,t.pushManager.getSubscription()];case 4:return e.sent(),[3,8];case 5:return r=e.sent(),[4,this.getTokenDetailsModel().getTokenDetailsFromSWScope(t.scope)];case 6:if(!(o=e.sent()))throw r;return[4,this.deleteToken(o.fcmToken)];case 7:throw e.sent(),r;case 8:return[2]}})})},e.prototype.onNotificationClick_=function(i){return p(this,void 0,void 0,function(){var t,n,r,o;return b(this,function(e){switch(e.label){case 0:return i.notification&&i.notification.data&&i.notification.data[V]?i.action?[2]:(i.stopImmediatePropagation(),i.notification.close(),(t=i.notification.data[V]).notification&&(n=t.fcmOptions&&t.fcmOptions.link||t.notification.click_action)?[4,this.getWindowClient_(n)]:[2]):[2];case 1:return(r=e.sent())?[3,3]:[4,self.clients.openWindow(n)];case 2:return r=e.sent(),[3,5];case 3:return[4,r.focus()];case 4:r=e.sent(),e.label=5;case 5:return r?(delete t.notification,delete t.fcmOptions,o=U(v.NOTIFICATION_CLICKED,t),[2,this.attemptToMessageClient_(r,o)]):[2]}})})},e.prototype.getNotificationData_=function(e){var t;if(e&&"object"==typeof e.notification){var n=i({},e.notification);return n.data=i({},e.notification.data,((t={})[V]=e,t)),n}},e.prototype.setBackgroundMessageHandler=function(e){if(!e||"function"!=typeof e)throw w.create("bg-handler-function-expected");this.bgMessageHandler=e},e.prototype.getWindowClient_=function(i){return p(this,void 0,void 0,function(){var t,n,r,o;return b(this,function(e){switch(e.label){case 0:return t=new URL(i,self.location.href).href,[4,F()];case 1:for(n=e.sent(),r=null,o=0;o<n.length;o++)if(new URL(n[o].url,self.location.href).href===t){r=n[o];break}return[2,r]}})})},e.prototype.attemptToMessageClient_=function(t,n){return p(this,void 0,void 0,function(){return b(this,function(e){if(!t)throw w.create("no-window-client-to-msg");return t.postMessage(n),[2]})})},e.prototype.hasVisibleClients_=function(){return p(this,void 0,void 0,function(){return b(this,function(e){switch(e.label){case 0:return[4,F()];case 1:return[2,e.sent().some(function(e){return"visible"===e.visibilityState&&!e.url.startsWith("chrome-extension://")})]}})})},e.prototype.sendMessageToWindowClients_=function(o){return p(this,void 0,void 0,function(){var t,n,r=this;return b(this,function(e){switch(e.label){case 0:return[4,F()];case 1:return t=e.sent(),n=U(v.PUSH_MSG_RECEIVED,o),[4,Promise.all(t.map(function(e){return r.attemptToMessageClient_(e,n)}))];case 2:return e.sent(),[2]}})})},e.prototype.getSWRegistration_=function(){return p(this,void 0,void 0,function(){return b(this,function(e){return[2,self.registration]})})},e.prototype.getPublicVapidKey_=function(){return p(this,void 0,void 0,function(){var t,n;return b(this,function(e){switch(e.label){case 0:return[4,this.getSWRegistration_()];case 1:if(!(t=e.sent()))throw w.create("sw-registration-expected");return[4,this.getVapidDetailsModel().getVapidFromSWScope(t.scope)];case 2:return null==(n=e.sent())?[2,m]:[2,n]}})})},e}(A);function F(){return self.clients.matchAll({type:"window",includeUncontrolled:!0})}function U(e,t){var n;return(n={})[l.TYPE_OF_MSG]=e,n[l.DATA]=t,n}var j,R=function(n){function e(e){var t=n.call(this,e)||this;return t.registrationToUse=null,t.publicVapidKeyToUse=null,t.manifestCheckPromise=null,t.messageObserver=null,t.tokenRefreshObserver=null,t.onMessageInternal=d(function(e){t.messageObserver=e}),t.onTokenRefreshInternal=d(function(e){t.tokenRefreshObserver=e}),t.setupSWMessageListener_(),t}return o(e,n),e.prototype.getToken=function(){return p(this,void 0,void 0,function(){return b(this,function(e){switch(e.label){case 0:return this.manifestCheckPromise||(this.manifestCheckPromise=function(){return p(this,void 0,void 0,function(){var t,n;return b(this,function(e){switch(e.label){case 0:if(!(t=document.querySelector('link[rel="manifest"]')))return[2];e.label=1;case 1:return e.trys.push([1,4,,5]),[4,fetch(t.href)];case 2:return[4,e.sent().json()];case 3:return n=e.sent(),[3,5];case 4:return e.sent(),[2];case 5:if(!n||!n.gcm_sender_id)return[2];if("103953800507"!==n.gcm_sender_id)throw w.create("incorrect-gcm-sender-id");return[2]}})})}()),[4,this.manifestCheckPromise];case 1:return e.sent(),[2,n.prototype.getToken.call(this)]}})})},e.prototype.requestPermission=function(){return p(this,void 0,void 0,function(){var t;return b(this,function(e){switch(e.label){case 0:return"granted"===this.getNotificationPermission_()?[2]:[4,Notification.requestPermission()];case 1:if("granted"===(t=e.sent()))return[2];throw"denied"===t?w.create("permission-blocked"):w.create("permission-default")}})})},e.prototype.useServiceWorker=function(e){if(!(e instanceof ServiceWorkerRegistration))throw w.create("sw-registration-expected");if(null!=this.registrationToUse)throw w.create("use-sw-before-get-token");this.registrationToUse=e},e.prototype.usePublicVapidKey=function(e){if("string"!=typeof e)throw w.create("invalid-public-vapid-key");if(null!=this.publicVapidKeyToUse)throw w.create("use-public-key-before-get-token");var t=M(e);if(65!==t.length)throw w.create("public-vapid-key-decryption-failed");this.publicVapidKeyToUse=t},e.prototype.onMessage=function(e,t,n){return"function"==typeof e?this.onMessageInternal(e,t,n):this.onMessageInternal(e)},e.prototype.onTokenRefresh=function(e,t,n){return"function"==typeof e?this.onTokenRefreshInternal(e,t,n):this.onTokenRefreshInternal(e)},e.prototype.waitForRegistrationToActivate_=function(r){var o=r.installing||r.waiting||r.active;return new Promise(function(e,t){if(o)if("activated"!==o.state)if("redundant"!==o.state){var n=function(){if("activated"===o.state)e(r);else{if("redundant"!==o.state)return;t(w.create("sw-reg-redundant"))}o.removeEventListener("statechange",n)};o.addEventListener("statechange",n)}else t(w.create("sw-reg-redundant"));else e(r);else t(w.create("no-sw-in-reg"))})},e.prototype.getSWRegistration_=function(){var t=this;return this.registrationToUse?this.waitForRegistrationToActivate_(this.registrationToUse):(this.registrationToUse=null,navigator.serviceWorker.register("/firebase-messaging-sw.js",{scope:"/firebase-cloud-messaging-push-scope"}).catch(function(e){throw w.create("failed-serviceworker-registration",{browserErrorMessage:e.message})}).then(function(e){return t.waitForRegistrationToActivate_(e).then(function(){return(t.registrationToUse=e).update(),e})}))},e.prototype.getPublicVapidKey_=function(){return p(this,void 0,void 0,function(){return b(this,function(e){return this.publicVapidKeyToUse?[2,this.publicVapidKeyToUse]:[2,m]})})},e.prototype.setupSWMessageListener_=function(){var r=this;navigator.serviceWorker.addEventListener("message",function(e){if(e.data&&e.data[l.TYPE_OF_MSG]){var t=e.data;switch(t[l.TYPE_OF_MSG]){case v.PUSH_MSG_RECEIVED:case v.NOTIFICATION_CLICKED:var n=t[l.DATA];r.messageObserver&&r.messageObserver.next(n)}}},!1)},e}(A);function L(){return self&&"ServiceWorkerGlobalScope"in self?"PushManager"in self&&"Notification"in self&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey"):navigator.cookieEnabled&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}j={isSupported:L},H.INTERNAL.registerService("messaging",function(e){if(!L())throw w.create("unsupported-browser");return self&&"ServiceWorkerGlobalScope"in self?new W(e):new R(e)},j)}).apply(this,arguments)}catch(e){throw console.error(e),new Error("Cannot instantiate firebase-messaging - be sure to load firebase-app.js first.")}});
//# sourceMappingURL=firebase-messaging.js.map