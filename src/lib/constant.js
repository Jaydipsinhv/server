const role = {
  USER: 'user',
  ADMIN: 'admin',
};

const courseType = {
  PREMIUM: 'Premium',
  FREE: 'Free',
};

module.exports = {
  ROLE: role,
  ROLE_ARRAY: [role.USER, role.ADMIN],
  COURSE_TYPE: courseType,
  COURSE_TYPE_ARRAY: [courseType.FREE, courseType.PREMIUM],
};
