'use client';

import { type FormEvent, useEffect, useState } from 'react';
import { defaultContent, type SiteContent } from '../content/defaults';
const steps = ['Diagnóstico','Diseño','Implementación','Validación','Soporte'];

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><span className="brand-dot brand-dot-top"/><span className="brand-dot brand-dot-left"/><span className="brand-dot brand-dot-right"/><span className="brand-junction"/></span>;
}

function NetworkScene() {
  return <div className="network-scene" aria-label="Red tecnológica conectada">
    <div className="scene-aura"/><div className="scene-scan"/><span className="orbit-particle orbit-one"/><span className="orbit-particle orbit-two"/><span className="orbit-particle orbit-three"/>
    <div className="network-core"><span className="core-sweep"/><span className="core-ring core-ring-one"/><span className="core-ring core-ring-two"/><span className="core-ring core-ring-three"/><BrandMark/></div>
    <span className="route route-a"/><span className="route route-b"/><span className="route route-c"/>
    <span className="route-pulse route-pulse-a"/><span className="route-pulse route-pulse-b"/><span className="route-pulse route-pulse-c"/>
    <span className="node node-a"><i/>NETWORK</span><span className="node node-b"><i/>SECURITY</span><span className="node node-c"><i/>DATA CENTER</span>
    <span className="data-pulse pulse-a"/><span className="data-pulse pulse-b"/><div className="system-status"><span/>SYSTEM ONLINE</div>
  </div>;
}

