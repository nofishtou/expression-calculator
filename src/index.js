function eval() {
    // Do not use eval!!!
    return;
}

function  isSpace (c) {
    if (c === ' ') {
      return true
    } 
    return false
  }
  
  function isOperator(c) { 
      if ('(' === c || ')' === c || '+' === c || '-' === c || '*' === c || '/' === c) {
        return true
      }
      return false
  }
  
  function getPriority(s) {
    if(s === '(') {
      return 0;
    } else if (s === ')') {
      return 1;
    } else if (s === '+') {
      return 2;
    } else if (s === '-') {
      return 3;
    } else if (s === '*') {
      return 4
    } else {
      // division priority is 5
      return 5
    }
  }
  
  function expressionCalculator(expr) {
      let postfixExpr = '' 
      let operationStack = []
      let result = 0
      let tempStack = [] 
      let counter = 0

      // check brackets
      for(let i = 0; i < expr.length; i ++) {
        if(expr[i] === '(') {
          counter++
        } 
        if(expr[i] === ')') {
          counter--
        }
      }
      if ( counter !== 0) {
        throw new Error('ExpressionError: Brackets must be paired')
      }
      
      // build postfix expr
      for (let i = 0; i < expr.length; i++){
        if (isSpace(expr[i])){
          continue 
        }
  
        // add number
        if (Number.isInteger(+expr[i]) && expr[i] !== ' ') {
            while(!isSpace(expr[i]) && !isOperator(expr[i])){
              postfixExpr += expr[i]
              i++
              if (i === expr.length) break;
            }        
            postfixExpr += ' ' 
            i--             
        }
  
        // add operator
        if (isOperator(expr[i])) {
          if (expr[i] === '(') {
            operationStack.push(expr[i])
          } else if (expr[i] ===')') {            
            let s = operationStack.pop()
            // add all operators in brackets
            while(s !== '(') {
              postfixExpr += s + ' '
              s = operationStack.pop()
            }
          } else {
            // check priority of 2 last items
            if (operationStack.length > 0) {
              if (getPriority(expr[i]) <= getPriority(operationStack[operationStack.length-1])) {
                postfixExpr += operationStack.pop() + ' '
                if (operationStack.length > 0) {
                  if (getPriority(expr[i]) <= getPriority(operationStack[operationStack.length-1])) {
                    postfixExpr += operationStack.pop() + ' '
                  } 
                } 
              } 
            }  
            operationStack.push(expr[i])
          }
        }    
      }
      // add operators, that left
      while (operationStack.length > 0){
        postfixExpr += operationStack.pop() + ' '
      }

      //check postfixExpr
      for (let i = 0; i < postfixExpr.length; i++) {
        if (Number.isInteger(+postfixExpr[i]) && postfixExpr[i] !== ' ') {
          let a = ''
          while (!isSpace(postfixExpr[i]) && !isOperator(postfixExpr[i])) {
            a += postfixExpr[i] 
            i++
            if (i === postfixExpr.length) {
              break
            }
          }
          tempStack.push(a)
          i--
        } else if (isOperator(postfixExpr[i])) {
          let a = tempStack.pop() 
          let b = tempStack.pop()
     
          if (postfixExpr[i] === '+') { 
            result = +b + +a
          } else if (postfixExpr[i] === '-') {
            result = b - a
          } else if (postfixExpr[i] === '*') {
            result = b * a
          } else {
            if( +a === 0 ) {
              throw new Error("TypeError: Division by zero.")
            }
            result = b / a
          }
     
          tempStack.push(+result)
        }
      }
      
      result = +tempStack.pop().toFixed(4) 

      return result
  }
  
module.exports = {
    expressionCalculator
}