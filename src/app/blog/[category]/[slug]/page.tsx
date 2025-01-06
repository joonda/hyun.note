import Link from "next/link"
import { getPostDetail } from "@/lib/posts"
import MDXContent from "@/components/postContent"
import { AllPostContents } from "@/type/types"
import '@/app/globals.css'

const PostDetail = async ({
    params
}: {
    params: { category: string, slug: string }
}) => {
    const { slug, category } = await params;
    const articleData: AllPostContents = await getPostDetail(category, slug);
    return (
        <section className="flex flex-col gap-5 mt-20 max-w-5xl mx-auto">
            <div className="flex justify-between">
                <Link href={"/blog"} className="flex flex-row gap-1 place-items-center">
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