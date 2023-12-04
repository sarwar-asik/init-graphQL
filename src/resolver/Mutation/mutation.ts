import { postResolvers } from './post';
import { authResolvers } from './auth';

export const Mutations= {
  ...authResolvers,
  ...postResolvers
  }