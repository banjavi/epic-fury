import { useState, useEffect, useRef } from "react";

const EVENTS = [
  { time: "Dec 28, 2025", hour: "", phase: "PRELUDE", title: "Protests Erupt Across Iran", desc: "Massive anti-government protests spread to 100+ cities. Economic collapse and rial crash drive millions into the streets.", icon: "◉", source: "https://www.washingtonpost.com/world/2026/01/15/iran-protests-history-death-toll/" },
  { time: "Jan 8, 2026", hour: "", phase: "PRELUDE", title: "Internet Blackout", desc: "Iran cuts all internet access nationwide. Security forces escalate lethal force against protesters.", icon: "◉", source: "https://www.aljazeera.com/news/2026/1/8/iran-experiencing-nationwide-internet-blackout-monitor-says" },
  { time: "Jan 8–10", hour: "", phase: "PRELUDE", title: "Massacres Reported", desc: "Deadliest crackdowns kill thousands. Death toll estimates range from 3,117 (Iran gov't) to over 36,500 (per Iran International).", icon: "◉", source: "https://www.hrw.org/news/2026/01/16/iran-growing-evidence-of-countrywide-massacres" },
  { time: "Jan 13", hour: "", phase: "PRELUDE", title: "Trump: \"Help Is On Its Way\"", desc: "US President tells Iranian protesters to keep going. Cancels all meetings with Iranian officials. US begins massive military buildup.", icon: "★", source: "https://www.cbsnews.com/news/trump-iran-protests-what-options-does-us-have-to-respond/" },
  { time: "Feb 3", hour: "", phase: "ESCALATION", title: "Strait of Hormuz Incident", desc: "Six IRGC gunboats attempt to seize US tanker Stena Imperative. USS McFaul escorts it to safety. Separately, a US F-35 from USS Abraham Lincoln shoots down an Iranian drone over the Arabian Sea.", icon: "◆", source: "https://www.cbsnews.com/news/us-tanker-stena-imperative-approached-iran-gunboats-strait-of-hormuz/" },
  { time: "Feb 5", hour: "", phase: "ESCALATION", title: "Iran Seizes Tankers", desc: "IRGC Navy seizes two foreign oil tankers near Farsi Island, claiming fuel smuggling. Transfers them to Bushehr.", icon: "◆", source: "https://english.alarabiya.net/News/middle-east/2026/02/05/irgc-seize-two-foreigncrewed-tankers-news-agency" },
  { time: "Feb 6", hour: "", phase: "ESCALATION", title: "Nuclear Talks Begin", desc: "Indirect US-Iran talks in Muscat, mediated by Oman. First time a CENTCOM commander is present at negotiations with Iran.", icon: "◉", source: "https://www.timesofisrael.com/us-iran-nuclear-talks-conclude-in-oman-with-another-round-said-planned-for-coming-days/" },
  { time: "Feb 13", hour: "", phase: "ESCALATION", title: "\"Regime Change Would Be Best\"", desc: "Trump states regime change in Iran would be \"the best thing that could happen.\"", icon: "★", source: "https://www.pbs.org/newshour/politics/trump-says-change-in-power-in-iran-would-be-best-after-sending-2nd-aircraft-carrier-to-region" },
  { time: "Feb 14", hour: "", phase: "ESCALATION", title: "Sustained Operations Planned", desc: "US officials tell Reuters military is preparing for weeks-long sustained operations against Iran — not just a limited strike.", icon: "◆", source: "https://www.cnbc.com/2026/02/14/us-military-preparing-for-extended-iran-operations-reuters.html" },
  { time: "Feb 17", hour: "", phase: "ESCALATION", title: "Khamenei Threatens US Fleet", desc: "During second round of Geneva nuclear talks, Iran's Supreme Leader warns: \"More dangerous than a warship is the weapon capable of sinking it.\"", icon: "◉", source: "https://www.aljazeera.com/news/2026/2/17/irans-khamenei-maintains-tough-rhetoric-with-us-despite-nuclear-talks" },
  { time: "Feb 24", hour: "", phase: "ESCALATION", title: "State of the Union Warning", desc: "Trump accuses Iran of reviving nuclear weapons. Calls ambitions \"sinister.\" Warns the US is prepared to act if necessary.", icon: "★", source: "https://www.aljazeera.com/news/2026/2/25/trump-says-preference-is-to-solve-iran-tensions-through-diplomacy" },
  { time: "Feb 26", hour: "", phase: "ESCALATION", title: "US Fleet Leaves Bahrain", desc: "Fleet HQ reduced to fewer than 100 personnel. All ships leave port. 14 refueling tankers deployed to Israel's Ben Gurion Airport. USS Gerald R. Ford departs Crete, headed for Israel's coast.", icon: "◆", source: "https://www.middleeastmonitor.com/20260226-us-navy-withdraws-all-vessels-from-bahrain-base-amid-rising-tensions-with-iran/" },
  { time: "Feb 26", hour: "", phase: "ESCALATION", title: "\"Significant Progress\" in Talks", desc: "Third round of nuclear talks concludes in Geneva. Oman's mediator says significant progress made. Technical talks at IAEA in Vienna planned for following week.", icon: "◉", source: "https://foreignpolicy.com/2026/02/26/us-iran-nuclear-deal-geneva-talks-military-buildup-strikes/" },
  { time: "Feb 28", hour: "~2:00 AM ET", phase: "EPIC FURY", title: "Operation Epic Fury Begins", desc: "US and Israel launch coordinated military strikes on Iran. Massive explosions reported across Tehran. Israeli Defense Minister calls it a \"preemptive attack.\"", icon: "⚡", highlight: true, source: "https://www.npr.org/2026/02/28/nx-s1-5730158/israel-iran-strikes-trump-us" },
  { time: "Feb 28", hour: "~2:15 AM ET", phase: "EPIC FURY", title: "Netanyahu Video Statement", desc: "\"Our joint action will create the conditions for the brave Iranian people to take their destiny into their own hands.\" Calls it an effort to remove an \"existential threat.\"", icon: "★", highlight: true, source: "https://www.cnn.com/2026/02/28/world/video/netanyahu-israel-iran-strikes-us" },
  { time: "Feb 28", hour: "~2:30 AM ET", phase: "EPIC FURY", title: "Trump Addresses Nation", desc: "\"US military began major combat operation in Iran. Our objective is to defend the American people by eliminating imminent threats from the Iranian regime.\" Calls on IRGC to surrender or face \"certain death.\"", icon: "★", highlight: true, source: "https://www.cnbc.com/2026/02/28/trump-iran-strikes-live-updates.html" },
  { time: "Feb 28", hour: "~3:00 AM ET", phase: "EPIC FURY", title: "Targets Revealed", desc: "Strikes hit area near Khamenei's residence, presidential palace, National Security Council offices. Seven missiles confirmed in central Tehran district. Nuclear and missile facilities also targeted.", icon: "◆", highlight: true, source: "https://www.aljazeera.com/news/2026/2/28/mapping-us-and-israeli-attacks-on-iran-and-tehrans-retaliatory-strikes" },
  { time: "Feb 28", hour: "~3:00 AM ET", phase: "EPIC FURY", title: "Israel Declares Emergency", desc: "Israel closes all airspace to passenger flights. Civil defense protocols activated. Citizens told to shelter in place. Hospitals moved underground.", icon: "◆", highlight: true, source: "https://www.dailysignal.com/2026/02/28/israel-declares-state-of-emergency-as-iran-fires-missiles/" },
  { time: "Feb 28", hour: "~3:30 AM ET", phase: "RETALIATION", title: "Iran Launches Massive Retaliation", desc: "Dozens of ballistic missiles fired at Israel and US military bases across Bahrain, Qatar, UAE, Kuwait, Saudi Arabia, Jordan, Syria, and Iraq.", icon: "⚡", highlight: true, source: "https://www.aljazeera.com/news/2026/2/28/multiple-gulf-arab-states-that-host-us-assets-targeted-in-iran-retaliation" },
  { time: "Feb 28", hour: "~3:45 AM ET", phase: "RETALIATION", title: "Explosions Across the Gulf", desc: "Blasts heard from Dubai beaches to Doha streets. Bahrain activates air-raid sirens. Qatar says it \"successfully thwarted\" attacks. One killed in Abu Dhabi.", icon: "◆", highlight: true, source: "https://www.aljazeera.com/video/newsfeed/2026/2/28/iran-strikes-us-military-base-in-bahrain-as-explosions-heard-across-gulf" },
  { time: "Feb 28", hour: "~4:00 AM ET", phase: "RETALIATION", title: "School Strike Reported", desc: "Iranian media reports Israeli strike hit a girls' school in Minab, killing at least 40 students (later reports raised toll to 85+). Israel says it is investigating.", icon: "◉", highlight: true, source: "https://www.aljazeera.com/news/2026/2/28/israel-strikes-two-schools-in-iran-killing-more-than-50-people" },
  { time: "Feb 28", hour: "~4:30 AM ET", phase: "RETALIATION", title: "\"No Red Lines\"", desc: "Senior Iranian official tells Al Jazeera: \"All American and Israeli assets and interests in the Middle East have become a legitimate target. There are no red lines after this aggression.\"", icon: "★", highlight: true, source: "https://www.khaama.com/senior-iranian-official-no-red-lines-remain-all-u-s-and-israeli-assets-are-legitimate-targets/" },
  { time: "Feb 28", hour: "~5:00 AM ET", phase: "RETALIATION", title: "Regional Airspace Shuts Down", desc: "Iran, Israel, and multiple Gulf states close airspace. Airlines worldwide rerouting. Air India and IndiGo suspend all Middle East flights. Houthis announce resumption of Red Sea attacks.", icon: "◆", highlight: true, source: "https://www.aljazeera.com/news/2026/2/28/airspace-closed-airlines-halt-flights-as-us-israel-attack-iran-responds" },
  { time: "Feb 28", hour: "~6:00 AM ET", phase: "RETALIATION", title: "Appropriations Chair: \"Time of Reckoning\"", desc: "House Appropriations Chairman Tom Cole: \"It's a time of reckoning for those who chant 'Death to America.' The evil Iranian regime must be defanged and dismantled.\"", icon: "★", highlight: true, source: "https://appropriations.house.gov/news/press-releases/cole-statement-operation-epic-fury" },
  { time: "Feb 28", hour: "~7:00 AM ET", phase: "RETALIATION", title: "Missiles Intercepted Over Jerusalem", desc: "Israeli air defense systems intercept and destroy several Iranian missiles over the skies of Jerusalem. Iron Dome and Arrow systems activated nationwide.", icon: "◆", highlight: true, source: "https://www.foxnews.com/live-news/israel-us-launch-attack-on-iran-amid-escalating-protests" },
  { time: "Feb 28", hour: "~8:00 AM ET", phase: "RETALIATION", title: "Strait of Hormuz Effectively Shut Down", desc: "Oil tankers avoiding the Strait. Ships report Iranian Navy broadcasting that transit is banned. Oil majors and traders suspend shipments. Vessels holding outside or turning back.", icon: "⚡", highlight: true, source: "https://www.bloomberg.com/news/articles/2026-02-28/oil-tankers-avoiding-vital-hormuz-strait-after-us-bombs-iran" },
  { time: "Feb 28", hour: "~9:00 AM ET", phase: "RETALIATION", title: "Trump Calls for Regime Overthrow", desc: "Trump and Netanyahu both explicitly state the goal is toppling the Iranian regime. Israel confirms it targeted Khamenei and President Pezeshkian directly. Their status unknown.", icon: "★", highlight: true, source: "https://www.npr.org/2026/02/28/nx-s1-5730158/israel-iran-strikes-trump-us" },
  { time: "Feb 28", hour: "Ongoing", phase: "RETALIATION", title: "Conflict Continues", desc: "Active military operations ongoing in both directions. Oil prices spiking. Strait of Hormuz effectively closed. Global markets bracing for Monday open. Operation expected to last \"as long as needed\" per Netanyahu.", icon: "⚡", highlight: true, source: "https://www.washingtonpost.com/world/2026/02/28/israel-strikes-iran-live-updates/" },
];

