import React, { useState } from 'react';
import './GanttChart.css';

export interface GanttTask {
  id: string;
  name: string;
  start: Date;
  end: Date;
  progress?: number; // 0-100
  dependencies?: string[]; // IDs of tasks this depends on
  color?: string;
  group?: string;
}

export interface GanttChartProps {
  tasks: GanttTask[];
  width?: number;
  height?: number;
  showProgress?: boolean;
  showDependencies?: boolean;
  showToday?: boolean;
  className?: string;
}

export const GanttChart: React.FC<GanttChartProps> = ({
  tasks,
  width = 900,
  height = 400,
  showProgress = true,
  showDependencies = true,
  showToday = true,
  className = '',
}) => {
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: string;
  }>({
    visible: false,
    x: 0,
    y: 0,
    content: '',
  });

  const padding = { top: 40, right: 40, bottom: 60, left: 200 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate time range
  const allDates = tasks.flatMap(t => [t.start, t.end]);
  const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));
  const timeRange = maxDate.getTime() - minDate.getTime();

  // Add padding to time range
  const paddedMin = new Date(minDate.getTime() - timeRange * 0.05);
  const paddedMax = new Date(maxDate.getTime() + timeRange * 0.05);
  const paddedRange = paddedMax.getTime() - paddedMin.getTime();

  const getXPosition = (date: Date): number => {
    return ((date.getTime() - paddedMin.getTime()) / paddedRange) * chartWidth;
  };

  const taskHeight = Math.min(30, chartHeight / tasks.length * 0.7);
  const taskSpacing = chartHeight / tasks.length;

  const getYPosition = (index: number): number => {
    return index * taskSpacing + taskSpacing / 2 - taskHeight / 2;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDuration = (start: Date, end: Date): string => {
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return `${days} day${days !== 1 ? 's' : ''}`;
  };

  const handleMouseMove = (e: React.MouseEvent, content: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      content,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  // Calculate today's position
  const today = new Date();
  const todayX = getXPosition(today);
  const showTodayLine = showToday && today >= paddedMin && today <= paddedMax;

  // Generate time axis labels
  const timeLabels: Date[] = [];
  const totalDays = paddedRange / (1000 * 60 * 60 * 24);
  const labelCount = Math.min(8, Math.ceil(totalDays / 7)); // Show weekly intervals
  for (let i = 0; i <= labelCount; i++) {
    const time = paddedMin.getTime() + (paddedRange / labelCount) * i;
    timeLabels.push(new Date(time));
  }

  return (
    <div className={`jv-gantt-chart ${className}`}>
      <svg width={width} height={height}>
        <defs>
          <filter id="ganttShadow">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.2" />
          </filter>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {/* Grid lines and time labels */}
          {timeLabels.map((date, i) => {
            const x = getXPosition(date);
            return (
              <g key={i}>
                <line
                  x1={x}
                  y1={0}
                  x2={x}
                  y2={chartHeight}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
                <text
                  x={x}
                  y={-10}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#6b7280"
                >
                  {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </text>
              </g>
            );
          })}

          {/* Today line */}
          {showTodayLine && (
            <line
              x1={todayX}
              y1={0}
              x2={todayX}
              y2={chartHeight}
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray="5,5"
            >
              <title>Today</title>
            </line>
          )}

          {/* Dependencies */}
          {showDependencies && tasks.map((task, index) => {
            if (!task.dependencies) return null;
            return task.dependencies.map((depId) => {
              const depTask = tasks.find(t => t.id === depId);
              if (!depTask) return null;
              
              const depIndex = tasks.indexOf(depTask);
              const startX = getXPosition(depTask.end);
              const startY = getYPosition(depIndex) + taskHeight / 2;
              const endX = getXPosition(task.start);
              const endY = getYPosition(index) + taskHeight / 2;

              // Simple arrow path
              const midX = (startX + endX) / 2;
              
              return (
                <g key={`${task.id}-${depId}`}>
                  <path
                    d={`M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`}
                    stroke="#9ca3af"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                  />
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="10"
                      refX="8"
                      refY="3"
                      orient="auto"
                    >
                      <polygon points="0 0, 10 3, 0 6" fill="#9ca3af" />
                    </marker>
                  </defs>
                </g>
              );
            });
          })}

          {/* Task bars */}
          {tasks.map((task, index) => {
            const startX = getXPosition(task.start);
            const endX = getXPosition(task.end);
            const barWidth = endX - startX;
            const y = getYPosition(index);
            const color = task.color || '#3b82f6';
            const progress = task.progress || 0;

            return (
              <g key={task.id}>
                {/* Task name label */}
                <text
                  x={-10}
                  y={y + taskHeight / 2 + 4}
                  textAnchor="end"
                  fontSize="12"
                  fill="#374151"
                  fontWeight="500"
                >
                  {task.name}
                </text>

                {/* Task bar background */}
                <rect
                  x={startX}
                  y={y}
                  width={barWidth}
                  height={taskHeight}
                  fill={color}
                  opacity="0.3"
                  rx="4"
                  filter="url(#ganttShadow)"
                  onMouseMove={(e) =>
                    handleMouseMove(
                      e,
                      `${task.name}\nStart: ${formatDate(task.start)}\nEnd: ${formatDate(task.end)}\nDuration: ${getDuration(task.start, task.end)}${
                        showProgress ? `\nProgress: ${progress}%` : ''
                      }`
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                  className="jv-gantt-task-bg"
                />

                {/* Progress bar */}
                {showProgress && progress > 0 && (
                  <rect
                    x={startX}
                    y={y}
                    width={barWidth * (progress / 100)}
                    height={taskHeight}
                    fill={color}
                    opacity="0.8"
                    rx="4"
                  />
                )}

                {/* Task border */}
                <rect
                  x={startX}
                  y={y}
                  width={barWidth}
                  height={taskHeight}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  rx="4"
                />

                {/* Progress text */}
                {showProgress && barWidth > 40 && (
                  <text
                    x={startX + barWidth / 2}
                    y={y + taskHeight / 2 + 4}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#ffffff"
                    fontWeight="600"
                  >
                    {progress}%
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="jv-gantt-tooltip"
          style={{
            left: tooltip.x + 10,
            top: tooltip.y - 10,
          }}
        >
          {tooltip.content.split('\n').map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="jv-gantt-legend">
        {showProgress && (
          <div className="jv-gantt-legend-item">
            <div className="jv-gantt-legend-progress"></div>
            <span>Progress</span>
          </div>
        )}
        {showTodayLine && (
          <div className="jv-gantt-legend-item">
            <div className="jv-gantt-legend-today"></div>
            <span>Today</span>
          </div>
        )}
        {showDependencies && (
          <div className="jv-gantt-legend-item">
            <div className="jv-gantt-legend-dependency"></div>
            <span>Dependency</span>
          </div>
        )}
      </div>
    </div>
  );
};
