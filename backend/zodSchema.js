const zod = require("zod");

const signupSchema = zod.object({
  firstName: zod.string().regex(/^[a-zA-Z]+$/),
  lastName: zod.string().regex(/^[a-zA-Z]+$/),
  email: zod.string().email(),
  password: zod.string().min(7)
});

const signinSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(7)
});

const todoSchema = zod.object({
  title: zod.string().min(1),
  description: zod.string().min(1),
});

module.exports = {
  signinSchema,
  signupSchema,
  todoSchema
};