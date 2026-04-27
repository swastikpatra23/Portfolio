/* ============ Project data ============ */
document.documentElement.classList.remove("no-js");

const projects = [
  { slug:"chai-sutta-bar", number:"01", title:"Chai Sutta Bar", category:"UI/UX", type:"ui",
    cover:"chai-sutta-bar-cover.jpg", role:"Product Design, UI",
    externalUrl:"chai-sutta-bar.pdf",
    summary:"A warm, conversion-minded food and beverage interface shaped around fast browsing, clear ordering paths, and a street-cafe visual energy.",
    challenge:"Bring the casual Chai Sutta Bar experience into a digital flow without losing the brand's quick, approachable character.",
    approach:"Built the interface around strong product hierarchy, high-contrast food imagery, direct calls to action, and simple navigation for repeat users.",
    outcome:"A focused UI concept that presents the brand with more polish while keeping the ordering journey immediate and familiar.",
    tools:["Figma"] },
  { slug:"aternos", number:"02", title:"Aternos", category:"UI/UX", type:"ui",
    cover:"aternos-cover.jpg", role:"Visual Design, Web",
    externalUrl:"aternos.pdf",
    summary:"A gaming-service web redesign concept focused on clarity, stronger visual rhythm, and a more confident product experience.",
    challenge:"Rework a utility-heavy server experience into an interface that feels easier to scan while still serving technical users.",
    approach:"Used modular sections, crisp spacing, and clearer visual emphasis to separate server actions, status, and supporting information.",
    outcome:"A cleaner web concept that makes server management feel more structured, modern, and approachable.",
    tools:["Figma"] },
  { slug:"shree-krishna", number:"04", title:"Shree Krishna", category:"Poster", type:"poster",
    cover:"poster-shree-krishna.png", role:"Graphic Design",
    summary:"A devotional poster study using dramatic contrast, symbolic composition, and a reverent cinematic mood.",
    challenge:"Create a spiritual visual that feels expressive and contemporary without losing the calm weight of the subject.",
    approach:"Balanced central focus, layered atmosphere, and restrained typography to keep attention on the figure and emotion.",
    outcome:"A rich poster composition designed for immediate visual impact and contemplative tone.",
    tools:["Photoshop"] },
  { slug:"mehdi-hassan", number:"05", title:"Mehdi Hassan", category:"Poster", type:"poster",
    cover:"poster-mehdi-hassan.png", role:"Graphic Design",
    summary:"A tribute poster built around expressive portrait treatment, heritage cues, and a quiet performance-like atmosphere.",
    challenge:"Represent a legendary musical presence with dignity while making the poster feel collectible and modern.",
    approach:"Used portrait-led hierarchy, warm tonal contrast, and minimal supporting type to create an intimate visual tribute.",
    outcome:"A refined poster that centers the artist's presence and lets the composition breathe.",
    tools:["Photoshop"] },
  { slug:"irfan-khan", number:"06", title:"Irfan Khan", category:"Poster", type:"poster",
    cover:"poster-irfan-khan.png", role:"Graphic Design",
    summary:"A cinematic tribute poster with a restrained palette, expressive face work, and a quiet dramatic presence.",
    challenge:"Capture the actor's understated intensity without overloading the composition with effects.",
    approach:"Kept the layout portrait-first, then used contrast, grain, and tight type placement to create a film-poster mood.",
    outcome:"A focused tribute visual that feels emotional, minimal, and screen-ready.",
    tools:["Photoshop"] },
  { slug:"poster-4", number:"07", title:"Dhurandhar", category:"Poster", type:"poster",
    cover:"poster-4.png", role:"Art Direction",
    summary:"A bold entertainment poster exploration using tension, scale, and graphic contrast to create a punchy first read.",
    challenge:"Make a title-led poster feel intense and memorable while preserving enough negative space for the artwork to breathe.",
    approach:"Combined aggressive hierarchy, strong subject placement, and controlled texture to create a dramatic visual system.",
    outcome:"A high-energy poster direction suited for promotional and social-first presentation.",
    tools:["Photoshop"] },
  { slug:"poster-5", number:"08", title:"Chai", category:"Poster", type:"poster",
    cover:"poster-5.png", role:"Graphic Design",
    summary:"A culture-inspired poster celebrating chai through warm detail, simple messaging, and tactile visual treatment.",
    challenge:"Turn an everyday ritual into a designed moment that feels familiar, warm, and visually memorable.",
    approach:"Used direct composition, soft texture, and simple type hierarchy to keep the idea instantly readable.",
    outcome:"A warm poster concept that works as a standalone visual or part of a broader cafe-style campaign.",
    tools:["Photoshop"] },
];

