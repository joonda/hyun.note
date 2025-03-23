import { getCategories, getPostList } from '@/lib/posts';
import Link from 'next/link';

type CategoryPageProps = {
  params: {
    category: string;
  };
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;  // URL에서 카테고리 값을 추출
  const postlist = await getPostList(category);  // 해당 카테고리의 포스트 목록을 가져옵니다.

  return (
    <section className="flex max-w-5xl mx-auto gap-16 mt-10">
      <div className="w-1/4 bg-gray-50 p-4">
        <p>Tag List</p>
        <ul className="mt-4">
          <li>
            <Link href="/blog">All</Link>
          </li>
          {getCategories().map((cat) => (
            <li key={cat} className="mb-2">
              <Link href={`/blog/${cat}`}>{cat}</Link>
            </li>
          ))}
        </ul>
      </div>
      <section className="w-3/4 p-8">
        <h2 className="text-2xl font-bold mb-4">{category} Posts</h2>
        <div>
          {postlist.length === 0 ? (
            <p>No posts available for this category.</p>
          ) : (
            postlist.map((item) => (
              <div key={item.id} className="mb-10 flex flex-col gap-2">
                <p className="text-base font-medium leading-6 text-gray-500">
                  {item.date.toLocaleDateString()}
                </p>
                <Link href={`/blog/${item.category}/${item.id}`} className="text-3xl">
                  {item.title}
                </Link>
                <p className="text-cyan-800">{item.category}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </section>
  );
}
