import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['studio', 'ai-agent', 'workflow-builder'],
  devIndicators: false,
  // Pin the workspace root so Next doesn't warn about the extra ~/package-lock.json.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
