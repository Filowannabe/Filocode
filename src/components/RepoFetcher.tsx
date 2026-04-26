"use client";

import { useState, useCallback } from 'react';
import { fetchRepositoriosGitHub } from '@/services/githubApi';
import { GitHubRepository, FetchState } from '@/types/repositorio';
import { formatPaginationProgress } from '@/utils/pagination';
import { useTranslations } from '@/lib/i18n-client';

interface RepoFetcherProps {
  initialLimit?: number;
}

interface AuditLogEntry {
  action: string;
  timestamp: string;
  [key: string]: unknown;
}

/**
 * RepoFetcher - Extracción técnica de datos.
 * v10: Cero warnings de Tailwind 4 y tipos React 19.
 */
export function RepoFetcher({ initialLimit = 100 }: RepoFetcherProps) {
  const t = useTranslations();
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [repos, setRepos] = useState<GitHubRepository[]>([]);
  const [isUnlimited, setIsUnlimited] = useState(false);

  const [hasSavedState, setHasSavedState] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('github-api-state');
    if (!saved) return false;
    try {
      const state = JSON.parse(saved) as FetchState;
      return state.owner === 'Filowannabe' && !state.isComplete;
    } catch { return false; }
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    if (typeof window === 'undefined') return [];
    const logs = localStorage.getItem('github-audit-logs');
    if (!logs) return [];
    try { return JSON.parse(logs) as AuditLogEntry[]; } catch { return []; }
  });

  const startScan = useCallback(async (isResume: boolean = false) => {
    setIsScanning(true);
    if (!isResume) {
      setProgress(0);
      setRepos([]);
    }
    setHasSavedState(false);

    try {
      const result = await fetchRepositoriosGitHub(
        'Filowannabe', 
        isUnlimited ? 0 : initialLimit, 
        (fetched, total) => {
          const currentProgress = formatPaginationProgress(fetched, total);
          setProgress(currentProgress);
        }
      );
      
      setRepos(result);
      setProgress(100);
      setIsScanning(false);
      
      const logs = localStorage.getItem('github-audit-logs');
      if (logs) setAuditLogs(JSON.parse(logs));
    } catch {
      setIsScanning(false);
    }
  }, [initialLimit, isUnlimited]);

