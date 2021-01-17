/**
 *
 * @description:
 *
 * @author Shadycheer
 *
 **/
export default {
  methods: {
    $_backGroundCreate_randomColor () {
      const arrHex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
      let strHex = '#'
      let index
      for (let i = 0; i < 6; i++) {
        index = Math.round(Math.random() * 15)
        strHex += arrHex[index]
      }
      return strHex
    }
  }
}
