/**
 * Value type of object
 * @param val
 * @returns {boolean}
 */
export const isObject = (val) => {
  switch (typeof val) {
    case 'null':
      return false
    case 'object':
      return true
    case 'function':
      return true
    default: {
      return false
    }
  }
}

/**
 * Value type of string
 * @param val
 * @returns {boolean}
 */
export const isString = (val) => {
  return typeof val === 'string'
}

/**
 * Value type of number
 * @param val
 * @returns {boolean}
 */
export const isNumber = (val) => {
  return typeof val === 'number'
}

/**
 * Value type of boolean
 * @param val
 * @returns {boolean}
 */
export const isBoolean = (val) => {
  return typeof val === 'boolean'
}

export const isFunction = (fn) => {
  return typeof fn === 'function' || fn instanceof Promise
}

/**
 * Convert string to target type
 * @param val
 * @returns {*}
 */
export const convertStringToTargetType = (val) => {
  return val === 'true' || val === 'false' ? val === 'true' : !isNaN(val) ? Number(val) : val
}
