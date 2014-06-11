var Vector = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    
    this.addVector = function( vector ) {
        this.x = vector.x;
        this.y = vector.y;
        this.z = vector.z;
    };
    
    this.magnitude = function() {
        var vec = new Vector( this.x, this.y, this.z );
        return Math.sqrt( ( (vec.x * vec.x) + ( vec.y * vec.y ) + ( vec.z * vec.z ) ) );
    };
    
    this.normalize = function() {
        var mag = this.magnitude();
        
        var newX = this.x / mag;
        var newY = this.y / mag;
        var newZ = this.z / mag;
        
        return new Vector( newX, newY, newZ );
    };
};