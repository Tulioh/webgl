var Shader = function() {
    this.getVertexShaderSource = function() {
        return "attribute vec2 vertexPosition;"+ 
        "attribute vec2 aTextureCoord;"+
                
        "uniform mat3 translationMatrix;" +
        "uniform mat3 projectionMatrix;" +
        
        "varying vec2 vTextureCoord;" +
        
        "void main(void) {"+
        "   gl_Position = vec4( ( projectionMatrix * translationMatrix * vec3(vertexPosition, 1) ).xy, 0, 1 );"+
        "   vTextureCoord = aTextureCoord;" +
        "}";
    };
    
    this.getFragmentShaderSource = function() {
        return "precision mediump float;" +
                
        "varying vec2 vTextureCoord;" +
        "uniform sampler2D uSampler;" +
                
        "void main(void) {" +
        "    gl_FragColor = texture2D( uSampler, vTextureCoord );" +
        "}";
    };
};