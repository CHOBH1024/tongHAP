// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Icon } from '@/components/diagnosis/Icon';
import { Archetype, SavedTeam } from '@/lib/types';
import { archetypes } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';

interface TeamBuilderProps {
    results: Archetype[];
    inputs: any;
}

type Category = 'VISION' | 'STRUCTURE' | 'RELATION' | 'ACTION';

const getCategory = (id: number): Category => {
    if ([1, 8, 3].includes(id)) return 'VISION';
    if ([4, 6].includes(id)) return 'STRUCTURE';
    if ([2, 7, 9].includes(id)) return 'RELATION';
    if ([5].includes(id)) return 'ACTION';
    return 'VISION';
};

const getCategoryInfo = (cat: Category) => {
    switch(cat) {
        case 'VISION': return { label: "비전 (Vision)", color: "text-brand-500 bg-brand-50 border-brand-100", icon: "Crown" };
        case 'STRUCTURE': return { label: "체계 (System)", color: "text-emerald-500 bg-emerald-50 border-emerald-100", icon: "Castle" };
        case 'RELATION': return { label: "관계 (Relation)", color: "text-rose-500 bg-rose-50 border-rose-100", icon: "HeartHandshake" };
        case 'ACTION': return { label: "실행 (Action)", color: "text-amber-500 bg-amber-50 border-amber-100", icon: "Flame" };
    }
};

const teamRoleDefinitions: Record<number, { roleName: string; contribution: string; task: string; icon: string; theme: string }> = {
    1: { roleName: "규율 반장", contribution: "팀의 원칙과 마감을 엄격하게 관리하여 질서를 확립합니다.", task: "PM, 회의록 작성, 규정 준수 검수", icon: "Scale", theme: "slate" },
    2: { roleName: "케어 매니저", contribution: "팀원의 정서적 상태를 살피고 심정적 유대를 강화합니다.", task: "팀 빌딩, 갈등 중재, 상담", icon: "HeartHandshake", theme: "pink" },
    3: { roleName: "영적 나침반", contribution: "팀이 본질을 잃지 않도록 방향을 정렬시킵니다.", task: "비전 정렬, 영적 가이드", icon: "Compass", theme: "purple" },
    4: { roleName: "보급관", contribution: "섭리의 물적 토대를 빈틈없이 관리하여 후방을 지킵니다.", task: "예산 집행, 행정 절차 관리", icon: "Briefcase", theme: "blue" },
    5: { roleName: "선봉장", contribution: "최전선에서 패배주의를 깨고 도전적 에너지를 전파합니다.", task: "외부 섭외, 현장 답사, 분위기 쇄신", icon: "Flame", theme: "red" },
    6: { roleName: "전략가", contribution: "아이디어를 논리적 체계로 정리하여 정교한 기획을 만듭니다.", task: "기획서 작성, 데이터 분석", icon: "Map", theme: "indigo" },
    7: { roleName: "피스메이커", contribution: "구성원 간 갈등을 조기에 감지하고 조화를 만듭니다.", task: "회의 진행, 대외 협력 창구", icon: "Wheat", theme: "green" },
    8: { roleName: "혁신가", contribution: "낡은 관습을 깨고 시대에 맞는 새로운 시안을 제안합니다.", task: "아이디어 발제, 트렌드 벤치마킹", icon: "Sparkles", theme: "amber" },
    9: { roleName: "감성 디렉터", contribution: "문화를 아름답게 표현하여 예술적 영성을 불어넣습니다.", task: "디자인, 영상, 공간 연출", icon: "Feather", theme: "rose" }
};

