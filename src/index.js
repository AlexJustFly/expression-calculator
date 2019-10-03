function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let numberStack = [];
    let symbolStack = []; 
    let priority = {
        '+': 1,
        '-': 1,
        '*': 2,
        "/": 2,
    };
    let brackets = ['(', ')'];
    let arr = expr.split(' ');
    
    for (let i = 0; i < arr.length; i++) {
        let element = arr[i]
        if (!element) {
            continue;
        } else if (!isNaN(element)) {
        // условие для числа
            numberStack.push(element);
        } else if (element!=brackets[0] && element!=brackets[1]) {
          // условие для символа (не скобок)
            if (symbolStack.length == 0 || symbolStack[symbolStack.length-1]=="(") {
            // условие для пустого стека
                symbolStack.push(element);
            } else if (priority[element] > priority[symbolStack[symbolStack.length-1]]) {
              // условие для символа с приоритетом выше
                symbolStack.push(element);
            } else if (priority[element] == priority[symbolStack[symbolStack.length-1]]) {
              // условие для символа с равными приоритетами
                let second = numberStack.pop();
                let first = numberStack.pop();
                let symbol = symbolStack.pop();
                let res;
                    if (symbol == '-') {
                        res = first - second;
                    } else if (symbol == '+') {
                        res = parseFloat(first) + parseFloat(second);
                    } else if (symbol == '*') {
                        res = first * second;
                    } else if (symbol == '/') {
                        res = first / second;
                    }
                numberStack.push(res);
                symbolStack.push(element);
            } else {
              // условие для символа с приоритетом ниже
                let second = numberStack.pop();
                let first = numberStack.pop();
                let symbol = symbolStack.pop();
                let res;
                    if (symbol == '-') {
                        res = first - second;
                    } else if (symbol == '+') {
                        res = parseFloat(first) + parseFloat(second);
                    } else if (symbol == '*') {
                        res = first * second;
                    } else if (symbol == '/') {
                        res = first / second;
                    }
                numberStack.push(res);
                symbolStack.push(element);
                // если приоритет ниже, то 2 последних числа и последний символ в операцию
                // мб сделать равно через вайл в этом условии?
                for (;priority[symbol]==priority[element];) {
                    second = numberStack.pop();
                    first = numberStack.pop();
                    symbol = symbolStack.pop();
                        if (symbol == '-') {
                            res = first - second;
                        } else if (symbol == '+') {
                            res = parseFloat(first) + parseFloat(second);
                        } else if (symbol == '*') {
                            res = first * second;
                        } else if (symbol == '/') {
                            res = first / second;
                        } else {
                            continue;
                        }
                    numberStack.push(res);
                }
            }
        } else if (element==brackets[0]) {
          // условие для открывающей скобки
            symbolStack.push(element);
        } else if (element==brackets[1]) {
          // условие для закрывающей скобки
          let second, first, symbol, res;
          for (; symbolStack[symbolStack.length-1]!=brackets[0]; ) {
                second = numberStack.pop();
                first = numberStack.pop();
                symbol = symbolStack.pop();
                if (symbol == '-') {
                    res = first - second;
                } else if (symbol == '+') {
                    res = parseFloat(first) + parseFloat(second);
                } else if (symbol == '*') {
                    res = first * second;
                } else if (symbol == '/') {
                    res = first / second;
                }
            numberStack.push(res); 
            }           
          symbolStack.pop();
        } 
    }
    for (; !!symbolStack.length ;) {
        // когда перебор массива закончен
        let second = numberStack.pop();
        let first = numberStack.pop();
        let symbol = symbolStack.pop();
        let res;
        if (symbol == '-') {
            res = first - second;
        } else if (symbol == '+') {
            res = parseFloat(first) + parseFloat(second);
        } else if (symbol == '*') {
            res = first * second;
        } else if (symbol == '/') {
            res = first / second;
        }
    numberStack.push(res);           
    }
    let finish = numberStack[0];
    return finish;
}

module.exports = {
    expressionCalculator
}