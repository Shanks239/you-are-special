import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Compass, Brain, Star, Zap, Eye, Mountain, ArrowRight, SkipForward, MessageCircle } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

export default function YouAreSpecial() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [started, setStarted] = useState(false);
  const [name, setName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const [deepMode, setDeepMode] = useState(false);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [skippedSteps, setSkippedSteps] = useState(new Set());

  const steps = [
    {
      icon: Heart,
      title: "The Meeting",
      probability: "1 in 20,000",
      calculation: "20000",
      insight: "Every relationship is a constellation of coincidences",
      skippable: true,
      skipReason: "Skip family topics",
      
      quickQuestion: "What are the odds your parents met?",
      quickDesc: "Two people, out of billions, crossing paths at exactly the right moment in history",
      
      deepQuestion: "How did your parents (or the people who raised you) meet?",
      deepOptions: [
        { value: "same_town", label: "Grew up in the same town", insight: "Geographic proximity created the possibility. But think: what if one family had moved just one year earlier? You wouldn't exist.", multiplier: 1, displayOdds: "1 in 10,000" },
        { value: "school", label: "Met at school/college", insight: "Educational paths crossing - they had to choose the same school, same year, same social circles. Change any variable, and you vanish from reality.", multiplier: 1.5, displayOdds: "1 in 15,000" },
        { value: "work", label: "Met at work", insight: "Career paths intersecting at the exact right moment. If either had taken a different job, different shift, different city - you wouldn't be here.", multiplier: 2, displayOdds: "1 in 20,000" },
        { value: "introduction", label: "Introduced by someone", insight: "A mutual friend played fate. That friend had to exist, had to know both, had to care enough to introduce them. A chain of improbabilities.", multiplier: 2.5, displayOdds: "1 in 25,000" },
        { value: "chance", label: "Chance encounter", insight: "Pure cosmic accident. Wrong bus, wrong coffee shop, wrong moment - and you never exist. They found each other against infinite odds.", multiplier: 4, displayOdds: "1 in 40,000" },
        { value: "dont_know", label: "I don't know the story", insight: "Even without knowing the details, the math is clear: 1 in 20,000. Two specific people finding each other in a world of billions.", multiplier: 2, displayOdds: "1 in 20,000" }
      ],
      deepDesc: "Your existence hinged on two specific people finding each other. The probability: 1 in 20,000.",
      
      universalVersion: "The Chain of Ancestors",
      universalDesc: "Going back 40 generations, you have over 1 trillion potential ancestors. Each meeting was a cosmic accident. One different pairing anywhere in that chain, and you don't exist."
    },{
      icon: Sparkles,
      title: "The One-in-a-Million You",
      probability: "1 in 400 Quadrillion",
      calculation: "400000000000000000",
      insight: "You're not just rare. You're unrepeatable.",
      skippable: true,
      skipReason: "Skip conception topics",
      
      quickQuestion: "What made YOU the one?",
      quickDesc: "Of 40-250 million possibilities in that moment, YOU were the one. That exact genetic combination.",
      
      deepQuestion: "What makes you uniquely YOU?",
      deepOptions: [
        { value: "creative", label: "How I think creatively", insight: "Your creative wiring comes from a unique neural architecture coded in unrepeatable DNA. No one sees the world exactly as you do.", multiplier: 1, displayOdds: "1 in 400 Quadrillion" },
        { value: "empathy", label: "How I feel and empathize", insight: "Your emotional signature is genetically unique. The way you experience feelings has never existed before in 4 billion years.", multiplier: 1, displayOdds: "1 in 400 Quadrillion" },
        { value: "quirks", label: "My weird quirks and habits", insight: "Those quirks are the fingerprint of your singular genetic expression meeting your unique life experiences.", multiplier: 1, displayOdds: "1 in 400 Quadrillion" },
        { value: "skills", label: "My specific talents", insight: "Your talent combination - the exact ratio of abilities - is a one-time genetic lottery win that will never repeat.", multiplier: 1, displayOdds: "1 in 400 Quadrillion" },
        { value: "perspective", label: "My way of seeing things", insight: "Your perspective is the intersection of unique genetics and unique experiences - a viewpoint that exists only once in all of time.", multiplier: 1, displayOdds: "1 in 400 Quadrillion" }
      ],
      deepDesc: "Your specific DNA combination has never existed before and will never exist again. Even identical twins have different experiences.",
      
      universalVersion: "Your Singular Blueprint",
      universalDesc: "Your DNA is a unique combination that took 4 billion years of evolution to create and will never be replicated."
    },
    {
      icon: Mountain,
      title: "The Unbroken Chain",
      probability: "1 in 10 Billion",
      calculation: "10000000000",
      insight: "You are the result of 4 billion years of survivors",
      skippable: false,
      
      quickQuestion: "How did you survive to NOW?",
      quickDesc: "Every ancestor survived famines, wars, diseases, predators. An unbroken chain stretching back to the first cell.",
      
      deepQuestion: "What type of challenge have you overcome?",
      deepOptions: [
        { value: "health", label: "Health or physical challenge", insight: "You survived what could have ended your story. Every ancestor who beat illness passed that resilience to you.", multiplier: 1.5, displayOdds: "1 in 15 Billion" },
        { value: "emotional", label: "Emotional or mental struggle", insight: "Psychological survival is as crucial as physical. You inherited 4 billion years of ancestors who refused to give up.", multiplier: 1.2, displayOdds: "1 in 12 Billion" },
        { value: "loss", label: "Loss or grief", insight: "Every generation faces loss. You carry forward the strength of ancestors who loved, lost, and continued anyway.", multiplier: 1.3, displayOdds: "1 in 13 Billion" },
        { value: "change", label: "Major life change", insight: "Adaptation is survival. Your ancestors crossed oceans, survived ice ages, and rebuilt. You're continuing that tradition.", multiplier: 1, displayOdds: "1 in 10 Billion" },
        { value: "fear", label: "A fear I faced", insight: "Courage isn't absence of fear - it's the survival instinct winning. That same instinct kept your lineage alive for eons.", multiplier: 1.1, displayOdds: "1 in 11 Billion" }
      ],
      deepDesc: "For 4 billion years, every single one of your ancestors survived long enough to reproduce. Not one failed. You continue that legacy."
    },
    {
      icon: Brain,
      title: "The Choices",
      probability: "Incalculable",
      calculation: "1000000000000",
      insight: "Your consciousness is the universe experiencing itself",
      skippable: false,
      
      quickQuestion: "What made you who you are?",
      quickDesc: "Every book you read, every path you took, every word you said. Each choice created THIS version of you.",
      
      deepQuestion: "What kind of choice shaped who you are?",
      deepOptions: [
        { value: "career", label: "Career or education path", insight: "That choice created a timeline where this version of you exists. In parallel universes, other versions chose differently.", multiplier: 1.5, displayOdds: "Infinite branches" },
        { value: "relationship", label: "Relationship decision", insight: "Who we choose to love or leave shapes our entire reality. You exist in the timeline where you made *that* choice.", multiplier: 2, displayOdds: "Infinite branches" },
        { value: "move", label: "Where to live", insight: "Geography is destiny. Moving - or staying - creates entirely different life trajectories. You're in this timeline because you chose this place.", multiplier: 1.3, displayOdds: "Infinite branches" },
        { value: "risk", label: "A risk I took (or didn't)", insight: "Every risk is a fork in reality. You inhabit the timeline where you made that specific gamble. The alternate you lives elsewhere in possibility.", multiplier: 1.8, displayOdds: "Infinite branches" },
        { value: "values", label: "Standing by my values", insight: "Values-based choices define character across timelines. That integrity is consistent across every version of you that could exist.", multiplier: 1.2, displayOdds: "Infinite branches" }
      ],
      deepDesc: "If you had made different choices at key moments, you'd be a completely different person. Every decision branches reality."
    },
    {
      icon: Eye,
      title: "This Exact Moment",
      probability: "1 in ∞",
      calculation: "999999999999999",
      insight: "Every moment you exist is a statistical miracle",
      skippable: false,
      
      quickQuestion: "What are the odds of RIGHT NOW?",
      quickDesc: "You, here, reading this, alive and conscious in this precise instant of cosmic time.",
      
      deepQuestion: "Right now, what are you most grateful for?",
      deepOptions: [
        { value: "people", label: "The people in my life", insight: "Each relationship required billions of improbable events. Your gratitude is witnessing multiple miracles simultaneously.", multiplier: 1.3, displayOdds: "1 in ∞" },
        { value: "health", label: "My health and body", insight: "Your body is 37 trillion cells cooperating perfectly right now. Every breath is a biological miracle you're experiencing in real-time.", multiplier: 1.5, displayOdds: "1 in ∞" },
        { value: "opportunities", label: "My opportunities", insight: "Opportunity is the intersection of preparation and cosmic luck. You're alive in a moment where possibilities exist that never existed before.", multiplier: 1.2, displayOdds: "1 in ∞" },
        { value: "consciousness", label: "Being aware and alive", insight: "Consciousness itself is the universe's greatest mystery. You are matter that became aware of itself - the rarest phenomenon in existence.", multiplier: 2, displayOdds: "1 in ∞" },
        { value: "moment", label: "This present moment", insight: "This exact moment - this precise configuration of the universe - will never exist again. You are witnessing unrepeatable reality.", multiplier: 1.8, displayOdds: "1 in ∞" }
      ],
      deepDesc: "Of all the moments in the 13.8 billion year history of the universe, you are experiencing THIS one. Conscious. Aware. Present."
    }
  ];

  const [counts, setCounts] = useState(steps.map(() => 0));

  useEffect(() => {
    if (started && currentStep >= 0 && currentStep < steps.length) {
      const target = parseFloat(steps[currentStep].calculation);
      const duration = deepMode ? 2000 : 1500;
      const steps_count = 50;
      const increment = target / steps_count;
      let current = 0;
      let step_num = 0;

      const timer = setInterval(() => {
        step_num++;
        current = Math.min(current + increment, target);
        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[currentStep] = current;
          return newCounts;
        });

        if (step_num >= steps_count) {
          clearInterval(timer);
        }
      }, duration / steps_count);

      return () => clearInterval(timer);
    }
  }, [currentStep, started, deepMode]);

  const handleStart = (mode) => {
    setDeepMode(mode === 'deep');
    setShowNameInput(false);
    setTimeout(() => {
      setStarted(true);
      setCurrentStep(0);
    }, 300);
  };

  const handleAnswer = (option) => {
    if (option) {
      setAnswers(prev => ({
        ...prev,
        [currentStep]: option
      }));
    }
    setSelectedOption(null);
    handleNext();
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(steps.length);
    }
  };

  const handleSkip = (stepIndex) => {
    setSkippedSteps(prev => new Set([...prev, stepIndex]));
    setSelectedOption(null);
    handleNext();
  };

  const formatNumber = (num) => {
    if (num >= 1e18) return `${(num / 1e18).toFixed(1)} Quintillion`;
    if (num >= 1e15) return `${(num / 1e15).toFixed(1)} Quadrillion`;
    if (num >= 1e12) return `${(num / 1e12).toFixed(1)} Trillion`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)} Billion`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)} Million`;
    return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  const calculatePersonalizedOdds = () => {
    if (!deepMode || Object.keys(answers).length === 0) {
      return "10²⁶⁸¹";
    }

    const baseProbabilities = [20000, 400000000000000000, 10000000000, 1000000000000, 999999999999999];
    
    let totalMultiplier = 1;
    Object.entries(answers).forEach(([stepIndex, option]) => {
      if (option && option.multiplier) {
        totalMultiplier *= option.multiplier;
      }
    });

    const baseExponent = 2681;
    const adjustedExponent = Math.round(baseExponent * totalMultiplier);
    
    return `10²⁶⁸¹⁺${Math.round((totalMultiplier - 1) * 100)}`;
  };return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 text-slate-900 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                ['rgba(254, 202, 202, 0.3)', 'rgba(252, 165, 165, 0.2)', 'rgba(251, 113, 133, 0.2)'][i % 3]
              }, transparent)`,
              width: Math.random() * 250 + 100 + 'px',
              height: Math.random() * 250 + 100 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 25 + 15}s ease-in-out infinite`,
              animationDelay: Math.random() * 5 + 's',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8" style={{ animation: 'fadeIn 0.6s ease-out' }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-rose-600" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
            <h1 className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-r from-rose-700 via-red-600 to-pink-600 bg-clip-text text-transparent">
              You Are Special
            </h1>
            <Sparkles className="w-10 h-10 text-rose-600" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
          </div>
          <p className="text-lg md:text-xl text-slate-600 font-light italic">
            Just in case you need to remember
          </p>
        </div>

        {/* Name Input & Mode Selection */}
        {showNameInput && (
          <div className="max-w-md mx-auto mb-8" style={{ animation: 'fadeIn 0.6s ease-out' }}>
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-rose-200 shadow-xl">
              <p className="text-base mb-4 text-slate-700">What's your name? (optional)</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name..."
                className="w-full px-4 py-3 bg-white border border-rose-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 mb-6"
              />
              
              <div className="space-y-3">
                <p className="text-sm text-slate-600 mb-3">Choose your journey:</p>
                
                <button
                  onClick={() => handleStart('quick')}
                  className="w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Quick Journey (~1 minute)
                </button>
                
                <button
                  onClick={() => handleStart('deep')}
                  className="w-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Deep Journey (answer questions, take your time)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Journey Steps */}
        {started && currentStep >= 0 && currentStep < steps.length && (
          <div className="space-y-6">
            <div className="flex justify-center gap-2 mb-6">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentStep ? 'w-12 bg-gradient-to-r from-rose-500 to-pink-500' :
                    index < currentStep ? 'w-8 bg-rose-300' :
                    'w-8 bg-slate-200'
                  }`}
                />
              ))}
            </div>

            {steps.map((step, index) => {
              if (index !== currentStep) return null;
              
              const Icon = step.icon;
              const useUniversal = skippedSteps.has(index);
              const userAnswer = answers[index];

              return (
                <div key={index} className="animate-slideIn">
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-rose-200 shadow-2xl">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 mb-6">
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                      
                      <div className="w-full max-w-lg">
                        <h3 className="text-3xl font-serif font-bold mb-3 text-slate-800">
                          {useUniversal ? step.universalVersion : step.title}
                        </h3>
                        
                        <p className="text-lg text-rose-700 font-medium mb-2">
                          {deepMode && !useUniversal ? step.deepQuestion : step.quickQuestion}
                        </p>
                        
                        <p className="text-slate-600 mb-6 leading-relaxed">
                          {useUniversal ? step.universalDesc : (deepMode ? step.deepDesc : step.quickDesc)}
                        </p>
                        
                        {/* Answer Options for Deep Mode */}
                        {deepMode && !useUniversal && step.deepOptions && (
                          <div className="mb-6 space-y-3">
                            {step.deepOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => setSelectedOption(option)}
                                className={`w-full px-4 py-3 rounded-xl text-left transition-all transform hover:scale-102 ${
                                  selectedOption?.value === option.value
                                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg'
                                    : 'bg-white border-2 border-rose-200 text-slate-700 hover:border-rose-400 hover:shadow-md'
                                }`}
                              >
                                <span className="font-medium">{option.label}</span>
                              </button>
                            ))}
                          </div>
                        )}
                        
                        <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-rose-200 mb-6">
                          <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text mb-2">
                            {selectedOption && deepMode ? selectedOption.displayOdds : step.probability}
                          </div>
                          {step.probability !== "Incalculable" && step.probability !== "1 in ∞" && !selectedOption && (
                            <div className="text-sm text-slate-600">
                              = 1 in {formatNumber(counts[index])}
                            </div>
                          )}
                          {selectedOption && deepMode && (
                            <div className="text-sm text-rose-700 italic mt-2">
                              Your specific scenario's probability
                            </div>
                          )}
                        </div>
                        
                        {/* Show personalized insight if they selected an option */}
                        {deepMode && userAnswer && (
                          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-6">
                            <p className="text-sm text-slate-700 italic leading-relaxed">
                              {userAnswer.insight}
                            </p>
                          </div>
                        )}
                        
                        <p className="text-base text-slate-700 italic font-medium mb-6">
                          "{step.insight}"
                        </p>

                        <div className="flex gap-3 justify-center flex-wrap">
                          {/* Only show skip button in deep mode for sensitive topics when user hasn't selected */}
                          {deepMode && step.skippable && !useUniversal && !selectedOption && (
                            <button
                              onClick={() => handleSkip(index)}
                              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all flex items-center gap-2 text-sm"
                            >
                              <SkipForward className="w-4 h-4" />
                              {step.skipReason}
                            </button>
                          )}
                          
                          {deepMode && !useUniversal ? (
                            <button
                              onClick={() => handleAnswer(selectedOption)}
                              disabled={!selectedOption}
                              className={`px-6 py-2 rounded-xl transition-all transform shadow-md flex items-center gap-2 font-semibold ${
                                selectedOption
                                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white hover:scale-105'
                                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                              }`}
                            >
                              {selectedOption ? 'Continue' : 'Select an option'} <ArrowRight className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={handleNext}
                              className="px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-md flex items-center gap-2"
                            >
                              Continue <ArrowRight className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}{/* Final Message */}
        {currentStep === steps.length && (
          <div className="animate-slideIn">
            <div className="bg-gradient-to-br from-white/95 to-rose-50/95 backdrop-blur-sm rounded-3xl p-10 border border-rose-300 shadow-2xl">
              <div className="text-center space-y-6">
                <div className="flex justify-center gap-2 mb-4">
                  <Star className="w-12 h-12 text-rose-500" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                  <Zap className="w-12 h-12 text-pink-500" style={{ animation: 'pulse 2s ease-in-out infinite', animationDelay: '0.3s' }} />
                  <Star className="w-12 h-12 text-rose-500" style={{ animation: 'pulse 2s ease-in-out infinite', animationDelay: '0.6s' }} />
                </div>
                
                <h2 className="text-4xl font-serif font-bold text-transparent bg-gradient-to-r from-rose-700 to-pink-600 bg-clip-text">
                  {name ? `${name}, here's` : "Here's"} the truth:
                </h2>
                
                <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl p-8 border border-rose-300">
                  <p className="text-5xl md:text-6xl font-bold text-slate-800 mb-4">
                    1 in {calculatePersonalizedOdds()}
                  </p>
                  <p className="text-lg text-slate-700">
                    {deepMode && Object.keys(answers).length > 0 
                      ? "That's YOUR personalized probability - based on your specific path to existence" 
                      : "That number has more zeros than there are atoms in the observable universe"}
                  </p>
                  {deepMode && Object.keys(answers).length > 0 && (
                    <p className="text-sm text-rose-700 mt-3 italic">
                      Your specific choices made your existence even more improbable than average
                    </p>
                  )}
                </div>
                
                {/* Show personalized reflection if they answered questions */}
                {deepMode && Object.keys(answers).length > 0 && (
                  <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 max-w-xl mx-auto">
                    <p className="text-sm text-slate-600 mb-3 font-medium">Your Journey:</p>
                    <div className="text-left space-y-2 text-sm text-slate-700">
                      {Object.entries(answers).map(([stepIndex, option]) => (
                        <p key={stepIndex} className="italic">
                          <span className="font-medium text-rose-700">•</span> {option.label}
                        </p>
                      ))}
                    </div>
                    <p className="text-sm text-slate-700 mt-4 font-medium">
                      These choices reflect your unrepeatable path.
                    </p>
                  </div>
                )}
                
                <div className="space-y-4 max-w-xl mx-auto">
                  <p className="text-lg text-slate-700 leading-relaxed">
                    The universe is 13.8 billion years old. You get maybe 80 years. That's 0.0000006% of cosmic time.
                  </p>
                  
                  <p className="text-lg text-slate-700 leading-relaxed">
                    And yet, in this fleeting moment, you are here. Conscious. Feeling. Thinking. Wondering.
                  </p>
                  
                  <div className="pt-6 border-t border-rose-200 mt-6">
                    <p className="text-2xl font-serif font-bold text-transparent bg-gradient-to-r from-rose-700 to-pink-600 bg-clip-text mb-3">
                      You are not an accident.
                    </p>
                    <p className="text-xl text-slate-800 font-medium">
                      You are an impossibility that happened anyway.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border border-rose-200 mt-6">
                    <p className="text-base text-slate-700 leading-relaxed">
                      So when you feel small, remember: the universe had to conspire across billions of years, trillions of variables, and infinite possibilities just to create this moment where you exist.
                    </p>
                  </div>
                </div>
                
                <div className="pt-6">
                  <Heart className="w-14 h-14 mx-auto text-rose-500" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                  <p className="text-sm text-slate-500 mt-4 italic">
                    You are the universe's way of knowing itself
                  </p>
                </div>

                <button
                  onClick={() => {
                    setShowNameInput(true);
                    setStarted(false);
                    setCurrentStep(-1);
                    setSkippedSteps(new Set());
                    setAnswers({});
                    setSelectedOption(null);
                    setCounts(steps.map(() => 0));
                    setDeepMode(false);
                  }}
                  className="mt-6 px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all text-sm"
                >
                  Experience Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        {started && (
          <div className="mt-8 text-center text-slate-500 text-xs">
            <p className="italic">For those who forget how extraordinary they are</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
        }
      `}</style>
      <Analytics />
    </div>
  );
                  }
