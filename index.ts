#! /usr/bin/env node

import inquirer from "inquirer";
import Choices from "inquirer/lib/objects/choices.js";
import chalk from "chalk";

let myBalance = 10000;
let myPin = 1234;

console.log(chalk.magenta.italic("\t\nWellcom to my ATM Machine \t\n"));

let pinAnswer = await inquirer.prompt([
  {
    name: "pin",
    message: chalk.cyan("Enter your pin code.... "),
    type: "number",
  },
]);

if (pinAnswer.pin === myPin) {
  console.log(chalk.whiteBright("correct pin code !!!"));

  let operationAns = await inquirer.prompt([
    {
      name: "operation",
      message: chalk.blue("please Select any one of the option"),
      type: "list",
      choices: ["withdraw", "check balance"],
    },
  ]);
  if (operationAns.operation === "withdraw") {
    let choseAns = await inquirer.prompt([
      {
        name: "chose",
        message: chalk.cyan("Select your Transaction Method"),
        type: "list",
        choices: ["Enter Amount", "Fast Cash"],
      },
    ]);
    if (choseAns.chose === "Enter Amount") {
      let amountAns = await inquirer.prompt([
        {
          name: "amount",
          message: chalk.yellowBright("Enter The Amount you Want to Withdraw"),
          type: "number",
        },
      ]);

      if (amountAns.amount <= myBalance && amountAns.amount >= 500) {
        myBalance -= amountAns.amount;
        console.log(chalk.green(`your current balance is: ${myBalance}`));
      } else {
        console.log(chalk.red.bold("your current balance is insufficient ! "));
      }
    }
    //
    if (choseAns.chose === "Fast Cash") {
      let fastCashAns = await inquirer.prompt([
        {
          name: "fastCash",
          message: "please select your Amount",
          type: "list",
          choices: [1000, 5000, 10000, 20000],
        },
      ]);

      if (fastCashAns.fastCash >= myBalance && fastCashAns.fastCash >= 500) {
        myBalance -= fastCashAns.fastCash;
        console.log(chalk.red.bold("your current balance is insufficient ! "));
      } else {
        console.log(chalk.green.dim(`your remainig balance is: ${myBalance}`));
      }
    }
  }
  if (operationAns.operation === "check balance") {
    console.log(`your current balance is: ${myBalance}`);
  }
} else {
  console.log(chalk.redBright.underline("Incorrect pin code"));
}
