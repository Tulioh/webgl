var ShaderProgram = function() {
    if( ShaderProgram.prototype.program !== null ) {
        var shaderLoader = new ShaderLoader();
        
        var vertexShader = shaderLoader.getVertexShader();
        var fragmentShader = shaderLoader.getFragmentShader();

        var program = gl.createProgram();
        gl.attachShader( program, vertexShader );
        gl.attachShader( program, fragmentShader );
        gl.linkProgram( program );

        if ( !gl.getProgramParameter( program, gl.LINK_STATUS ) ) {
            alert("Could not initialise shaders");
        }

        gl.useProgram( program );
        
        ShaderProgram.prototype.program = program;
    }
    
    return ShaderProgram.prototype.program;
};