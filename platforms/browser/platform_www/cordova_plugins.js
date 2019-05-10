cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-texttospeech/www/tts.js",
        "id": "cordova-plugin-texttospeech.tts",
        "pluginId": "cordova-plugin-texttospeech",
        "clobbers": [
            "TTS"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-texttospeech": "0.1.1"
}
// BOTTOM OF METADATA
});