var ShaderProgram = function() {
    if( ShaderProgram.prototype.program !== null ) {
        var vertexShader = new ShaderLoader().getVertexShader();
        var fragmentShader = new ShaderLoader().getFragmentShader();

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