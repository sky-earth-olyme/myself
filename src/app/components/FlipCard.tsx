// app/components/FlipCard.tsx  —— 彻底解决双面重叠 + 丝滑翻转
'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useState } from 'react';
import Link from 'next/link';

type Tech = {
  name: string;
  level: number;
  color: string;
  icon: string;
  description?: string;
};

const projectMap: Record<string, string[]> = {
  'HTML': ['30+ 响应式落地页', 'SEO 优化', '邮件模板'],
  'CSS': ['复杂动画', '暗黑模式', '设计系统'],
  'JavaScript': ['10w+ 行原生项目', '性能优化', '小游戏'],
  'TypeScript': ['大型重构', '组件库', '类型安全后端'],
  'React': ['企业后台', 'AI 对话', 'H5 活动页'],
  'Next.js': ['技术博客', 'SSR 官网', '电商平台'],
  'Node.js': ['实时聊天', 'API 网关', 'WebSocket'],
  'Python': ['50w+ 爬虫', '数据分析', '自动化脚本'],
  'Docker': ['容器化部署', 'CI/CD', '微服务'],
  'Git': ['Git Flow', 'Monorepo', '自动化发布'],
};

export default function FlipCard({ tech, index }: { tech: Tech; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const projects = projectMap[tech.name] || ['更多项目更新中…'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="h-[380px] md:h-[420px] [perspective:1200px]" // 加大透视距离更真实
      // 手机点击 / PC 悬停
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          // 强制硬件加速 + 修复部分浏览器渲染bug
          willChange: 'transform',
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* ==================== 正面 ==================== */}
        <div
          className="absolute inset-0 glass rounded-3xl p-8 border border-white/10 flex flex-col justify-between glow hover:border-cyan-500/60"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden', // Safari 必杀
            transform: 'rotateY(0deg)',
          }}
        >
          <div>
            <div className="text-8xl text-center mb-6">{tech.icon}</div>
            <h3 className="text-2xl font-bold text-center mb-6">{tech.name}</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>熟练度</span>
                <span className="text-cyan-400">{tech.level}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${tech.level}%` }}
                  transition={{ duration: 1.2 }}
                  className={clsx('h-full bg-gradient-to-r', tech.color)}
                />
              </div>
            </div>
          </div>
          <p className="text-center text-cyan-400 mt-6 text-sm">
            {typeof window !== 'undefined' && window.innerWidth < 768 ? '点击翻转' : '悬停查看项目'}
          </p >
        </div>

        {/* ==================== 背面 ==================== */}
       {/* ==================== 背面 —— 超大描述区版 ==================== */}
        <div
          className="absolute inset-0 glass rounded-3xl p-6 border border-cyan-500/60 flex flex-col glow"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* 1. 图标 + 标题 极致压缩在一行 */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="text-5xl">{tech.icon}</div>
            <h3 className="text-xl font-bold text-cyan-400">{tech.name}</h3>
          </div>

          {/* 2. 描述文字区 —— 霸占最大空间！能看到 3~5 行 */}
          <p className="text-sm leading-relaxed text-black-200 flex-1 overflow-y-auto px-1">
            {tech.description ||
              `${tech.name} 是我的核心技能之一，已在多个商业项目中深度应用，涉及复杂状态管理、性能优化、架构设计等，累计交付 10+ 生产级项目。`}
          </p >

          {/* 3. 代表项目区 —— 极致压缩，只保留 2 条最重的，高度压到最低 */}
          <div className="mt-3">
            <p className="text-[13px] font-medium text-cyan-400 mb-2 text-center">
              代表项目
            </p >
            <ul className="space-y-1.5 text-xs">
              {projects.slice(0, 2).map((proj, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span className="truncate">{proj}</span>
                </li>
              ))}
              {projects.length > 2 && (
                <li className="text-xs text-gray-500 text-center">
                  + 更多 {projects.length - 2} 个项目
                </li>
              )}
            </ul>
          </div>

          {/* 4. 按钮也压扁一点 */}
          <Link
            href={`/projects/${tech.name.toLowerCase().replace(/\./g, '')}`}
            className="mt-4 py-2.5 text-sm font-bold bg-gradient-to-r from-cyan-500 to-green-500 rounded-xl text-center hover:scale-105 hover:glow transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            查看全部项目 →
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}