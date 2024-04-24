#!/usr/bin/env node
'use-strict'

const readlinePromises = require('node:readline/promises');
const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const numberGen = (min, max) => {
    const rndNum = Math.round(Math.random() * (max - min) + min);
    console.log(`A number in the range from ${min} to ${max} has been guessed`);
    return rndNum;
};

const checkNum = (num, minNum, maxNum) => {
    if (isNaN(num) || Number(num) > maxNum || Number(num) < minNum) return console.log('input err');
    else if (Number(num) < gameObj.rndNum) return console.log(`fail, the number is greater than ${num}`);
    else if ((Number(num) > gameObj.rndNum)) return console.log(`fail, the number is less than ${num}`);
};

const gameObj = {
    minNum: 1,
    maxNum: 100,
    gameEnd: false,
    rndNum: 0,
};
gameObj.rndNum = numberGen(gameObj.minNum, gameObj.maxNum);

rl.on('line', (num) => {
    if (num === 'exit') return rl.close();
    if (!gameObj.gameEnd) checkNum(num, 1, 100);
    if (num === 'play' && gameObj.gameEnd) {
        gameObj.gameEnd = false;
        gameObj.rndNum = numberGen(gameObj.minNum, gameObj.maxNum);
    }
    if (Number(num) === gameObj.rndNum) {
        console.log(`Congratulations, you guessed it, it's the number ${gameObj.rndNum}!`);
        gameObj.gameEnd = true;
        console.log('play again? (play/exit)')
    }
});

