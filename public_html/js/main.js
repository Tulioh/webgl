document.write('<script type="text/javascript" src="js/GLContext.js"></script>');
document.write('<script type="text/javascript" src="js/Shader.js"></script>');
document.write('<script type="text/javascript" src="js/ShaderLoader.js"></script>');
document.write('<script type="text/javascript" src="js/ShaderProgram.js"></script>');
document.write('<script type="text/javascript" src="js/Mat4.js"></script>');
document.write('<script type="text/javascript" src="js/InputHandler.js"></script>');
document.write('<script type="text/javascript" src="js/Vector.js"></script>');

var gl = null;
var program;
var inputHandler;

function initApp() {
    inputHandler = new InputHandler()
    
    initWebGLContext();
    initShaders();
    initBuffers();
    
    window.requestAnimationFrame( update );
}

function update() {
    inputHandler.handleTransform();
    drawScene();

    window.requestAnimationFrame(update);
}

function initWebGLContext() {
    var glContext = new GLContext();
    glContext.initContext();
}

function initShaders() {
    program = new ShaderProgram();
    program.vertexPositionAttribute = gl.getAttribLocation( program, "vertexPosition" );
    gl.enableVertexAttribArray( program.vertexPositionAttribute );
    
    program.pMatrixUniform = gl.getUniformLocation( program, "pMatrix" );
    program.mvMatrixUniform = gl.getUniformLocation( program, "mvMatrix" );
}

var squareVertexPositionBuffer;

function initBuffers() {
    squareVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, squareVertexPositionBuffer );
    
    var vertices = [
        //Front face
        0.25, 0.25, 0, //v0
        0.25, 0.75, 0, //v1
        0.75, 0.25, 0, //v2
        0.75, 0.75, 0, //v3
        
        //Right Face
        0.75, 0.25, 0, //v2
        0.75, 0.75, 0, //v3
        0.75, 0.25, 1, //v4
        0.75, 0.75, 1,  //v5
        
        //Left Face
        0.25, 0.25, 0, //v0
        0.25, 0.75, 0, //v1
        0.25, 0.25, 1, //v6
        0.25, 0.75, 1  //v7
        
        
    ];
    
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );
    squareVertexPositionBuffer.itemSize = 3;
    squareVertexPositionBuffer.numItems = 4;
}

function drawScene() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);   
   
    var pMatrix = new Mat4();
    pMatrix.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);
    
    var mvMatrix = new Mat4();
    mvMatrix.identity();
    
    var pos = inputHandler.getPosition();
    mvMatrix.translate( [ pos.x, pos.y, pos.z ] );
    
    //mvMatrix.rotateX( 1 )
        
    gl.bindBuffer( gl.ARRAY_BUFFER, squareVertexPositionBuffer );
    gl.vertexAttribPointer( program.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0 );
    
    gl.uniformMatrix4fv( program.pMatrixUniform, false, pMatrix.getMatrix() );
    gl.uniformMatrix4fv( program.mvMatrixUniform, false, mvMatrix.getMatrix() );
     
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems );
}