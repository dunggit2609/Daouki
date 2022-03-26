import isPlain from 'is-plain-object'
import { isObject } from 'core/utils/type'
import _ from 'loadsh'

/**
 * Merge target object with value
 * @param target
 * @param path
 * @param value
 * @returns {*}
 */
export const merge = (target, path, value) => {
  if (isPlain(target[path]) && isPlain(value)) {
    target[path] = Object.assign({}, target[path], value)
  } else {
    target[path] = value
  }

  return target
}

/**
 * Get object value by key
 * @param key
 * @param object
 * @returns {*}
 */
export const getObjectValueByKey = (object, keys) => {
  if (!keys || keys.length == 0) {
    return object
  }
  if (!isObject(object)) {
    return undefined
  }
  if (keys.length == 1) return object[keys[0]]
  return getObjectValueByKey(object[keys[0]], keys.slice(1, keys.length))
}

/**
 * Is diff two object
 * @param object1
 * @param object2
 * @returns {boolean}
 */
export const isObjectDiff = (object1, object2) => {
  return JSON.stringify(object1) !== JSON.stringify(object2)
}

/**
 * Has own property
 *
 * @param obj
 * @param key
 * @returns {boolean}
 */
export const hasOwn = (obj, key) => {
  return obj && isObject(obj) && key in obj
}

/**
 * Is empty
 * @param obj
 * @returns {boolean}
 */
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0
}

export const sumObjectValues = (obj) => {
  return Object.keys(obj).reduce((sum, key) => sum + parseFloat(obj[key] || 0), 0)
}

export const convertValueObjToString = (obj) => {
  const newObj = {}
  Object.keys(obj).forEach((k) => {
    if (typeof obj[k] === 'object') {
      return toString(obj[k])
    }

    newObj[k] = '' + obj[k]
  })

  return newObj
}

export const convertObjectCamelToSnake = (obj) => {
  const newObj = {}
  Object.keys(obj).forEach((k) => {
    newObj[_.snakeCase(k)] = obj[k]
  })

  return newObj;
}
export const convertObjectSnakeToCamel = (obj) => {
  return  _.mapKeys(obj, (value, key) => _.camelCase(key));
}
