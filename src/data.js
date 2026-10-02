export const sources = {
  schedule: 'https://student.lpnu.ua/postgraduate_schedule?studygroup_abbrname=%D0%92%D0%9F%D0%B0-11',
  admin: 'https://lpnu.ua/informatsiino-obchysliuvalnyi-tsentr-tsiz/systemni-administratory-instytutiv',
  plan: 'https://lpnu.ua/sites/default/files/2021/pages/16556/g20vidavnictvo-ta-poligrafiya2025.pdf',
  plans: 'https://lpnu.ua/aspirantam/pamiatka-aspirantovi/navchalni-plany-aspirantam-2025-roku-vstupu',
};
export const verifiedAt = '02.10.2026';
export const teachers = [
  { id: 'havenko', name: 'Гавенко Світлана Федорівна', short: 'Світлана Гавенко', initials: 'СГ', role: 'Професорка, докторка технічних наук', department: 'Поліграфічних технологій та паковань', email: 'Svitlana.F.Havenko@lpnu.ua', profile: 'https://staff.lpnu.ua/profile/Svitlana.F.Havenko', photoSource: 'https://staff.lpnu.ua/sites/default/files/staff/37037.jpg', photo: '/portraits/havenko.jpg', subjects: ['innovation', 'analysis'] },
  { id: 'labetska', name: 'Лабецька Марта Тарасівна', short: 'Марта Лабецька', initials: 'МЛ', role: 'Доцентка, кандидатка технічних наук', department: 'Поліграфічних технологій та паковань', email: 'Marta.T.Labetska@lpnu.ua', profile: 'https://staff.lpnu.ua/profile/Marta.T.Labetska', photoSource: 'https://staff.lpnu.ua/sites/default/files/staff/24616.jpg', photo: '/portraits/labetska.jpg', subjects: ['innovation'] },
  { id: 'karivets', name: 'Карівець Ігор Володимирович', short: 'Ігор Карівець', initials: 'ІК', role: 'Завідувач кафедри, доктор філософських наук', department: 'Філософії', email: 'Ihor.V.Karivets@lpnu.ua', profile: 'https://staff.lpnu.ua/profile/Ihor.V.Karivets', photoSource: 'https://staff.lpnu.ua/sites/default/files/staff/3971.jpg', photo: '/portraits/karivets.jpg', subjects: ['philosophy'] },
  { id: 'dmytruk', name: 'Дмитрук Вероніка Анатоліївна', short: 'Вероніка Дмитрук', initials: 'ВД', role: 'Доцентка, кандидатка технічних наук', department: 'Іноземних мов технічного спрямування', email: 'Veronika.A.Dmytruk@lpnu.ua', profile: 'https://staff.lpnu.ua/profile/Veronika.A.Dmytruk', photoSource: 'https://staff.lpnu.ua/sites/default/files/staff/73009.jpg', photo: '/portraits/dmytruk.jpg', subjects: ['language'] },
  { id: 'kimak', name: 'Кімак Галина Миколаївна', short: 'Галина Кімак', initials: 'ГК', role: 'Старша викладачка', department: 'Іноземних мов технічного спрямування', email: 'Halyna.M.Kimak@lpnu.ua', profile: 'https://staff.lpnu.ua/profile/Halyna.M.Kimak', photoSource: 'https://staff.lpnu.ua/sites/default/files/staff/24850.jpg', photo: '/portraits/kimak.jpg', subjects: ['language'] },
];
export const teacherById = Object.fromEntries(teachers.map(t => [t.id, t]));
export const adminEmail = 'ipmt_adm@lpnu.ua';
export const subjects = {
  innovation: { title: 'Інноваційні технології у видавничо-поліграфічній та пакувальній галузі', short: 'Інноваційні технології', color: 'green' },
  analysis: { title: 'Системний аналіз наукових досліджень у видавництві та поліграфії', short: 'Системний аналіз', color: 'blue' },
  philosophy: { title: 'Філософія і методологія науки', short: 'Філософія і методологія науки', color: 'purple' },
  language: { title: 'Іноземна мова для академічних цілей, частина 1', short: 'Іноземна мова', color: 'orange' },
};
export const slots = {
  2: { start: '10:05', end: '11:25' },
  3: { start: '11:40', end: '13:00' },
  4: { start: '13:15', end: '14:35' },
};
const languageVns = 'https://vns.lpnu.ua/course/view.php?id=1099';
export const lessons = [
  { id: 'mon-2', day: 1, slot: 2, subject: 'language', teacher: 'dmytruk', kind: 'Практична', cycle: 'both', hasZoom: true, vns: languageVns },
  { id: 'mon-3', day: 1, slot: 3, subject: 'language', teacher: 'dmytruk', kind: 'Практична', cycle: 'both', hasZoom: true, vns: languageVns },
  { id: 'mon-4-n', day: 1, slot: 4, subject: 'innovation', teacher: 'havenko', kind: 'Лекція', cycle: 'numerator', hasZoom: true },
  { id: 'mon-4-d', day: 1, slot: 4, subject: 'analysis', teacher: 'havenko', kind: 'Лекція', cycle: 'denominator', hasZoom: true },
  { id: 'wed-2', day: 3, slot: 2, subject: 'innovation', teacher: 'labetska', kind: 'Практична', cycle: 'both' },
  { id: 'wed-3', day: 3, slot: 3, subject: 'analysis', teacher: 'havenko', kind: 'Лабораторна', cycle: 'both', hasZoom: true, vns: 'https://vns.lpnu.ua/course/view.php?id=20291' },
  { id: 'thu-3', day: 4, slot: 3, subject: 'language', teacher: 'kimak', kind: 'Практична', cycle: 'both', vns: languageVns },
  { id: 'thu-4', day: 4, slot: 4, subject: 'language', teacher: 'kimak', kind: 'Практична', cycle: 'both', vns: languageVns },
  { id: 'fri-3-n', day: 5, slot: 3, subject: 'philosophy', teacher: 'karivets', kind: 'Лекція', cycle: 'numerator', hasZoom: true, vns: 'https://vns.lpnu.ua/course/view.php?id=411' },
  { id: 'fri-3-d', day: 5, slot: 3, subject: 'philosophy', teacher: 'karivets', kind: 'Практична', cycle: 'denominator', hasZoom: true },
];
export const days = [
  { id: 1, label: 'Понеділок', short: 'Пн' }, { id: 2, label: 'Вівторок', short: 'Вт' },
  { id: 3, label: 'Середа', short: 'Ср' }, { id: 4, label: 'Четвер', short: 'Чт' }, { id: 5, label: 'П’ятниця', short: 'Пт' },
];
