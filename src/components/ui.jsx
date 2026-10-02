import React, { useState } from 'react';

const paths = {
  arrow: 'M7 17 17 7M7 7h10v10',
  calendar: 'M8 3v4m8-4v4M4 10h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z',
  mail: 'M3 5h18v14H3V5Zm0 1 9 7 9-7',
  copy: 'M8 8h12v12H8V8ZM4 16V4h12',
  check: 'm5 12 4 4L19 6',
  clock: 'M12 7v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  book: 'M12 5v15M3 4c4-1 6 0 9 2 3-2 5-3 9-2v14c-4-1-6 0-9 2-3-2-5-3-9-2V4Z',
  video: 'M3 6h12v12H3V6Zm12 4 6-4v12l-6-4',
  support: 'M4 13v-2a8 8 0 0 1 16 0v2M4 11H2v7h4v-7H4Zm16 0h2v7h-4v-7h2Zm0 7v3h-6',
  leaf: 'M5 19C-1 7 12 3 20 4c1 10-2 17-12 15M5 21 15 10',
};

export function Icon({ name, size = 18, ...props }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name] || paths.arrow} /></svg>;
}

export function ExternalLink({ href, children, className = '', ...props }) {
  return <a href={href} target="_blank" rel="noreferrer" className={className} {...props}>{children}</a>;
}

export function Portrait({ teacher, small = false }) {
  const [failed, setFailed] = useState(false);
  return <span className={`portrait ${small ? 'portrait-small' : ''}`}>
    {failed ? <span aria-label={teacher.name}>{teacher.initials}</span>
      : <img src={`${import.meta.env.BASE_URL}${teacher.photo.replace(/^\//, '')}`} alt={small ? '' : teacher.name} loading="lazy" onError={() => setFailed(true)} />}
  </span>;
}

export function CopyEmail({ email }) {
  const [status, setStatus] = useState('idle');
  async function copy() {
    try { await navigator.clipboard.writeText(email); setStatus('copied'); }
    catch { setStatus('error'); }
  }
  return <span className="copy-control">
    <button className="icon-button" type="button" onClick={copy} aria-label={`Скопіювати ${email}`} title="Скопіювати email"><Icon name={status === 'copied' ? 'check' : 'copy'} /></button>
    <span role="status" className={status === 'idle' ? 'sr-only' : 'copy-status'}>{status === 'copied' ? 'Скопійовано' : status === 'error' ? 'Виділи адресу та скопіюй вручну' : ''}</span>
  </span>;
}
