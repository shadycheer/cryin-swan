/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/

const debounce = function (delay) {
  let timeout = null
  return function (action, ...args) {
    let runCallback = function () {
      timeout = null
      action.apply(window, args)
    }
    timeout && clearTimeout(timeout)
    timeout = setTimeout(runCallback, delay)
  }
}

export default {
  debounce
}
