// Utils

export const cons = (n) => (value) => new Array(n).fill(value)

export const fst = (x) => x[0]
export const snd = (x) => x[1]

export const createMatrice = (x) => (y) => (value) => cons(x)(value).map(cons(y))
