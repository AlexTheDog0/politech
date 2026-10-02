import React from 'react';
import { teachers, subjects, sources, adminEmail } from '../data.js';
import { Icon, ExternalLink, Portrait, CopyEmail } from './ui.jsx';

export default function Contacts() {
  return <section id="contacts" className="section" aria-labelledby="contacts-heading">
    <div className="section-heading"><div><span className="eyebrow">02 / ЛЮДИ ПОРУЧ</span><h2 id="contacts-heading">Твої викладачі</h2></div><span className="muted section-aside">5 викладачів · офіційні контакти</span></div>
    <div className="contact-grid">
      {teachers.map(teacher => <article className="contact-card" id={`teacher-${teacher.id}`} key={teacher.id}>
        <div className="contact-top"><Portrait teacher={teacher} /><ExternalLink href={teacher.profile} className="profile-link" aria-label={`Офіційний профіль: ${teacher.name}`} title="Офіційний профіль"><Icon name="arrow" /></ExternalLink></div>
        <h3>{teacher.name}</h3><p className="teacher-role">{teacher.role}</p>
        <p className="teacher-department">Кафедра {teacher.department.toLocaleLowerCase('uk')}</p>
        <div className="subject-tags">{teacher.subjects.map(subject => <span key={subject} className={`subject-tag ${subjects[subject].color}`}>{subjects[subject].short}</span>)}</div>
        <div className="email-row"><a href={`mailto:${teacher.email}`}><Icon name="mail" size={16} /><span>{teacher.email}</span></a><CopyEmail email={teacher.email} /></div>
      </article>)}
      <article className="contact-card support-card">
        <span className="support-icon"><Icon name="support" size={30} /></span><span className="eyebrow">ІТ-ПІДТРИМКА</span>
        <h3>Системний<br />адміністратор ІПМТ</h3><p>Питання щодо облікового запису, університетської пошти та доступу до ВНС.</p>
        <ExternalLink className="text-link" href={sources.admin}>Довідник університету <Icon name="arrow" size={15} /></ExternalLink>
        <div className="email-row"><a href={`mailto:${adminEmail}`}><Icon name="mail" size={16} /><span>{adminEmail}</span></a><CopyEmail email={adminEmail} /></div>
      </article>
    </div>
  </section>;
}
