'use client';
import { useEffect, useState } from 'react';
import { defaultContent, type CertificationContent, type SiteContent } from '../../content/defaults';

const filters = ['Todas','Cisco','VMware','Microsoft'] as const;
export default function CertificationsPage() {
  const [content,setContent] = useState<SiteContent>(defaultContent);
  const [filter,setFilter] = useState<(typeof filters)[number]>('Todas');
  useEffect(()=>{fetch('/api/content').then(response=>response.ok?response.json():defaultContent).then(setContent).catch(()=>setContent(defaultContent));},[]);
  const certifications = (content.certifications ?? []).filter(item=>item.visible && (filter==='Todas'||item.issuer===filter));
  const grouped = certifications.reduce<Record<string,CertificationContent[]>>((groups,item)=>{(groups[item.category]??=[]).push(item);return groups;},{});
  return <main className="certifications-page"><header className="cert-page-header"><a className="cert-back" href="/">← Volver a Valennet</a><p className="eyebrow"><span/> Certificaciones de nuestro equipo</p><h1>Conocimiento validado para diseñar e implementar.</h1><p>Credenciales técnicas en Data Center, networking, seguridad, virtualización y servicios cloud.</p><div className="cert-stats"><span><b>{(content.certifications??[]).filter(item=>item.visible).length}</b> certificaciones</span><span><b>3</b> fabricantes</span><span><b>4</b> áreas técnicas</span></div></header><section className="cert-directory"><div className="cert-filters" aria-label="Filtrar certificaciones">{filters.map(item=><button className={filter===item?'is-active':''} onClick={()=>setFilter(item)} key={item}>{item}</button>)}</div>{Object.entries(grouped).map(([category,items])=><section className="cert-group" key={category}><div><small>ÁREA TÉCNICA</small><h2>{category}</h2></div><div className="cert-list">{items.map(item=><article key={item.id}><div className="cert-badge cert-badge-small" data-issuer={item.issuer}><i>{item.issuer.slice(0,2).toUpperCase()}</i><b>CERTIFIED</b><em>{item.category.slice(0,2).toUpperCase()}</em></div><div><span>{item.issuer}</span><strong>{item.title}</strong><small>{item.year||'Credencial vigente declarada por el equipo'}</small></div></article>)}</div></section>)}</section></main>;
}
