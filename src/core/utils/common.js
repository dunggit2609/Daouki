/* eslint-disable no-useless-escape */
import { hasOwn } from 'core/utils/object'
import { isObject } from 'core/utils/type'

/**
 * generateTruncate
 * @param str
 * @param length
 * @return {string}
 */
export const generateTruncate = (str, length) => {
  if (str.length > length) {
    return `${str.slice(0, length)}..`
  }
  return str
}

/**
 * Is def
 * @param v
 * @return {boolean}
 */
export const isDef = (v) => v !== undefined

/**
 * Clone deep
 * @param obj
 */
export const cloneDeep = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(cloneDeep)
  } else if (obj && typeof obj === 'object') {
    const cloned = {}
    const keys = Object.keys(obj)
    for (let i = 0, l = keys.length; i < l; i++) {
      const key = keys[i]
      cloned[key] = cloneDeep(obj[key])
    }
    return cloned
  } else {
    return obj
  }
}

/**
 * UpperFirstLetter
 * @param str
 */
export const upperFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * isValidEmail
 * @param email
 */
export const isValidEmail = (email) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (email.match(regex)) return true
  return false
}

/**
 * Generate handle
 * @param value
 */
export const generateHandle = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
  str = str.replace(/Đ/g, 'D')
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, '') // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng
  str = str.replace(/\s/g, '-')
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    '-'
  )
  str = str.toLowerCase()
  return str
}
/**
 * newCloneDeep
 * @param obj
 */
export const newCloneDeep = (obj) => {
  if (Array.isArray(obj) || (obj && typeof obj === 'object')) {
    return JSON.parse(JSON.stringify(obj))
  }
  return []
}

/**
 * Is vnode
 * @param node
 * @returns {boolean}
 */
export function isVNode(node) {
  return isObject(node) && hasOwn(node, 'componentOptions')
}

/**
 * Delay
 * @param ms
 * @returns {Promise<*>}
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Get byte of value
 * @param val
 * @return {number}
 */
export const byteLength = (val) => {
  const raw = JSON.stringify(val)
  const strLen = raw.length

  try {
    let length = strLen

    for (let i = strLen - 1; i >= 0; i--) {
      const code = raw.charCodeAt(i)
      if (code > 0x7f && code <= 0x7ff) {
        length++
      } else if (code > 0x7ff && code <= 0xffff) {
        length += 2
      }

      if (code >= 0xdc00 && code <= 0xdfff) {
        i--
      }
    }

    return length
  } catch (e) {
    return strLen
  }
}

export const isUndefined = (val) => typeof val === 'undefined'

export function validateNumber(value) {
  // return true if valid number
  const reg = new RegExp(/^\d+$/)
  return reg.test(value)
}

export function validatePhoneNumber(value) {
  /* eslint-disable-next-line */
  const reg = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
  return reg.test(value)
}

export function validateEmail(mail) {
  /* eslint-disable-next-line */
  const reg = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
  return reg.test(mail)
}

export function cloneNestedObject(object) {
  return JSON.parse(JSON.stringify(object))
}

export function validatePhoneNumberByCountry(callingCode, phoneNumber) {
  const phone = `+${callingCode}` + `${phoneNumber}`
  const regex = new RegExp(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im)
  return regex.test(phone)
}

export const formatFileName = (name) => {
    if (!name) {
      return ''
    }
    const nameLength = name.length
    if (nameLength < 30) {
      return name
    }

    const right = name.slice(0, 20)
    const left = name.slice(nameLength - 8)
    return right + '...' + left
  }