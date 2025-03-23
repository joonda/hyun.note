import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import { AllPostContents, PostDesc } from "@/type/types"
import {sync} from 'glob';


// 마크다운 포스트 경로 지정
const BASE_PATH = "src/posts"
const POST_PATH = path.join(process.cwd(), BASE_PATH)

export const getPostPaths = (category?: string) => {
    const folder = category || '**';
    const postPaths: string[] = sync(`${POST_PATH}/${folder}/**/*.mdx`);
    return postPaths
}

export const getCategories = (): string[] => {
    const postPaths: string[] = sync(`${POST_PATH}/**/*.mdx`); // 모든 마크다운 파일 경로 가져오기
    const categories: Set<string> = new Set(); // 중복을 피하기 위해 Set 사용
  
    postPaths.forEach((filePath) => {
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContents); // `gray-matter`를 사용해 마크다운 파일에서 metadata를 가져옴
      if (data.category) {
        categories.add(data.category); // 카테고리가 존재하면 Set에 추가
      }
    });
  
    return Array.from(categories); // Set을 배열로 변환해서 반환
  };

// 글 목록을 가져오기 위한 함수 지정
export const getPostList = async (category?: string): Promise<PostDesc[]> => {
    
    // 파일 경로를 배열 형태로 받는다
    const fileNames = getPostPaths(category);
    // map 함수 활용
    const allPostData = fileNames.map((fileName) => {

        // path.basename -> 각각의 파일 경로 중에서 mdx 확장자의 파일 이름만 받는다.
        const id = path.basename(fileName, '.mdx');
        
        // 각각의 mdx 확장자 파일을 읽는다.
        const fileContents = fs.readFileSync(fileName, 'utf-8');

        // matter 활용, description (YAML 파일)
        const { data } = matter(fileContents);
        
        // any 타입을 막기위해 type 지정
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

// slug와 카테고리를 받아 포스트의 상세페이지를 반환하는 함수.
export const getPostDetail = async (category: string, slug: string): Promise<AllPostContents> => {

    // 슬러그와 포스트 디렉토리 경로 결합, 전체 파일 경로 만듦.
    const filePath = `${POST_PATH}/${category}/${slug}.mdx`;

    // 디렉토리 안에있는 mdx 파일을 읽음.
    const fileContents = fs.readFileSync(filePath, 'utf-8')

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