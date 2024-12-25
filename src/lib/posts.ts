import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import { AllPostContents, PostDesc } from "@/type/types"


// 마크다운 포스트 경로 지정
const postsDirectory = path.join(process.cwd(), 'src', "posts")

// 글 목록을 가져오기 위한 함수 지정
export const getPostList = async (): Promise<PostDesc[]> => {
    // postsDirectory 안에 있는 마크다운 파일을 가져옴
    // 배열 형태
    const fileNames = fs.readdirSync(postsDirectory);

    // map 함수 활용
    const allPostData = fileNames.map((fileName) => {

        // .mdx 확장자 제거 (id로 사용.)
        const id = fileName.replace(/\.mdx$/, "");

        // path.join 활용 마크다운 포스트 가져옴.
        // src/posts/@@@.mdx
        const fullPath = path.join(postsDirectory, fileName);

        // path 안에 있는 마크다운 파일들 순차적으로 read.
        const fileContents = fs.readFileSync(fullPath, 'utf-8');

        // matter 활용, description (YAML 파일)
        const { data } = matter(fileContents);
        
        // any 타입을 막기위해 type 지정 (all string.)
        const postList: PostDesc = {
            id,
            title: data.title,
            date: new Date (data.date),
            category: data.category
        };

        return postList;
    });

    // 최신순 정렬

    allPostData.sort((a, b) => b.date.getTime() - a.date.getTime())

    return allPostData;
}

// slug를 받아 포스트의 상세페이지를 반환하는 함수.
export const getPostDetail = async (slug: string): Promise<AllPostContents> => {

    // 슬러그와 포스트 디렉토리 경로 결합, 전체 파일 경로 만듦.
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)

    // 디렉토리 안에있는 mdx 파일을 읽음.
    const fileContents = fs.readFileSync(fullPath, 'utf-8')

    // gray-matter 활용, data, content 반환.
    const { data, content } = matter(fileContents)

    // mdx 콘텐츠를 html로 변환, 렌더링 준비
    const mdxSource = await serialize(content)

    return {
        id: slug,
        title: data.title,
        date: new Date (data.date),
        category: data.category,
        contentSource: mdxSource
    }
}