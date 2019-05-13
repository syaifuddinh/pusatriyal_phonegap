cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-texttospeech/www/tts.js",
        "id": "cordova-plugin-texttospeech.tts",
        "pluginId": "cordova-plugin-texttospeech",
        "clobbers": [
            "TTS"
        ]
    },
    {
        "file": "plugins/cordova-pdf-generator/www/pdf.js",
        "id": "cordova-pdf-generator.pdf",
        "pluginId": "cordova-pdf-generator",
        "clobbers": [
            "cordova.plugins.pdf",
            "pugin.pdf",
            "pdf"
        ]
    },
    {
        "file": "plugins/cordova-pdf-generator/www/pdf.js",
        "id": "cordova-pdf-generator.pdf",
        "pluginId": "cordova-pdf-generator",
        "clobbers": [
            "cordova.plugins.pdf",
            "pugin.pdf",
            "pdf"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/src/browser/DeviceProxy.js",
        "id": "cordova-plugin-device.DeviceProxy",
        "pluginId": "cordova-plugin-device",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/src/browser/DeviceProxy.js",
        "id": "cordova-plugin-device.DeviceProxy",
        "pluginId": "cordova-plugin-device",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-texttospeech": "0.1.1",
    "cordova-android-firebase-gradle-release": "3.0.0",
    "cordova-android-play-services-gradle-release": "3.0.0",
    "cordova-android-support-gradle-release": "2.1.0",
    "cordova-pdf-generator": "2.0.8",
    "cordova-plugin-device": "1.1.7"
}
// BOTTOM OF METADATA
});