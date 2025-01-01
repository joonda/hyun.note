import Link from "next/link"
import { getPostDetail } from "@/lib/posts"
import MDXContent from "@/components/postContent"
import { AllPostContents } from "@/type/types"
import '@/app/globals.css'

const PostDetail = async ({
    params
}: {
    params: { slug: string }
}) => {
    const { slug } = await params;
    const articleData: AllPostContents = await getPostDetail(slug);
    return (
        <section className="mx-auto w-10/12 md:w-1/2 mt-20 flex flex-col gap-5">
            <div className="flex justify-between font-poppins">
                <Link href={"/"} className="flex flex-row gap-1 place-items-center">
                    <p>back to home</p>
                </Link>
                <p>{articleData.date.toLocaleDateString()}</p>
            </div>
            <div className="flex justify-center mt-20">
                <article className="prose">
                    <MDXContent source={articleData} />
                </article>
            </div>
        </section>
    )
}
export default PostDetail