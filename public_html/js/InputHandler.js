var InputHandler = function() {
    var positionX = document.getElementById( "position-x" );
    var positionY = document.getElementById( "position-y" );
    var positionZ = document.getElementById( "position-z" );
    
    var rotationX = document.getElementById( "rotation-x" );
    var rotationY = document.getElementById( "rotation-y" );
    var rotationZ = document.getElementById( "rotation-z" );
    
    var xPostionValue = positionX.value = 0;
    var yPostionValue = positionY.value = 0;
    var zPostionValue = positionZ.value = -7;
    
    var xRotationValue = rotationX.value = 0;
    var yRotationValue = rotationY.value = 0;
    var zRotationValue = rotationZ.value = 0;
    
    this.handleTransform = function() {
        onChangePosition();
        onChangeRotation();
    };
    
    var onChangePosition = function(){
        positionX.onchange = function() {
            positionX.value = xPostionValue = validateInputedNumber( this.value, xPostionValue );;
        };
        
        positionY.onchange = function() {
            positionY.value = yPostionValue = validateInputedNumber( this.value, yPostionValue );
        };
        
        positionZ.onchange = function() {
            positionZ.value = zPostionValue = validateInputedNumber( this.value, zPostionValue );
        };
    };
    
    var onChangeRotation = function(){
        rotationX.onchange = function() {
            rotationX.value = xRotationValue = validateInputedNumber( this.value, xRotationValue );;
        };
        
        rotationY.onchange = function() {
            rotationY.value = yRotationValue = validateInputedNumber( this.value, yRotationValue );
        };
        
        rotationZ.onchange = function() {
            rotationZ.value = zRotationValue = validateInputedNumber( this.value, zRotationValue );
        };
    };
    
    var validateInputedNumber = function( newNumber, oldNumber ) {
        newNumber = parseFloat( newNumber );
        
        if( !isNaN( newNumber ) ) {
            return newNumber;
        } else {
            return oldNumber;
        }
    };
    
    this.getPosition = function() {
        return new Vector( xPostionValue, yPostionValue, zPostionValue );
    };
    
    this.getX = function() {
        return xPostionValue;
    };
    
    this.getY = function() {
        return yPostionValue;
    };
    
    this.getZ = function() {
        return zPostionValue;
    };
};