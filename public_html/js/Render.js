var Render = function() {
    this.gl = null;
    
    this.initContext = function() {
        var canvas = document.getElementById("context");
        this.gl = canvas.getContext("webgl");
        this.gl.viewportWidth = canvas.width;
        this.gl.viewportHeight = canvas.height;

        if( !gl ) {
            alert("WebGL nao foi inicializado.");
        }
    };
    
    this.getGl = function() {
        return this.gl;
    };
};