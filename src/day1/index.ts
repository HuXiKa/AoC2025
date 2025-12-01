import * as _ from "lodash";
import { readFile } from "../utils"
import wordsToNumbers from 'words-to-numbers';

export function parseInput() {
    return readFile(`${__dirname}/input.dat`, '\r\n')
}

export function part1(data: string[]) {    
    const res = data.reduce((acc, curr) => {return curr[0] == 'R' ? [...acc, (_.last(acc)! + Number(curr.slice(1))) % 100] : [...acc, (_.last(acc)! - Number(curr.slice(1))) % 100]}, [50])
    console.log(res.filter(r => r == 0).length)
}

export function part2(data: string[]) {
    const res = data.reduce((acc, curr) => {return curr[0] == 'R' ? {t: [...acc.t, ((_.last(acc.t)! + Number(curr.slice(1))) % 100 + 100)% 100], r: [...acc.r, _.last(acc.r)! + _.range(0, Number(curr.slice(1)), 1).filter(n => (((_.last(acc.t)! + n)% 100) + 100) % 100 == 0).length] } : {t: [...acc.t, ((_.last(acc.t)! - Number(curr.slice(1))) % 100 + 100)% 100], r:[...acc.r, _.last(acc.r)! + _.range(0, Number(curr.slice(1)), 1).filter(n => (((_.last(acc.t)! - n) % 100) + 100) % 100 == 0).length]}}, {t: [50], r: [0]})
    console.log(_.last(res.r))
}