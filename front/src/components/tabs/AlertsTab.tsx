import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  AlertTriangle,
  Radio,
  Send,
  Volume2,
  Copy,
  Check,
  Building2,
  MapPin,
  Clock,
  CheckCircle2,
  BellRing,
  Globe,
  Share2,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { soundFx } from '../../utils/audioAlerts';

export const AlertsTab: React.FC = () => {
  const { alerts, userRole, setIsBroadcastModalOpen, triggerEmergencySiren, dismissAlert, setActiveTab } = useApp();
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi' | 'mr'>('en');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeAlerts = alerts.filter((a) => a.status === 'active');
  const criticalCount = activeAlerts.filter((a) => a.severity === 'critical' || a.severity === 'danger').length;

  const handleCopyAlert = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    soundFx.playBeep(1100, 'sine', 0.08);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTriggerSiren = () => {
    triggerEmergencySiren();
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner with Active Alert Count & Multilingual Switcher */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Early Warning & Ward Dispatch Grid
                </h2>
                <span className="bg-red-500 text-white text-xs font-mono font-bold px-2.5 py-0.5 rounded-full animate-pulse shadow-md shadow-red-500/50">
                  {activeAlerts.length} ACTIVE ALERTS
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Real-time river stage breach notifications, AI floodwave advisories, and multilingual emergency ward dissemination.
              </p>
            </div>
          </div>

          {/* Language Selector & Officer Action */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Multilingual Selector */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setSelectedLanguage('en')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${selectedLanguage === 'en'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                English
              </button>
              <button
                onClick={() => setSelectedLanguage('hi')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${selectedLanguage === 'hi'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                हिन्दी (Hindi)
              </button>
              <button
                onClick={() => setSelectedLanguage('mr')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${selectedLanguage === 'mr'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                मराठी (Marathi)
              </button>
            </div>

            {/* Officer Broadcast Button */}
            {userRole === 'officer' && (
              <button
                onClick={() => setIsBroadcastModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-red-500/20 flex items-center gap-1.5 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Issue Ward Broadcast</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Emergency Siren Test Box */}
      <div className="bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border border-red-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <BellRing className="w-5 h-5 text-red-400 animate-bounce" />
          <div className="text-xs">
            <span className="text-white font-bold">Public Warning Siren Grid (VHF/DMR Synchronized): </span>
            <span className="text-slate-400">Can be sounded across Nag River and Uppalwadi riverfront poles.</span>
          </div>
        </div>

        <button
          onClick={handleTriggerSiren}
          className="px-3.5 py-1.5 bg-red-600/80 hover:bg-red-500 text-white text-xs font-bold font-mono rounded-lg transition-all flex items-center gap-1.5 shadow-md shrink-0"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Sound Test Siren</span>
        </button>
      </div>

      {/* Active Alerts Feed */}
      <div className="space-y-4">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>Active Breach Advisories ({alerts.length})</span>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => {
            const isCritical = alert.severity === 'critical' || alert.severity === 'danger';
            const alertCardBg = isCritical
              ? 'bg-red-950/20 border-red-500/50 shadow-lg shadow-red-950/30'
              : alert.severity === 'warning'
                ? 'bg-amber-950/20 border-amber-500/50 shadow-lg shadow-amber-950/30'
                : 'bg-slate-900/90 border-slate-800';

            const activeMessage =
              selectedLanguage === 'hi'
                ? alert.messageHi
                : selectedLanguage === 'mr'
                  ? alert.messageMr
                  : alert.messageEn;

            return (
              <div
                key={alert.id}
                className={`p-5 sm:p-6 rounded-2xl border transition-all relative overflow-hidden backdrop-blur-xl ${alertCardBg}`}
              >
                {/* Left severity indicator bar */}
                <div
                  className={`absolute top-0 bottom-0 left-0 w-1.5 ${isCritical ? 'bg-red-500' : alert.severity === 'warning' ? 'bg-amber-500' : 'bg-cyan-500'
                    }`}
                />

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3 pl-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md border ${isCritical
                            ? 'bg-red-500/20 text-red-400 border-red-500/40'
                            : alert.severity === 'warning'
                              ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                              : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                          }`}
                      >
                        {alert.severity.toUpperCase()} ALERT • {alert.waterBodyName}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {alert.timestamp}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">{alert.title}</h3>
                    <div className="text-xs text-slate-400 font-medium">{alert.nativeTitle}</div>
                  </div>

                  {/* Actions: Copy & Dismiss */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => handleCopyAlert(alert.id, `${alert.title}\n\n${activeMessage}`)}
                      title="Copy broadcast text to clipboard"
                      className="p-2 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 rounded-lg border border-slate-700 transition-all text-xs flex items-center gap-1 font-mono"
                    >
                      {copiedId === alert.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 text-[10px]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[10px]">Copy Text</span>
                        </>
                      )}
                    </button>

                    {userRole === 'officer' && (
                      <button
                        onClick={() => dismissAlert(alert.id)}
                        className="px-2.5 py-1.5 bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg border border-slate-700 text-xs transition-colors"
                      >
                        Mitigate / Close
                      </button>
                    )}
                  </div>
                </div>

                {/* Multilingual Message Content */}
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 my-3 pl-3">
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">{activeMessage}</p>
                </div>

                {/* Action Required & Affected Wards */}
                <div className="space-y-2 pt-1 pl-2">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="text-slate-400 font-semibold">Affected Wards:</span>
                    {alert.affectedWards.map((w) => (
                      <span
                        key={w}
                        className="bg-slate-900 border border-slate-700 text-slate-300 text-[11px] font-mono px-2 py-0.5 rounded-md"
                      >
                        📍 {w}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs text-amber-300 bg-amber-950/40 p-2.5 rounded-lg border border-amber-500/30 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-200">ICCC Action Directive: </strong>
                      {alert.actionRequired}
                    </div>
                  </div>

                  {/* Evacuation Route CTA for citizens */}
                  {alert.evacuationRecommended && (
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xs text-red-400 font-bold flex items-center gap-1">
                        ⚠️ Evacuation Protocol Recommended for Low-Lying Tenements
                      </span>
                      <button
                        onClick={() => setActiveTab('directory')}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>View Evac Shelters</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
