import * as THREE from 'three'

/**
 *
 * @description: 创建entry背景，之后可能考虑将场景的一些粒子特效和天空盒也放在此
 *
 * @author Shadycheer
 *
 **/
export const backgroundCreate = {}

backgroundCreate.Cube = (count) => {
  const cube = new THREE.CubeGeometry(25, 25, 25)
  const cubeArray = new THREE.Object3D()
  for (let i = 0; i < count; i++) {
    const material = new THREE.MeshBasicMaterial({ color: backgroundCreate.randomColor() })
    const mesh = new THREE.Mesh(cube, material)
    mesh.position.x = 800 * (2.0 * Math.random() - 1.0)
    mesh.position.y = 800 * (2.0 * Math.random() - 1.0)
    mesh.position.z = 800 * (2.0 * Math.random() - 1.0)
    mesh.rotation.x = Math.random() * Math.PI
    mesh.rotation.y = Math.random() * Math.PI
    mesh.rotation.z = Math.random() * Math.PI
    mesh.updateMatrix()
    cubeArray.add(mesh)
  }
  return cubeArray
}

backgroundCreate.randomColor = () => {
  const arrHex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
  let strHex = '#'
  let index
  for (let i = 0; i < 6; i++) {
    index = Math.round(Math.random() * 15)
    strHex += arrHex[index]
  }
  return strHex
}

export default backgroundCreate
