import { useState, useEffect } from "react";

/**
 * FocusProgressWidget
 * Replaces the passive Motivation Mode quote widget with an active, task-aware productivity hub.
 * Features:
 * 1. Daily Progress Tracker: Real-time completion rate, stat breakdown, and next action.
 * 2. Focus Timer: Integrated Pomodoro timer (25 min focus / 5 min break) to encourage deep work.
 */
export default function FocusProgressWidget({ tasks = [] }) {
  // --- Progress Calculations ---
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const remaining = total - completed;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  const nextTask = tasks.find((t) => !t.completed);

  // --- Focus Timer State (Pomodoro Technique) ---
  const [timerMode, setTimerMode] = useState("focus"); // "focus" (25m) | "break" (5m)
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (timerMode === "focus") {
        alert("Focus session complete! Take a well-deserved 5-minute break.");
      } else {
        alert("Break is over! Ready to tackle your next task?");
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, timerMode]);

  const handleModeChange = (mode) => {
    setTimerMode(mode);
    setIsRunning(false);
    setTimeLeft(mode === "focus" ? 25 * 60 : 5 * 60);
  };

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(timerMode === "focus" ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="productivity-widget">
      {/* 1. Daily Progress Tracker */}
      <div className="widget-card progress-card">
        <h3>Daily Progress</h3>

        {total === 0 ? (
          <p className="widget-empty">No tasks yet. Add a task to start tracking!</p>
        ) : (
          <>
            <div className="progress-header">
              <span className="progress-label">Completed</span>
              <span className="progress-pct">{percentage}%</span>
            </div>

            <div className="progress-bar-container">
              <div
                className="progress-bar-fill"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="stat-grid">
              <div className="stat-box">
                <span className="stat-number">{completed}</span>
                <span className="stat-text">Done</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">{remaining}</span>
                <span className="stat-text">Pending</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">{total}</span>
                <span className="stat-text">Total</span>
              </div>
            </div>

            {nextTask && (
              <div className="next-action">
                <span className="next-label">Next Up</span>
                <p className="next-task-title">{nextTask.title}</p>
              </div>
            )}

            {total > 0 && remaining === 0 && (
              <div className="completion-badge">
                🎉 All tasks completed! Great work today!
              </div>
            )}
          </>
        )}
      </div>

      {/* 2. Focus Timer (Pomodoro Technique) */}
      <div className="widget-card timer-card">
        <h3>Focus Session</h3>
        <p className="timer-desc">Timebox your work to maintain deep focus.</p>

        <div className="timer-mode-toggle">
          <button
            type="button"
            className={`mode-btn ${timerMode === "focus" ? "active" : ""}`}
            onClick={() => handleModeChange("focus")}
          >
            25m Focus
          </button>
          <button
            type="button"
            className={`mode-btn ${timerMode === "break" ? "active" : ""}`}
            onClick={() => handleModeChange("break")}
          >
            5m Break
          </button>
        </div>

        <div className="timer-display">{formatTime(timeLeft)}</div>

        <div className="timer-controls">
          <button
            type="button"
            className={`btn-timer ${isRunning ? "btn-pause" : "btn-start"}`}
            onClick={toggleTimer}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            type="button"
            className="btn-timer btn-reset"
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