const projectUrl = slug => `project.html?project=${encodeURIComponent(slug)}`;

function unique(values){
  return [...new Set(values.filter(Boolean))];
}

function extensionVariants(fileName){
  const dot = fileName.lastIndexOf(".");
  if(dot === -1) return [fileName];

  const stem = fileName.slice(0, dot);
  const ext = fileName.slice(dot + 1);
  return unique([
    fileName,
    `${stem}.${ext.toLowerCase()}`,
    `${stem}.${ext.toUpperCase()}`,
  ]);
}

function assetPathCandidates(src){
  if(!src || /^(https?:|data:|blob:)/i.test(src)) return [];

  const clean = src.split("#")[0].split("?")[0].replace(/^\.\//, "");
  const slash = clean.lastIndexOf("/");
  const dir = slash === -1 ? "" : clean.slice(0, slash);
  const fileName = slash === -1 ? clean : clean.slice(slash + 1);

  const folders = unique([
    dir,
    dir.toLowerCase(),
    dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase(),
    "assets",
    "Assets",
    "images",
    "Images",
    "projects",
    "Projects",
    "",
  ]);

  const fileNames = unique([
    ...extensionVariants(fileName),
    ...extensionVariants(fileName.replace(/-/g, " ")),
    ...extensionVariants(fileName.replace(/-/g, "_")),
    ...extensionVariants(fileName.replace(/_/g, "-")),
  ]);

  return folders.flatMap(folder => fileNames.map(file => folder ? `${folder}/${file}` : file));
}

function tryNextImage(img){
  const candidates = JSON.parse(img.dataset.fallbacks || "[]");
  const index = Number(img.dataset.fallbackIndex || 0);

  if(index >= candidates.length){
    img.classList.add("is-missing");
    return;
  }

  img.dataset.fallbackIndex = String(index + 1);
  img.src = candidates[index];
}

function enableImageFallbacks(root = document){
  root.querySelectorAll("img").forEach(img => {
    if(img.dataset.fallbackReady) return;

    const original = img.getAttribute("src");
    const candidates = assetPathCandidates(original).filter(candidate => candidate !== original);
    if(!candidates.length) return;

    img.dataset.fallbackReady = "true";
    img.dataset.fallbackIndex = "0";
    img.dataset.fallbacks = JSON.stringify(candidates);
    img.addEventListener("error", () => tryNextImage(img));

    if(img.complete && img.naturalWidth === 0) tryNextImage(img);
  });
}

/* ============ Year ============ */
document.querySelectorAll("#year").forEach(el => el.textContent = new Date().getFullYear());

/* ============ Loader (index only) ============ */
(function loader(){
  const el = document.getElementById("loader");
  if(!el) return;
  const count = document.getElementById("loader-count");
  const fill = document.getElementById("loader-fill");
  const start = performance.now(), dur = 1600;
  function tick(){
    const t = Math.min(1,(performance.now()-start)/dur);
    const n = Math.floor(t*100);
    count.textContent = String(n).padStart(3,"0");
    fill.style.transform = `scaleX(${n/100})`;
    if(t<1) requestAnimationFrame(tick);
    else setTimeout(()=> el.classList.add("hidden"), 350);
  }
  requestAnimationFrame(tick);
})();

/* ============ Custom cursor ============ */
(function cursor(){
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  if(!dot||!ring) return;
  if(matchMedia("(hover:none)").matches) return;
  const pageZoom = () => parseFloat(getComputedStyle(document.body).zoom) || 1;
  let dx=0,dy=0,rx=0,ry=0;
  addEventListener("mousemove",e=>{
    const zoom = pageZoom();
    dx=e.clientX / zoom;dy=e.clientY / zoom;
    dot.style.transform=`translate(${dx}px,${dy}px) translate(-50%,-50%)`;
  });
  (function loop(){
    rx+=(dx-rx)*.18; ry+=(dy-ry)*.18;
    ring.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();
  document.addEventListener("mouseover",e=>{
    const t = e.target.closest("[data-cursor]");
    document.body.classList.remove("cursor-link","cursor-view");
    if(!t) return;
    const m = t.dataset.cursor;
    if(m==="link") document.body.classList.add("cursor-link");
    if(m==="view") document.body.classList.add("cursor-view");
  });
})();

/* ============ Reveal on scroll ============ */
(function reveal(){
  const els = document.querySelectorAll(".reveal");
  if(!els.length) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("is-visible"); io.unobserve(e.target);} });
  },{threshold:.15});
  els.forEach(el=>io.observe(el));
})();

