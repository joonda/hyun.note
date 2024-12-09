import Link from "next/link";
import { postItem } from "@/lib/posts";

interface Props {
  post: postItem[]
}

const PostItemList = ({ post }: Props) => {
  return (
    <div>
      {
        post.map((item) => {
          return (
            <div key={item.id}>
              <Link href={`/${item.id}`}>
                {item.title}
              </Link>
              <p>{item.date}</p>
              <p>{item.category}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default PostItemList