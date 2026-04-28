/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { SurveyIntro } from './components/SurveyIntro';
import { SurveyEngine } from './components/SurveyEngine';
import { SurveyResults } from './components/SurveyResults';
import { SurveyConfig } from './types';
import './MirrorInsight.css';

// Simple state machine for routing
type AppState = 'dashboard' | 'intro' | 'engine' | 'results';

export default function MirrorInsightApp() {
  const [appState, setAppState] = useState<AppState>('dashboard');
  const [activeSurvey, setActiveSurvey] = useState<SurveyConfig | null>(null);
  const [modeLimit, setModeLimit] = useState<number>(30);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleSelectSurvey = (config: SurveyConfig) => {
    setActiveSurvey(config);
    setAppState('intro');
  };

  const handleStartSurvey = (limit: number) => {
    setModeLimit(limit);
    setAppState('engine');
  };

  const handleCompleteSurvey = (finalAnswers: Record<number, number>) => {
    setAnswers(finalAnswers);
    setAppState('results');
  };

  const handleRestart = () => {
    setAnswers({});
    setAppState('intro');
  };

  const handleHome = () => {
    setActiveSurvey(null);
    setAnswers({});
    setAppState('dashboard');
  };

  return (
    <div className="mirror-theme min-h-screen bg-slate-950 font-sans text-slate-200 antialiased">
      {appState === 'dashboard' && <Dashboard onSelectSurvey={handleSelectSurvey} />}
      
      {appState === 'intro' && activeSurvey && (
        <SurveyIntro 
          survey={activeSurvey} 
          onBack={handleHome} 
          onStart={handleStartSurvey} 
        />
      )}
      
      {appState === 'engine' && activeSurvey && (
        <SurveyEngine 
          survey={activeSurvey} 
          modeLimit={modeLimit} 
          onComplete={handleCompleteSurvey} 
        />
      )}

      {appState === 'results' && activeSurvey && (
        <SurveyResults 
          survey={activeSurvey} 
          answers={answers} 
          onRestart={handleRestart} 
          onHome={handleHome} 
        />
      )}
    </div>
  );
}
