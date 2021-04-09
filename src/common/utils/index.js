/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/

const debounce = delay => {
  let timeout = null
  return (action, ...args) => {
    let runCallback = function () {
      timeout = null
      action.apply(window, args)
    }
    timeout && clearTimeout(timeout)
    timeout = setTimeout(runCallback, delay)
  }
}

const isNullObject = (obj = {}) => {
  let isNull = false
  Object.keys(obj).forEach(item => {
    if (obj[item] === null || obj[item] === '' || obj[item] === 0) {
      isNull = true
    }
  })
  return isNull
}

export default {
  debounce,
  isNullObject
}
