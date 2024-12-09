import Link from "next/link"
import { getPostData } from "@/lib/posts"
import MDXContent from "@/components/postContent"

const PostDetail = async ({
    params
}: {
    params: { slug: string }
}) => {
    const { slug } = await params;
    const articleData = await getPostData(slug);
    return (
        <section className="mx-auto w-10/12 md:w-1/2 mt-20 flex flex-col gap-5">
            <div className="flex justify-between font-poppins">
                <Link href={"/"} className="flex flex-row gap-1 place-items-center">
                    <p>back to home</p>
                </Link>
                <p>{articleData.date.toString()}</p>
            </div>
            <article>
                <MDXContent source={articleData.contentHtml!} />
            </article>
        </section>
    )
}
export default PostDetail