/* ============ Parallax ============ */
(function parallax(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const els = [...document.querySelectorAll("[data-parallax]")];
  if(!els.length) return;
  const paused = new WeakSet();
  els.forEach(el=>{
    el.addEventListener("pointerenter",()=>paused.add(el));
    el.addEventListener("pointerleave",()=>paused.delete(el));
  });
  let ticking=false;
  function tick(){
    const vh=innerHeight;
    els.forEach(el=>{
      if(paused.has(el)) return;
      const speed=parseFloat(el.dataset.parallax||"0.2");
      const axis=el.dataset.parallaxAxis==="x"?"x":"y";
      const clamp=parseFloat(el.dataset.parallaxClamp||"0");
      const r=el.getBoundingClientRect();
      const center=r.top+r.height/2;
      let off=(center-vh/2)*-speed;
      if(clamp) off=Math.max(-clamp,Math.min(clamp,off));
      el.style.transform = axis==="x" ? `translate3d(${off.toFixed(2)}px,0,0)` : `translate3d(0,${off.toFixed(2)}px,0)`;
    });
    ticking=false;
  }
  function onScroll(){ if(!ticking){ ticking=true; requestAnimationFrame(tick);} }
  addEventListener("scroll",onScroll,{passive:true});
  addEventListener("resize",onScroll);
  tick();
})();

/* ============ Marquee ============ */
(function marquee(){
  const m = document.getElementById("marquee");
  if(!m) return;
  const words=["UI / UX","GRAPHIC","POSTERS","UI/UX","BRANDING","WEB"];
  const html = words.map(w=>`<span class="word">${w} <span class="star">*</span></span>`).join("");
  m.innerHTML = html+html;
})();

