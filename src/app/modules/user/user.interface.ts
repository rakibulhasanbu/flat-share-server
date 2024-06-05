export const USER_ROLE = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export type TUserRole = keyof typeof USER_ROLE;
