import React, { useEffect, useState } from 'react';
import { sources, verifiedAt, subjects, teacherById, slots } from './data.js';
import { getTodayStatus } from './schedule.js';
import { readPreference, writePreference } from './preferences.js';
import Schedule, { LessonLinks } from './components/Schedule.jsx';
import Contacts from './components/Contacts.jsx';
import { ExternalLink, Icon } from './components/ui.jsx';

function storage() { try { return window.localStorage; } catch { return undefined; } }
function usePreference(key, allowed, fallback) {
  const [value, setValue] = useState(() => readPreference(storage(), key, allowed, fallback));
  function update(next) { setValue(next); writePreference(storage(), key, next); }
  return [value, update];
}

export default function App() {
  const [cycle, setCycle] = usePreference('cycle', ['numerator', 'denominator'], 'numerator');
  const [language, setLanguage] = usePreference('language', ['all', 'dmytruk', 'kimak'], 'all');
  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const timer = setInterval(() => setNow(new Date()), 30000); return () => clearInterval(timer); }, []);
  const status = getTodayStatus(now, cycle, language);
  const date = new Intl.DateTimeFormat('uk-UA', { timeZone: 'Europe/Kyiv', day: 'numeric', month: 'long', year: 'numeric' }).format(now);
  const lesson = status.lesson;

  return <>
    <a className="skip-link" href="#main">Перейти до вмісту</a>
    <header className="site-header"><div className="header-inner"><a href="#" className="brand" aria-label="Мій ІПМТ — на початок"><img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" /><span>мій <strong>ІПМТ</strong></span></a><nav aria-label="Основна навігація"><a href="#schedule">Розклад</a><a href="#contacts">Контакти</a><a href="#resources">Матеріали</a></nav><span className="group-pill"><span className="tiny-dot" />ВПа-11</span></div></header>
    <main id="main" className="page-shell">
      <div className="intro"><div><span className="eyebrow">ЛЬВІВСЬКА ПОЛІТЕХНІКА · АСПІРАНТУРА</span><h1>Навчання. Все поруч<span>.</span></h1><p>Твій розклад, викладачі й важливі посилання — в одному місці.</p></div><div className="semester"><span>2026 / 2027</span><strong>Осінній семестр</strong><small>1 курс · G20 Видавництво та поліграфія</small></div></div>
      <section className="overview" aria-label="Огляд дня">
        <div className="today-card"><div className="today-top"><span><span className="status-dot" />{status.state === 'ongoing' ? 'ЗАРАЗ ЗА РОЗКЛАДОМ' : 'СЬОГОДНІ ЗА РОЗКЛАДОМ'}</span><span>{date}</span></div>
          {lesson ? <><div className="next-meta">{status.state === 'ongoing' ? 'Триває пара' : 'Наступна пара'}<span>·</span>{slots[lesson.slot].start}–{slots[lesson.slot].end}<span>·</span>{lesson.kind}</div><h2>{subjects[lesson.subject].title}</h2><a href={`#teacher-${lesson.teacher}`} className="hero-teacher">{teacherById[lesson.teacher].name}<Icon name="arrow" size={15} /></a><LessonLinks lesson={lesson} prominent /></>
            : <><div className="next-meta">Час для власних досліджень</div><h2>{status.state === 'finished' ? 'Пари на сьогодні завершились.' : 'Сьогодні без пар.'}</h2><p className="hero-description">Переглянь тиждень нижче, щоб спланувати наступні заняття.</p><a href="#schedule" className="button button-light"><Icon name="calendar" />До розкладу<Icon name="arrow" size={15} /></a></>}
          <p className="hero-caption">Обрано: {cycle === 'numerator' ? 'чисельник' : 'знаменник'} · тижневий шаблон</p>
          <div className="hero-decoration" aria-hidden="true"><span /><span /><span /></div>
        </div>
        <aside className="notebook"><div className="notebook-heading"><Icon name="book" /><span>На замітку</span></div><h3>Менше пошуку.<br />Більше досліджень.</h3><p>Обери тип тижня та свого викладача іноземної мови. Портал запам’ятає налаштування.</p><div className="notebook-bottom"><span className="check-circle"><Icon name="check" size={13} /></span><span>Контакти з офіційних джерел<br /><small>Перевірено {verifiedAt}</small></span></div></aside>
      </section>
      <Schedule cycle={cycle} setCycle={setCycle} language={language} setLanguage={setLanguage} today={status.day} />
      <Contacts />
      <section id="resources" className="section resources-section" aria-labelledby="resources-heading"><div className="section-heading"><div><span className="eyebrow">03 / ПІД РУКОЮ</span><h2 id="resources-heading">Корисні матеріали</h2></div></div>
        <div className="resources-grid"><ExternalLink href={sources.plan} className="resource-card"><span className="resource-icon"><Icon name="book" size={24} /></span><div><h3>Навчальний план G20 <span className="year-label">2025</span></h3><p>План для вступу 2025 року. Для твого набору 2026 — уточни на кафедрі.</p></div><Icon name="arrow" /></ExternalLink><ExternalLink href="https://vns.lpnu.ua/" className="resource-card"><span className="resource-icon"><Icon name="book" size={24} /></span><div><h3>Віртуальне навчальне середовище</h3><p>Матеріали курсів, завдання та оцінки.</p></div><Icon name="arrow" /></ExternalLink></div>
      </section>
      <footer><span className="footer-brand">мій ІПМТ <span>/</span> Особистий портал ВПа-11</span><p>Дані перевірено {verifiedAt}. Розклад не оновлюється автоматично. <ExternalLink href={sources.schedule}>Перевірити зміни ↗</ExternalLink></p></footer>
    </main>
  </>;
}
