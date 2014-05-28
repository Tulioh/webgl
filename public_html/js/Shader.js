var Shader = function() {
    this.getVertexShaderSource = function() {
        return "attribute vec3 aVertexPosition;"+
        "void main(void) {"+
        "    gl_Position = vec4(aVertexPosition.x - 0.80, aVertexPosition.y, aVertexPosition.z, 1.0);"+
        "}";
    };
    
    this.getFragmentShaderSource = function() {
        return "precision mediump float;" +
        "void main(void) {" +
        "    gl_FragColor = vec4(0.2901960784313725, 0.3607843137254902, 0.5803921568627451, 1.0);"+
        "}";
    };
};