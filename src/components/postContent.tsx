"use client";

import { MDXRemote } from "next-mdx-remote";
import { AllPostContents } from "@/type/types";


const MdxContent = ({ source }: {source : AllPostContents}) => {
  return <MDXRemote {...source.contentSource} />;
};

export default MdxContent;