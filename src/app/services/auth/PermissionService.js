export default class PermissionService {
  constructor() {
    this.permissions = {
      admin: [
        '*'
      ],
      user: [
        'user_me:*',
        'links:get',
        'links:create',
        'links:remove',
        'links:list'
      ]
    }
  }
  getPermissions = ({ profile }) => {
    return this.permissions[profile]
  }
}
