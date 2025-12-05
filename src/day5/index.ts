import * as _ from "lodash";
import { inspect, readFile } from "../utils"

export function parseInput() {
    return readFile(`${__dirname}/input.dat`, '\r\n\r\n')
}

export function part1(data: string[]) {
    const ranges = data[0].split('\r\n').map(r => r.split('-').map(Number))
    const ids = data[1].split('\r\n').map(Number)
    //console.log(ranges, ids)
    const res = ids.filter(id => {
        return _.some(ranges, r => r[0] <= id && r[1] >= id)
    })
    console.log(res.length)
}

export function part2(data: string[]) {
    const ranges = data[0].split('\r\n').map(r => r.split('-').map(Number)).sort((a, b) => a[0] - b[0])
    console.log(ranges)
    const res = ranges.reduce((acc, curr) => {
        //console.log(acc, curr)
        if (acc.length == 0) return [curr]
        else {
            const l = _.last(acc)!
            //console.log('  ', l)            
            if (l[1] >= curr[0]) {
                acc.pop()
                const merged = [l[0], Math.max(l[1], curr[1])]
                //console.log('merging ', last, ' and ', curr, 'into', merged)
                return [...acc, merged]
            } else return [...acc, curr]
        }
    }, [] as number[][])
    console.log(res)
    console.log(_.sum(res.map(r => r[1] - r[0] + 1)))
}