const PHASE_COLORS = {
  PRELUDE: { bg: "#d5d0c8", text: "#3a3530", accent: "#8a8478", border: "#b0a898" },
  ESCALATION: { bg: "#e8cfa0", text: "#5a4020", accent: "#b8860b", border: "#c4a050" },
  "EPIC FURY": { bg: "#c0392b", text: "#ffffff", accent: "#ff6b5a", border: "#c0392b" },
  RETALIATION: { bg: "#2c2420", text: "#f7f5f2", accent: "#e67e5a", border: "#5a4a40" },
};

function App() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!autoPlay) return;
    if (visibleCount >= EVENTS.length) {
      setAutoPlay(false);
      return;
    }
    const delay = EVENTS[visibleCount]?.highlight ? 350 : 500;
    const timer = setTimeout(() => setVisibleCount(v => v + 1), delay);
    return () => clearTimeout(timer);
  }, [visibleCount, autoPlay]);

  useEffect(() => {
    if (timelineRef.current && visibleCount > 0) {
      const items = timelineRef.current.querySelectorAll('.tl-item');
      const last = items[visibleCount - 1];
      if (last) last.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [visibleCount]);

  const showAll = () => { setVisibleCount(EVENTS.length); setAutoPlay(false); };
  const restart = () => { setVisibleCount(0); setAutoPlay(true); };

  return (
    <div style={{
      fontFamily: "'Source Serif 4', Georgia, serif",
      background: "#faf8f5",
      minHeight: "100vh",
      color: "#2c2420",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;600;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />

      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; background: #faf8f5; }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseRed {
          0%, 100% { box-shadow: 0 0 0 0 rgba(192, 57, 43, 0.5); }
          50% { box-shadow: 0 0 0 8px rgba(192, 57, 43, 0); }
        }
        .tl-item {
          animation: fadeSlideIn 0.4s ease-out forwards;
        }
        .tl-item:hover .tl-content {
          background: #f5f0ea;
        }
        @media (max-width: 640px) {
          .header-row { flex-direction: column !important; gap: 16px !important; }
          .header-right { text-align: left !important; }
          .tl-grid { grid-template-columns: 90px 20px 1fr !important; gap: 8px !important; }
          .main-pad { padding: 20px 16px !important; }
          h1 { font-size: 32px !important; }
        }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom: "3px solid #2c2420", padding: "24px 40px 20px" }}>
        <div className="header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              letterSpacing: "3px",
              color: "#8a8478",
              marginBottom: "6px",
            }}>OPERATION</div>
            <h1 style={{
              fontSize: "clamp(36px, 6vw, 60px)",
              fontWeight: 900,
              lineHeight: 0.92,
              margin: 0,
              letterSpacing: "-2px",
            }}>EPIC FURY</h1>
            <div style={{
              fontSize: "15px",
              color: "#5a5148",
              marginTop: "10px",
              lineHeight: 1.5,
            }}>
              Timeline of the US-Israel military operation against Iran
              <br />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#8a8478" }}>
                February 28, 2026 — {EVENTS.length} events tracked
              </span>
            </div>
          </div>
          <div className="header-right" style={{ textAlign: "right" }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              color: "#c0392b",
              fontWeight: 700,
              letterSpacing: "1px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "flex-end",
            }}>
              <span style={{
                width: "8px", height: "8px", borderRadius: "50%",
                background: "#c0392b", display: "inline-block",
                animation: "pulseRed 2s infinite",
              }} />
              ACTIVE CONFLICT
            </div>
            <div style={{ marginTop: "14px", display: "flex", gap: "8px", justifyContent: "flex-end" }}>
              <button onClick={restart} style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
                padding: "8px 16px", background: "#2c2420", color: "#f7f5f2",
                border: "none", cursor: "pointer", letterSpacing: "1px",
              }}>▶ REPLAY</button>
              <button onClick={showAll} style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
                padding: "8px 16px", background: "transparent", color: "#2c2420",
                border: "1px solid #2c2420", cursor: "pointer", letterSpacing: "1px",
              }}>SHOW ALL</button>
            </div>
          </div>
        </div>

        {/* Phase legend */}
        <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>
          {Object.entries(PHASE_COLORS).map(([phase, colors]) => (
            <div key={phase} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "14px", height: "14px", background: colors.bg,
                border: phase === "PRELUDE" ? "1px solid #aaa" : "none", borderRadius: "2px",
              }} />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px", letterSpacing: "1.5px", color: "#8a8478", fontWeight: 600,
              }}>{phase}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div ref={timelineRef} className="main-pad" style={{ padding: "36px 40px", maxWidth: "900px" }}>
        {EVENTS.map((event, i) => {
          if (i >= visibleCount) return null;
          const phase = PHASE_COLORS[event.phase];
          const prevPhase = i > 0 ? EVENTS[i - 1].phase : null;
          const showPhaseHeader = event.phase !== prevPhase;

          return (
            <div key={i}>
              {showPhaseHeader && (
                <div style={{
                  marginTop: i === 0 ? 0 : "40px",
                  marginBottom: "20px",
                  paddingBottom: "10px",
                  borderBottom: `3px solid ${phase.border}`,
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px", fontWeight: 700, letterSpacing: "2px",
                    padding: "4px 10px", borderRadius: "2px",
                    background: phase.bg, color: phase.text,
                  }}>{event.phase}</span>
                </div>
              )}

              <div className="tl-item" style={{ marginBottom: "6px" }}>
                <div className="tl-grid" style={{
                  display: "grid",
                  gridTemplateColumns: "130px 24px 1fr",
                  gap: "14px",
                }}>
                  {/* Time */}
                  <div style={{ textAlign: "right", paddingTop: "14px" }}>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "12px", fontWeight: 700,
                      color: event.highlight ? "#c0392b" : "#2c2420",
                    }}>{event.time}</div>
                    {event.hour && (
                      <div style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "10px", color: "#a09888", marginTop: "3px",
                      }}>{event.hour}</div>
                    )}
                  </div>

                  {/* Dot + line */}
                  <div style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    paddingTop: "16px",
                  }}>
                    <div style={{
                      width: event.highlight ? "14px" : "10px",
                      height: event.highlight ? "14px" : "10px",
                      borderRadius: "50%",
                      background: event.highlight ? "#c0392b" : phase.bg,
                      border: event.highlight ? "2px solid #faf8f5" : phase.bg === "#d5d0c8" ? "2px solid #8a8478" : "none",
                      boxShadow: event.highlight ? "0 0 0 2px #c0392b" : "none",
                      flexShrink: 0,
                    }} />
                    <div style={{
                      width: "1px", flexGrow: 1, minHeight: "24px",
                      background: event.highlight ? "rgba(192,57,43,0.2)" : "#e0dcd6",
                    }} />
                  </div>

                  {/* Content */}
                  <div className="tl-content" style={{
                    padding: "12px 16px 16px",
                    borderRadius: "3px",
                    transition: "background 0.15s",
                  }}>
                    <div style={{
                      fontSize: "17px", fontWeight: 700, lineHeight: 1.3,
                      color: event.highlight ? "#c0392b" : "#2c2420",
                    }}>
                      <span style={{ fontSize: "13px", marginRight: "6px" }}>{event.icon}</span>
                      {event.title}
                    </div>
                    <div style={{
                      fontSize: "14px", color: "#5a5148", marginTop: "6px",
                      lineHeight: 1.6, maxWidth: "560px",
                    }}>
                      {event.desc}
                      {event.source && (
                        <a href={event.source} target="_blank" rel="noopener noreferrer" style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "9px", letterSpacing: "1.5px", fontWeight: 700,
                          color: event.highlight ? "#c0392b" : "#8a8478",
                          textDecoration: "none", marginLeft: "8px",
                          borderBottom: "1px solid currentColor",
                          paddingBottom: "1px",
                        }}>SOURCE ↗</a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {visibleCount >= EVENTS.length && (
          <div style={{
            marginTop: "40px", padding: "28px", background: "#2c2420", borderRadius: "3px",
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "9px", letterSpacing: "2px", color: "#6b6358", marginBottom: "10px",
            }}>SITUATION AS OF FEB 28, 2026</div>
            <div style={{ fontSize: "16px", color: "#f7f5f2", lineHeight: 1.7 }}>
              Active military operations ongoing. Iran retaliating with missiles across Gulf states and Israel.
              Strait of Hormuz effectively closed to shipping. Multiple countries have closed airspace.
              Houthis resumed Red Sea attacks. Oil prices spiking. Global markets bracing for Monday.
              Both Trump and Netanyahu have declared regime change as the objective.
            </div>
            <div style={{
              marginTop: "16px", fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px", color: "#6b6358",
            }}>
              This timeline will be updated as events develop.
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #e0dcd6", padding: "16px 40px",
        display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px",
        fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#a09888",
      }}>
        <div>Sources: CNN, Al Jazeera, NPR, Reuters, Washington Post, Bloomberg, HRW</div>
        <div>
          Built by <a href="https://twitter.com/BijanAnjavi" style={{ color: "#c0392b", textDecoration: "none" }}>@BijanAnjavi</a>
        </div>
      </div>
    </div>
  );
}

export default App;
