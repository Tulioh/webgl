var ShaderUtil = function() {
    this.shader = null;
    
    this.getVertexShader = function() {
        this.shader = gl.createShader( gl.VERTEX_SHADER );
        return this.compileSource( new Shader().getVertexShaderSource() );
    };
    
    this.getFragmentShader = function() {
        this.shader = gl.createShader( gl.VERTEX_SHADER );
        return this.compileSource( new Shader().getFragmentShaderSource()() );
    };
};

ShaderUtil.prototype = {
    constructor: ShaderUtil,
    
    compileSource: function( shaderType ) {
        gl.shaderSource( shader, shaderType() );
        gl.compileShader( shader );
        
        if ( !gl.getShaderParameter( shader, gl.COMPILE_STATUS ) ) {
            alert( gl.getShaderInfoLog( shader ) );
            return null;
        }
        
        return shader;
    }
};