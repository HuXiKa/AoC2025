import * as _ from "lodash"
import { inspect, readFile } from "../utils"

export function parseInput() {
    return readFile(`${__dirname}/input.dat`, '\r\n')
}

export function part1(data: string[]) {
    const points = data.map(r => r.split(',').map(Number)).map(p => { return { x: p[0], y: p[1], z: p[2] } })
    //console.log(points)    
    const res = _.take(_.uniqBy(points.flatMap(p => points.filter(q => q != p).map(q => { return { p: p, q: q, dist: dist(p, q) } })).sort((a, b) => a.dist - b.dist), 'dist'), 1000)
    //console.log(res)
    const r = res.reduce((acc, curr) => {
        const p1Index = acc.findIndex(circuit => circuit.includes(curr.p))
        const p2Index = acc.findIndex(circuit => circuit.includes(curr.q))
        if (p1Index == -1 && p2Index == -1) {
            acc.push([curr.p, curr.q])
        } else if (p1Index != -1 && p2Index == -1) {
            acc[p1Index].push(curr.q)
        } else if (p1Index == -1 && p2Index != -1) {
            acc[p2Index].push(curr.p)
        } else if (p1Index != -1 && p2Index != -1 && p1Index != p2Index) {
            acc[p1Index] = acc[p1Index].concat(acc[p2Index])
            acc.splice(p2Index, 1)
        }
        return acc
    }, [] as { x: number, y: number, z: number }[][])

    console.log(_.take(r.map(circuit => circuit.length).sort((a, b) => b - a), 3).reduce((a, b) => a * b, 1))
}

export function part2(data: string[]) {
    const m = data.length
    let f = undefined as unknown as { p: { x: number, y: number, z: number }, q: { x: number, y: number, z: number }, dist: number }
    const points = data.map(r => r.split(',').map(Number)).map(p => { return { x: p[0], y: p[1], z: p[2] } })
    //console.log(points)    
    const res = _.uniqBy(points.flatMap(p => points.filter(q => q != p).map(q => { return { p: p, q: q, dist: dist(p, q) } })).sort((a, b) => a.dist - b.dist), 'dist')
    const r = res.reduce((acc, curr) => {
        const p1Index = acc.findIndex(circuit => circuit.includes(curr.p))
        const p2Index = acc.findIndex(circuit => circuit.includes(curr.q))
        if (p1Index == -1 && p2Index == -1) {
            acc.push([curr.p, curr.q])
        } else if (p1Index != -1 && p2Index == -1) {
            acc[p1Index].push(curr.q)
        } else if (p1Index == -1 && p2Index != -1) {
            acc[p2Index].push(curr.p)
        } else if (p1Index != -1 && p2Index != -1 && p1Index != p2Index) {
            acc[p1Index] = acc[p1Index].concat(acc[p2Index])
            acc.splice(p2Index, 1)
        }
        if (acc.length == 1 && acc[0].length == m) {            
            if (!f) f = curr            
        }
        //console.log(acc.length, acc[0].length)
        return acc
    }, [] as { x: number, y: number, z: number }[][])
    
    //console.log(r, f)

    console.log(f.p.x * f.q.x)
}

function dist(p1: { x: number, y: number, z: number }, p2: { x: number, y: number, z: number }) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 + (p1.z - p2.z) ** 2)
}