import { lessons, slots } from './data.js';

export function getLessons(cycle, language = 'all') {
  return lessons.filter(lesson => (lesson.cycle === 'both' || lesson.cycle === cycle)
    && (lesson.subject !== 'language' || language === 'all' || lesson.teacher === language));
}

export function kyivClock(now) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Kyiv', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(now).map(part => [part.type, part.value]));
  return { day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday), minutes: Number(parts.hour) * 60 + Number(parts.minute) };
}

function minutes(time) {
  const [hours, mins] = time.split(':').map(Number);
  return hours * 60 + mins;
}

export function getTodayStatus(now, cycle, language) {
  const clock = kyivClock(now);
  const today = getLessons(cycle, language).filter(lesson => lesson.day === clock.day).sort((a, b) => a.slot - b.slot);
  const next = today.find(lesson => minutes(slots[lesson.slot].end) > clock.minutes);
  if (!next) return { state: today.length ? 'finished' : 'free', day: clock.day };
  return { state: clock.minutes >= minutes(slots[next.slot].start) ? 'ongoing' : 'upcoming', lesson: next, day: clock.day };
}
