import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, Construction, Sparkles } from 'lucide-react';
import { CHARACTERS } from '../characters';

interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface Props {
  characterId: string;
  features: Feature[];
}

export function CharacterStubPage({ characterId, features }: Props) {
  const char = CHARACTERS.find(c => c.id === characterId);
  if (!char) return null;

  const hex = char.spinnerColor;
  const hexAlpha = (a: number) => `${hex}${Math.round(a * 255).toString(16).padStart(2, '0')}`;

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(160deg, ${hexAlpha(0.08)} 0%, #ffffff 40%, ${hexAlpha(0.04)} 100%)` }}>
      {/* Sticky header */}
      <header className="sticky top-0 z-10 px-5 py-3.5 bg-white/90 backdrop-blur-sm border-b flex items-center gap-3" style={{ borderColor: hexAlpha(0.2) }}>
        <Link
          to="/"
          className="flex items-center gap-1.5 text-sm font-bold transition-opacity hover:opacity-60"
          style={{ color: hex }}
        >
          <ArrowLeft size={16} />
          <span>홈으로</span>
        </Link>
        <div className="h-4 w-px mx-1 opacity-30" style={{ background: hex }} />
        <span className="text-sm font-black" style={{ color: hex }}>
          {char.emoji} {char.nameKo}
        </span>
        <span className="ml-auto px-2.5 py-1 text-[10px] font-black rounded-full tracking-wide" style={{ background: hexAlpha(0.12), color: hex }}>
          개발 중
        </span>
      </header>

      <main className="max-w-lg mx-auto px-5 py-16 space-y-14">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-5"
        >
          <motion.div
            initial={{ scale: 0.6, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="inline-flex items-center justify-center w-28 h-28 rounded-[2rem] text-6xl shadow-2xl mx-auto"
            style={{ background: hexAlpha(0.12) }}
          >
            {char.emoji}
          </motion.div>

          <div className="space-y-2">
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">{char.nameKo}</h1>
            <p className="text-base font-bold" style={{ color: hex }}>{char.role}</p>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">{char.description}</p>
          </div>
        </motion.div>

        {/* Coming-soon features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 px-1">
            <Sparkles size={14} style={{ color: hex }} />
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">예정 기능</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.07 }}
                className="bg-white rounded-2xl p-4 border flex items-start gap-3 opacity-70 hover:opacity-90 transition-opacity"
                style={{ borderColor: hexAlpha(0.2) }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: hexAlpha(0.1), color: hex }}>
                  {f.icon}
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-sm">{f.title}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{f.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold border"
            style={{ background: hexAlpha(0.08), color: hex, borderColor: hexAlpha(0.2) }}
          >
            <Construction size={15} />
            현재 개발 기획 중 — 곧 공개됩니다
          </div>
        </motion.div>
      </main>
    </div>
  );
}
