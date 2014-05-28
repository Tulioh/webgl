var ShaderLoader = function() {
    this.shader = null;
    
    this.getVertexShader = function() {
        this.shader = gl.createShader( gl.VERTEX_SHADER );
        return this.compileSource( new Shader().getVertexShaderSource() );
    };
    
    this.getFragmentShader = function() {
        this.shader = gl.createShader( gl.FRAGMENT_SHADER );
        return this.compileSource( new Shader().getFragmentShaderSource() );
    };
};

ShaderLoader.prototype = {
    constructor: ShaderLoader,
    
    compileSource: function( shaderType ) {
        gl.shaderSource( this.shader, shaderType );
        gl.compileShader( this.shader );
        
        if ( !gl.getShaderParameter( this.shader, gl.COMPILE_STATUS ) ) {
            alert( gl.getShaderInfoLog( this.shader ) );
            return null;
        }
        
        return this.shader;
    }
};