export default function Home() {
  const [menuOpen,setMenuOpen] = useState(false);
  const [content,setContent] = useState<SiteContent>(defaultContent);
  const [contactForm,setContactForm] = useState({name:'',email:'',phone:'',company:'',service:'Infraestructura TI',message:'',consent:false});
  const [contactStatus,setContactStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  useEffect(() => {
    fetch('/api/content').then(response => response.ok ? response.json() : defaultContent).then(setContent).catch(() => setContent(defaultContent));
  }, []);
  const services = content.services.filter(service => service.visible !== false);
  const about = content.about ?? defaultContent.about;
  const featuredServices = services.filter(service => service.featured !== false).slice(0, 4);
  const complementaryServices = services.filter(service => service.featured === false);
  const publishedProjects = (content.projects ?? []).filter(project => project.status === 'published' && project.visible !== false);
  const featuredProject = publishedProjects[0];
  const supportingProjects = publishedProjects.slice(1);
  const publishedCourses = (content.courses ?? []).filter(course => course.status !== 'draft' && course.visible !== false);
  const featuredCertifications = (content.certifications ?? []).filter(certification => certification.visible && certification.featured).slice(0, 6);
  const closeMenu = () => setMenuOpen(false);
  const updateContactForm = (key:string, value:string|boolean) => setContactForm(current => ({ ...current, [key]: value }));
  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContactStatus('sending');
    try {
      const response = await fetch('/api/contact', { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(contactForm) });
      if (!response.ok) throw new Error('No se pudo guardar');
      setContactForm({name:'',email:'',phone:'',company:'',service:'Infraestructura TI',message:'',consent:false});
      setContactStatus('sent');
    } catch { setContactStatus('error'); }
  }
  return <main>
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Valennet Solutions, inicio"><BrandMark/><span className="brand-name">valennet<small>solutions</small></span></a>
      <nav className="desktop-nav" aria-label="Navegación principal"><a href="#nosotros">Quiénes somos</a><a href="#soluciones">Soluciones</a><a href="#proyectos">Capacidad</a><a href="#capacitacion">Capacitación</a></nav>
      <a className="header-cta" href="#contacto">Solicitar asesoría <span>↗</span></a>
      <button className="menu-button" type="button" aria-label={menuOpen?'Cerrar menú':'Abrir menú'} aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}><span/><span/></button>
    </header>
    <div className={`mobile-panel ${menuOpen?'is-open':''}`} aria-hidden={!menuOpen}>
      <nav aria-label="Navegación móvil"><a onClick={closeMenu} href="#nosotros"><b>00</b>Quiénes somos</a><a onClick={closeMenu} href="#soluciones"><b>01</b>Soluciones</a><a onClick={closeMenu} href="#proyectos"><b>02</b>Capacidad técnica</a><a onClick={closeMenu} href="#metodologia"><b>03</b>Metodología</a><a onClick={closeMenu} href="#capacitacion"><b>04</b>Capacitación</a></nav>
      <a className="button button-primary" onClick={closeMenu} href="#contacto">Hablar con un especialista <span>↗</span></a>
    </div>

    <section className="hero" id="inicio">
      <div className="hero-copy"><p className="eyebrow"><span/> {content.hero.eyebrow}</p><h1>{content.hero.title} <em>{content.hero.accent}</em></h1><p className="hero-lede">{content.hero.description}</p>
        <div className="hero-actions"><a className="button button-primary" href="#contacto">Hablar con un especialista <span>↗</span></a><a className="button button-secondary" href="#soluciones">Explorar soluciones <span>↓</span></a></div>
        <div className="service-list" aria-label="Áreas de servicio">{featuredServices.map(({title},i)=><span key={title}><b>0{i+1}</b>{title}</span>)}</div>
      </div><NetworkScene/><div className="scroll-cue"><span/> DESCUBRIR EL SISTEMA</div>
    </section>

    <section className="section intro" id="soluciones">
      <div><p className="eyebrow"><span/> Un sistema integrado</p><h2>Todo comienza con una conexión.</h2></div>
      <div className="intro-copy"><p>Una infraestructura confiable no se construye por partes aisladas. Red, procesamiento, seguridad y monitoreo deben responder como un solo sistema.</p><span className="technical-label">NODE → CONNECTION → NETWORK → INFRASTRUCTURE</span></div>
    </section>

    {about.visible !== false && <section className="about-section section" id="nosotros"><div className="about-copy"><p className="eyebrow"><span/> {about.eyebrow}</p><h2>{about.title}</h2><p className="about-description">{about.description}</p><p className="about-closing">{about.closing}</p><p className="about-meta">DESDE {about.foundation} <i/> {about.location} <i/> {about.focus}</p></div><div className="about-visual">{about.image && <div className="about-image" style={{backgroundImage:`url(${about.image})`}} role="img" aria-label={about.imageAlt || 'Imagen referencial de infraestructura tecnológica'}><span>IMAGEN REFERENCIAL</span><i className="about-scan"/><b className="about-point point-infra">INFRAESTRUCTURA</b><b className="about-point point-security">SEGURIDAD</b><b className="about-point point-connect">CONECTIVIDAD</b></div>}<div className="about-principles"><p className="index">CÓMO TRABAJAMOS</p>{about.principles.map((principle,i)=><div key={`${principle}-${i}`}><span>0{i+1}</span><strong>{principle}</strong></div>)}</div></div></section>}

    <section className="solutions section-pad">
      <div className="section-heading"><p className="index">01 / SOLUCIONES</p><h2>Ingeniería de extremo a extremo.</h2><p>Cuatro capas conectadas para convertir una necesidad tecnológica en una operación estable.</p></div>
      <div className="solution-stack">{featuredServices.map((s,i)=><article className="solution-card" key={s.title}><div className="solution-top"><span>{s.n}</span><i className="solution-node"/></div><h3>{s.title}</h3><p>{s.copy}</p><div className="tag-row">{s.tags.map(t=><span key={t}>{t}</span>)}</div><div className="card-route"><i style={{animationDelay:`${i*.6}s`}}/></div></article>)}</div>
      {complementaryServices.length > 0 && <div className="complementary-services"><div><p className="index">CAPACIDADES COMPLEMENTARIAS</p><h3>La arquitectura se adapta al alcance real.</h3></div><div className="complementary-list">{complementaryServices.map(service => <div key={service.title}><span>{service.n}</span><strong>{service.title}</strong><small>{service.tags.slice(0,2).join(' · ')}</small></div>)}</div></div>}
    </section>

    {content.capacity.visible !== false && <section className="system-section capacity-section" id="proyectos">
      <div className="system-copy"><p className="index">{content.capacity.eyebrow}</p><h2>{content.capacity.title}</h2><p>{content.capacity.description}</p><p className="capacity-closing">{content.capacity.closing}</p></div>
      <div className="flow-diagram capacity-flow" aria-label="Capacidades técnicas de Valennet"><div className="flow-line"><i/></div>{content.capacity.items.map((item,i)=><article className={`flow-item capacity-flow-item flow-${i}`} key={`${item.title}-${i}`}><small>0{i+1}</small><div><span>{item.title}</span><p>{item.description}</p></div><b>INTEGRATED</b></article>)}</div>
    </section>}

    {featuredProject && <section className="projects-section section-pad"><div className="section-heading"><p className="index">02 / EXPERIENCIA</p><h2>Proyectos destacados, sin perder la escala.</h2><p>Una muestra breve de la experiencia de Valennet. Cada proyecto puede crecer en detalle sin hacer inmensa la HOME.</p></div><article className="featured-project"><div className="featured-project-image" style={{backgroundImage:`url(${featuredProject.image || '/project-data-center.png'})`}} role="img" aria-label={featuredProject.imageAlt || 'Imagen referencial de infraestructura tecnológica'}><span>IMAGEN REFERENCIAL</span></div><div className="featured-project-copy"><small>{featuredProject.sector || 'PROYECTO TECNOLÓGICO'}</small><h3>{featuredProject.title}</h3><p>{featuredProject.summary}</p>{featuredProject.showClient && featuredProject.client && <span className="project-client">{featuredProject.client}</span>}<a className="text-link" href="#contacto">Consultar un proyecto similar <span>↗</span></a></div></article>{supportingProjects.length > 0 && <div className="project-grid">{supportingProjects.map(project => <article key={project.id}><small>{project.sector || 'PROYECTO TECNOLÓGICO'}</small><h3>{project.title}</h3><p>{project.summary}</p>{project.showClient && project.client && <span>{project.client}</span>}</article>)}</div>}<a className="projects-more" href="#contacto">Hablar sobre otro proyecto <span>↗</span></a></section>}

    <section className="method section-pad" id="metodologia">
      <div className="section-heading"><p className="index">03 / METODOLOGÍA</p><h2>De la necesidad a una infraestructura confiable.</h2></div>
      <div className="steps">{steps.map((step,i)=><div className="step" key={step}><span>0{i+1}</span><i/><h3>{step}</h3></div>)}</div>
    </section>

    <section className="training section-pad" id="capacitacion">
      <div className="training-visual"><span className="knowledge-node k1"/><span className="knowledge-node k2"/><span className="knowledge-node k3"/><span className="knowledge-line kl1"/><span className="knowledge-line kl2"/><div><BrandMark/><small>KNOWLEDGE NETWORK</small></div></div>
      <div className="training-copy"><p className="index">04 / CAPACITACIÓN</p><h2>{content.training.title}</h2><p>{content.training.description}</p><div className="course-tags">{content.training.categories.map(category => <span key={category}>{category}</span>)}</div>{publishedCourses.length > 0 && <div className="course-list">{publishedCourses.map(course => <div key={course.id}><small>{course.category}</small><strong>{course.title}</strong><span>{course.status === 'available' ? 'Disponible' : 'Próximamente'}</span></div>)}</div>}<a className="text-link" href="#contacto">Solicitar información <span>↗</span></a></div>
    </section>

    {featuredCertifications.length > 0 && <section className="certifications-preview section-pad" id="certificaciones"><div className="section-heading"><p className="index">05 / CERTIFICACIONES</p><h2>Conocimiento certificado para proyectos de alta exigencia.</h2><p>Credenciales técnicas del equipo Valennet en infraestructura, seguridad, virtualización y cloud.</p></div><div className="certification-preview-grid">{featuredCertifications.map(certification=><article key={certification.id}><div className="cert-badge" data-issuer={certification.issuer}><i>{certification.issuer.slice(0,2).toUpperCase()}</i><b>CERTIFIED</b><em>{certification.category.slice(0,2).toUpperCase()}</em></div><div><small>{certification.issuer.toUpperCase()}</small><h3>{certification.title}</h3><span>{certification.category}{certification.year?` · ${certification.year}`:''}</span></div></article>)}</div><a className="text-link" href="/certificaciones">Ver las {content.certifications.filter(certification=>certification.visible).length} certificaciones <span>↗</span></a></section>}

    <section className="contact" id="contacto"><div className="contact-intro"><p className="eyebrow"><span/> Iniciemos una conexión</p><h2>{content.contact.title}</h2><p className="contact-note">Cuéntanos qué necesitas resolver. Completa estos datos y un especialista te contactará para entender el siguiente paso.</p><div className="contact-meta"><span>RESPUESTA ORIENTATIVA</span><span>PROYECTOS A MEDIDA</span></div></div><form className="contact-form" onSubmit={submitContact}><p className="form-guide">Cuéntanos lo esencial del proyecto</p><div className="form-grid"><label>Nombre completo *<input required value={contactForm.name} onChange={e=>updateContactForm('name',e.target.value)} placeholder="Tu nombre"/></label><label>Empresa *<input required value={contactForm.company} onChange={e=>updateContactForm('company',e.target.value)} placeholder="Nombre de empresa"/></label><label>Correo corporativo *<input required type="email" value={contactForm.email} onChange={e=>updateContactForm('email',e.target.value)} placeholder="nombre@empresa.com"/></label><label>Teléfono / WhatsApp *<input required value={contactForm.phone} onChange={e=>updateContactForm('phone',e.target.value)} placeholder="+51 ..."/></label></div><label>¿Qué necesitas? *<select required value={contactForm.service} onChange={e=>updateContactForm('service',e.target.value)}><option>Infraestructura TI</option><option>Data Center</option><option>Ciberseguridad</option><option>Seguridad electrónica</option><option>Capacitación</option><option>Otro proyecto</option></select></label><label>Descríbenos brevemente tu proyecto *<textarea required rows={4} value={contactForm.message} onChange={e=>updateContactForm('message',e.target.value)} placeholder="Qué necesitas, dónde se implementará y cuál es el objetivo"/></label><label className="consent"><input required type="checkbox" checked={contactForm.consent} onChange={e=>updateContactForm('consent',e.target.checked)}/><span>Acepto que Valennet Solutions use estos datos para responder mi solicitud.</span></label><button className="button button-primary" type="submit" disabled={contactStatus==='sending'}>{contactStatus==='sending'?'Enviando…':contactStatus==='sent'?'Solicitud recibida ✓':'Enviar solicitud'} <span>↗</span></button>{contactStatus==='sent' && <p className="form-feedback success">Solicitud recibida. Te contactaremos pronto.</p>}{contactStatus==='error' && <p className="form-feedback error">No pudimos guardar la solicitud. Revisa los datos e inténtalo nuevamente.</p>}</form></section>
    <footer><div className="footer-main"><a className="brand" href="#inicio"><BrandMark/><span className="brand-name">valennet<small>solutions</small></span></a><p>Ingeniería e implementación tecnológica para proyectos de alta exigencia.</p></div><div className="footer-links"><div><small>EXPLORAR</small><a href="#soluciones">Soluciones</a><a href="#proyectos">Capacidad</a><a href="#metodologia">Metodología</a></div><div><small>ESPECIALIDAD</small>{services.slice(0,3).map(service=><a href="#soluciones" key={service.title}>{service.title}</a>)}</div><div><small>CONTACTO</small><a href="#contacto">Solicitar asesoría</a>{content.contact.email && <a href={`mailto:${content.contact.email}`}>{content.contact.email}</a>}</div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} VALENNET SOLUTIONS</span><span>INFRAESTRUCTURA · SEGURIDAD · CONTINUIDAD</span></div></footer>
  </main>;
}
