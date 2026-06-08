import {
  ROLE_PERMISSIONS
}
from './@security/rolePermissions';

export const usePermissions =
(user) => {

  const permissions =
    ROLE_PERMISSIONS[
      user?.role
    ] || [];

  const can =
    (permission) =>
      permissions.includes(
        permission
      );

  return {
    can
  };

};