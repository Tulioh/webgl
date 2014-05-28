var Vector = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    
    this.addVector = function( vector ) {
        this.x = vector.x;
        this.y = vector.y;
        this.z = vector.z;
    };
    
    
};