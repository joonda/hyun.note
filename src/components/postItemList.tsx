import Link from "next/link";
import { PostDesc } from "@/type/types"

const PostItemList = ({ postlist }: { postlist: PostDesc[] }) => {

  return (

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
              <Link href={`/blog/${item.id}`}
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
  )
}
export default PostItemList
