import Link from "next/link";
import { getPostList } from "@/lib/posts";


export default async function MainPage() {

  const postlist = await getPostList();

  return (
    <section className="flex max-w-5xl mx-auto gap-16 mt-10">
      <div className="w-1/4 bg-gray-50 p-8">
        <p>Tag List</p>
      </div>
      <section className="w-3/4 p-8">
        <div>
          {
            postlist.map((item) => {
              return (
                <div key={item.id}
                  className="mb-10 flex flex-col gap-2"
                >
                  <p
                    className="text-base font-medium leading-6 text-gray-500"
                  >{item.date.toLocaleDateString()}</p>
                  <Link href={`/blog/${item.category}/${item.id}`}
                    className="text-3xl"
                  >
                    {item.title}
                  </Link>

                  <p
                    className="text-cyan-800"
                  >{item.category}</p>
                </div>
              )
            })
          }
        </div>
      </section>
    </section>
  )
}