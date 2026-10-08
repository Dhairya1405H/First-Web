import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Camera, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Loader2, 
  TreePine,
  Image as ImageIcon
} from 'lucide-react';
import { useEco } from '../../context/EcoContext';

interface SubmitProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultChallengeId?: string;
}

export const SubmitProofModal: React.FC<SubmitProofModalProps> = ({
  isOpen,
  onClose,
  defaultChallengeId
}) => {
  const { challenges, submitChallengeProof } = useEco();

  const [selectedChallengeId, setSelectedChallengeId] = useState(
    defaultChallengeId || (challenges[0] ? challenges[0].id : '')
  );
  const [proofType, setProofType] = useState<'photo' | 'log'>('photo');
  const [notes, setNotes] = useState('');
  const [selectedPresetImage, setSelectedPresetImage] = useState<string>(
    'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState<{ message: string; points: number } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentChallenge = challenges.find(c => c.id === selectedChallengeId) || challenges[0];

  const presetPhotos = [
    {
      title: 'Reusable Bottle & Lunch',
      url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
    },
    {
      title: 'Bicycle Commute',
      url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop&q=80',
    },
    {
      title: 'Recycling Paper & Cardboard',
      url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
    },
    {
      title: 'Plant Nurturing',
      url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop&q=80',
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await submitChallengeProof(
        selectedChallengeId,
        proofType,
        notes || (proofType === 'photo' ? 'Verified daily eco action with proof.' : 'Completed daily action and logged details.'),
        proofType === 'photo' ? selectedPresetImage : undefined
      );

      setIsSubmitting(false);

      if (res.success) {
        setSuccessResult({
          message: res.message,
          points: res.points
        });

        setTimeout(() => {
          setSuccessResult(null);
          setNotes('');
          onClose();
        }, 1800);
      } else {
        setErrorMessage(res.message || 'Unable to verify submission. Please try again.');
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Network error occurred during verification.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-eco-text/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl border border-eco-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-eco-subtle/70 border-b border-eco-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-eco-primary/10 text-eco-primary rounded-lg">
              <Camera className="w-5 h-5 text-eco-primary" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-eco-dark">Submit Eco Verification</h3>
              <p className="text-xs text-eco-muted">Earn verified points & progress your streak</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-eco-muted hover:text-eco-dark hover:bg-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content / Form */}
        {successResult ? (
          <div className="p-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto bg-eco-primary/10 text-eco-primary rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-eco-primary" />
            </div>
            <div>
              <h4 className="font-display font-bold text-xl text-eco-dark">Verification Successful!</h4>
              <p className="text-sm text-eco-muted mt-1">{successResult.message}</p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-eco-lime/20 border border-eco-lime/40 text-eco-dark font-extrabold text-lg">
              <Sparkles className="w-5 h-5 text-eco-primary fill-eco-primary" />
              <span>+{successResult.points} Eco Points</span>
            </div>
            <p className="text-xs text-eco-muted">Updated your streak, class leaderboard, and impact stats!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
            
            {/* Error Message Alert */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center justify-between">
                <span>{errorMessage}</span>
                <button
                  type="button"
                  onClick={() => setErrorMessage(null)}
                  className="text-rose-500 hover:text-rose-700 ml-2 font-bold"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Select Challenge */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-eco-muted mb-1.5">
                Target Challenge
              </label>
              <select
                value={selectedChallengeId}
                onChange={(e) => setSelectedChallengeId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-eco-border bg-white text-sm font-semibold text-eco-text focus:outline-none focus:ring-2 focus:ring-eco-primary/40"
              >
                {challenges.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} (+{c.points} pts total) • {c.progress}/{c.total} days
                  </option>
                ))}
              </select>
            </div>

            {/* Proof Type Toggle */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-eco-muted mb-1.5">
                Submission Method
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setProofType('photo')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                    proofType === 'photo'
                      ? 'border-eco-primary bg-eco-primary/5 text-eco-primary shadow-xs'
                      : 'border-eco-border text-eco-muted hover:border-eco-primary/50'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  <span>Photo Proof</span>
                </button>
                <button
                  type="button"
                  onClick={() => setProofType('log')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                    proofType === 'log'
                      ? 'border-eco-primary bg-eco-primary/5 text-eco-primary shadow-xs'
                      : 'border-eco-border text-eco-muted hover:border-eco-primary/50'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Activity Log (No Cam)</span>
                </button>
              </div>
            </div>

            {/* Photo selector (if photo) */}
            {proofType === 'photo' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-eco-muted">
                  <span>Photo Demonstration (Select or Mock Sample)</span>
                  <span className="text-[11px] text-eco-primary font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> AI Vision Pre-Check Ready
                  </span>
                </div>
                
                {/* Photo Previews */}
                <div className="grid grid-cols-2 gap-2">
                  {presetPhotos.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPresetImage(preset.url)}
                      className={`relative rounded-xl overflow-hidden border-2 text-left h-24 group transition-all ${
                        selectedPresetImage === preset.url
                          ? 'border-eco-primary ring-2 ring-eco-primary/30'
                          : 'border-eco-border hover:border-eco-primary/40'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2">
                        <span className="text-[11px] font-bold text-white truncate drop-shadow-sm">
                          {preset.title}
                        </span>
                      </div>
                      {selectedPresetImage === preset.url && (
                        <div className="absolute top-1.5 right-1.5 bg-eco-primary text-white p-1 rounded-full shadow">
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Notes / Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-eco-muted mb-1.5">
                {proofType === 'photo' ? 'Description & Observation (Optional)' : 'Activity Log Details (What action did you take?)'}
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={
                  proofType === 'photo'
                    ? 'e.g. Swapped single-use bottle with my thermos, used cloth napkins at school cafeteria.'
                    : 'e.g. Walked 1.8 km to school with a walking buddy, picked up two plastic wrappers on the way.'
                }
                rows={3}
                className="w-full p-3 rounded-xl border border-eco-border bg-white text-sm text-eco-text placeholder:text-eco-muted/60 focus:outline-none focus:ring-2 focus:ring-eco-primary/40"
              />
            </div>

            {/* AI pre-check banner */}
            <div className="p-3 rounded-xl bg-eco-subtle border border-eco-border/80 flex items-start gap-2.5 text-xs text-eco-muted">
              <Sparkles className="w-4 h-4 text-eco-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-eco-dark font-bold">Safe & Instant AI Pre-check:</strong> High-confidence submissions are auto-verified. Proof photos are securely anonymized and deleted according to child privacy standards.
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-eco-muted hover:text-eco-dark hover:bg-eco-subtle transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl bg-eco-primary hover:bg-eco-dark text-white font-bold text-sm shadow-sm hover:shadow-eco transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Action...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-eco-lime" />
                    <span>Confirm & Earn Points</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
