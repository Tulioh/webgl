var ShaderProgram = function() {
    
    this.init = function() {
        var vertexShader = new ShaderLoader().getVertexShader();
        var fragmentShader = new ShaderLoader().getFragmentShader();
        
        this.program = gl.createProgram();
        gl.attachShader( this.program, vertexShader );
        gl.attachShader( this.program, fragmentShader );
        gl.linkProgram( this.program );
        
        if ( !gl.getProgramParameter( this.program, gl.LINK_STATUS ) ) {
            alert("Could not initialise shaders");
        }
        
        gl.useProgram( this.program );
        
        return this.program;
    };
    
    this.getProgram = function() {
        return this.program;
    };
};

ShaderProgram.prototype = {
    program: null
};