/* ============ Selected works (index) ============ */
(function selectedWorks(){
  const section = document.getElementById("selected");
  const carousel = document.getElementById("selected-carousel");
  const menu = document.getElementById("selected-menu");
  if(!section||!carousel||!menu) return;

  const featured = projects;
  const clonesBefore = featured.slice(-2);
  const clonesAfter = featured.slice(0,2);
  const items = [...clonesBefore, ...featured, ...clonesAfter];

  carousel.innerHTML = items.map((p,i)=>{
    const actualIndex = (i - clonesBefore.length + featured.length) % featured.length;
    return `<a class="selected-item type-${p.type}" href="${projectUrl(p.slug)}" data-index="${actualIndex}" data-position="${i}" data-cursor="view">
      <img src="${p.cover}" alt="${p.title}" loading="lazy">
      <div class="item-overlay"></div>
      <div class="selected-info">
        <h3>${p.title}</h3>
        <div class="meta"><span>${p.category}</span></div>
      </div>
    </a>`;
  }).join("");

  menu.innerHTML = featured.map((p,i)=>`<a href="#${p.slug}" data-index="${i}" data-cursor="view">${p.title}</a>`).join("");

  const itemEls = Array.from(carousel.querySelectorAll(".selected-item"));
  const menuLinks = Array.from(menu.querySelectorAll("a"));
  const offset = clonesBefore.length;
  let activeIndex = 0;

  const setActive = index => {
    activeIndex = index;
    itemEls.forEach(el => el.classList.toggle("active", Number(el.dataset.index) === index));
    menuLinks.forEach(link => link.classList.toggle("active", Number(link.dataset.index) === index));
  };

  const scrollToItem = (item, instant = false) => {
    if(!item) return;
    const top = item.offsetTop + item.offsetHeight / 2 - carousel.clientHeight / 2;
    carousel.scrollTo({ top, behavior: instant ? "auto" : "smooth" });
  };

  const updateActive = () => {
    const center = carousel.scrollTop + carousel.clientHeight / 2;
    let closest = itemEls[0];
    let smallest = Infinity;
    itemEls.forEach(el => {
      const distance = Math.abs(el.offsetTop + el.offsetHeight / 2 - center);
      if(distance < smallest){
        smallest = distance;
        closest = el;
      }
    });
    setActive(Number(closest.dataset.index));
  };

  const recompute = () => {
    const gap = parseFloat(getComputedStyle(carousel).gap) || 0;
    const height = itemEls[0]?.offsetHeight || 0;
    return { gap, height };
  };

  let loopInfo = recompute();

  const handleLoop = () => {
    const { gap, height } = loopInfo;
    const step = height + gap;
    const topLimit = step * (offset - 0.7);
    const bottomLimit = step * (offset + featured.length + 0.7) - carousel.clientHeight;
    if(carousel.scrollTop < topLimit){
      carousel.scrollTop += step * featured.length;
    } else if(carousel.scrollTop > bottomLimit){
      carousel.scrollTop -= step * featured.length;
    }
  };

  const syncOnScroll = () => {
    handleLoop();
    updateActive();
  };

  const onScroll = () => requestAnimationFrame(syncOnScroll);

  menuLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const index = Number(link.dataset.index);
      const target = itemEls.find(el => Number(el.dataset.index) === index && Number(el.dataset.position) >= offset && Number(el.dataset.position) < offset + featured.length);
      scrollToItem(target);
    });
  });

  carousel.addEventListener("scroll", onScroll);
  carousel.addEventListener("pointerup", updateActive);
  carousel.addEventListener("touchend", updateActive);
  window.addEventListener("resize", () => {
    loopInfo = recompute();
    scrollToItem(itemEls[offset], true);
    updateActive();
  });

  setTimeout(() => {
    scrollToItem(itemEls[offset], true);
    setActive(0);
  }, 50);
})();

/* ============ Work archive page ============ */
(function workPage(){
  const list = document.getElementById("work-list");
  const preview = document.getElementById("work-preview");
  if(!list) return;

  list.innerHTML = projects.map((p,i)=>{
    return `<li class="reveal" style="transition-delay:${i*60}ms">
      <a href="${projectUrl(p.slug)}" data-slug="${p.slug}" data-cursor="view">
        <div class="work-row-meta">
          <span class="num">${p.number}</span>
          <h2 class="title">${p.title}</h2>
        </div>
        <span class="cat">${p.category}</span>
      </a>
    </li>`;
  }).join("");

  // Re-observe newly inserted reveal items
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("is-visible"); io.unobserve(e.target);} });
  },{threshold:.15});
  list.querySelectorAll(".reveal").forEach(el=>io.observe(el));

  if(!preview) return;
  // Preview tiles
  preview.innerHTML = `<div class="work-preview-inner">
    <div class="halo"></div>
    ${projects.map(p=>`<div class="work-preview-tile tile-${p.type}" data-slug="${p.slug}"><img src="${p.cover}" alt="" loading="lazy"></div>`).join("")}
  </div>`;

  // Cursor follow (smooth)
  let tx=0,ty=0,cx=0,cy=0,raf=0;
  function tick(){
    cx+=(tx-cx)*.12; cy+=(ty-cy)*.12;
    preview.style.transform=`translate(${cx}px,${cy}px)`;
    raf=requestAnimationFrame(tick);
  }
  raf=requestAnimationFrame(tick);
  addEventListener("mousemove",e=>{ tx=e.clientX; ty=e.clientY; });

  list.querySelectorAll("a").forEach(a=>{
    a.addEventListener("mouseenter",()=>{
      preview.classList.add("visible");
      preview.querySelectorAll(".work-preview-tile").forEach(t=>t.classList.toggle("active", t.dataset.slug===a.dataset.slug));
    });
    a.addEventListener("mouseleave",()=>{
      preview.classList.remove("visible");
      preview.querySelectorAll(".work-preview-tile").forEach(t=>t.classList.remove("active"));
    });
  });
})();

