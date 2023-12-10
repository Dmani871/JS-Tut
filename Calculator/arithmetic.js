const inquirer = require("inquirer");
const userInput = require("./userInput");
const PLUS = "+";
const MINUS = "-";
const TIMES = "*";
const DIVIDE = "/";

async function getOperator() {
  let op = await inquirer.prompt([
    {
      name: "operator",
      message: "Please enter the operator:",
      type: "list",
      choices: [PLUS, MINUS, TIMES, DIVIDE],
    },
  ]);
  return op.operator;
}

async function getNumbers(operator) {
  const iterations = await userInput.getNumberWithPrompt(
    `How many numbers do you want to ${operator}?`
  );
  let numbers = new Array(iterations);
  for (let ix = 0; ix < iterations; ix++) {
    numbers[ix] = await userInput.getNumberWithPrompt(
      `Please enter number ${ix + 1}:`
    );
  }
  return numbers;
}

function calculateAnswer(operator, numbers) {
  if (operator === PLUS) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
  } else if (operator === MINUS) {
    return numbers.slice(1).reduce((acc, curr) => acc - curr, numbers[0]);
  } else if (operator === TIMES) {
    return numbers.reduce((acc, curr) => acc * curr, 1);
  } else if (operator === DIVIDE) {
    return numbers
      .slice(1)
      .filter((x) => x !== 0)
      .reduce((acc, curr) => acc / curr, numbers[0]);
  } else {
    throw new Error(`A error has occured when prefroming the calculation.`);
  }
}

exports.performOneCalculation = async function () {
  const operator = await getOperator();
  console.log(operator);
  const numbers = await getNumbers(operator);
  const answer = calculateAnswer(operator, numbers);
  console.log(`\nThe answer is ${answer}`);
};
