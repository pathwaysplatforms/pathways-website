/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["react-markdown", "remark-gfm", "remark-parse", "unified", "vfile", "bail", "trough", "is-plain-obj", "extend"],
};

export default nextConfig;