/* ============ Project detail page ============ */
(function projectPage(){
  const root = document.getElementById("project-detail");
  if(!root) return;

  const params = new URLSearchParams(location.search);
  const slug = params.get("project") || projects[0].slug;
  const project = projects.find(p => p.slug === slug) || projects[0];
  const previous = projects[(projects.indexOf(project) - 1 + projects.length) % projects.length];
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  document.title = `${project.title} - Swastik`;
  const description = document.querySelector('meta[name="description"]');
  if(description) description.setAttribute("content", project.summary);

  root.innerHTML = `
    <section class="project-hero">
      <div class="container project-hero-grid">
        <div class="project-kicker reveal">
          <span>${project.number}</span>
          <span>${project.category}</span>
        </div>
        <div class="project-title-block">
          <a href="work.html" class="project-back reveal" data-cursor="link">Back to archive</a>
          <h1 class="text-mega tight project-title">${project.title}</h1>
          <p class="project-summary reveal">${project.summary}</p>
          ${project.externalUrl ? `<div class="project-hero-actions reveal"><a href="${project.externalUrl}" target="_blank" rel="noopener" class="project-pdf-large" data-cursor="link">View PDF</a></div>` : ""}
        </div>
      </div>
    </section>

    <section class="project-cover-section">
      <div class="container">
        <figure class="project-cover reveal type-${project.type}">
          <img src="${project.cover}" alt="${project.title}" />
        </figure>
      </div>
    </section>

    <section class="project-story">
      <div class="container project-story-grid">
        <div class="project-meta reveal">
          <div>
            <div class="micro-label">Role</div>
            <p>${project.role}</p>
          </div>
          <div>
            <div class="micro-label">Tools</div>
            <p>${project.tools.join(" / ")}</p>
          </div>
        </div>
        <div class="project-copy">
          <article class="reveal">
            <div class="eyebrow">Challenge</div>
            <p>${project.challenge}</p>
          </article>
          <article class="reveal">
            <div class="eyebrow">Approach</div>
            <p>${project.approach}</p>
          </article>
          <article class="reveal">
            <div class="eyebrow">Outcome</div>
            <p>${project.outcome}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="project-nav-section">
      <div class="container project-nav-grid">
        <a href="${projectUrl(previous.slug)}" class="project-nav-card reveal" data-cursor="view">
          <span class="micro-label">Previous</span>
          <strong>${previous.title}</strong>
        </a>
        <a href="${projectUrl(next.slug)}" class="project-nav-card reveal" data-cursor="view">
          <span class="micro-label">Next</span>
          <strong>${next.title}</strong>
        </a>
      </div>
    </section>`;

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("is-visible"); io.unobserve(e.target);} });
  },{threshold:.15});
  root.querySelectorAll(".reveal").forEach(el=>io.observe(el));
})();

/* ============ Subtle dotted motion ============ */
(function dottedMotion(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let ticking = false;
  function update(){
    document.body.style.backgroundPosition = `center ${Math.round(scrollY * -0.08)}px`;
    ticking = false;
  }
  addEventListener("scroll",()=>{
    if(!ticking){
      ticking = true;
      requestAnimationFrame(update);
    }
  },{passive:true});
  update();
})();

enableImageFallbacks();
