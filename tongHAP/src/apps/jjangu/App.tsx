import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MessageSquare, PartyPopper, Users, Plus, Trash2, Heart, Smile, Calendar, ThumbsUp } from 'lucide-react';

const HEX = '#ea580c';
const ha = (a: number) => `${HEX}${Math.round(a * 255).toString(16).padStart(2, '0')}`;

interface Post { id: number; author: string; content: string; date: string; likes: number; liked: boolean; }
interface Event { id: number; title: string; date: string; type: string; }
interface Group { id: number; name: string; leader: string; members: number; topic: string; }

const TABS = ['커뮤니티', '행사 일정', '소그룹'];

const EVENT_TYPES: Record<string, string> = {
  '예배': '#ea580c', '수련': '#16a34a', '문화': '#db2777', '봉사': '#2563eb',
};

export function JjanguApp() {
  const [tab, setTab] = useState(0);
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, author: '이성민 형제', content: '오늘 새벽기도에서 너무 은혜를 받았습니다. 말씀이 마음에 꽂혀서 눈물이 났어요. 함께 기도해 주신 모든 분들 감사합니다!', date: '2026-05-03', likes: 12, liked: false },
    { id: 2, author: '박진희 자매', content: '지난 주말 청평수련원에서 가족과 함께 아름다운 시간을 보냈습니다. 자연 속에서 하나님을 더 깊이 느꼈어요. 추천합니다!', date: '2026-05-02', likes: 8, liked: false },
    { id: 3, author: '김은혜 자매', content: '이번 주 소그룹에서 나눈 말씀이 너무 풍성했어요. 서로의 간증을 들으며 믿음이 더 굳건해지는 것을 느꼈습니다. 우리 소그룹 화이팅!', date: '2026-05-01', likes: 15, liked: false },
  ]);
  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: '어린이날 합동 행사', date: '2026-05-05', type: '문화' },
    { id: 2, title: '청소년 특별기도회', date: '2026-05-10', type: '예배' },
    { id: 3, title: '전국 청평 수련회', date: '2026-05-24', type: '수련' },
    { id: 4, title: '지역사회 봉사 활동', date: '2026-06-01', type: '봉사' },
  ]);
  const [groups, setGroups] = useState<Group[]>([
    { id: 1, name: '청년부 말씀 나눔', leader: '이성민', members: 8, topic: '원리강론 함께 읽기' },
    { id: 2, name: '새벽기도 모임',    leader: '박진희', members: 12, topic: '중보기도 & 새벽예배' },
    { id: 3, name: '가족 행복 소그룹', leader: '김은혜', members: 6, topic: '가정의 달 말씀 묵상' },
  ]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [postForm, setPostForm] = useState({ author: '', content: '' });
  const [eventForm, setEventForm] = useState({ title: '', date: '', type: '예배' });
  const [groupForm, setGroupForm] = useState({ name: '', leader: '', topic: '' });

  const addPost = () => {
    if (!postForm.content.trim()) return;
    setPosts(p => [{ id: Date.now(), ...postForm, author: postForm.author || '익명', date: new Date().toISOString().slice(0, 10), likes: 0, liked: false }, ...p]);
    setPostForm({ author: '', content: '' });
    setShowPostForm(false);
  };
  const addEvent = () => {
    if (!eventForm.title.trim()) return;
    setEvents(p => [...p, { id: Date.now(), ...eventForm }]);
    setEventForm({ title: '', date: '', type: '예배' });
    setShowEventForm(false);
  };
  const addGroup = () => {
    if (!groupForm.name.trim()) return;
    setGroups(p => [...p, { id: Date.now(), ...groupForm, members: 1 }]);
    setGroupForm({ name: '', leader: '', topic: '' });
    setShowGroupForm(false);
  };
  const toggleLike = (id: number) =>
    setPosts(p => p.map(x => x.id === id ? { ...x, likes: x.liked ? x.likes - 1 : x.likes + 1, liked: !x.liked } : x));

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(160deg, ${ha(0.08)} 0%, #fff 45%, ${ha(0.04)} 100%)` }}>
      <header className="sticky top-0 z-20 flex items-center gap-3 px-5 py-3.5 bg-white/90 backdrop-blur-sm border-b" style={{ borderColor: ha(0.2) }}>
        <Link to="/" className="flex items-center gap-1.5 text-sm font-bold hover:opacity-60 transition-opacity" style={{ color: HEX }}>
          <ArrowLeft size={16} /> 홈으로
        </Link>
        <div className="h-4 w-px opacity-30" style={{ background: HEX }} />
        <span className="text-sm font-black" style={{ color: HEX }}>😄 짱구 — 커뮤니티 & 문화</span>
        <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: ha(0.1) }}>
          <Heart size={12} style={{ color: HEX }} />
          <span className="text-[11px] font-black" style={{ color: HEX }}>{posts.reduce((s, p) => s + p.likes, 0)} 좋아요</span>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-3 px-4 pt-4">
        {[
          { label: '나눔 글', value: posts.length, icon: <MessageSquare size={14} />, suffix: '개' },
          { label: '예정 행사', value: events.length, icon: <PartyPopper size={14} />, suffix: '개' },
          { label: '소그룹', value: groups.length, icon: <Users size={14} />, suffix: '개' },
        ].map((k, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white rounded-2xl border p-3 text-center" style={{ borderColor: ha(0.12) }}>
            <div className="flex justify-center mb-1" style={{ color: HEX }}>{k.icon}</div>
            <div className="text-xl font-black" style={{ color: HEX }}>{k.value}<span className="text-xs ml-0.5">{k.suffix}</span></div>
            <div className="text-[10px] text-slate-400 font-bold">{k.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-1 px-4 pt-4 pb-2">
        {TABS.map((t, i) => (
          <button key={i} onClick={() => setTab(i)}
            className="flex-1 py-2 text-xs font-black rounded-xl transition-all"
            style={tab === i ? { background: HEX, color: '#fff' } : { background: ha(0.08), color: HEX }}>
            {t}
          </button>
        ))}
      </div>

      <main className="px-4 pb-24 space-y-3">
        <AnimatePresence mode="wait">
          {tab === 0 && (
            <motion.div key="community" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3 pt-1">
              <button onClick={() => setShowPostForm(v => !v)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-black text-white"
                style={{ background: HEX }}>
                <Plus size={15} /> 나눔 글 작성
              </button>
              <AnimatePresence>
                {showPostForm && (
                  <motion.div key="pf" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="bg-white rounded-2xl border p-4 space-y-2 overflow-hidden" style={{ borderColor: ha(0.2) }}>
                    <input value={postForm.author} onChange={e => setPostForm(f => ({ ...f, author: e.target.value }))}
                      placeholder="이름 (선택, 생략시 익명)" className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: ha(0.2) }} />
                    <textarea value={postForm.content} onChange={e => setPostForm(f => ({ ...f, content: e.target.value }))}
                      placeholder="오늘의 은혜, 나눔, 기도제목을 공유하세요..."
                      rows={4} className="w-full px-3 py-2 rounded-xl border text-sm outline-none resize-none" style={{ borderColor: ha(0.2) }} />
                    <button onClick={addPost} className="w-full py-2 rounded-xl text-sm font-black text-white" style={{ background: HEX }}>올리기</button>
                  </motion.div>
                )}
              </AnimatePresence>

              {posts.map((post, i) => (
                <motion.div key={post.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className="bg-white rounded-2xl border p-4" style={{ borderColor: ha(0.1) }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black" style={{ background: HEX }}>
                        {post.author[0]}
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-800">{post.author}</p>
                        <p className="text-[10px] text-slate-400">{post.date}</p>
                      </div>
                    </div>
                    <button onClick={() => setPosts(p => p.filter(x => x.id !== post.id))} className="text-slate-200 hover:text-red-400 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{post.content}</p>
                  <div className="flex items-center justify-between mt-3">
                    <button onClick={() => toggleLike(post.id)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black transition-all"
                      style={post.liked ? { background: ha(0.15), color: HEX } : { background: '#f8fafc', color: '#94a3b8' }}>
                      <ThumbsUp size={11} />
                      <span>{post.likes}</span>
                    </button>
                    <Smile size={14} className="text-slate-300" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {tab === 1 && (
            <motion.div key="events" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3 pt-1">
              <button onClick={() => setShowEventForm(v => !v)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-black text-white"
                style={{ background: HEX }}>
                <Plus size={15} /> 행사 추가
              </button>
              <AnimatePresence>
                {showEventForm && (
                  <motion.div key="ef" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="bg-white rounded-2xl border p-4 space-y-2 overflow-hidden" style={{ borderColor: ha(0.2) }}>
                    <input value={eventForm.title} onChange={e => setEventForm(f => ({ ...f, title: e.target.value }))}
                      placeholder="행사명" className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: ha(0.2) }} />
                    <input type="date" value={eventForm.date} onChange={e => setEventForm(f => ({ ...f, date: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: ha(0.2) }} />
                    <select value={eventForm.type} onChange={e => setEventForm(f => ({ ...f, type: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border text-sm outline-none bg-white" style={{ borderColor: ha(0.2) }}>
                      {Object.keys(EVENT_TYPES).map(t => <option key={t}>{t}</option>)}
                    </select>
                    <button onClick={addEvent} className="w-full py-2 rounded-xl text-sm font-black text-white" style={{ background: HEX }}>저장</button>
                  </motion.div>
                )}
              </AnimatePresence>
              {events.sort((a, b) => a.date.localeCompare(b.date)).map((ev, i) => (
                <motion.div key={ev.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl border p-4 flex items-center gap-3" style={{ borderColor: ha(0.1) }}>
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${EVENT_TYPES[ev.type] ?? HEX}18` }}>
                    <Calendar size={16} style={{ color: EVENT_TYPES[ev.type] ?? HEX }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-slate-800">{ev.title}</span>
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full text-white" style={{ background: EVENT_TYPES[ev.type] ?? HEX }}>{ev.type}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{ev.date}</p>
                  </div>
                  <button onClick={() => setEvents(p => p.filter(x => x.id !== ev.id))} className="flex-shrink-0 text-slate-200 hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {tab === 2 && (
            <motion.div key="groups" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3 pt-1">
              <button onClick={() => setShowGroupForm(v => !v)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-black text-white"
                style={{ background: HEX }}>
                <Plus size={15} /> 소그룹 만들기
              </button>
              <AnimatePresence>
                {showGroupForm && (
                  <motion.div key="gf" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="bg-white rounded-2xl border p-4 space-y-2 overflow-hidden" style={{ borderColor: ha(0.2) }}>
                    <input value={groupForm.name} onChange={e => setGroupForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="소그룹 이름" className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: ha(0.2) }} />
                    <input value={groupForm.leader} onChange={e => setGroupForm(f => ({ ...f, leader: e.target.value }))}
                      placeholder="리더 이름" className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: ha(0.2) }} />
                    <input value={groupForm.topic} onChange={e => setGroupForm(f => ({ ...f, topic: e.target.value }))}
                      placeholder="모임 주제" className="w-full px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: ha(0.2) }} />
                    <button onClick={addGroup} className="w-full py-2 rounded-xl text-sm font-black text-white" style={{ background: HEX }}>만들기</button>
                  </motion.div>
                )}
              </AnimatePresence>
              {groups.map((g, i) => (
                <motion.div key={g.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl border p-4" style={{ borderColor: ha(0.1) }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-black text-slate-800">{g.name}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{g.topic}</p>
                      <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400">
                        <span>리더: {g.leader}</span>
                        <div className="flex items-center gap-1" style={{ color: HEX }}>
                          <Users size={10} />
                          <span className="font-black">{g.members}명</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setGroups(p => p.map(x => x.id === g.id ? { ...x, members: x.members + 1 } : x))}
                        className="text-xs font-black px-2 py-1 rounded-lg text-white" style={{ background: HEX }}>+1</button>
                      <button onClick={() => setGroups(p => p.filter(x => x.id !== g.id))} className="text-slate-200 hover:text-red-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
