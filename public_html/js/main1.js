document.write('<script type="text/javascript" src="js/GLContext.js"></script>');
document.write('<script type="text/javascript" src="js/Shader.js"></script>');
document.write('<script type="text/javascript" src="js/ShaderLoader.js"></script>');
document.write('<script type="text/javascript" src="js/ShaderProgram.js"></script>');
document.write('<script type="text/javascript" src="js/Mat3.js"></script>');
document.write('<script type="text/javascript" src="js/InputHandler.js"></script>');
document.write('<script type="text/javascript" src="js/Vector2d.js"></script>');
document.write('<script type="text/javascript" src="js/MathUtil.js"></script>');
document.write('<script type="text/javascript" src="js/Mat4.js"></script>');
document.write('<script type="text/javascript" src="js/Shader1.js"></script>');

var gl = null;
var program;
var inputHandler;

function initApp() {
    inputHandler = new InputHandler();
    
    initWebGLContext();
    initShaders();
    initBuffers();
    initTexture();
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    
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
    
    program.textureCoordAttribute = gl.getAttribLocation( program, "aTextureCoord" );
    gl.enableVertexAttribArray( program.textureCoordAttribute );
    
    program.projectionMatrixUniform = gl.getUniformLocation( program, "projectionMatrix" );
    program.translationMatrixUniform = gl.getUniformLocation( program, "translationMatrix" );
    program.samplerUniform = gl.getUniformLocation( program, "uSampler");
}

var squareVertexPositionBuffer;
var squareTextureCoordBuffer;

function initBuffers() {
    var width = 150;
    var height = 150;
    var x = 0;
    var y = 0;
    
    var vertices = [
        // triangle 1
        x, y,               //v1
        x, y+height,       //v2
        x+width, y,         //v3
        
        // triangle 2
        x+width, y,         //v4
        x, y+height,       //v5
        x+width, y+height   //v6
    ];
    
    squareVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, squareVertexPositionBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );
    squareVertexPositionBuffer.itemSize = 2;
    squareVertexPositionBuffer.numItems = 6;
    
    var textureCoords = [
        0.0, 1.0, //v1
        0.0, 0.0, //v2
        1.0, 1.0, //v3
        
        1.0, 1.0, //v4
        0.0, 0.0, //v3
        1.0, 0.0  //v3
    ];
    
    squareTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, squareTextureCoordBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( textureCoords ), gl.STATIC_DRAW );
    squareTextureCoordBuffer.itemSize = 2;
    squareTextureCoordBuffer.numItems = 6;
}

var texture;

function initTexture() {
    texture = gl.createTexture();
    texture.image = new Image();
    texture.image.src = "imgs/mario-flower.png";
    
    texture.image.onload = function() {
        handleLoadedTexture( texture );
    };
}

function handleLoadedTexture( texture ) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);
}

function drawScene() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);   
   
    var pos = inputHandler.getPosition(); 
    var rotation = inputHandler.getRotation();
    var scale = inputHandler.getScale();
   
    var projectionMatrix = new Mat3();
    var translationMatrix = new Mat3();
    
    projectionMatrix.orthoProjection( gl.viewportWidth, gl.viewportHeight );
    translationMatrix.identity();
    translationMatrix.translate( pos.x, pos.y );
    translationMatrix.rotate( rotation );
    translationMatrix.scale( scale.x, scale.y );
        
    gl.bindBuffer( gl.ARRAY_BUFFER, squareVertexPositionBuffer );
    gl.vertexAttribPointer( program.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0 );
    
    gl.bindBuffer( gl.ARRAY_BUFFER, squareTextureCoordBuffer );
    gl.vertexAttribPointer( program.textureCoordAttribute, squareTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0 );
    
    gl.activeTexture( gl.TEXTURE0 );
    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.uniform1i( program.samplerUniform, 0 );
    
    gl.uniformMatrix3fv( program.projectionMatrixUniform, false, projectionMatrix.getData() );
    gl.uniformMatrix3fv( program.translationMatrixUniform ,false, translationMatrix.getData() );
    
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, squareTextureCoordBuffer.numItems );
}