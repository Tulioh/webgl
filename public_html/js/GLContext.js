var GLContext = function() {
    this.initContext = function() {
        var canvas = document.getElementById("context");
        gl = canvas.getContext("webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;

        if( !gl ) {
            alert("WebGL nao foi inicializado.");
        }
    };
};