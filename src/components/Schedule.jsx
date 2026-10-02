import React, { useState } from 'react';
import { days, slots, subjects, teacherById, sources } from '../data.js';
import { getLessons } from '../schedule.js';
import { Icon, ExternalLink, Portrait } from './ui.jsx';

export function LessonLinks({ lesson, prominent = false }) {
  return <div className={`lesson-links ${prominent ? 'prominent-links' : ''}`}>
    {lesson.hasZoom && <ExternalLink href={sources.schedule} className={prominent ? 'button button-light' : ''}><Icon name="video" size={16} />{prominent ? 'Zoom в офіційному розкладі' : 'Знайти Zoom'}<Icon name="arrow" size={13} /></ExternalLink>}
    {lesson.vns && <ExternalLink href={lesson.vns} className={prominent ? 'hero-vns' : ''}><Icon name="book" size={16} />ВНС<Icon name="arrow" size={13} /></ExternalLink>}
    {!lesson.hasZoom && <span className="no-zoom">Zoom не вказано</span>}
  </div>;
}

function LessonCard({ lesson }) {
  const subject = subjects[lesson.subject];
  const teacher = teacherById[lesson.teacher];
  return <article className={`lesson-card ${subject.color}`}>
    <div className="lesson-time"><strong>{slots[lesson.slot].start}</strong><span>– {slots[lesson.slot].end}</span><span className="slot">{lesson.slot} пара</span></div>
    <span className="kind">{lesson.kind}{lesson.cycle !== 'both' && ' · через тиждень'}</span>
    <h3 title={subject.title}>{subject.title}</h3>
    <a className="lesson-teacher" href={`#teacher-${teacher.id}`}><Portrait teacher={teacher} small />{teacher.short}</a>
    <LessonLinks lesson={lesson} />
  </article>;
}

export default function Schedule({ cycle, setCycle, language, setLanguage, today }) {
  const [dayFilter, setDayFilter] = useState('all');
  const visibleLessons = getLessons(cycle, language);
  const visibleDays = days.filter(day => dayFilter === 'all' || day.id === Number(dayFilter));
  return <section id="schedule" className="section schedule-section" aria-labelledby="schedule-heading">
    <div className="section-heading"><div><span className="eyebrow">01 / НАВЧАННЯ</span><h2 id="schedule-heading">Твій тиждень</h2></div>
      <ExternalLink href={sources.schedule} className="text-link">Офіційний розклад <Icon name="arrow" /></ExternalLink>
    </div>
    <div className="schedule-toolbar">
      <div><span className="control-label">Тип тижня · обери вручну</span><div className="segmented" role="group" aria-label="Тип тижня">
        <button type="button" aria-pressed={cycle === 'numerator'} onClick={() => setCycle('numerator')}>Чисельник</button>
        <button type="button" aria-pressed={cycle === 'denominator'} onClick={() => setCycle('denominator')}>Знаменник</button>
      </div></div>
      <label className="language-select"><span className="control-label">Іноземна мова</span><select value={language} onChange={event => setLanguage(event.target.value)}>
        <option value="all">Обидва викладачі</option><option value="dmytruk">Вероніка Дмитрук</option><option value="kimak">Галина Кімак</option>
      </select></label>
      <p className="toolbar-note"><span className="tiny-dot" />Час за Києвом<br /><span>Вибір зберігається на пристрої</span></p>
    </div>
    <div className="day-filters" role="group" aria-label="Показати день"><button aria-pressed={dayFilter === 'all'} onClick={() => setDayFilter('all')}>Увесь тиждень</button>{days.map(day => <button key={day.id} aria-pressed={dayFilter === String(day.id)} onClick={() => setDayFilter(String(day.id))}>{day.short}</button>)}</div>
    <div className={`week-grid ${dayFilter !== 'all' ? 'single-day' : ''}`}>
      {visibleDays.map(day => <div className={`day-column ${today === day.id ? 'is-today' : ''}`} key={day.id}>
        <div className="day-heading"><h3>{day.label}</h3>{today === day.id ? <span className="today-badge">Сьогодні</span> : <span className="day-count">{visibleLessons.filter(lesson => lesson.day === day.id).length}</span>}</div>
        <div className="day-lessons">{visibleLessons.filter(lesson => lesson.day === day.id).map(lesson => <LessonCard lesson={lesson} key={lesson.id} />)}
          {!visibleLessons.some(lesson => lesson.day === day.id) && <div className="free-day"><Icon name="leaf" size={28} /><strong>Простір для науки</strong><span>Пар за обраним<br />розкладом немає</span></div>}
        </div>
      </div>)}
    </div>
    <p className="schedule-footnote"><Icon name="calendar" size={15} />Тижневий шаблон без урахування канікул і перенесень. Поділ на мовні підгрупи та аудиторії уточни у викладача.</p>
  </section>;
}
