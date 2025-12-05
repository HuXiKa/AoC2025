import * as _ from "lodash";
import { inspect, readFile } from "../utils"
import { setTimeout } from "timers";

export function parseInput() {
    return readFile(`${__dirname}/input.dat`, '\r\n')
}

export function part1(data: string[]) {
    const height = data.length - 1
    const width = data[0].length - 1

    const neightbours = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
    const rolls = data.map(l => Array.from(l.matchAll(/@/g))).flatMap((row, ri) => row.map(m => { return { r: ri, c: m['index']!, ch: data[ri][m['index']!] } }))
    inspect(rolls)

    const res = rolls.filter(s => {
        const c = _.countBy(neightbours.filter(n => isInBounds(s.r, n[0], height) && isInBounds(s.c, n[1], width)).map(n => { return { r: inBounds(s.r, n[0], height), c: inBounds(s.c, n[1], width) } }), np => {
            return data[np.r][np.c] == '@'
        })
        console.log(c)
        return c['true'] < 4 || c['true'] == undefined
    })

    console.log(res)

    _.range(0, height + 1).map(r => {
        _.range(0, width + 1).map(c => {
            if (res.flat().find(i => i?.r == r && i?.c == c))
                process.stdout.write(`\x1b[31m${'x'}\x1b[0m`)
            else
                process.stdout.write(data[r].charAt(c))
        })
        process.stdout.write('\n')
    })

    console.log(res.length)
}

export function part2(data: string[]) {
    const height = data.length - 1
    const width = data[0].length - 1

    const neightbours = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
    const rolls = data.map(l => Array.from(l.matchAll(/@/g))).flatMap((row, ri) => row.map(m => { return { r: ri, c: m['index']!, ch: data[ri][m['index']!] } }))
    inspect(rolls)

    let res = rolls.filter(s => {
        const c = _.countBy(neightbours.filter(n => isInBounds(s.r, n[0], height) && isInBounds(s.c, n[1], width)).map(n => { return { r: inBounds(s.r, n[0], height), c: inBounds(s.c, n[1], width) } }), np => {
            return data[np.r][np.c] == '@'
        })
        console.log(c)
        return c['true'] < 4 || c['true'] == undefined
    })   

    while (res.length > 0) {
        const rolls = data.map(l => Array.from(l.matchAll(/@/g))).flatMap((row, ri) => row.map(m => { return { r: ri, c: m['index']!, ch: data[ri][m['index']!] } }))
        inspect(rolls)

        res = rolls.filter(s => {
            const c = _.countBy(neightbours.filter(n => isInBounds(s.r, n[0], height) && isInBounds(s.c, n[1], width)).map(n => { return { r: inBounds(s.r, n[0], height), c: inBounds(s.c, n[1], width) } }), np => {
                return data[np.r][np.c] == '@'
            })
            //console.log(c)
            return c['true'] < 4 || c['true'] == undefined
        })        

        res.forEach(r => data[r.r] = setCharAt(data[r.r], r.c, 'x'))

        /*_.range(0, height + 1).map(r => {
            _.range(0, width + 1).map(c => {
                if (res.flat().find(i => i?.r == r && i?.c == c))
                    process.stdout.write(`\x1b[31m${'x'}\x1b[0m`)
                else
                    process.stdout.write(data[r].charAt(c))
            })
            process.stdout.write('\n')
        })*/
    }

    //console.log(res)
    console.log('--------------------------')

    _.range(0, height + 1).map(r => {
        _.range(0, width + 1).map(c => {
            process.stdout.write(data[r].charAt(c))
        })
        process.stdout.write('\n')
    })
    const removedRolls = data.map(l => Array.from(l.matchAll(/x/g))).flatMap((row, ri) => row.map(m => { return { r: ri, c: m['index']!, ch: data[ri][m['index']!] } }))
    console.log(removedRolls.length)    
}

function inBounds(r: number, curr: number, height: number): number {
    return Math.min(Math.max(r + curr, 0), height);
}


function isInBounds(r: number, curr: number, height: number): boolean {
    return (r + curr >= 0 && r + curr <= height)
}

function setCharAt(str: string, index: number, chr: string) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}