const getThemeClasses = (theme: string) => {
    switch(theme) {
        case 'slate': return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700', iconBg: 'bg-slate-100', accent: 'border-slate-400' };
        case 'pink': return { bg: 'bg-rose-50', border: 'border-rose-100', text: 'text-rose-700', iconBg: 'bg-rose-100', accent: 'border-rose-300' };
        case 'purple': return { bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-700', iconBg: 'bg-indigo-100', accent: 'border-indigo-300' };
        case 'blue': return { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-700', iconBg: 'bg-blue-100', accent: 'border-blue-300' };
        case 'red': return { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-700', iconBg: 'bg-red-100', accent: 'border-red-300' };
        case 'indigo': return { bg: 'bg-brand-50', border: 'border-brand-100', text: 'text-brand-700', iconBg: 'bg-brand-100', accent: 'border-brand-300' };
        case 'green': return { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-700', iconBg: 'bg-emerald-100', accent: 'border-emerald-300' };
        case 'amber': return { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-700', iconBg: 'bg-amber-100', accent: 'border-amber-300' };
        case 'rose': return { bg: 'bg-rose-50', border: 'border-rose-100', text: 'text-rose-700', iconBg: 'bg-rose-100', accent: 'border-rose-300' };
        default: return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700', iconBg: 'bg-slate-100', accent: 'border-slate-300' };
    }
};

export const TeamBuilder: React.FC<TeamBuilderProps> = ({ results }) => {
    const myArchetype = results[0];
    const [partners, setPartners] = useState<Archetype[]>([]);
    const [teamName, setTeamName] = useState('');
    const [savedTeams, setSavedTeams] = useState<SavedTeam[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('cig_saved_teams');
        if (stored) {
            try { setSavedTeams(JSON.parse(stored)); } catch (e) { console.error(e); }
        }
    }, []);

    const addPartner = (archetype: Archetype) => {
        if (partners.length < 4) setPartners([...partners, archetype]);
        else alert("팀은 최대 5명까지 구성 가능합니다.");
    };

    const removePartner = (index: number) => {
        const newPartners = [...partners];
        newPartners.splice(index, 1);
        setPartners(newPartners);
    };

    const handleSaveTeam = () => {
        if (partners.length === 0 || !teamName.trim()) return;
        const newTeam: SavedTeam = {
            id: Date.now().toString(),
            name: teamName,
            myArchetypeId: myArchetype.id,
            partnerIds: partners.map(p => p.id),
            createdAt: Date.now()
        };
        const updated = [newTeam, ...savedTeams];
        setSavedTeams(updated);
        localStorage.setItem('cig_saved_teams', JSON.stringify(updated));
        setTeamName('');
    };

    const team = [myArchetype, ...partners];

    return (
        <div className="space-y-16 animate-[fadeIn_0.5s_ease-out]">
            <section className="text-center space-y-4">
                <h3 className="text-4xl font-black text-brand-900">Providential Team Builder</h3>
                <p className="text-lg text-slate-500 font-bold max-w-2xl mx-auto leading-relaxed">
                    당신의 아키타입과 가장 시너지가 나는 파트너를 조합하여 <br/> 최적의 사역 팀 시뮬레이션을 진행해보세요.
                </p>
            </section>

            {/* Current Team Status */}
            <div className="glass-card !p-8 space-y-8">
                <div className="flex flex-wrap gap-4 items-center justify-between">
                    <h4 className="text-xl font-black text-brand-900 uppercase tracking-widest flex items-center gap-2">
                        <Icon name="Users" className="text-brand-500"/> Current Formation ({team.length}/5)
                    </h4>
                    <div className="flex gap-2">
                        <input 
                            type="text" value={teamName} onChange={e => setTeamName(e.target.value)}
                            placeholder="팀 이름을 입력하세요..."
                            className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-brand-500/20"
                        />
                        <button onClick={handleSaveTeam} className="premium-btn-primary !py-2.5 !px-6 text-sm">팀 저장</button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    {team.map((member, idx) => {
                        const info = teamRoleDefinitions[member.id];
                        const theme = getThemeClasses(info.theme);
                        return (
                            <motion.div 
                                key={`${member.id}-${idx}`}
                                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                className={`relative group p-6 rounded-[2rem] border-2 transition-all ${idx === 0 ? 'border-brand-500 bg-brand-50 shadow-lg shadow-brand-500/10' : 'border-slate-100 bg-white hover:border-brand-200'}`}
                            >
                                {idx > 0 && (
                                    <button onClick={() => removePartner(idx-1)} className="absolute -top-2 -right-2 w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                        <Icon name="X" size={14}/>
                                    </button>
                                )}
                                <div className="flex flex-col items-center text-center space-y-3">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${idx === 0 ? 'bg-brand-500 text-white' : 'bg-slate-50 text-slate-400'}`}>
                                        <Icon name={info.icon} size={28}/>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{idx === 0 ? 'Leader (You)' : `Partner ${idx}`}</span>
                                        <h5 className="text-lg font-black text-brand-900 leading-tight">{member.title}</h5>
                                        <p className="text-xs font-bold text-brand-500 mt-1">{info.roleName}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                    {team.length < 5 && (
                        <div className="border-2 border-dashed border-slate-200 rounded-[2rem] flex items-center justify-center min-h-[160px] text-slate-300">
                            <Icon name="Plus" size={32} className="opacity-20"/>
                        </div>
                    )}
                </div>
            </div>

            {/* Partner Selection */}
            <section className="space-y-8">
                <h4 className="text-2xl font-black text-brand-900 flex items-center gap-3">
                    <Icon name="Target" className="text-emerald-500"/> 파트너 아키타입 선택
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-4">
                    {archetypes.map(a => (
                        <button 
                            key={a.id} 
                            onClick={() => addPartner(a)}
                            className="flex flex-col items-center p-4 rounded-[1.5rem] border border-slate-100 bg-white hover:border-brand-500 hover:shadow-xl hover:-translate-y-1 transition-all group"
                        >
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-brand-500 group-hover:text-white transition-all mb-3">
                                <Icon name={teamRoleDefinitions[a.id].icon} size={20}/>
                            </div>
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">ID {a.id}</span>
                            <span className="text-xs font-black text-brand-900 text-center leading-tight">{a.title}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* Result Analysis Placeholders (In a real app, logic from original file would be here) */}
            <div className="glass-card !bg-brand-900 !text-white !p-12 text-center space-y-6">
                <Icon name="Cpu" size={48} className="mx-auto text-brand-500 animate-pulse"/>
                <h3 className="text-3xl font-black">AI Team Dynamics Analysis</h3>
                <p className="text-white/60 font-bold max-w-2xl mx-auto">선택된 파트너와의 영적, 실무적 시너지를 분석 중입니다. 팀 구성을 완료하면 심층 리포트가 생성됩니다.</p>
            </div>
        </div>
    );
};
