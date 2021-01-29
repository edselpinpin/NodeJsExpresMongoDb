const recta = require('./rectangle')

const solveRect = function(l,w) 
{
      console.log(`Solving for rectangle with decial: ${l}, ${w}`);
      recta(1,w,(err, rectangle) => {
            if (err) {
                  console.log('ERROR:', err.message);
            } else {
                  console.log(`Area of rectangle with dimenssions ${1}, ${2} is : ${rectangle.area()}`);
                  console.log(`Area of rectangle with dimenssions ${1}, ${2} is: ${rectangle.perimeter()}`);
            }    
      });
      console.log(`This statement is logged after th call to rect()`)
}    


solveRect(2, 4);
solveRect(3, 5);
solveRect(0,5);
solveRect(0,-5);


