import fs from "fs";
import matter from "gray-matter";
import path from "path";
import moment from "moment";

const articlesDirectory = path.join(process.cwd(), 'src', "articles")

export type ArticleItem = {
    id: string
    title: string
    date: string
    category: string
}

const getSortedArticles = (): ArticleItem[] => {
    const fileNames = fs.readdirSync(articlesDirectory)

    const allArticlesData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.mdx$/, "")
        const fullPath = path.join(articlesDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf-8")
        const matterResult = matter(fileContents)

        return {
            id,
            title: matterResult.data.title,
            date: matterResult.data.date,
            category: matterResult.data.category
        }
    })
    return allArticlesData.sort((a, b) => {
        const format = "DD-MM-YYYY"
        const dateOne = moment(a.date, format)
        const dateTwo = moment(b.date, format)
        if (dateOne.isBefore(dateTwo)) {
            return -1
        } else if (dateTwo.isAfter(dateOne)) {
            return 1
        } else {
            return 0
        }
    })
}

export const getCategoriesdArticles = (): Record<string, ArticleItem[]> => {
    const sortedArticles = getSortedArticles()
    const categorisedArticles: Record<string, ArticleItem[]> = {}

    sortedArticles.forEach((article) => {
        if (!categorisedArticles[article.category]) {
            categorisedArticles[article.category] = []
        }
        categorisedArticles[article.category].push(article)
    })

    return categorisedArticles
}

export const getArticleData = async (id: string) => {
    const fullPath = path.join(articlesDirectory, `${id}.mdx`)

    const fileContents = fs.readFileSync(fullPath, 'utf-8')

    const matterResult = matter(fileContents)

    return {
        id,
        title:matterResult.data.title,
        category:matterResult.data.category,
        date: moment(matterResult.data.date, "DD-MM-YYYY").format("MMMM Do YYYY")
    }
}