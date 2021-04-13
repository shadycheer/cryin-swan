/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/

import Utils from '@/common/utils'
import Observe from '@/common/global-event/observe'
import { EVENT_NAME } from '@/common/global-event/constant'

export default {
  data () {
    return {
      loading$: false,
      error$: false,
      finish$: false,
      init$: false,
      maskLoading$: true,
      maskFinish$: true,
      gameFinish$: false
    }
  },
  methods: {
    $_statusMaskLoading () {
      this.maskLoading$ = true
      this.maskFinish$ = false
      Observe.$emit(EVENT_NAME.statusLoading)
    },
    $_statusLoading () {
      this.loading$ = true
      this.error$ = false
      this.finish$ = false
      this.init$ = false
      this.$_statusMaskLoading()
    },
    $_statusMaskFinish () {
      this.maskLoading$ = false
      this.maskFinish$ = true
    },
    $_statusFinish () {
      let timer = setTimeout(() => {
        this.finish$ = true
        this.loading$ = false
        Observe.$emit(EVENT_NAME.statusFinish)
        Utils.clearTimerOut(timer)
      }, 2000)
    },
    $_gameFinishTodo () {
      this.gameFinish$ = true
    }
  }
}
