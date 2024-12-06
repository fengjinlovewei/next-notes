import { z } from 'zod';

export const username_z = z
  .string()
  .min(1, '用户名不能为空')
  .max(50, '字数最多 50');

export const password_z = z
  .string()
  .min(6, '密码最少 6 位')
  .max(50, '密码最多 50 位');

export const invitecode_z = z.string().min(1, '邀请码不能为空');

export const title_z = z.string().max(200, '标题字数最多 200');

export const content_z = z
  .string()
  .min(1, '请填写内容')
  .max(50000, '字数最多 50000');

export const yzm_z = z.string().length(4, '请输入 4 位验证码');

export const userLoginSchema = z.object({
  username: z.string().min(1, '请输入账号'),
  password: z.string().min(1, '请输入密码'),
  yzm: yzm_z,
});

export type userLoginSchemaType = z.infer<typeof userLoginSchema>;

export const userRegisterSchema = z.object({
  username: username_z,
  password: password_z,
  yzm: yzm_z,
  invitecode: invitecode_z,
});

export type userRegisterSchemaType = z.infer<typeof userRegisterSchema>;

export const saveNoteSchema = z.object({
  title: title_z,
  content: content_z,
});

export type saveNoteSchemaType = z.infer<typeof saveNoteSchema>;
