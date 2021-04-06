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

export default {
  debounce,
}
