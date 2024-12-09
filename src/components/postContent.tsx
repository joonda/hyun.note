"use client";

import { MDXRemote } from "next-mdx-remote";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

interface MdxContentProps {
  source: MDXRemoteSerializeResult;
}

const MdxContent = ({ source }: MdxContentProps) => {
  return <MDXRemote {...source} />;
};

export default MdxContent;