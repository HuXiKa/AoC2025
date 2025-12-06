import * as _ from "lodash"
import { inspect, readFile } from "../utils"

export function parseInput() {
    return readFile(`${__dirname}/input.dat`, '\r\n')
}

export function part1(data: string[]) {
    const ops = data.pop()!.split('').filter(s => s != ' ')
    const lines = data.map(l => l.match(/\d+/g)!.map(Number))
    console.log(ops, lines)
    const res = ops.map((o, i) => {
        if (o === '+') return _.sum(lines.map(l => l[i]))
        else return lines.map(l => l[i]).reduce((a, b) => a * b, 1)
    })
    console.log(_.sum(res))
}

export function part2(data: string[]) {
    const ops = data.pop()!.split('').filter(s => s != ' ')
    const t = _.zip(...data.map(l => l.split(''))).map(col => col.join('').trimEnd()).reduce((acc, curr) => {
        if (curr.length != 0) {
            const last = acc.pop()!
            last.push(Number(curr))
            acc.push(last)
            return acc
        } else {
            return [...acc, [] as number[]]
        }
    }, [[]] as number[][])
    console.log(ops, t)
    const res = ops.map((o, i) => {
        if (o === '+') return _.sum(t[i])
        else return t[i].reduce((a, b) => a * b, 1)
    })
    console.log(_.sum(res))
}