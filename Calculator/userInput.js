const inquirer = require("inquirer");

const isNumValidator = async (input) => {
  console.log("\n");
  console.log(input);
  if (isNaN(input) && Number(input) > 0) {
    return `${input} is not a number`;
  }
  return true;
};

exports.getStringWithPrompt = async function (prompt) {
  let ans = await inquirer.prompt({
    name: "str",
    message: prompt,
    type: "input",
  });
  return ans.str;
};

exports.getNumberWithPrompt = async function (prompt) {
  let ans = await inquirer.prompt({
    name: "number",
    message: prompt,
    type: "input",
    validate: isNumValidator,
  });
  return Number(ans.number);
};
