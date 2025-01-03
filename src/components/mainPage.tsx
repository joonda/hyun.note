import PostItemList from "@/components/postItemList";
import { getPostList } from "@/lib/posts";
import TagList from "@/components/tagList";

export default async function MainPage() {

  const postlist = await getPostList();
  const categories = postlist.map(post => post.category);
  
  return (
    <section className="flex max-w-5xl mx-auto gap-16 mt-10">
      <div className="w-1/4 bg-gray-50 p-8">
        <TagList categories={categories} postlist={postlist}/>
      </div>
      <section className="w-3/4 p-8">
        <PostItemList postlist={postlist} />
      </section>
    </section>
  )
}