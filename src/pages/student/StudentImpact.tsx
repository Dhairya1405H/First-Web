import React, { useState } from 'react';
import { 
  Leaf, 
  Droplets, 
  Recycle, 
  PackageX, 
  Bike, 
  Info, 
  Download, 
  Share2, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  Award,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';
import { useEco } from '../../context/EcoContext';

export const StudentImpact: React.FC = () => {
  const { user } = useEco();
  const [showCertificate, setShowCertificate] = useState(false);

  const categoryDistribution = [
    { name: 'Low-Carbon Transport', value: 38, color: '#0284C7' },
    { name: 'Waste Diversion & Composting', value: 26, color: '#16A34A' },
    { name: 'Energy Conservation', value: 16, color: '#F59E0B' },
    { name: 'Plastic Avoidance', value: 12, color: '#F43F5E' },
    { name: 'Water Stewardship', value: 8, color: '#0D9488' },
  ];

  const cumulativeTrend = [
    { week: 'Week 1', co2: 2.4, water: 90 },
    { week: 'Week 2', co2: 6.8, water: 220 },
    { week: 'Week 3', co2: 12.1, water: 410 },
    { week: 'Week 4 (Current)', co2: 18.4, water: 620 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-eco-primary mb-1">
            <Leaf className="w-4 h-4" />
            <span>Audited Environmental Footprint</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-eco-dark">
            My Environmental Impact
          </h1>
          <p className="text-sm sm:text-base text-eco-muted mt-1">
            Tangible, verified carbon and resource savings calculated from your completed school challenges.
          </p>
        </div>

        <button
          onClick={() => setShowCertificate(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-eco-primary hover:bg-eco-dark text-white font-bold text-sm shadow-xs hover:shadow-eco transition-all shrink-0 cursor-pointer"
        >
          <Award className="w-4 h-4 text-eco-lime" />
          <span>View Impact Certificate</span>
        </button>
      </div>

      {/* Prominent Scientific Notice */}
      <div className="p-4 sm:p-5 rounded-2xl bg-eco-subtle border border-eco-border flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-white text-eco-primary shadow-2xs shrink-0 mt-0.5">
          <Info className="w-5 h-5 text-eco-primary" />
        </div>
        <div className="space-y-1 text-xs sm:text-sm text-eco-muted">
          <p className="text-eco-dark font-bold">
            Transparent Science & Measurement Notice:
          </p>
          <p>
            All figures shown are <strong>carefully estimated</strong> based on recognized climate conversion models (U.S. EPA GHG Equivalencies, UK DEFRA emission factors, and WaterSense guidelines). Verified school actions directly contribute toward Greenfield International School's official sustainability audit.
          </p>
        </div>
      </div>

      {/* 5 Core Impact Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* 1. CO2 */}
        <div className="bg-white p-6 rounded-3xl border border-eco-border shadow-2xs hover:shadow-eco transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-eco-muted">CO₂ Avoided</span>
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-eco-primary">
              <Leaf className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-3xl sm:text-4xl font-display font-black text-eco-dark">
              {user.co2AvoidedKg} <span className="text-sm font-bold text-eco-muted">kg</span>
            </div>
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-eco-primary bg-eco-lime/20 px-2 py-0.5 rounded">
              Estimated Metric
            </span>
          </div>
          <p className="text-xs text-eco-muted leading-relaxed">
            Equivalent to avoiding emissions from <strong>74 km</strong> driven in an average petrol vehicle, or charging <strong>2,240 smartphones</strong>.
          </p>
        </div>

        {/* 2. Water Saved */}
        <div className="bg-white p-6 rounded-3xl border border-eco-border shadow-2xs hover:shadow-eco transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-800">Water Conserved</span>
            <div className="p-2.5 rounded-2xl bg-cyan-50 text-cyan-600">
              <Droplets className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-3xl sm:text-4xl font-display font-black text-cyan-950">
              {user.waterSavedL} <span className="text-sm font-bold text-cyan-700">L</span>
            </div>
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded">
              Estimated Metric
            </span>
          </div>
          <p className="text-xs text-eco-muted leading-relaxed">
            Equal to approximately <strong>10 full bathtubs</strong> saved through timed 4-minute showers and classroom drip audits.
          </p>
        </div>

        {/* 3. Waste Diverted */}
        <div className="bg-white p-6 rounded-3xl border border-eco-border shadow-2xs hover:shadow-eco transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Waste Diverted</span>
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600">
              <Recycle className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-3xl sm:text-4xl font-display font-black text-emerald-950">
              {user.wasteDivertedKg} <span className="text-sm font-bold text-emerald-700">kg</span>
            </div>
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              Estimated Metric
            </span>
          </div>
          <p className="text-xs text-eco-muted leading-relaxed">
            Clean paper, compostable lunch peels, and cardboard channeled away from methane-generating municipal landfills.
          </p>
        </div>

        {/* 4. Plastic Items Avoided */}
        <div className="bg-white p-6 rounded-3xl border border-eco-border shadow-2xs hover:shadow-eco transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">Plastic Items Avoided</span>
            <div className="p-2.5 rounded-2xl bg-rose-50 text-rose-600">
              <PackageX className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-3xl sm:text-4xl font-display font-black text-rose-950">
              {user.plasticAvoided} <span className="text-sm font-bold text-rose-700">items</span>
            </div>
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
              Estimated Metric
            </span>
          </div>
          <p className="text-xs text-eco-muted leading-relaxed">
            Eliminated single-use disposable PET water bottles, snack polybags, plastic cutlery, and synthetic straws.
          </p>
        </div>

        {/* 5. Green Commutes */}
        <div className="bg-white p-6 rounded-3xl border border-eco-border shadow-2xs hover:shadow-eco transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800">Green Commutes</span>
            <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600">
              <Bike className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-3xl sm:text-4xl font-display font-black text-blue-950">
              {user.greenCommutes} <span className="text-sm font-bold text-blue-700">trips</span>
            </div>
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
              Estimated Metric
            </span>
          </div>
          <p className="text-xs text-eco-muted leading-relaxed">
            Low/zero emission trips via bicycle, walking buddy groups, or collective school bus routes.
          </p>
        </div>

        {/* 6. Summary Card */}
        <div className="bg-gradient-to-tr from-eco-dark to-eco-primary text-white p-6 rounded-3xl shadow-eco flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-eco-lime">
              <Sparkles className="w-4 h-4 fill-eco-lime" />
              <span>School Impact Contribution</span>
            </div>
            <h3 className="font-display font-extrabold text-2xl">
              1.8% of Total School Goal
            </h3>
            <p className="text-xs text-white/80 leading-relaxed">
              Aarav's 37 completed challenges represent nearly 2% of Greenfield International's annual climate commitment target.
            </p>
          </div>
          <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs font-bold">
            <span className="text-white/80">Class contribution:</span>
            <span className="text-eco-lime font-black">12.4% of Class 9-B</span>
          </div>
        </div>

      </div>

      {/* Interactive Charts: Category breakdown and cumulative savings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Cumulative Area Chart */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-eco-border shadow-2xs space-y-4">
          <div>
            <h3 className="font-display font-extrabold text-xl text-eco-dark">
              Cumulative CO₂ Avoided (Last 30 Days)
            </h3>
            <p className="text-xs text-eco-muted mt-0.5">
              Progress curve showing sustained climate habit development
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cumulativeTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3ECE4" />
                <XAxis dataKey="week" tick={{ fill: '#647067', fontSize: 12 }} />
                <YAxis unit="kg" tick={{ fill: '#647067', fontSize: 11 }} />
                <Tooltip 
                  formatter={(val: number) => [`${val} kg CO₂ avoided`, 'Cumulative Savings']}
                  contentStyle={{ backgroundColor: '#17231A', color: '#fff', borderRadius: '12px', border: 'none' }}
                />
                <Area type="monotone" dataKey="co2" stroke="#16A34A" strokeWidth={3} fillOpacity={1} fill="url(#co2Gradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Donut */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-eco-border shadow-2xs space-y-4">
          <div>
            <h3 className="font-display font-extrabold text-xl text-eco-dark">
              Impact by Sustainability Pillar
            </h3>
            <p className="text-xs text-eco-muted mt-0.5">
              Distribution of actions across environmental sectors
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(val: number) => [`${val}% of total actions`, 'Share']}
                    contentStyle={{ backgroundColor: '#17231A', color: '#fff', borderRadius: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 text-xs">
              {categoryDistribution.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="font-semibold text-eco-dark truncate">{cat.name}</span>
                  </div>
                  <span className="font-extrabold text-eco-muted">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Scientific Methodology & Standards */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-eco-border shadow-2xs space-y-4">
        <h3 className="font-display font-bold text-xl text-eco-dark">
          Conversion Factors & Scientific Methodology
        </h3>
        <p className="text-xs sm:text-sm text-eco-muted">
          EcoQuest maintains an open conversion ledger so teachers, parents, and school audit committees can independently verify every figure:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-eco-subtle border border-eco-border text-xs space-y-1.5">
            <h4 className="font-bold text-eco-dark">Transport (Commutes)</h4>
            <p className="text-eco-muted leading-relaxed">
              Based on EPA average passenger car emission factors: <strong>0.24 kg CO₂ per passenger-km avoided</strong> when walking or cycling versus solo parent car drop-off.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-eco-subtle border border-eco-border text-xs space-y-1.5">
            <h4 className="font-bold text-eco-dark">Water (Timed Showers & Taps)</h4>
            <p className="text-eco-muted leading-relaxed">
              Based on WaterSense standard flow rate: <strong>9.5 Liters per minute</strong> saved for each minute trimmed off average bath or running tap usage.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-eco-subtle border border-eco-border text-xs space-y-1.5">
            <h4 className="font-bold text-eco-dark">Waste & Composting</h4>
            <p className="text-eco-muted leading-relaxed">
              DEFRA Landfill diversion model: <strong>0.72 kg CO₂e avoided per kg</strong> of organic food waste diverted to school compost systems instead of landfill anaerobic decay.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-eco-subtle border border-eco-border text-xs space-y-1.5">
            <h4 className="font-bold text-eco-dark">Plastics & Single-Use Packaging</h4>
            <p className="text-eco-muted leading-relaxed">
              Life Cycle Assessment (LCA) for PET bottles and wrappers: <strong>~82.8 g CO₂e per 500ml single-use bottle lifecycle</strong> avoided through reusable alternatives.
            </p>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border-4 border-eco-primary shadow-2xl space-y-6 animate-in zoom-in-95 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-eco-lime/30 text-eco-dark flex items-center justify-center shadow-eco">
              <Award className="w-10 h-10 text-eco-dark" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-widest text-eco-primary">
                Greenfield International School • Green Audit 2026
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-eco-dark">
                Official Eco-Action Certificate
              </h2>
              <p className="text-xs sm:text-sm text-eco-muted">
                This certifies that student <strong>Aarav Sharma</strong> has successfully logged and verified 37 environmental challenges.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 p-4 rounded-2xl bg-eco-subtle border border-eco-border text-center">
              <div>
                <div className="font-display font-black text-lg text-eco-dark">18.4 kg</div>
                <div className="text-[10px] text-eco-muted font-bold">Est. CO₂ Avoided</div>
              </div>
              <div>
                <div className="font-display font-black text-lg text-cyan-900">620 L</div>
                <div className="text-[10px] text-eco-muted font-bold">Est. Water Saved</div>
              </div>
              <div>
                <div className="font-display font-black text-lg text-emerald-900">42</div>
                <div className="text-[10px] text-eco-muted font-bold">Plastics Avoided</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  alert('Certificate downloaded in PDF format for school portfolio.');
                  setShowCertificate(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-eco-primary hover:bg-eco-dark text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Audit</span>
              </button>
              <button
                onClick={() => setShowCertificate(false)}
                className="px-4 py-2.5 rounded-xl border border-eco-border text-eco-muted hover:text-eco-dark text-xs sm:text-sm font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
