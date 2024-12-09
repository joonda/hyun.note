import Link from "next/link";
import { PostDesc } from "@/type/types"

const PostItemList = ({ postlist }: { postlist: PostDesc[] }) => {

  return (

    <div>
      {
        postlist.map((item) => {

          return (
            
            <div key={item.id}>
              <Link href={`/${item.id}`}>
                {item.title}
              </Link>
              <p>{item.date.toLocaleDateString()}</p>
              <p>{item.category}</p>
            </div>
          )
        })
      }
    </div>
  )
}
export default PostItemList
