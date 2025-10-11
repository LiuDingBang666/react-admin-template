/**
 * @name: 登录用户信息实体
 * @author: mayn
 * @date: 2025/10/11 11:17
 */

/**
 * 通用审计字段（不含 id）
 */
export interface AuditMeta {
  /** 创建时间 ISO 字符串 */
  createdAt: string;
  /** 修改时间 ISO 字符串 */
  updatedAt: string;
  /** 创建人 ID */
  createdBy: number;
  /** 修改人 ID */
  updatedBy: number;
  /** 逻辑删除标记（0/1） */
  deleted: number;
  /** 版本号 */
  version: number;
  /** 备注 */
  remark: string;
}

/**
 * 通用带主键实体
 */
export interface EntityWithId extends AuditMeta {
  /** 主键 */
  id: string;
}

/**
 * 角色-权限 关联（通常是中间表）
 */
export interface RolePermissionRef extends EntityWithId {
  /** 角色 ID */
  roleId: string;
  /** 权限 ID */
  permissionId: string;
}

/**
 * 权限定义
 */
export interface Permission extends EntityWithId {
  /** 菜单/资源 ID（后端字段名） */
  fkMenuId: string;
  /** 权限名 */
  name: string;
  /** 权限描述 */
  description: string;
  /** 权限含义名称（后端拼写） */
  meanName: string;
}

/**
 * 角色定义
 */
export interface Role extends EntityWithId {
  /** 角色名称 */
  name: string;
  /** 角色描述 */
  description: string;
  /** 角色-权限关联列表（如需直接使用权限列表，也可扩展为 Permission[]） */
  permissions: RolePermissionRef[];
}

/**
 * 单位定义
 */
export interface Unit extends EntityWithId {
  /** 单位名称 */
  name: string;
  /** 上级单位 ID */
  parentId: string;
  /** 描述 */
  description: string;
}

/**
 * 部门定义
 */
export interface Department extends EntityWithId {
  /** 部门名称 */
  name: string;
  /** 上级部门 ID */
  parentId: string;
  /** 描述 */
  description: string;
}

/**
 * Spring Security 授权标识
 */
export interface GrantedAuthority {
  /** 授权标识，例如 'ROLE_ADMIN' */
  authority: string;
}

/**
 * 登录用户信息（聚合）
 */
export interface LoginUserInfo extends EntityWithId {
  /** 用户名 */
  username: string;
  /** 邮箱 */
  email: string;
  /** 手机号 */
  phone: string;
  /** 状态（例如 0/1） */
  status: number;
  /** 归属单位 ID（后端字段名） */
  fkUnitId: string;
  /** 归属部门 ID（后端字段名） */
  fkDepartmentId: string;
  /** 用户类型（自定义枚举值） */
  type: number;

  /** 角色列表 */
  roles: Role[];
  /** 权限列表（直接权限集合） */
  permissions: Permission[];

  /** 所属单位详情（后端字段名为 units，为兼容保留） */
  units: Unit;
  /** 所属部门详情（后端字段名为 departments，为兼容保留） */
  departments: Department;

  /** 访问令牌 */
  token?: string;

  /** 账号是否启用 */
  enabled: boolean;
  /** 授权集合（来自 GrantedAuthority） */
  grantedAuthorities: GrantedAuthority[];
  /** 账号是否未过期 */
  accountNonExpired: boolean;
  /** 凭据是否未过期 */
  credentialsNonExpired: boolean;
  /** 权限集合（通常与 grantedAuthorities 相同结构） */
  authorities: GrantedAuthority[];
  /** 账号是否未锁定 */
  accountNonLocked: boolean;
}
