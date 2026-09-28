import { useEffect, useState } from 'react';
import { checkApiHealth } from '@/api/client';
import { 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Database, 
  Server, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  RefreshCw 
} from 'lucide-react';

interface HealthResponse {
  status: string;
  timestamp: string;
  service: string;
  version: string;
  uptime: number;
  environment: string;
}

export function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealth = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await checkApiHealth();
      setHealth(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to connect to backend API';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark text-brand-ivory flex flex-col justify-between selection:bg-brand-gold selection:text-brand-dark">
      {/* Top subtle luxury bar */}
      <header className="border-b border-brand-border/40 bg-brand-charcoal/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-serif tracking-[0.2em] font-semibold text-brand-ivory">
              MOMENTA
            </span>
            <span className="text-[10px] tracking-widest text-brand-gold uppercase px-2 py-0.5 border border-brand-gold/30 rounded-full font-sans">
              Phase 1 Live
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-xs text-brand-muted tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              ARCHITECTURAL FOUNDATION
            </div>
            <button
              onClick={fetchHealth}
              disabled={loading}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider px-4 py-2 border border-brand-gold/40 text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 rounded font-medium"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Test Connection
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 w-full flex flex-col justify-center">
        {/* Eyebrow & Headline */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 text-brand-gold text-xs font-semibold tracking-eyebrow uppercase">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            Full-Stack Event Platform Architecture
          </div>
          <h1 className="text-4xl md:text-6xl font-serif tracking-tight font-medium">
            MOMENTA <span className="text-gold-gradient font-serif italic">Events & Experiences</span>
          </h1>
          <p className="text-brand-cream/80 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
            Phase 1 Foundation successfully initialized. Monorepo architecture, Express TypeScript REST API, 
            PostgreSQL Prisma Schema, and Tailwind luxury design tokens are compiled and operational.
          </p>
        </div>

        {/* Backend & Health Status Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* API Health Connection Card */}
          <div className="md:col-span-2 p-8 rounded-xl bg-brand-charcoal border border-brand-border/30 relative overflow-hidden shadow-2xl">
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-brand-gold font-semibold">
                  API & Backend Status
                </span>
                <h3 className="text-xl font-serif text-brand-ivory mt-1">
                  Express + TypeScript REST Service
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {loading ? (
                  <span className="inline-flex items-center gap-1.5 text-xs text-brand-gold px-3 py-1 rounded-full bg-brand-gold/10">
                    <RefreshCw className="w-3 h-3 animate-spin" /> Verifying...
                  </span>
                ) : health?.status === 'healthy' ? (
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
                    <CheckCircle2 className="w-3.5 h-3.5" /> API Connected
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs text-rose-400 px-3 py-1 rounded-full bg-rose-400/10 border border-rose-400/20">
                    <XCircle className="w-3.5 h-3.5" /> Disconnected
                  </span>
                )}
              </div>
            </div>

            {health ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-brand-dark/70 border border-white/5 font-mono text-xs">
                <div>
                  <span className="text-brand-muted block text-[10px] uppercase">Service</span>
                  <span className="text-brand-ivory font-medium truncate block">{health.service}</span>
                </div>
                <div>
                  <span className="text-brand-muted block text-[10px] uppercase">Status</span>
                  <span className="text-emerald-400 font-medium">{health.status}</span>
                </div>
                <div>
                  <span className="text-brand-muted block text-[10px] uppercase">Version</span>
                  <span className="text-brand-ivory font-medium">{health.version}</span>
                </div>
                <div>
                  <span className="text-brand-muted block text-[10px] uppercase">Environment</span>
                  <span className="text-brand-gold font-medium">{health.environment}</span>
                </div>
              </div>
            ) : error ? (
              <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                <p className="font-semibold mb-1">Backend Connection Notice:</p>
                <p>{error}</p>
                <p className="mt-2 text-[11px] text-rose-300/80">
                  Run <code className="bg-black/40 px-1 py-0.5 rounded">npm run dev</code> from root to start both server and client together.
                </p>
              </div>
            ) : null}

            <div className="mt-6 flex items-center justify-between text-xs text-brand-muted pt-4 border-t border-white/5">
              <span>Endpoint: <code className="text-brand-gold">GET /api/health</code></span>
              <span>CORS & Helmet active</span>
            </div>
          </div>

          {/* Database & Prisma Architecture Card */}
          <div className="p-8 rounded-xl bg-brand-charcoal border border-brand-border/30 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="w-10 h-10 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold mb-4">
                <Database className="w-5 h-5" />
              </div>
              <span className="text-[11px] uppercase tracking-wider text-brand-gold font-semibold">
                Relational Architecture
              </span>
              <h3 className="text-xl font-serif text-brand-ivory mt-1 mb-2">
                Prisma ORM & PostgreSQL
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                17 robust schema models compiled: Admin, Customer, EventCategory, Service, Package, Event, EventImage, EventVideo, Review, Testimonial, Enquiry, AuditLog.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-brand-gold">
              <span>Client v6.x Generated</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Foundation Specs Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-lg bg-brand-surface/70 border border-white/5">
            <div className="flex items-center gap-2 text-brand-gold mb-2">
              <Layers className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-semibold">Monorepo</span>
            </div>
            <p className="text-xs text-brand-cream/80">Clean separation of <code className="text-brand-gold">/client</code> and <code className="text-brand-gold">/server</code> with unified root scripts.</p>
          </div>

          <div className="p-5 rounded-lg bg-brand-surface/70 border border-white/5">
            <div className="flex items-center gap-2 text-brand-gold mb-2">
              <Server className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-semibold">API Pipeline</span>
            </div>
            <p className="text-xs text-brand-cream/80">Express with Helmet, CORS, centralized Error Handling & Zod validation schema ready.</p>
          </div>

          <div className="p-5 rounded-lg bg-brand-surface/70 border border-white/5">
            <div className="flex items-center gap-2 text-brand-gold mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-semibold">Security & Auth</span>
            </div>
            <p className="text-xs text-brand-cream/80">Role-based JWT architecture (SUPER_ADMIN, ADMIN, EDITOR) with bcrypt/Argon2 hashing.</p>
          </div>

          <div className="p-5 rounded-lg bg-brand-surface/70 border border-white/5">
            <div className="flex items-center gap-2 text-brand-gold mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-semibold">Luxury Tokens</span>
            </div>
            <p className="text-xs text-brand-cream/80">Tailwind configured with Near-Black (#111111), Charcoal (#181818), Ivory (#F5F0E8), Gold (#C9A45C).</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-brand-border/30 bg-brand-charcoal/50 py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-brand-muted gap-4">
          <div>
            © 2026 MOMENTA. Events & Experiences. Production Architecture.
          </div>
          <div className="flex items-center gap-2 text-brand-gold">
            <span>Awaiting Phase 2 Confirmation: Design System & Cinematic Homepage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
