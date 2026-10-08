import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TreePine, 
  Leaf, 
  Heart, 
  ShieldCheck, 
  Globe, 
  Sparkles, 
  Target, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-eco-primary bg-eco-lime/20 px-3 py-1 rounded-full">
          Our Purpose & Mission
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-eco-dark">
          Building the Next Generation of Climate Champions
        </h1>
        <p className="text-base sm:text-lg text-eco-muted leading-relaxed">
          EcoQuest was born from a simple realization: students are overwhelmed by climate anxiety, but inspired when given clear, daily micro-actions they can conquer and celebrate with their peers.
        </p>
      </div>

      {/* Philosophy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-eco-border shadow-2xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-eco-primary/10 text-eco-primary flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl text-eco-dark">Action Over Anxiety</h3>
          <p className="text-sm text-eco-muted leading-relaxed">
            Doom-and-gloom climate statistics induce paralysis in students. EcoQuest channels student energy into concrete habits with immediate positive reinforcement.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-eco-border shadow-2xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-eco-primary/10 text-eco-primary flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl text-eco-dark">Scientific Rigor</h3>
          <p className="text-sm text-eco-muted leading-relaxed">
            We reject greenwashing. Every avoided kilogram of CO₂ and liter of conserved water is calculated using transparent EPA, IPCC, and DEFRA formulas.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-eco-border shadow-2xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-eco-primary/10 text-eco-primary flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl text-eco-dark">Community & Cohort</h3>
          <p className="text-sm text-eco-muted leading-relaxed">
            Habits are contagious. When classrooms see each other logging plastic-free days and bicycle commutes, sustainable behavior becomes the default cultural norm.
          </p>
        </div>
      </div>

      {/* Child Privacy & Safety Pledge */}
      <div className="bg-eco-subtle rounded-3xl p-8 sm:p-12 border border-eco-border space-y-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-eco-primary" />
          <h3 className="font-display font-bold text-2xl text-eco-dark">
            Child Privacy & Safety Standards
          </h3>
        </div>
        <p className="text-sm text-eco-muted leading-relaxed max-w-3xl">
          Because EcoQuest is deployed across elementary and high schools, safety is paramount. All student profiles are anonymized by default. Challenge submission photos are processed through client-side encryption and purged after teacher verification to comply with COPPA, FERPA, and GDPR-K.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-white rounded-2xl border border-eco-border text-xs font-semibold text-eco-dark flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-eco-primary shrink-0" />
            <span>Zero Third-Party Ad Trackers</span>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-eco-border text-xs font-semibold text-eco-dark flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-eco-primary shrink-0" />
            <span>Ephemeral Photo Retention</span>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-eco-border text-xs font-semibold text-eco-dark flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-eco-primary shrink-0" />
            <span>Teacher Supervised Ecosystem</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4">
        <h3 className="font-display font-bold text-2xl text-eco-dark">Ready to explore?</h3>
        <Link
          to="/student/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-eco-primary hover:bg-eco-dark text-white font-bold text-sm shadow transition-colors"
        >
          <span>Launch Aarav's Student Experience</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
