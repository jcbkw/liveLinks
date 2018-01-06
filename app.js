var liveLinks; //set variable to hold reference to the database

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
    liveLinks = firebase.database().ref("links");  
}

function setDataControl () {
    var controls = {

        submitLink : function (url, title) {
                    
            url = url.substring(0,4) !== "http" ? "http://" + url : url;
            
            liveLinks.push({title: title, url: url});
            //liveLinks.push().set({title: title, url: url});
                    
        },
        linkListener : function () {

            liveLinks.on('value', function (snap) {

                $(".links-link").empty();

                var links = snap.val();
                
                for (var key in links) {
        
                    if (links.hasOwnProperty(key)) {

                        var link = links[key];
                        
                        $(".links-link").append( 
                            $("<li/>").append(
                                $("<a/>", {href: link.url, text: link.title})
                            )
                        );
                    
                    }
                
                }
                
                //this.linkListener(preparedLinks);
                //console.log(this);
                console.log(preparedLinks);
            }.bind(this))
            
        } 

    };
    return liveLinks.linkListControls = controls;
};
    
function addEventListeners () {
    
    setDataControl(); 
    linkFormSubmit();
    linkListDisplayer();

}

function linkFormSubmit () {

    $(".link-form form").submit(function(e){

    e.preventDefault();
    
    var ll = liveLinks.linkListControls;
    ll.submitLink($('input.link-url').val(), $('input.link-title').val());
    $("input[type=text]").val("").blur();
    return false;    

    });
}

function linkListDisplayer () {
    
    liveLinks.linkListControls.linkListener();
}

$(document).ready(function () {
    initializeFirebase();
    addEventListeners();
   
});