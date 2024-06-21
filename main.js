import { differenceInSeconds } from 'date-fns';
import inquirer from 'inquirer';
async function getUserInput() {
    const res = await inquirer.prompt({
        type: "input",
        name: "userInput",
        message: "Please enter the amount of seconds:",
        validate: (input) => {
            const num = parseInt(input); // Parse input to integer
            if (isNaN(num)) {
                return "Please enter a valid number.";
            }
            else if (num > 60) {
                return "Seconds must be less than or equal to 60.";
            }
            else {
                return true;
            }
        }
    });
    return parseInt(res.userInput);
}
function startTime(val) {
    const intervalTime = new Date();
    intervalTime.setSeconds(intervalTime.getSeconds() + val);
    const timer = setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if (timeDiff <= 0) {
            console.log("Time has expired");
            clearInterval(timer); // Stop the timer
            process.exit();
        }
        const min = Math.floor((timeDiff % 3600) / 60);
        const sec = Math.floor(timeDiff % 60);
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }, 1000);
}
async function main() {
    const userInput = await getUserInput();
    startTime(userInput);
}
main();
