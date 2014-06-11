var Shader = function() {
    this.getVertexShaderSource = function() {
        return "attribute vec3 vertexPosition;"+
                
        "uniform mat4 mvMatrix;" +
        "uniform mat4 pMatrix;" +
        
        "void main(void) {"+
        "    gl_Position = pMatrix * mvMatrix * vec4(vertexPosition, 1.0);"+
        "}";
    };
    
    this.getFragmentShaderSource = function() {
        return "precision mediump float;" +
                
        "void main(void) {" +
        "    gl_FragColor = vec4(0.2901960784313725, 0.3607843137254902, 0.5803921568627451, 1.0);"+
        "}";
    };
};