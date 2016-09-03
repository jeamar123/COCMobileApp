
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, true);
    },
    // // deviceready Event Handler
    // //
    // // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        // app.receivedEvent('deviceready');
        var autoHideNavigationBar = true;
        window.navigationbar.setUp(autoHideNavigationBar);
        // var networkState = navigator.connection.type;

        // if(networkState == "wifi"){
            // alert("You have internet connection");

            // navigator.tts.startup(startupWin, fail);
            // function startupWin(result) {
            //     console.log("Startup win");
            //     When result is equal to STARTED we are ready to play
            //     console.log("Result "+result);
            //     TTS.STARTED==2 use this once so is answered
            //     if (result == 2) {
            //         navigator.tts.getLanguage(win, fail);
            //         navigator.tts.speak("1. The non-institutional corrections are based on");     
            //         navigator.tts.speak("a. penal farms, b. school/educational institution, c. cottage type farm, d. community");    
            //         navigator.tts.speak("Text to Speech Activated");                                      
            //     }
            // }                               

            // function win(result) {
            //     console.log(result);
            // }

            // function fail(result) {
            //     console.log("Error = " + result);
            // }
        // }else{
            // alert("Please check internet connection");
            // navigator.app.exitApp();

        // }

         var networkState;

         setInterval(function(){
            networkState = navigator.connection.type;
            localStorage.setItem('con_status',networkState);
            // if(networkState != "wifi" ){
            //     alert("Please Check Internet Connection");
            //     navigator.app.exitApp();
            // }
         },100);
    },
    
    // // Update DOM on a Received Event
    // receivedEvent: function(id) {
    //     var parentElement = document.getElementById(id);
    //     var listeningElement = parentElement.querySelector('.listening');
    //     var receivedElement = parentElement.querySelector('.received');

    //     listeningElement.setAttribute('style', 'display:none;');
    //     receivedElement.setAttribute('style', 'display:block;');

    //     console.log('Received Event: ' + id);
    // }
};

