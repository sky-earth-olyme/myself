'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import clsx from 'clsx';
import FlipCard from './components/FlipCard';

// 技术栈数据
const techStack = [
  { name: 'HTML', level: 95, color: 'from-orange-500 to-red-500', icon: '🌐' },
  { name: 'CSS', level: 90, color: 'from-blue-500 to-cyan-500', icon: '🎨' },
  { name: 'JavaScript', level: 92, color: 'from-yellow-400 to-amber-500', icon: '⚡' },
  { name: 'TypeScript', level: 88, color: 'from-blue-600 to-blue-400', icon: '🟦' },
  { name: 'React', level: 93, color: 'from-cyan-500 to-blue-500', icon: '⚛️' },
  { name: 'Next.js', level: 90, color: 'from-white to-gray-400', icon: '▲' },
  { name: 'Node.js', level: 85, color: 'from-green-600 to-green-400', icon: '🟢' },
  { name: 'Python', level: 87, color: 'from-blue-400 to-yellow-400', icon: '🐍' },
  { name: 'Docker', level: 80, color: 'from-blue-500 to-cyan-400', icon: '🐳' },
  { name: 'Git', level: 90, color: 'from-red-500 to-orange-500', icon: '📂' },
];

export default function Home() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  return (
    <>
      {/* 背景粒子效果（可选，用CSS就行） */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      </div>

      {/* Hero 区 */}
      <section className="min-h-screen flex items-center justify-center relative px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* 左侧头像 + 简介 */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <div className="w-64 h-64 mx-auto md:mx-0 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 blur-xl opacity-50 animate-pulse" />
              <Image
                src="/avatar.jpg"
                alt="头像"
                width={256}
                height={256}
                className="rounded-full border-4 border-cyan-500/50 relative z-10 shadow-2xl"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mt-8 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent text-glow">
              张三丰
            </h1>
            <p className="text-2xl md:text-3xl mt-4 text-gray-300">全栈开发工程师</p >
            <p className="mt-6 text-gray-400 max-w-md">
              专注 React / Next.js / Node.js / 大模型工程化<br />
              10+ 商业项目经验，热爱开源和极致性能
            </p >
            <button className="mt-10 px-10 py-4 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full font-bold text-lg hover:glow transition-all transform hover:scale-105">
              雇我吧！Hire Me
            </button>
          </motion.div>

          {/* 右侧快速导航（PC显示，手机隐藏） */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex justify-center"
          >
            <div className="grid grid-cols-2 gap-6">
              {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <div key={item} className="w-40 h-40 glass rounded-3xl flex flex flex-col items-center justify-center hover:border-cyan-500/50 transition-all cursor-pointer group">
                  <div className="text-5xl mb-3 group-hover:scale-125 transition-transform">
                    {item === 'About' ? '👋' : item === 'Skills' ? '🚀' : item === 'Projects' ? '💼' : '✉️'}
                  </div>
                  <span className="text-xl font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 技术栈区域 */}
      {/* ==================== 新增：3D翻转技术卡片 ==================== */}
<section className="py-20 px-6">
  <div className="max-w-7xl mx-auto">
    <motion.h2
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent"
    >
      Tech Stack
    </motion.h2>

{/* 手机端：横向滑动 3D 翻转卡片 - 修复版 */}
<div className="flex md:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide py-8 px-4 -mx-4">
  <div className="flex gap-6">  {/* 包一层再加 gap，配合 -mx-4 让首尾卡片也能居中对齐 */}
    {techStack.map((tech, i) => (
      <div key={tech.name} className="shrink-0 snap-center">
        <div className="w-80">  {/* 固定宽度，或者 82vw 也行 */}
          <FlipCard tech={tech} index={i} />
        </div>
      </div>
    ))}
  </div>
</div>

    {/* PC端：网格 3D 翻转卡片 */}
    <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10">
      {techStack.map((tech, i) => (
        <FlipCard key={tech.name} tech={tech} index={i} />
      ))}
    </div>
  </div>
</section>
      {/* 手机底部导航（可选） */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/10">
        <div className="flex justify-around py-4">
          {['首页', '技能', '项目', '联系'].map((tab) => (
            <button key={tab} className="text-cyan-400 font-medium">
              {tab}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}