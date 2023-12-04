export const postResolvers ={
    createPost:async(parent:any,{post}:any,{prisma,userInfo}:any)=>{

        if(!userInfo){
            throw new Error("UnAuthorizedError");
        
        }
        if(!post.title || !post.content){

            throw new Error("title and content are required");
        }
        const result=await prisma.post.create({
            data:{
                title:post.title,
                content:post.content,
                authorId:userInfo.userId
            }
        })
        return {
            postError:null,
            post:result
        }
    }
}