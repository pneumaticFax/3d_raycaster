fastIntersection = function(x1, y1, x2, y2, x3, y3, x4, y4){
    let x1lo, x1hi, y1lo, y1hi;

    let Ax = x2-x1;
    let Bx = x3-x4;

    /* X bound box test*/
    //Ax is x2 - x1 so if it is negative then x1 is hi and x2 is low, or x1 is to the right or left of x2
    if(Ax < 0){
        x1lo = x2;
        x1hi = x1;
    }else{
        x1hi = x2;
        x1lo = x1;
    }
    //Bx is x3 - x4 so if it is positive then x3 is larger than x4, or to the right on x4
    if(Bx > 0){
        //if x1hi is smaller than x4 the line segment doesn't reach. x1 is to the left of x4
        //if x3 (the larger) is to the left of X1 (low) it doesn't reach and no intersection
        //x1,x2 are both to the left of x3,x4
        if(x1hi < x4 || x3 < x1lo) {
            return [];
        }
    }
    else {
        //if x1 high (right) is smaller than x3 (larger than x4) it doesn't reach and no intersection
        //if x1 low is larger than x4, the smaller - it (x1,x2) is to the right of both x3,x4.
        if(x1hi < x3 || x4 < x1lo){
            return [];
        }
    }



    /* Y bound box test*/
    let Ay = y2-y1;
    let By = y3-y4;

    if(Ay<0) {
        y1lo=y2;
        y1hi=y1;
    } else {
        y1hi=y2;
        y1lo=y1;
    }
    if(By>0) {
        if(y1hi < y4 || y3 < y1lo){
            return [];
        }
    } else {
        if(y1hi < y3 || y4 < y1lo) {
            return []
        }
    }

    let Cx = x1-x3;
    let Cy = y1-y3;
    let denominator = Ay*Bx - Ax*By;

    //lines are parallel
    if(denominator === 0 ){
        return [];
    }

    let alpha_numerator = By*Cx - Bx*Cy;  //alpha numerator
    if (denominator > 0) {
        if (alpha_numerator < 0 || alpha_numerator > denominator) {
            return [];
        }
    } else {
        if( alpha_numerator > 0 || alpha_numerator < denominator){
            return [];
        }
    }

    let beta_numerator = Ax*Cy-Ay*Cx;
    if (denominator > 0) {
        if (beta_numerator < 0 || beta_numerator > denominator) {
            return []
        }
    } else {
        if( beta_numerator > 0 || beta_numerator < denominator){
            return [];
        }
    }

    let intersection_point = [];
    let num = alpha_numerator * Ax;
    let offset = SAME_SIGNS(num, denominator) ? denominator/2: -(denominator/2);


    //      x1 + (x2-x1)   * ((( By*Cx-Bx*Cy) + [(Ay*Bx - Ax*By)/2)])/(Ay*Bx - Ax*By)
    //      x1 + (1/2 +  alpha)(x2-x1)  where alpha is ((By*Cx-Bx*Cy)/(Ay*Bx - Ax*By))
    //or    x1 + (-1/2 + alpha)(x2-x1)  where alpha is ((By*Cx-Bx*Cy)/(Ay*Bx - Ax*By))
    intersection_point[0] = x1+(num+offset)/denominator;

    num = alpha_numerator * Ay;
    offset = SAME_SIGNS(num, denominator) ? denominator/2: -(denominator/2);
    intersection_point[1] = y1+(num+offset)/denominator;

    return intersection_point;
}

SAME_SIGNS = function(a, b){
    return (a >= 0 && b >= 0) || (a < 0 && b <0);
}