// Funciones de exportación locales
  const exportData = (repos: any[]) => JSON.stringify(repos, null, 2);
  const exportDataCSV = (data: { repositories: any[] }) => {
    const headers = ['id', 'name', 'full_name', 'description', 'stars', 'topics'];
    const rows = data.repositories.map((repo: any) => 
      [repo.id, repo.name, repo.full_name, `"${(repo.description || '').replace(/"/g, '""')}"`, repo.stargazers_count, `"${repo.topics.join(', ')}"`].join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  };
  const exportDataExcel = async (data: { repositories: any[] }) => {
    // Excel export - simplificado a CSV con headers extendidos
    const headers = ['id', 'name', 'full_name', 'description', 'stars', 'forks', 'html_url', 'clone_url', 'topics'];
    const rows = data.repositories.map((repo: any) => 
      [repo.id, repo.name, repo.full_name, `"${(repo.description || '').replace(/"/g, '""')}"`, repo.stargazers_count, repo.forks_count, repo.html_url, repo.clone_url, `"${repo.topics.join(', ')}"`].join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  };
  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExport = useCallback(async (format: 'json' | 'csv' | 'excel') => {
    if (repos.length === 0) return;
    const filename = `filocode-repos-${format}-${Date.now()}`;

    try {
      switch (format) {
        case 'json': downloadFile(exportData(repos), `${filename}.json`, 'application/json'); break;
        case 'csv': downloadFile(exportDataCSV({ repositories: repos }), `${filename}.csv`, 'text/csv'); break;
        case 'excel': downloadFile(await exportDataExcel({ repositories: repos }), `${filename}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'); break;
      }
    } catch (err) { console.error('Export Error:', err); }
  }, [repos]);

  return (
    <div className="bg-black/90 border border-primary p-6 rounded-lg relative overflow-hidden font-mono shadow-[0_0_30px_rgba(251,191,36,0.05)]">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-size-[100%_4px] opacity-10" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-2">
          <h2 className="text-primary text-xl tracking-[0.4em] uppercase">
            {">"} {t("fetch.module_v31")}
          </h2>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={isUnlimited} 
                onChange={(e) => setIsUnlimited(e.target.checked)}
                className="w-3 h-3 accent-primary bg-black border-white/20"
              />
              <span className="text-[9px] text-white/40 group-hover:text-primary uppercase tracking-tighter transition-colors">
                {t("fetch.infinity_mode")}
              </span>
            </label>
          </div>
        </div>

        <div className="space-y-6">
          {!isScanning && repos.length === 0 && (
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => startScan(false)}
                className="bg-primary text-black px-8 py-4 uppercase tracking-[0.2em] font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(251,191,36,0.2)]"
              >
                {t("fetch.start_scan")}
              </button>
              {hasSavedState && (
                <button
                  onClick={() => startScan(true)}
                  className="bg-white/5 border border-white/20 text-white px-8 py-4 uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
                >
                  {t("fetch.resume_protocol")}
                </button>
              )}
            </div>
          )}

          {isScanning && (
            <div className="border border-white/10 p-6 bg-black/60 backdrop-blur-xl rounded">
              <div className="flex justify-between items-end mb-3">
                <div className="text-[10px] text-primary uppercase tracking-[0.3em] animate-pulse">
                  {t("fetch.scanning_nodes")}
                </div>
                <div className="text-sm font-bold text-white">{progress}%</div>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="bg-primary h-full transition-all duration-1000 ease-in-out shadow-[0_0_15px_rgba(251,191,36,0.6)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-4 flex gap-2 overflow-x-auto text-[8px] text-white/20 uppercase no-scrollbar">
                {auditLogs.slice(-3).map((log, i) => (
                  <span key={i} className="whitespace-nowrap border-r border-white/10 pr-2">
                    [{log.action}] {log.timestamp.split('T')[1].split('.')[0]}
                  </span>
                ))}
              </div>
            </div>
          )}

          {repos.length > 0 && (
            <div className="space-y-6 animate-in fade-in duration-1000">
              <div className="flex justify-between items-center">
                <div className="text-green-500 text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgb(34,197,94)]" />
                  {t("fetch.synchronized", { count: repos.length })}
                </div>
                <button 
                  onClick={() => { localStorage.removeItem('github-api-state'); setRepos([]); setProgress(0); }}
                  className="text-[8px] text-white/30 hover:text-red-500 uppercase transition-colors"
                >
                  {t("fetch.purge_memory")}
                </button>
              </div>

              <div className="border border-white/5 rounded-sm bg-black/40 overflow-hidden">
                <div className="max-h-72 overflow-y-auto custom-scrollbar">
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-black border-b border-white/10 text-[8px] text-white/20 uppercase tracking-[0.3em]">
                      <tr>
                        <th className="p-3 font-normal">id</th>
                        <th className="p-3 font-normal">repository_node</th>
                        <th className="p-3 font-normal text-center">stars</th>
                        <th className="p-3 font-normal">clone_endpoint</th>
                        <th className="p-3 font-normal">topics</th>
                      </tr>
                    </thead>
                    <tbody className="text-[10px] text-white/50">
                      {repos.map((repo, index) => (
                        <tr key={repo.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                          <td className="p-3 text-white/10">{index + 1}</td>
                          <td className="p-3 text-primary group-hover:text-white transition-colors">
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline">{repo.name}</a>
                          </td>
                          <td className="p-3 text-center">{repo.stargazers_count}</td>
                          <td className="p-3 text-blue-400/40 text-[9px] truncate max-w-37.5">{repo.clone_url}</td>
                          <td className="p-3 text-white/20 italic">{repo.topics.slice(0, 2).join(' · ')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {['json', 'csv', 'excel'].map((format) => (
                  <button
                    key={format}
                    onClick={() => handleExport(format as 'json' | 'csv' | 'excel')}
                    className="bg-white/5 border border-white/10 py-3 text-[9px] uppercase tracking-[0.4em] hover:bg-primary hover:text-black transition-all"
                  >
                    {t(`fetch.download_${format}`)}
                  </button>
                ))}
              </div>

              <div className="text-[9px] text-white/30 uppercase tracking-[0.2em] border-t border-white/5 mt-6 pt-2">
                metadata_enrichment: {repos.length} repos
              </div>
            </div>
          )}

          {!isScanning && repos.length === 0 && (
            <div className="text-white/10 text-[8px] uppercase tracking-[0.5em] flex items-center justify-center p-12 border border-dashed border-white/5 rounded">
              {t("fetch.waiting")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}