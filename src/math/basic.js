const operators = {
    add: {
        symbol:"+",
        action: (a, b) => a + b
    },
    subtract: {
        symbol:"-",
        action: (a, b) => a - b
    },
    multiply: {
        symbol:"x",
        action: (a, b) => a * b
    },
    divide: {
        symbol:"/",
        action: (a, b) => a / b
    }
}

/*
  Returns the position of the first opening bracket in 'input' and its
  corresponding closing bracket. All other brackets whether inside or
  neighboring, are ignored.
*/
function findBrackets(input) {
    console.log(`   FINDING BRACKETS IN | ${input}`)
    // Position of bracket open and close
    let bracketOpen, bracketClose;

    // Used to determine whether a found closing bracket matches the opening bracket
    let bracketLevel = 0;

    for(let i = 0; i < input.length; i ++) {
        if(input[i] === "(") {
            console.log(`   found open bracket at ${i}`);
            // If bracketLevel is 0, then the target open bracket is found
            if(bracketLevel === 0) {
                bracketOpen = i;
            }
            else console.log(`   open bracket at ${i} is an inner bracket (level ${bracketLevel})`);
            bracketLevel ++;
        }
        if(input[i] == ")") {
            bracketLevel --;
            console.log(`   found close bracket at ${i}`)
            // Only set the closing bracket if it is at the same level as the open bracket
            if(bracketLevel === 0) {bracketClose = i;
                // Since no other brackets are taken into account here, return the positions
                console.log(`   closing bracket is at the correct level (${bracketLevel})`);
                console.log(`   returning [${bracketOpen}, ${bracketClose}]`);
                return [bracketOpen, bracketClose]; 
            }  
        }
    }
    return [];
}

/*
  Finds the correct mathematical operation to perform next, as well as
  the position of the operator in the array for slicing purposes.
*/
function findOperator(input) {
    console.log(`   FINDING OPERATOR IN | ${input}`);
    // Checks for addition and subtraction first. This is because the recursive
    // design will perform these last.
    for(let i in input) {
        if(input[i] === operators.add.symbol) {
            console.log(`   found ${input[i]} at pos ${i}. returning function: ${operators.add.action}`);
            return [operators.add.action, i];
        }
        if(input[i] === operators.subtract.symbol) {
            console.log(`   found ${input[i]} at pos ${i}. returning function: ${operators.subtract.action}`);
            return [operators.subtract.action, i];
        }
    }

    // If there are no addition or subtractions, check for multiplication and division
    for(let i = 0; i < input.length; i ++) {
        if(input[i] === operators.multiply.symbol) { 
            console.log(`   found ${input[i]} at pos ${i}. returning function: ${operators.multiply.action}`);
            return [operators.multiply.action, i];
        }
        if(input[i] === operators.divide.symbol) {
            console.log(`   found ${input[i]} at pos ${i}. returning function: ${operators.divide.action}`);
            return [operators.divide.action, i];
        }
    }
   
    console.log(`Couldn't find any operators for ${input}`)
    return [null, -1];
}

/*
  Main function that formats a string input for ease of calculation. Its
  main role is to calland return the recursive function 'solve'.
*/
function calculate(input) {
    console.log(`input: ${input}`)
    let exp = input.replace(/\(/g, "( "); // Add a space after all opening brackets
    exp = exp.replace(/\)/g, " )");       // Add a space before all closing brackets
    exp = exp.replace(/\s+/g, ' ');       // All whitespace should be a single space
    exp = exp.trim();                     // Allows the first number to be negative
    exp = exp.split(" ");                 // Convert to an array for ease of operation
    console.log(`formatted input: ${exp}`)
    return solve(exp);
}


function solve(exp) {
    if(exp.length < 1) {
        return exp;
    }
    // Termination condition. Ends if expression is simply a number.
    if(exp.length == 1) {
        if(["(", ")", "+", "-", "x", "/"].includes(exp))
            console.log(`only a single element (${exp}) remains. Returning ${Number(exp)}`);

        return parseFloat(exp);
    }    

    // If brackets are present, solve each one before continuing and
    //replace the brackets in the expression with the solved content
    let brackets = findBrackets(exp);
    while(brackets[0] > -1) {
        const left = exp.slice(0, brackets[0]);
        const right = exp.slice(brackets[1] + 1);
        console.log(`building from: left = ${left}, right = ${right}`)
        exp = [
            ...left, 
            solve(exp.slice(brackets[0]+1, brackets[1])),
            ...right
        ];

        console.log(`rebuilt exp: ${exp}`)
        brackets = findBrackets(exp);
    }
    console.log("No more brackets to solve");

    // Find the next operator, split into two expressions to calculate
    // and operate on their final returned values
    const [operation, position] = findOperator(exp);
    let left = exp.slice(0, position);
    let right = exp.slice(position + 1);

    console.log(`performing ${operation} on: ${left}  and  ${right}`);

    return operation(solve(left), solve(right));
}

export default calculate;