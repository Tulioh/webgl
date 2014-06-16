var Vector2d = function(x, y) {
    this.x = x;
    this.y = y;
    
    this.addVector = function( vector ) {
        this.x = vector.x;
        this.y = vector.y;
    };
    
    this.magnitude = function() {
        var vec = new Vector2d( this.x, this.y );
        return Math.sqrt( ( (vec.x * vec.x) + ( vec.y * vec.y ) ) );
    };
    
    this.normalize = function() {
        var mag = this.magnitude();
        
        var newX = this.x / mag;
        var newY = this.y / mag;
        
        return new Vector2d( newX, newY );
    };
};