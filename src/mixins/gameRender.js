import Observe from '@/common/global-event/observe'
import { EVENT_NAME } from '@/common/global-event/constant'
import * as THREE from 'three'

/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/

export default {
  data () {
    return {
      cruiseCamera: new THREE.PerspectiveCamera(),
      isCruiseCamera: ''
    }
  },
  methods: {
    $_renderCruiseCameraGuide (init) {
      if (this.cruiseCamera && this.cruiseCamera.position.y > 71) {
        this.cruiseCamera.position.z -= 0.5
        this.cruiseCamera.position.y -= 0.5
        init.camera.position.set(this.cruiseCamera.position.x, this.cruiseCamera.position.y, this.cruiseCamera.position.z)
      } else {
        if (this.isCruiseCamera) {
          this.cruiseCamera = null
          this.$_renderEmitEvent()
          this.isCruiseCamera = false
        }
      }
    },
    $_renderCruiseCameraMissionOne (init) {
      if (this.cruiseCamera && this.cruiseCamera.position.y > 71) {
        this.cruiseCamera.position.z += 0.5
        this.cruiseCamera.position.y -= 0.5
        init.camera.position.set(this.cruiseCamera.position.x, this.cruiseCamera.position.y, this.cruiseCamera.position.z)
      } else {
        if (this.isCruiseCamera) {
          this.cruiseCamera = null
          this.$_renderEmitEvent()
          this.isCruiseCamera = false
        }
      }
    },
    $_renderCruiseCameraMissionTwo (init) {
      if (this.cruiseCamera && this.cruiseCamera.position.y > 71) {
        this.cruiseCamera.position.x += 0.5
        this.cruiseCamera.position.y -= 0.5
        init.camera.position.set(this.cruiseCamera.position.x, this.cruiseCamera.position.y, this.cruiseCamera.position.z)
      } else {
        if (this.isCruiseCamera) {
          this.cruiseCamera = null
          this.$_renderEmitEvent()
          this.isCruiseCamera = false
        }
      }
    },
    $_renderCruiseCameraMissionThree (init) {
      if (this.cruiseCamera && this.cruiseCamera.position.y > 71) {
        this.cruiseCamera.position.z += 0.5
        this.cruiseCamera.position.y -= 0.5
        init.camera.position.set(this.cruiseCamera.position.x, this.cruiseCamera.position.y, this.cruiseCamera.position.z)
      } else {
        if (this.isCruiseCamera) {
          this.cruiseCamera = null
          this.$_renderEmitEvent()
          this.isCruiseCamera = false
        }
      }
    },

    $_renderEmitEvent () {
      Observe.$emit(EVENT_NAME.textShowStart)
      Observe.$emit(EVENT_NAME.gameStart)
    }
  }
}
