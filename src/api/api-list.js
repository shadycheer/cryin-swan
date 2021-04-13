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
  // 获取角色具体参数
  getDefiniteCharacterInfo: '/character/',
  // 更新用户是否完成教学关卡
  updateStatus: '/user/updateStatus',
  // 获取自己当前关卡成绩
  getSelfScore: '/score/self',
  // 获取当前关卡所有用户全部成绩
  getAllScore: '/score/list/'
})

export default API_LIST
