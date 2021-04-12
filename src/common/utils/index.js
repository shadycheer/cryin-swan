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

const clearTimerInterval = (timer) => {
  if (timer) clearInterval(timer)
  timer = null
}

const clearTimerOut = (timer) => {
  if (timer) clearTimeout(timer)
  timer = null
}

export default {
  debounce,
  isNullObject,
  clearTimerInterval,
  clearTimerOut
}
