import * as _ from "lodash";
import { readFile } from "../utils"

export function parseInput() {
    return readFile(`${__dirname}/input.dat`, '\r\n')
}

export function part1(data: string[]) {
    const res = data[0].split(',').map(s => s.split('-').map(Number))
    const r = res.flatMap(r => {
        return _.range(r[0], r[1] + 1, 1).filter(n => {
            const s = n.toString()
            return s.length % 2 == 0 ? s.substring(0, s.length / 2) == s.substring(s.length / 2) : false
        })
    })
    console.log(_.sum(r))
}

export function part2(data: string[]) {
    const res = data[0].split(',').map(s => s.split('-').map(Number))
    const r = res.flatMap(r => {
        return _.range(r[0], r[1] + 1, 1).filter(n => {
            const s = n.toString()
            const r = _.range(1, s.length / 2 + 1, 1).filter(i => {                
                const p = s.substring(0, i)                
                const l = s.length / p.length
                return p.repeat(l) == s && l > 1
            })            
            return r.length > 0
        })
    })
    console.log(_.sum(r))
}