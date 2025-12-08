import * as _ from "lodash"
import { inspect, readFile } from "../utils"

export function parseInput() {
    return readFile(`${__dirname}/input.dat`, '\r\n')
}

export function part1(data: string[]) {
    const height = data.length - 1
    const width = data[0].length - 1

    let count = 0

    _.range(0, height + 1).map(r => {
        _.range(0, width + 1).map(c => {
            if (r >= 1 && data[r - 1][c] == 'S') {
                data[r] = setCharAt(data[r], c, '|')
            }
            else if (r >= 1 && data[r - 1][c] == '|' && data[r][c] == '.')
                data[r] = setCharAt(data[r], c, '|')
            else if (r >= 1 && data[r - 1][c] == '|' && data[r][c] == '^') {
                data[r] = setCharAt(data[r], c - 1, '|')
                data[r] = setCharAt(data[r], c + 1, '|')
                count += 1
            }
        })
    })

    _.range(0, height + 1).map(r => {
        _.range(0, width + 1).map(c => {
            process.stdout.write(data[r].charAt(c))
        })
        process.stdout.write('\n')
    })

    console.log(count)
}

export function part2(data: string[]) {
    const height = data.length - 1
    const width = data[0].length - 1

    const res = data.map(r => [...r].map(_ => 0))

    let count = 0

    _.range(0, height + 1).map(r => {
        _.range(0, width + 1).map(c => {
            if (r >= 1 && data[r - 1][c] == 'S') {
                res[r][c] = res[r][c] == 0 ? 1 : res[r][c] + 1
            }
            else if (r >= 1 && (res[r - 1][c] != 0) && data[r][c] == '.') {
                res[r][c] = res[r][c] == 0 ? res[r - 1][c] : (res[r][c] + res[r - 1][c])
            }
            else if (r >= 1 && (res[r - 1][c] != 0) && data[r][c] == '^') {
                res[r][c - 1] = res[r][c - 1] == 0 ? res[r - 1][c] : (res[r - 1][c] + res[r][c - 1])
                res[r][c + 1] = res[r][c + 1] == 0 ? res[r - 1][c] : (res[r - 1][c] + res[r][c + 1])

                count += 1
            }
        })
    })
    /*
    _.range(0, height + 1).map(r => {
        _.range(0, width + 1).map(c => {
            process.stdout.write(data[r][c])
        })
        process.stdout.write('\n')
    })


    _.range(0, height + 1).map(r => {
        _.range(0, width + 1).map(c => {
            process.stdout.write(res[r][c].toString())
        })
        process.stdout.write('\n')
    })

    console.log(count)
    console.log([..._.last(res)!])*/
    console.log(_.sum(_.last(res)!))
}

function setCharAt(str: string, index: number, chr: string) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}