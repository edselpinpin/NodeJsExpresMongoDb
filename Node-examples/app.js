const rect = require('./rectangle')

const solveRect = function(l,w) {
      console.log(`Solving for rectangle with decial: ${l}, ${w}`);
   if (l <= 0 || w <= 0)  {
        console.log(`Rectangle dim must be greater than zero, Received: ${l}, ${w}`);
   } else  {
       console.log(`Area of rectangle: ${rect.area(l,w)}`);
       console.log(`Area of rectangle: ${rect.perimiter(l,w)}`);
     }
 
}

solveRect(2, 4);
solveRect(3, 5);
solveRect(0,5);
solveRect(0,-5);


