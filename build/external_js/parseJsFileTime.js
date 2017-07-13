function scriptLoadParseDuration(url) {
  var start;
  var script = document.createElement('script');
  
  // <script> must be attached to the document to actually load the file
  document.querySelector('html').appendChild(script);
  
  // Calculate load/parse duration once script has loaded
  script.addEventListener('load', function scriptLoad() {   
    // Calculate load/parse duration
    console.log('Duration: ' + (Date.now() - start) + 'ms');
    document.getElementById("measureTime").innerHTML = 'Duration: ' + (Date.now() - start) + 'ms' ;
    
    
    // Remove <script> from document
    script.parentElement.removeChild(script);
  }, false);
  
  // Get current time in milliseconds
  start = Date.now();
  
  // Setting the `src` starts the loading. Math.random is used to make sure it is an uncached request
  script.src = url + '?' + Math.floor(Math.random() * 9e9);
}