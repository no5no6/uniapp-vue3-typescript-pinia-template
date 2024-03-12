/**
 *  操作信息
 */
export type Operation = {
  // 记录时间毫秒
  dateNumber: number
  // 记录时间 格式 YYYY-MM-DD
  dateString: string
  // 用户id
  userId: string
  // 用户名
  userName: string
}

/**
 * 用户
 */
export type User = {
  name: string
  password: string
  email: string
  organization: string
  operation: Operation
}
