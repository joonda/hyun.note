import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

// find post directory
const postsDirectory = path.join(process.cwd(), 'src', "posts")

// Define post Item type
export type postItem = {
    id: string;
    title: string;
    date: string;
    category: string;
    contentHtml?: MDXRemoteSerializeResult;
}

// getPostList
export const getPostList = async () => {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.mdx$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf-8');
        const { data } = matter(fileContents);

        return {
            id,
            title: data.title,
            date: data.date,
            category: data.category
        };
    });

    return allPostData;
}

export const getPostData = async (slug: string): Promise<postItem> => {

    // read file in posts Directory folder 
    // [@@@@.mdx, @@@.mdx, ...]

    const fullPath = path.join(postsDirectory, `${slug}.mdx`)

    const fileContents = fs.readFileSync(fullPath, 'utf-8')

    const { data, content } = matter(fileContents)

    const mdxSource = await serialize(content)

    return {
        id : slug,
        title: data.title,
        date: data.date,
        category: data.category,
        contentHtml: mdxSource
    }
}