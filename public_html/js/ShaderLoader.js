var ShaderLoader = function() {
    this.shader = null;
    
    var shaderSource = new Shader1();
    
    this.getVertexShader = function() {
        return this.compileSource( gl.VERTEX_SHADER, shaderSource.getVertexShaderSource() );
    };
    
    this.getFragmentShader = function() {
        return this.compileSource( gl.FRAGMENT_SHADER, shaderSource.getFragmentShaderSource() );
    };
};

ShaderLoader.prototype = {
    constructor: ShaderLoader,
    
    compileSource: function( shaderSource, shaderType ) {
        this.shader = gl.createShader( shaderSource );
        gl.shaderSource( this.shader, shaderType );
        gl.compileShader( this.shader );
        
        if ( !gl.getShaderParameter( this.shader, gl.COMPILE_STATUS ) ) {
            alert( gl.getShaderInfoLog( this.shader ) );
            return null;
        }
        
        return this.shader;
    }
};