/**
 * @name: 登录用户信息实体
 * @author: mayn
 * @date: 2025/10/11 11:17
 */
import type { BaseEntity } from '@/entity/common.ts';
import type { Permission } from '@/entity/system/permission.ts';
import type { Role } from '@/entity/system/role.ts';
import type { Unit } from '@/entity/system/unit.tsx';
import type { Department } from '@/entity/system/department.ts';

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
export interface LoginUserInfo extends BaseEntity {
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
