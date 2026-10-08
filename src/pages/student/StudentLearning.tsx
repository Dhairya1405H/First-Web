import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Play, 
  Award, 
  Clock, 
  ArrowRight,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEco } from '../../context/EcoContext';

export const StudentLearning: React.FC = () => {
  const { user } = useEco();
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [earnedBonus, setEarnedBonus] = useState(false);

  const modules = [
    {
      id: 1,
      title: 'The Hidden Lifecycle of Single-Use Plastic',
      category: 'Plastics & Waste',
      readTime: '3 min read',
      points: 25,
      summary: 'Explore why only 9% of global plastic has ever been recycled and how reusable habits prevent microplastic accumulation in marine food webs.',
      question: 'Which of the following is the most environmentally effective step?',
      options: [
        'Recycling single-use plastic bottles after using them',
        'Refusing single-use plastic and carrying a durable reusable bottle',
        'Throwing plastic into the general waste bin',
        'Buying smaller plastic bottles to reduce plastic weight'
      ],
      correctIndex: 1,
      explanation: 'Refusing single-use items at the source eliminates energy spent on manufacturing, freight, and processing!'
    },
    {
      id: 2,
      title: 'Vampire Power & Phantom Classroom Loads',
      category: 'Energy',
      readTime: '4 min read',
      points: 25,
      summary: 'Electronic devices plugged in on standby consume up to 10% of household and school electricity without actively being in use.',
      question: 'What is the best way to prevent vampire power when leaving for the weekend?',
      options: [
        'Switch off the computer screen only',
        'Leave chargers connected to the wall ready for Monday',
        'Turn off the master power strip or unplug adapters completely',
        'Keep laptops sleeping rather than shutting down'
      ],
      correctIndex: 2,
      explanation: 'Turning off the switch on a surge protector or unplugging cuts the idle circuit connection entirely.'
    },
    {
      id: 3,
      title: 'Compost Chemistry: Soil Microbiomes & Carbon Sink',
      category: 'Waste & Soil',
      readTime: '3 min read',
      points: 25,
      summary: 'When food scraps rot in oxygen-deprived landfills, they emit methane (28x more potent than CO2). Aerobic composting turns them into rich organic humus.',
      question: 'Why does food waste in landfills generate potent methane gas?',
      options: [
        'Because landfills lack oxygen (anaerobic conditions)',
        'Because food waste reacts with sunlight',
        'Because compost worms produce methane',
        'Because plastic wrappers cool the pile'
      ],
      correctIndex: 0,
      explanation: 'Without oxygen, anaerobic bacteria digest organic waste, producing harmful methane instead of carbon-rich soil humus.'
    }
  ];

  const handleOptionSelect = (idx: number) => {
    if (!quizSubmitted) {
      setSelectedOption(idx);
    }
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    if (selectedOption === modules[selectedQuiz || 0].correctIndex) {
      setEarnedBonus(true);
      try {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-eco-primary mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Interactive Climate Education</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-eco-dark">
          EcoQuest Learning Hub
        </h1>
        <p className="text-sm sm:text-base text-eco-muted mt-1">
          Bite-sized environmental science modules. Read quick guides, test your knowledge, and earn +25 Eco Points per quiz!
        </p>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modules.map((mod, idx) => (
          <div
            key={mod.id}
            className="bg-white rounded-3xl border border-eco-border shadow-2xs hover:shadow-eco transition-all p-6 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-eco-subtle text-eco-dark border border-eco-border">
                  {mod.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-eco-muted font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {mod.readTime}
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-eco-dark leading-snug">
                {mod.title}
              </h3>

              <p className="text-xs text-eco-muted leading-relaxed line-clamp-3">
                {mod.summary}
              </p>
            </div>

            <div className="pt-2 border-t border-eco-border/60 flex items-center justify-between">
              <span className="text-xs font-extrabold text-eco-primary flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 fill-eco-primary" />
                +{mod.points} pts
              </span>

              <button
                onClick={() => {
                  setSelectedQuiz(idx);
                  setSelectedOption(null);
                  setQuizSubmitted(false);
                  setEarnedBonus(false);
                }}
                className="px-4 py-2 rounded-xl bg-eco-primary hover:bg-eco-dark text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Take Micro-Quiz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quiz Modal */}
      {selectedQuiz !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-eco-border shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-eco-border pb-3">
              <div>
                <span className="text-xs font-bold text-eco-primary uppercase tracking-wider">
                  Knowledge Check • +25 Eco Points
                </span>
                <h3 className="font-display font-bold text-xl text-eco-dark mt-0.5">
                  {modules[selectedQuiz].title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedQuiz(null)}
                className="text-eco-muted hover:text-eco-dark p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <p className="font-bold text-sm text-eco-dark">
              {modules[selectedQuiz].question}
            </p>

            <div className="space-y-2">
              {modules[selectedQuiz].options.map((opt, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const isCorrect = optIdx === modules[selectedQuiz].correctIndex;
                let btnStyle = 'border-eco-border hover:border-eco-primary/50 text-eco-text';

                if (quizSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'border-eco-primary bg-eco-lime/20 text-eco-dark font-bold ring-2 ring-eco-primary';
                  } else if (isSelected) {
                    btnStyle = 'border-rose-300 bg-rose-50 text-rose-800';
                  }
                } else if (isSelected) {
                  btnStyle = 'border-eco-primary bg-eco-primary/10 text-eco-primary font-bold';
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleOptionSelect(optIdx)}
                    disabled={quizSubmitted}
                    className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {quizSubmitted && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-eco-primary shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {quizSubmitted && (
              <div className="p-3.5 rounded-2xl bg-eco-subtle text-xs text-eco-muted space-y-1">
                <span className="font-bold text-eco-dark">Explanation:</span>
                <p>{modules[selectedQuiz].explanation}</p>
                {earnedBonus && (
                  <div className="text-eco-primary font-bold pt-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Awesome job! +25 Eco Points added to your profile!</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              {!quizSubmitted ? (
                <button
                  onClick={handleQuizSubmit}
                  disabled={selectedOption === null}
                  className="px-5 py-2.5 rounded-xl bg-eco-primary hover:bg-eco-dark text-white font-bold text-sm disabled:opacity-50 transition-colors"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={() => setSelectedQuiz(null)}
                  className="px-5 py-2.5 rounded-xl bg-eco-primary text-white font-bold text-sm"
                >
                  Continue Learning
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
