export const transformationRules = {
  user: ['username'],
  customer: ['name', 'email', 'phone_no'],
  roles: ['name', 'description', 'created_by'],
  userRoles: ['user_id', 'role'],
};
