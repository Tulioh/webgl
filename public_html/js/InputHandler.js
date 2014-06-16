var InputHandler = function() {
    var positionX = document.getElementById( "position-x" );
    var positionY = document.getElementById( "position-y" );
    var rotationDegree = document.getElementById( "rotation-degree" );
    var scaleX = document.getElementById( "scale-x" );
    var scaleY = document.getElementById( "scale-y" );
    
    var xPostionValue = positionX.value = 0;
    var yPostionValue = positionY.value = 0;
    var rotationValue = rotationDegree.value = 0;
    var xscaleValue = scaleX.value = 1;
    var yscaleValue = scaleY.value = 1;
    
    this.handleTransform = function() {
        onChangePosition();
        onChangeRotation();
        onChangeScale();
    };
    
    var onChangePosition = function(){
        positionX.onchange = function() {
            positionX.value = xPostionValue = validateInputedNumber( this.value, xPostionValue );;
        };
        
        positionY.onchange = function() {
            positionY.value = yPostionValue = validateInputedNumber( this.value, yPostionValue );
        };
    };
    
    var onChangeRotation = function(){
        rotationDegree.onchange = function() {
            rotationDegree.value = rotationValue = validateInputedNumber( this.value, rotationValue );;
        };
    };
    
    var onChangeScale = function(){
        scaleX.onchange = function() {
            scaleX.value = xscaleValue = validateInputedNumber( this.value, xscaleValue );;
        };
        
        scaleY.onchange = function() {
            scaleY.value = yscaleValue = validateInputedNumber( this.value, yscaleValue );
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
        return new Vector2d( xPostionValue, yPostionValue );
    };
    
    this.getRotation = function() {
        return rotationValue;
    };
    
    this.getScale = function() {
        return new Vector2d( xscaleValue, yscaleValue );
    };
    
    this.getX = function() {
        return xPostionValue;
    };
    
    this.getY = function() {
        return yPostionValue;
    };
};