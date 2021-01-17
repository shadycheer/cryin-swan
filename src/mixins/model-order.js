/**
 *
 * @description:
 *
 * @author Shadycheer
 *
 **/
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

export default {
  methods: {
    $_modelOrder_loadModel (filename) {
      return new Promise((resolve, reject) => {
        if (/.fbx/.test(filename)) {
          const loader = new FBXLoader()
          loader.load(filename, (mesh) => {
            resolve(mesh)
          })
        } else {
          reject(new Error('模型格式不正确！'))
        }
      })
    },
    $_modelOrder_setShadow (mesh, isShadow) {
      mesh.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = isShadow
          child.receiveShadow = isShadow
        }
      })
      return mesh
    }
  }
}
