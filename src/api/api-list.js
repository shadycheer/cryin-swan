/**
 *
 * @description:
 *
 * @author shadycheer
 *
 **/

export const API_LIST = Object.freeze({
  // 检查用户名是否可用
  checkUsername: '/user/checkUserName',
  // 用户注册
  userRegister: '/user/register',
  // 用户登录
  userLogin: '/user/login',
  // 获取模型列表
  getModelList: '/character/list',
  // 获取用户信息
  getUserInfo: '/user/info',
  // 更新用户所选角色
  updateUserCharacter: '/user/character/',
  // 更新用户是否完成教学关卡
  updateStatus: '/user/updateStatus'
})

export default API_LIST
