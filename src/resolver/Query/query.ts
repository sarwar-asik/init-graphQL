export const Queries = {
    users: async (parent:any,args:any,{prisma}:any) => {
      return await prisma.user.findMany({});
    },
  }