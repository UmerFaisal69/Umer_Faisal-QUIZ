"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const apiLink = "https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple";
let fetchData = async (data) => {
    let fetchQuiz = await fetch(data);
    let res = await fetchQuiz.json();
    return res.results;
};
let data = await fetchData(apiLink);
let startQuiz = async () => {
    let score = 0;
    // for username
    let name = await inquirer_1.default.prompt({
        type: "input",
        name: "fname",
        message: "What Is Your Name ?"
    });
    for (let i = 1; i <= 5; i++) {
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer_1.default.prompt({
            type: "list",
            name: "Quiz",
            message: data[i].question,
            choices: answers.map((val) => val),
        });
        if (ans.Quiz == data[i].correct_answer) {
            ++score;
            console.log(chalk_1.default.bold.italic.blue("Correct"));
        }
        else {
            console.log(`Correct Answer IS ${chalk_1.default.bold.italic.red(data[i].correct_answer)}`);
        }
    }
    console.log(`Dear ${chalk_1.default.green.bold(name.fname)}, Your Score Is ${chalk_1.default.red.bold(score)} Out of ${chalk_1.default.red.bold("5")}`);
};
startQuiz();
