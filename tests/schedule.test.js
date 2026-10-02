import test from 'node:test';
import assert from 'node:assert/strict';
import { getLessons, getTodayStatus } from '../src/schedule.js';
import { readPreference, writePreference } from '../src/preferences.js';

test('week selector replaces alternating Monday and Friday classes without duplicating them', () => {
  const upper = getLessons('numerator', 'all');
  const lower = getLessons('denominator', 'all');
  assert.equal(upper.filter(x => x.day === 1 && x.slot === 4).length, 1);
  assert.equal(upper.find(x => x.day === 1 && x.slot === 4).subject, 'innovation');
  assert.equal(lower.find(x => x.day === 1 && x.slot === 4).subject, 'analysis');
  assert.equal(upper.find(x => x.day === 5).kind, 'Лекція');
  assert.equal(lower.find(x => x.day === 5).kind, 'Практична');
});

test('language choice hides only the other language teacher, retaining professional classes', () => {
  const lessons = getLessons('numerator', 'dmytruk');
  assert.equal(lessons.filter(x => x.teacher === 'kimak').length, 0);
  assert.equal(lessons.filter(x => x.teacher === 'dmytruk').length, 2);
  assert.equal(lessons.filter(x => x.day === 3).length, 2);
});

test('Kyiv clock marks a class ongoing at start and ends it exactly at end', () => {
  const ongoing = getTodayStatus(new Date('2026-10-02T08:40:00Z'), 'numerator', 'all');
  assert.equal(ongoing.state, 'ongoing');
  assert.equal(ongoing.lesson.subject, 'philosophy');
  assert.equal(getTodayStatus(new Date('2026-10-02T10:00:00Z'), 'numerator', 'all').state, 'finished');
});

test('before class gives next class; weekend and filtered free day have no invented classes', () => {
  assert.equal(getTodayStatus(new Date('2026-10-02T06:00:00Z'), 'denominator', 'all').state, 'upcoming');
  assert.equal(getTodayStatus(new Date('2026-10-03T06:00:00Z'), 'numerator', 'all').state, 'free');
  assert.equal(getTodayStatus(new Date('2026-10-01T06:00:00Z'), 'numerator', 'dmytruk').state, 'free');
});

test('blocked storage and invalid saved options fall back instead of breaking the portal', () => {
  const blocked = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
  assert.equal(readPreference(blocked, 'cycle', ['numerator', 'denominator'], 'numerator'), 'numerator');
  assert.equal(readPreference({ getItem: () => 'corrupted' }, 'cycle', ['numerator', 'denominator'], 'numerator'), 'numerator');
  assert.doesNotThrow(() => writePreference(blocked, 'cycle', 'denominator'));
});
