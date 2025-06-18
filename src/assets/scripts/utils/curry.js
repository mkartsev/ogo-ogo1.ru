export const curry = (func) => {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args)
    }

    return function continueCurrying(...args2) {
      return curried.apply(this, args.concat(args2))
    }
  }
}