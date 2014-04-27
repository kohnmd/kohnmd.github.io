(function(){
    var body = document.body;
    var html = document.documentElement;
    var bgChangers = document.getElementsByClassName('bgChanger');
    var preloaded = [];
    
    // Watch for clicks on bgChanger links.
    for(var i=0; i<bgChangers.length; i++) {
        bgChangers[i].onclick = function() {
            changeBackground(this.href);
            return false;
        };
    }
    
    // Changes background image. Calls preloadImage if necessary.
    function changeBackground(src) {
        if( preloaded.indexOf(src) === -1 ) {
            preloadImage(src);
        } else {
            body.style.backgroundImage = 'url('+src+')';
        }
    }
    
    // Displays loading graphic until an image is fully loaded.
    function preloadImage(src) {
        addLoadingOverlay();
        var bgImage = new Image();
        bgImage.onload = function() {
            body.style.backgroundImage = 'url('+src+')';
            removeLoadingOverlay();
            preloaded.push(src);
        }
        bgImage.onerror = function() {
            console.log('error');
            removeLoadingOverlay();
        }
        bgImage.src = src;
    }
    
    // Generates loading overlay and adds it to the DOM.
    function addLoadingOverlay() {
        var overlay = document.createElement('div');
        overlay.id = 'overlay';
        //overlay.style.height = body.offsetHeight+'px';
        overlay.style.height = Math.max( body.scrollHeight, body.offsetHeight, 
               html.clientHeight, html.scrollHeight, html.offsetHeight ) + 'px';
        
        var loader = document.createElement('div');
        loader.className = 'loader';
        loader.appendChild( document.createElement('span') );
        loader.appendChild( document.createElement('span') );
        loader.appendChild( document.createElement('span') );
        overlay.appendChild(loader);
        
        body.appendChild(overlay);
        
        setTimeout(function() {
            overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
        }, 100)
    }
    
    // Removes the loading overlay. Called once image has loaded.
    function removeLoadingOverlay() {
        body.removeChild( document.getElementById('overlay') );
    }
})();