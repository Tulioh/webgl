var Mat4 = function() {
    var glMatrixArrayType = typeof Float32Array != "undefined" ? Float32Array : typeof WebGLFloatArray != "undefined" ? WebGLFloatArray : Array;
    var matrix = new glMatrixArrayType(16);
    
    this.identity = function() {
        matrix[0] = 1;
        matrix[1] = 0;
        matrix[2] = 0;
        matrix[3] = 0;
        matrix[4] = 0;
        matrix[5] = 1;
        matrix[6] = 0;
        matrix[7] = 0;
        matrix[8] = 0;
        matrix[9] = 0;
        matrix[10] = 1;
        matrix[11] = 0;
        matrix[12] = 0;
        matrix[13] = 0;
        matrix[14] = 0;
        matrix[15] = 1;
    };
    
    this.frustum = function(a, b, c, d, e, g) {
        var h = b - a, i = d - c, j = g - e;
        matrix[0] = e * 2 / h;
        matrix[1] = 0;
        matrix[2] = 0;
        matrix[3] = 0;
        matrix[4] = 0;
        matrix[5] = e * 2 / i;
        matrix[6] = 0;
        matrix[7] = 0;
        matrix[8] = (b + a) / h;
        matrix[9] = (d + c) / i;
        matrix[10] = -(g + e) / j;
        matrix[11] = -1;
        matrix[12] = 0;
        matrix[13] = 0;
        matrix[14] = -(g * e * 2) / j;
        matrix[15] = 0;
    };
    
    this.perspective = function(a, b, c, d) {
        a = c * Math.tan(a * Math.PI / 360);
        b = a * b;
        
        this.frustum(-b, b, -a, a, c, d);
    };
    
    this.ortho = function(left, right, bottom, top, near, far) {
        var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
        matrix[0] = -2 * lr;
        matrix[1] = 0;
        matrix[2] = 0;
        matrix[3] = 0;
        matrix[4] = 0;
        matrix[5] = -2 * bt;
        matrix[6] = 0;
        matrix[7] = 0;
        matrix[8] = 0;
        matrix[9] = 0;
        matrix[10] = 2 * nf;
        matrix[11] = 0;
        matrix[12] = (left + right) * lr;
        matrix[13] = (top + bottom) * bt;
        matrix[14] = (far + near) * nf;
        matrix[15] = 1;
    };
    
    this.translate = function( vec ) {
        var a = vec[2], b = vec[0], c = vec[1];
        
        matrix[12] = matrix[0] * b + matrix[4] * c + matrix[8] * a + matrix[12];
        matrix[13] = matrix[1] * b + matrix[5] * c + matrix[9] * a + matrix[13];
        matrix[14] = matrix[2] * b + matrix[6] * c + matrix[10] * a + matrix[14];
        matrix[15] = matrix[3] * b + matrix[7] * c + matrix[11] * a + matrix[15];
    };
    
    this.rotateX = function( deg ) {
        var rad = Math.radians( deg );
        
        var s = Math.sin( rad );
        var c = Math.cos( rad );
        
        var a10 = matrix[4],
            a11 = matrix[5],
            a12 = matrix[6],
            a13 = matrix[7],
            a20 = matrix[8],
            a21 = matrix[9],
            a22 = matrix[10],
            a23 = matrix[11];
    
        matrix[4] = a10 * c + a20 * s;
        matrix[5] = a11 * c + a21 * s;
        matrix[6] = a12 * c + a22 * s;
        matrix[7] = a13 * c + a23 * s;
        matrix[8] = a20 * c - a10 * s;
        matrix[9] = a21 * c - a11 * s;
        matrix[10] = a22 * c - a12 * s;
        matrix[11] = a23 * c - a13 * s;
    };
    
    this.getMatrix = function() {
        return matrix;
    };
};