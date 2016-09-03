cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.network-information/www/network.js",
        "id": "org.apache.cordova.network-information.network",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.network-information/www/Connection.js",
        "id": "org.apache.cordova.network-information.Connection",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.plugin.tts/www/tts.js",
        "id": "org.apache.cordova.plugin.tts.tts",
        "clobbers": [
            "navigator.tts"
        ]
    },
    {
        "file": "plugins/cordova-plugin-navigationbar/www/navigationbar.js",
        "id": "cordova-plugin-navigationbar.navigationbar",
        "clobbers": [
            "window.navigationbar"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.network-information": "0.2.15",
    "org.apache.cordova.plugin.tts": "0.2.1",
    "cordova-plugin-navigationbar": "1.0.28"
}
// BOTTOM OF METADATA
});