import PostContent from "@/components/postContent";
import { getPostDetail } from "@/lib/posts";


const PostDetail = async ({
    params
}: {
    params: { slug: string }
}) => {
    const { slug } = await params;
    const PostDetail = await getPostDetail(slug);
    return (
        <PostContent PostDetail={PostDetail} />
    )
}

export default PostDetail