import * as _ from "lodash";
import { readFile } from "../utils"
import { setTimeout } from "timers";

export function parseInput() {
    return readFile(`${__dirname}/input.dat`, '\r\n')
}

export function part1(data: string[]) {
    const res = data.map(b => {
        return _.uniq([...b].flatMap((c, ci) => {
            return [...b.substring(ci + 1)].map(c2 => Number(`${c}${c2}`))
        }))
    }).map(_.max)
    console.log(_.sum(res))
}

export function part2(data: string[]) {
    const res = data.map(b => {
        let m1 = findMax(b, 11)
        let res = `${m1.max}`
        while (res.length < 12) {
            m1 = findMax(m1.s, 11 - res.length)
            res = `${res}${m1.max}`
        }
        return res
    })
    console.log(res)
    console.log(_.sum(res.map(BigInt)))
}

function findMax(s: string, r: number) {
    const max = _.max([...s.substring(0, s.length - r)].map(Number))!
    const maxi = s.indexOf(`${max}`)
    return { s: s.substring(maxi + 1), max }
}
