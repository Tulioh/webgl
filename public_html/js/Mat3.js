var Mat3 = function() {
    var glMatrixArrayType = typeof Float32Array !== "undefined" ? Float32Array : typeof WebGLFloatArray !== "undefined" ? WebGLFloatArray : Array;
    var data = new glMatrixArrayType(9);
    
    this.identity = function() {
        data[0] = 1;    data[3] = 0;    data[6] = 0;
        data[1] = 0;    data[4] = 1;    data[7] = 0;
        data[2] = 0;    data[5] = 0;    data[8] = 1;
    };
    
    this.orthoProjection = function( width, height ) {
        data[0] = 2 / width;    data[3] = 0;            data[6] = -1;
        data[1] = 0;            data[4] = -2 / height;  data[7] = 1;
        data[2] = 0;            data[5] = 0;            data[8] = 1;
    };
    
    this.translate = function( x, y ) {
        var a00 = data[0], a01 = data[1], a02 = data[2],
            a10 = data[3], a11 = data[4], a12 = data[5],
            a20 = data[6], a21 = data[7], a22 = data[8];
        
        data[0] = a00;  data[3] = a10;  data[6] = x * a00 + y * a10 + a20;
        data[1] = a01;  data[4] = a11;  data[7] = x * a01 + y * a11 + a21;
        data[2] = a02;  data[5] = a12;  data[8] = x * a02 + y * a12 + a22;
    };
    
    this.rotate = function( angle ) {
        var a00 = data[0], a01 = data[1], a02 = data[2],
            a10 = data[3], a11 = data[4], a12 = data[5],
            a20 = data[6], a21 = data[7], a22 = data[8];
        
        var radians = Math.radians( angle );
        var c = Math.cos( radians );
        var s = Math.sin( radians );
        
        data[0] = c * a00 + s * a10;    data[3] = c * a10 - s * a00;    data[6] = a20;
        data[1] = c * a01 + s * a11;    data[4] = c * a11 - s * a01;    data[7] = a21;
        data[2] = c * a02 + s * a12;    data[5] = c * a12 - s * a02;    data[8] = a22;
    };
    
    this.scale = function( x, y ) {
        data[0] = x * data[0];
        data[1] = x * data[1];
        data[2] = x * data[2];

        data[3] = y * data[3];
        data[4] = y * data[4];
        data[5] = y * data[5];
    };
    
    this.getData = function() {
        return data;
    };
};