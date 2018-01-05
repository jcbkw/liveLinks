function initializeFirebase () {
    
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyA_lq4mxRs-Kf2bzFLi6vtKiTI1r9rS_BQ",
        authDomain: "livelinks-bb0ec.firebaseapp.com",
        databaseURL: "https://livelinks-bb0ec.firebaseio.com",
        projectId: "livelinks-bb0ec",
        storageBucket: "livelinks-bb0ec.appspot.com",
        messagingSenderId: "382065537271"
      };
      //Initializing pust a global variable "firebase" in your application
    
      firebase.initializeApp(config);

}

function setLink () {
    let liveLinks = firebase.database().ref("links");
    var submitLink = function (url, title) {
        url = url.substring(0,4) !== "http" ? "https//" + url : url;
        liveLinks.push(btoa /*<- Method use for base64 url encode */ (url))
        .set({title:title});
    };
     
    return submitLink;

}

function addEventListeners () {

    linkFormListener();

}

function linkFormListener() {

$(".link-firm form").submit(function(e){

    e.preventDefault();
    ll = setLink();
    ll($('input.link-url').val(), $('input.link-title').val());
    $("input[type=text]").val("").blur();
    return false;    

});


}

$(document).ready(function() {
    initializeFirebase();
    addEventListeners();

    
});