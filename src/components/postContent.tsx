"use client";

import { MDXRemote } from "next-mdx-remote";
import Link from "next/link"
import { AllPostContents } from "@/type/types";

export default function PostContent({
  PostDetail
}: {
  PostDetail: AllPostContents
}) {
  return (
    <section className="mx-auto w-10/12 md:w-1/2 mt-20 flex flex-col gap-5">
      <div className="flex justify-between font-poppins">
        <Link href={"/"} className="flex flex-row gap-1 place-items-center">
          <p>back to home</p>
        </Link>
        <p>{PostDetail.date.toLocaleDateString()}</p>
      </div>
      <article className="prose">
        <MDXRemote {...PostDetail.contentHtml} />
      </article>
    </section>
  )
}