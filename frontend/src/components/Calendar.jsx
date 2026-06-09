import React, { useState } from 'react';
import { toLocalDateStr } from '../utils/formatters';

const MONTHS_PT = [
  'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
  'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
];

export default function Calendar({ tasks, selectedDate, onSelectDate }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const calYear = currentDate.getFullYear();
  const calMonth = currentDate.getMonth();

  const nextMonth = () => {
    setCurrentDate(new Date(calYear, calMonth + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(calYear, calMonth - 1, 1));
  };

  const todayStr = toLocalDateStr(new Date().toISOString());
  const daysWithTasks = new Set(tasks.map(t => toLocalDateStr(t.createdAt)).filter(Boolean));

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const prevMonthDays = new Date(calYear, calMonth, 0).getDate();

  const days = [];

  // Prev month filler
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: prevMonthDays - i, isOtherMonth: true, dateStr: null });
  }

  // Current month
  for (let day = 1; day <= daysInMonth; day++) {
    const m = String(calMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const dateStr = `${calYear}-${m}-${dd}`;
    days.push({ day, isOtherMonth: false, dateStr });
  }

  // Next month filler
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  const remaining = totalCells - firstDay - daysInMonth;
  for (let i = 1; i <= remaining; i++) {
    days.push({ day: i, isOtherMonth: true, dateStr: null });
  }

  const handleDayClick = (dateStr) => {
    if (!dateStr) return;
    if (selectedDate === dateStr) {
      onSelectDate(null);
    } else {
      onSelectDate(dateStr);
    }
  };

  return (
    <div className="panel calendar-panel">
      <div className="calendar-nav">
        <button onClick={prevMonth} className="cal-btn">&#8249;</button>
        <span className="cal-title">{MONTHS_PT[calMonth]} {calYear}</span>
        <button onClick={nextMonth} className="cal-btn">&#8250;</button>
      </div>
      <div className="cal-weekdays">
        <span>Dom</span><span>Seg</span><span>Ter</span>
        <span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span>
      </div>
      <div className="cal-grid">
        {days.map((d, idx) => {
          let classes = 'cal-day';
          if (d.isOtherMonth) classes += ' other-month';
          if (d.dateStr === todayStr) classes += ' today';
          if (d.dateStr === selectedDate) classes += ' selected';
          if (daysWithTasks.has(d.dateStr)) classes += ' has-task';

          return (
            <div 
              key={idx} 
              className={classes}
              onClick={() => handleDayClick(d.dateStr)}
            >
              {d.day}
            </div>
          );
        })}
      </div>
      {selectedDate && (
        <button className="btn-clear-filter" onClick={() => onSelectDate(null)}>
          ✕ Limpar filtro
        </button>
      )}
    </div>
  );
}
