const inquirer = require("inquirer");
const arithmetic = require("./arithmetic");
const vowel = require("./vowelCounting");
const ARITHMETIC_MODE = "Arithmetic";
const VOWEL_COUNTING_MODE = "Vowel counting";

function printWelcomeMessage() {
  console.log("Welcome to the calculator!");
}

async function selectMode() {
  let ans = await inquirer.prompt([
    {
      name: "mode",
      message: "Which calculator mode do you want?",
      type: "list",
      choices: [ARITHMETIC_MODE, VOWEL_COUNTING_MODE],
    },
  ]);
  return ans;
}

async function exit() {
  await inquirer
    .prompt([
      {
        name: "wants_to_exit",
        type: "confirm",
        message: "Do you want to exit?",
      },
    ])
    .then((answer) => {
      console.log(answer.wants_to_exit);
      if (answer.wants_to_exit) {
        process.exit(0);
      }
    });
}
(async () => {
  printWelcomeMessage();
  while (true) {
    let answer = await selectMode();
    if (answer.mode === ARITHMETIC_MODE) {
      await arithmetic.performOneCalculation();
    } else {
      await vowel.performOneCalculation();
    }
    await exit();
  }
})();
