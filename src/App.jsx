import { useState, useEffect } from "react";

const TOOLS = [
  { name: "ChatGPT", cat: "Chatbot AI", desc: "Cel mai popular asistent AI. Generează texte, răspunde la întrebări, scrie cod și multe altele.", price: "Gratuit + Pro $20/lună", url: "https://chat.openai.com", rating: 4.8, tags: ["text","cod","conversație"], color: "#10b981" },
  { name: "Claude", cat: "Chatbot AI", desc: "Asistent AI de la Anthropic. Excelent la analiză, scriere lungă și raționament complex.", price: "Gratuit + Pro $20/lună", url: "https://claude.ai", rating: 4.9, tags: ["text","analiză","cod"], color: "#d97706" },
  { name: "Midjourney", cat: "Generare Imagini", desc: "Creează imagini uimitoare din text. Ideal pentru design, marketing și artă digitală.", price: "De la $10/lună", url: "https://midjourney.com", rating: 4.7, tags: ["imagini","design","artă"], color: "#7c3aed" },
  { name: "Canva AI", cat: "Design", desc: "Design grafic cu funcții AI integrate. Perfect pentru social media, prezentări și marketing.", price: "Gratuit + Pro", url: "https://canva.com", rating: 4.6, tags: ["design","social media"], color: "#0ea5e9" },
  { name: "Notion AI", cat: "Productivitate", desc: "Organizare și scriere cu AI. Rezumă note, generează planuri și automatizează documente.", price: "Gratuit + $10/lună", url: "https://notion.so", rating: 4.5, tags: ["productivitate","note"], color: "#1a1a1a" },
  { name: "ElevenLabs", cat: "Audio & Voce", desc: "Generare voce realistă din text. Ideal pentru podcast-uri, video-uri și conținut audio.", price: "Gratuit + Pro", url: "https://elevenlabs.io", rating: 4.6, tags: ["audio","voce"], color: "#ec4899" },
  { name: "Gemini", cat: "Chatbot AI", desc: "Asistentul AI de la Google. Integrat cu Gmail, Docs și tot ecosistemul Google.", price: "Gratuit + $20/lună", url: "https://gemini.google.com", rating: 4.5, tags: ["text","Google"], color: "#4285f4" },
  { name: "Runway", cat: "Video AI", desc: "Generare și editare video cu AI. Transformă text sau imagini în clipuri video profesionale.", price: "Gratuit limitat + $12/lună", url: "https://runwayml.com", rating: 4.4, tags: ["video","editare"], color: "#06b6d4" },
];

const VIDEOS = [
  { title: "Ce este Inteligența Artificială? Explicat simplu", ytId: "ad79nYk2keg", lang: "RO", cat: "Introducere", desc: "O introducere clară în lumea AI — ce este, cum funcționează și de ce contează." },
  { title: "ChatGPT Tutorial Complet pentru Începători", ytId: "JTxsNm9IdYU", lang: "EN", cat: "Tutorial", desc: "Ghid pas cu pas pentru a folosi ChatGPT eficient — de la creare cont la prompturi avansate." },
  { title: "AI în 100 de Secunde", ytId: "PeMlggyqz0Y", lang: "EN", cat: "Introducere", desc: "Explicație rapidă și captivantă despre ce este inteligența artificială — de la Fireship." },
  { title: "Cum să folosești Midjourney — Ghid Complet", ytId: "xoZG5WQbgMw", lang: "EN", cat: "Imagini AI", desc: "Tutorial complet pentru generarea de imagini cu Midjourney — de la prompts la setări avansate." },
  { title: "10 Instrumente AI Care Îți Schimbă Viața", ytId: "LSKZrtFl47c", lang: "EN", cat: "Instrumente", desc: "Top 10 instrumente AI gratuite care te fac mai productiv în fiecare zi." },
  { title: "Prompt Engineering — Cum Vorbești cu AI", ytId: "1c9iyoVIwDs", lang: "EN", cat: "Tutorial", desc: "Învață tehnicile de prompt engineering pentru a obține rezultate mai bune de la ChatGPT și Claude." },
];

const ARTICLES = [
  { id:"chatgpt-afaceri", title:"Cum să folosești ChatGPT pentru afacerea ta — ghid practic", cat:"Afaceri", time:"8 min", date:"Martie 2026", excerpt:"Descoperă 10 moduri concrete prin care poți folosi ChatGPT pentru a-ți crește vânzările și a genera conținut.", featured:true,
    body:"Inteligența artificială nu mai este doar pentru companiile mari. Cu ChatGPT, orice antreprenor din România poate automatiza sarcini repetitive și crește productivitatea.\n\n**1. Serviciu clienți automat**\nCreează răspunsuri predefinite la cele mai frecvente întrebări. Prompt: \"Ești asistentul firmei mele de [domeniu]. Răspunde politicos la întrebări despre produse.\"\n\n**2. Generare conținut social media**\nCere un calendar de conținut: \"Generează 30 de idei de postări Instagram pentru o cafenea din București, cu hashtag-uri în română.\"\n\n**3. Scriere emailuri profesionale**\nDescrie situația și AI-ul scrie draft-ul: \"Scrie un email politicos către un client care întârzie cu plata de 30 de zile.\"\n\n**4. Analiză competiție**\nDescrie competitorii și cere AI-ului să identifice punctele lor forte/slabe și cum te poți diferenția.\n\n**5. Traduceri și localizare**\nChatGPT traduce și adaptează conținut pentru piețe diferite, păstrând tonul potrivit.\n\n**6. Descrieri de produse**\nOferă specificații tehnice și cere descrieri atractive pentru catalogul tău.\n\n**7. Brainstorming**\nFolosește AI-ul ca partener: \"Dă-mi 20 de idei de servicii noi pe care le pot oferi ca [tipul afacerii].\"\n\n**8. Proceduri interne**\nDescrie un proces și cere o procedură pas cu pas pentru angajați.\n\n**9. Analiza feedback-ului**\nCopiază review-urile și cere AI-ului să identifice teme comune și sugestii de îmbunătățire.\n\n**10. Planuri de marketing**\nDescrie afacerea, bugetul și obiectivele — ChatGPT creează un plan detaliat pe 3 luni.\n\nCheia succesului este să fii cât mai specific. Cu cât oferi mai mult context, cu atât rezultatele sunt mai bune." },
  { id:"instrumente-gratuite", title:"Top 15 instrumente AI gratuite pe care trebuie să le încerci", cat:"Instrumente", time:"6 min", date:"Martie 2026", excerpt:"Cele mai bune unelte AI complet gratuite pentru productivitate, design, scriere și programare.", featured:true,
    body:"Nu trebuie să plătești nimic pentru a beneficia de puterea AI. Iată instrumentele gratuite disponibile în 2026:\n\n**Chatboți și text**\n• ChatGPT (gratuit) — cel mai versatil asistent AI\n• Claude.ai (gratuit) — excelent la texte lungi și analiză\n• Gemini de la Google — integrat cu ecosistemul Google\n• Microsoft Copilot — gratuit în Edge și Bing\n\n**Imagini**\n• Canva (planul gratuit) — design grafic cu funcții AI\n• Leonardo AI — 150 credite gratuite pe zi\n• Pixlr — editare foto online cu funcții AI\n\n**Productivitate**\n• Notion AI (trial) — organizare note cu AI\n• Grammarly (gratuit) — corectare gramaticală\n• Otter.ai — transcriere automată\n\n**Cod**\n• GitHub Copilot (gratuit pentru studenți)\n• Replit AI — cod în browser cu AI\n• Claude Code — programare din terminal\n\n**Audio și video**\n• ElevenLabs (gratuit) — generare voce realistă\n• CapCut — editare video cu subtitrare automată\n\nToate au versiuni gratuite suficient de puternice pentru uz personal." },
  { id:"ai-studenti", title:"AI pentru studenți: cum să înveți mai eficient", cat:"Educație", time:"5 min", date:"Februarie 2026", excerpt:"Tehnici practice pentru a folosi AI-ul ca partener de studiu — rezumate, teste și planificare.",
    body:"AI poate fi cel mai bun partener de studiu dacă știi cum să-l folosești.\n\n**Rezumate inteligente**\nCopiază un capitol și cere: \"Rezumă în 10 puncte cheie, apoi creează 5 întrebări de verificare.\"\n\n**Explicații personalizate**\nNu înțelegi un concept? \"Explică-mi derivatele folosind analogia cu viteza mașinii.\"\n\n**Teste practice**\n\"Generează 20 de întrebări grilă despre [materie] la nivel de examen, cu răspunsuri și explicații.\"\n\n**Planificare studiu**\n\"Am examen la [materie] în 14 zile. Am de învățat [capitolele]. Creează un plan zilnic.\"\n\n**Limbi străine**\n\"Ești profesorul meu de engleză. Corectează greșelile și explică de ce. Vorbește doar în engleză.\" — Tutor 24/7.\n\n**Important:** AI-ul este un instrument de asistență, nu un înlocuitor. Folosește-l pentru a înțelege mai bine, nu pentru a copia." },
  { id:"prompt-engineering", title:"Prompt engineering: cum să scrii prompturi eficiente", cat:"Tutorial", time:"10 min", date:"Februarie 2026", excerpt:"Ghid complet despre cum să formulezi cereri către ChatGPT și Claude pentru rezultate mai bune.",
    body:"Diferența între un rezultat mediocru și unul excelent stă în prompt.\n\n**Regula 1: Fii specific**\nGreșit: \"Scrie un text despre marketing.\"\nCorect: \"Scrie 500 de cuvinte despre marketing pe Instagram pentru o brutărie din Cluj, target mamele de 25-40 ani.\"\n\n**Regula 2: Dă-i un rol**\n\"Ești expert în nutriție cu 20 ani experiență. Creează un plan alimentar de 7 zile pentru 80kg.\"\n\n**Regula 3: Specifică formatul**\n\"Răspunde ca tabel cu coloanele: Instrument, Preț, Avantaje, Dezavantaje.\"\n\n**Regula 4: Dă exemple**\n\"Scrie 5 sloganuri în stilul: 'Dimineața începe cu aromă.' — ton cald și scurt.\"\n\n**Regula 5: Iterează**\n\"Bun, dar fă-l mai scurt\" sau \"Schimbă tonul să fie mai formal.\"\n\n**Regula 6: Pas cu pas**\n\"Gândește pas cu pas: avantajele și dezavantajele mutării de pe SRL pe PFA?\"\n\n**Regula 7: Definește ce NU vrei**\n\"Scrie email profesional, NU folosi clișee, NU depăși 100 cuvinte.\"\n\nFuncționează pentru ChatGPT, Claude, Gemini sau orice chatbot AI." },
  { id:"ai-romania", title:"AI în România: oportunități și realități în 2026", cat:"Analiză", time:"7 min", date:"Ianuarie 2026", excerpt:"Adopția AI în companiile românești, competiții, educație și oportunități de carieră.",
    body:"România se poziționează surprinzător de bine în peisajul global AI.\n\n**Adopția în companii**\nAproximativ 30% din companiile mari folosesc soluții AI — automatizare, analiza datelor, serviciul clienți. Sectoarele fruntașe: IT, banking, telecom, retail.\n\n**Educație și competiții**\nOlimpiada de AI a atras interes uriaș. Politehnica București, UBB Cluj și UAIC Iași au programe de ML. Bootcamp-urile se înmulțesc.\n\n**Startup-uri românești**\nEcosistemul include startup-uri în NLP pentru limba română, AI pentru agricultură, sănătate și fintech.\n\n**Oportunități**\nFreelancerii oferă servicii AI-augmentate la prețuri premium. Angajații care stăpânesc AI devin mai valoroși. Salarii AI/ML: 8.000-20.000 lei net/lună.\n\n**Ce urmează**\nRomânia poate deveni hub regional AI în Europa de Est. Talent tehnic, costuri competitive, piață în creștere — ingredientele sunt aici." },
  { id:"generare-imagini", title:"Cum să creezi imagini cu AI: ghid pentru începători", cat:"Tutorial", time:"6 min", date:"Ianuarie 2026", excerpt:"Pas cu pas, generează imagini profesionale cu Midjourney, DALL-E și alternative gratuite.",
    body:"Poți crea imagini profesionale fără experiență în design.\n\n**Instrumente disponibile**\n• Midjourney — cele mai artistice rezultate, prin Discord ($10/lună)\n• DALL-E (prin ChatGPT) — ușor de folosit, integrat în chat\n• Leonardo AI — alternativă gratuită cu rezultate bune\n• Canva AI — generare imagini în editorul de design\n\n**Formula prompt-ului**\n[Subiect] + [Stil] + [Detalii] + [Atmosferă]\n\nExemplu: \"Cafenea românească în zi ploioasă de toamnă, fotografie, lumină caldă, cozy\"\n\nAvansat: \"Interior cafenea vintage centrul vechi București, mobilier lemn, lumină naturală, ceașcă cafea, fotografie editorială, warm tones\"\n\n**Sfaturi**\n• Specifică stilul: \"fotografie\", \"ilustrație\", \"acuarelă\", \"3D render\"\n• Detalii tehnice: \"8K\", \"cinematographic lighting\"\n• Experimentează cu aspect ratio\n\n**Unde le folosești**\n• Social media și bannere\n• Ilustrații blog și articole\n• Prezentări și marketing\n• Mockup-uri de produse\n\nVerifică termenii de licență ai fiecărui instrument." },
];

const CATS = ["Toate","Afaceri","Tutorial","Instrumente","Educație","Analiză"];

function Tag({children,color}){return <span style={{display:"inline-block",padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,fontFamily:"'Source Sans 3',sans-serif",background:(color||"#10b981")+"12",color:color||"#10b981",letterSpacing:.3,textTransform:"uppercase"}}>{children}</span>}

function Navbar({onNav}){return(
  <nav style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 0",borderBottom:"1px solid #e5e5e0"}}>
    <div style={{display:"flex",alignItems:"baseline",gap:3,cursor:"pointer"}} onClick={()=>onNav("home")}>
      <span style={{fontFamily:"'Newsreader',serif",fontSize:24,fontWeight:500}}>Învață</span>
      <span style={{fontFamily:"'Newsreader',serif",fontSize:24,fontWeight:500,color:"#10b981"}}>AI</span>
      <span style={{fontSize:10,color:"#9ca3af",fontFamily:"'Source Sans 3',sans-serif",marginLeft:6,textTransform:"uppercase",letterSpacing:2}}>.ro</span>
    </div>
    <div style={{display:"flex",gap:28,fontSize:14,fontFamily:"'Source Sans 3',sans-serif",color:"#6b7280"}}>
      <span style={{cursor:"pointer"}} onClick={()=>onNav("home","instrumente")}>Instrumente</span>
      <span style={{cursor:"pointer"}} onClick={()=>onNav("home","articole")}>Articole</span>
      <span style={{cursor:"pointer"}} onClick={()=>onNav("home","video")}>Video</span>
    </div>
  </nav>
)}

function Hero({onNav}){return(
  <section style={{padding:"80px 0 60px",textAlign:"center"}}>
    <div style={{display:"inline-block",padding:"6px 16px",background:"#10b98118",borderRadius:20,fontSize:12,fontWeight:600,color:"#059669",fontFamily:"'Source Sans 3',sans-serif",letterSpacing:1,textTransform:"uppercase",marginBottom:24}}>Primul ghid AI complet în limba română</div>
    <h1 style={{fontFamily:"'Newsreader',serif",fontSize:"clamp(36px,6vw,64px)",fontWeight:400,lineHeight:1.1,maxWidth:700,margin:"0 auto"}}>
      Descoperă puterea <span style={{color:"#10b981",fontStyle:"italic"}}>inteligenței artificiale</span>
    </h1>
    <p style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:18,color:"#6b7280",lineHeight:1.7,maxWidth:520,margin:"24px auto 0"}}>Instrumente, tutoriale, video-uri și ghiduri practice — totul explicat simplu, în limba română.</p>
    <div style={{display:"flex",gap:16,justifyContent:"center",marginTop:36,flexWrap:"wrap"}}>
      <button onClick={()=>onNav("home","instrumente")} style={{padding:"14px 28px",background:"#1a1a1a",color:"#fff",borderRadius:10,fontSize:15,fontWeight:600,fontFamily:"'Source Sans 3',sans-serif",cursor:"pointer",border:"none"}}>Explorează instrumente AI</button>
      <button onClick={()=>onNav("home","video")} style={{padding:"14px 28px",background:"transparent",color:"#1a1a1a",borderRadius:10,fontSize:15,fontWeight:600,fontFamily:"'Source Sans 3',sans-serif",cursor:"pointer",border:"1.5px solid #d4d4cf"}}>Privește video-uri</button>
    </div>
    <div style={{display:"flex",justifyContent:"center",gap:48,marginTop:60,paddingTop:32,borderTop:"1px solid #e5e5e0",flexWrap:"wrap"}}>
      {[{n:"50+",l:"Instrumente recenzate"},{n:"30+",l:"Tutoriale în română"},{n:"6",l:"Video-uri educative"}].map((s,i)=>(
        <div key={i} style={{textAlign:"center"}}>
          <div style={{fontFamily:"'Newsreader',serif",fontSize:32,fontWeight:500,color:"#10b981"}}>{s.n}</div>
          <div style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:13,color:"#9ca3af",marginTop:4}}>{s.l}</div>
        </div>
      ))}
    </div>
  </section>
)}

function ToolCard({t}){return(
  <a href={t.url} target="_blank" rel="noopener noreferrer" style={{padding:24,background:"#fff",borderRadius:14,border:"1px solid #e5e5e0",transition:"box-shadow .25s,transform .25s",cursor:"pointer",display:"flex",flexDirection:"column",gap:12,textDecoration:"none",color:"inherit"}}
    onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 8px 30px rgba(0,0,0,.06)";e.currentTarget.style.transform="translateY(-2px)"}}
    onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <div>
        <div style={{width:40,height:40,borderRadius:10,background:t.color+"15",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:700,fontFamily:"'Newsreader',serif",color:t.color,marginBottom:10}}>{t.name[0]}</div>
        <h3 style={{fontFamily:"'Newsreader',serif",fontSize:20,fontWeight:500,margin:0}}>{t.name}</h3>
        <span style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:12,color:"#9ca3af",textTransform:"uppercase",letterSpacing:1}}>{t.cat}</span>
      </div>
      <span style={{fontFamily:"'Newsreader',serif",fontSize:13,color:"#d97706"}}>{"★".repeat(Math.floor(t.rating))}<span style={{color:"#9ca3af",marginLeft:4,fontSize:12,fontFamily:"'Source Sans 3',sans-serif"}}>{t.rating}</span></span>
    </div>
    <p style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:14,color:"#6b7280",lineHeight:1.6,margin:0,flex:1}}>{t.desc}</p>
    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{t.tags.map((tg,i)=><Tag key={i} color={t.color}>{tg}</Tag>)}</div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:12,borderTop:"1px solid #f0f0eb",marginTop:4}}>
      <span style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:13,color:"#10b981",fontWeight:600}}>{t.price}</span>
      <span style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:12,color:"#9ca3af"}}>Deschide site →</span>
    </div>
  </a>
)}

function ToolsSection(){return(
  <section id="instrumente" style={{padding:"60px 0"}}>
    <span style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:12,textTransform:"uppercase",letterSpacing:2,color:"#10b981",fontWeight:600}}>Director instrumente</span>
    <h2 style={{fontFamily:"'Newsreader',serif",fontSize:36,fontWeight:400,margin:"8px 0 32px"}}>Cele mai bune instrumente AI</h2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:20}}>
      {TOOLS.map((t,i)=><ToolCard key={i} t={t}/>)}
    </div>
  </section>
)}

function VideoSection(){return(
  <section id="video" style={{padding:"60px 0"}}>
    <span style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:12,textTransform:"uppercase",letterSpacing:2,color:"#10b981",fontWeight:600}}>Video educative</span>
    <h2 style={{fontFamily:"'Newsreader',serif",fontSize:36,fontWeight:400,margin:"8px 0 8px"}}>Învață AI prin video</h2>
    <p style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:15,color:"#6b7280",marginBottom:32}}>Video-uri gratuite în română și engleză — de la introduceri rapide la tutoriale complete.</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:20}}>
      {VIDEOS.map((v,i)=>(
        <div key={i} style={{background:"#fff",borderRadius:14,border:"1px solid #e5e5e0",overflow:"hidden"}}>
          <div style={{position:"relative",paddingBottom:"56.25%",height:0}}>
            <iframe src={"https://www.youtube.com/embed/"+v.ytId} title={v.title} frameBorder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowFullScreen
              style={{position:"absolute",top:0,left:0,width:"100%",height:"100%"}}/>
          </div>
          <div style={{padding:"16px 20px"}}>
            <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}>
              <Tag>{v.cat}</Tag>
              <span style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:11,color:v.lang==="RO"?"#059669":"#6b7280",fontWeight:600,padding:"2px 8px",borderRadius:10,background:v.lang==="RO"?"#10b98112":"#f3f4f6"}}>{v.lang==="RO"?"Română":"English"}</span>
            </div>
            <h3 style={{fontFamily:"'Newsreader',serif",fontSize:18,fontWeight:500,margin:"0 0 6px",lineHeight:1.3}}>{v.title}</h3>
            <p style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:13,color:"#9ca3af",lineHeight:1.5,margin:0}}>{v.desc}</p>
          </div>
        </div>
      ))}
    </div>
    <p style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:12,color:"#d4d4cf",marginTop:16,textAlign:"center"}}>Video-urile sunt de pe YouTube și sunt gratuite. Drepturile aparțin creatorilor originali.</p>
  </section>
)}

function ArticlesSection({onOpen}){
  const [f,setF]=useState("Toate");
  const list=f==="Toate"?ARTICLES:ARTICLES.filter(a=>a.cat===f);
  return(
  <section id="articole" style={{padding:"60px 0"}}>
    <span style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:12,textTransform:"uppercase",letterSpacing:2,color:"#10b981",fontWeight:600}}>Blog & tutoriale</span>
    <h2 style={{fontFamily:"'Newsreader',serif",fontSize:36,fontWeight:400,margin:"8px 0 20px"}}>Articole recente</h2>
    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:24}}>
      {CATS.map(c=><button key={c} onClick={()=>setF(c)} style={{padding:"8px 16px",borderRadius:20,border:"1px solid "+(f===c?"#10b981":"#e5e5e0"),background:f===c?"#10b98112":"transparent",color:f===c?"#059669":"#6b7280",fontSize:13,fontWeight:500,fontFamily:"'Source Sans 3',sans-serif",cursor:"pointer"}}>{c}</button>)}
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      {list.map((a,i)=>(
        <div key={i} onClick={()=>onOpen(a.id)} style={{padding:a.featured?32:"20px 24px",background:"#fff",borderRadius:14,border:"1px solid #e5e5e0",cursor:"pointer",transition:"box-shadow .2s"}}
          onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 30px rgba(0,0,0,.06)"}
          onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
          <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:12}}>
            <Tag>{a.cat}</Tag>
            <span style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:12,color:"#9ca3af"}}>{a.time} lectură</span>
            <span style={{fontSize:12,color:"#d4d4cf"}}>•</span>
            <span style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:12,color:"#9ca3af"}}>{a.date}</span>
          </div>
          <h3 style={{fontFamily:"'Newsreader',serif",fontSize:a.featured?24:20,fontWeight:500,lineHeight:1.3,margin:"0 0 8px"}}>{a.title}</h3>
          <p style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:15,color:"#6b7280",lineHeight:1.6,margin:0}}>{a.excerpt}</p>
          <div style={{marginTop:14}}><span style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:14,color:"#10b981",fontWeight:600}}>Citește articolul →</span></div>
        </div>
      ))}
    </div>
  </section>
)}

function ArticlePage({id,onBack}){
  const a=ARTICLES.find(x=>x.id===id);
  if(!a)return null;
  const blocks=a.body.split("\n\n");
  return(
  <article style={{padding:"40px 0 60px"}}>
    <button onClick={onBack} style={{padding:"8px 16px",borderRadius:8,border:"1px solid #e5e5e0",background:"#fff",color:"#6b7280",fontSize:13,fontFamily:"'Source Sans 3',sans-serif",cursor:"pointer",marginBottom:32}}>← Înapoi la articole</button>
    <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:20}}>
      <Tag>{a.cat}</Tag><span style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:13,color:"#9ca3af"}}>{a.time} lectură • {a.date}</span>
    </div>
    <h1 style={{fontFamily:"'Newsreader',serif",fontSize:"clamp(28px,5vw,42px)",fontWeight:400,lineHeight:1.2,margin:"0 0 16px",maxWidth:640}}>{a.title}</h1>
    <p style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:18,color:"#6b7280",lineHeight:1.6,margin:"0 0 40px",maxWidth:640,borderBottom:"1px solid #e5e5e0",paddingBottom:32}}>{a.excerpt}</p>
    <div style={{maxWidth:640}}>
      {blocks.map((b,i)=>{
        if(b.startsWith("**")&&b.indexOf("**",2)>0){
          const h=b.substring(2,b.indexOf("**",2));
          const r=b.substring(b.indexOf("**",2)+2).trim();
          return <div key={i} style={{margin:"28px 0 8px"}}><h3 style={{fontFamily:"'Newsreader',serif",fontSize:20,fontWeight:500,margin:"0 0 6px"}}>{h}</h3>{r&&<p style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:16,color:"#374151",lineHeight:1.8,margin:0}}>{r}</p>}</div>
        }
        if(b.includes("\n•")){
          return <div key={i} style={{margin:"8px 0"}}>{b.split("\n").map((l,j)=>
            l.startsWith("•")?<div key={j} style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:16,color:"#374151",lineHeight:1.8,paddingLeft:4}}>{l}</div>
            :<p key={j} style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:16,color:"#374151",lineHeight:1.8,margin:"0 0 4px",fontWeight:l.startsWith("**")?600:400}}>{l.replace(/\*\*/g,"")}</p>
          )}</div>
        }
        return <p key={i} style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:16,color:"#374151",lineHeight:1.8,margin:"0 0 16px"}}>{b}</p>
      })}
    </div>
    <div style={{marginTop:48,paddingTop:32,borderTop:"1px solid #e5e5e0"}}>
      <button onClick={onBack} style={{padding:"12px 24px",borderRadius:10,border:"1px solid #e5e5e0",background:"#fff",color:"#1a1a1a",fontSize:14,fontWeight:600,fontFamily:"'Source Sans 3',sans-serif",cursor:"pointer"}}>← Toate articolele</button>
    </div>
  </article>
)}

function Footer({onNav}){return(
  <footer style={{padding:"40px 0 32px",borderTop:"1px solid #e5e5e0",marginTop:20}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:32}}>
      <div>
        <div style={{display:"flex",alignItems:"baseline",gap:3,marginBottom:10,cursor:"pointer"}} onClick={()=>onNav("home")}>
          <span style={{fontFamily:"'Newsreader',serif",fontSize:20,fontWeight:500}}>Învață</span>
          <span style={{fontFamily:"'Newsreader',serif",fontSize:20,fontWeight:500,color:"#10b981"}}>AI</span>
        </div>
        <p style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:13,color:"#9ca3af",maxWidth:280,lineHeight:1.6}}>Ghidul tău de inteligență artificială în limba română. Instrumente, tutoriale și resurse gratuite.</p>
      </div>
      <div>
        <h4 style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:11,textTransform:"uppercase",letterSpacing:2,color:"#9ca3af",marginBottom:12}}>Explorează</h4>
        <div style={{display:"flex",flexDirection:"column",gap:8,fontFamily:"'Source Sans 3',sans-serif",fontSize:14,color:"#6b7280"}}>
          <span style={{cursor:"pointer"}} onClick={()=>onNav("home","instrumente")}>Instrumente AI</span>
          <span style={{cursor:"pointer"}} onClick={()=>onNav("home","articole")}>Articole</span>
          <span style={{cursor:"pointer"}} onClick={()=>onNav("home","video")}>Video educative</span>
        </div>
      </div>
    </div>
    <div style={{marginTop:32,paddingTop:20,borderTop:"1px solid #e5e5e0",display:"flex",justifyContent:"space-between",fontFamily:"'Source Sans 3',sans-serif",fontSize:12,color:"#d4d4cf",flexWrap:"wrap",gap:8}}>
      <span>© 2026 ÎnvațăAI.ro — Toate drepturile rezervate</span>
      <span>Făcut cu grijă în România</span>
    </div>
  </footer>
)}

export default function App(){
  const [loaded,setLoaded]=useState(false);
  const [page,setPage]=useState("home");
  const [artId,setArtId]=useState(null);
  useEffect(()=>{
    const l=document.createElement("link");
    l.href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;1,400;1,500&family=Source+Sans+3:wght@300;400;500;600;700&display=swap";
    l.rel="stylesheet";document.head.appendChild(l);
    setTimeout(()=>setLoaded(true),100);
  },[]);
  const nav=(target,sec)=>{setPage("home");setArtId(null);if(sec)setTimeout(()=>document.getElementById(sec)?.scrollIntoView({behavior:"smooth"}),50);else window.scrollTo({top:0,behavior:"smooth"})};
  const openArt=(id)=>{setPage("article");setArtId(id);window.scrollTo({top:0,behavior:"smooth"})};
  return(
    <div style={{minHeight:"100vh",fontFamily:"'Source Sans 3',sans-serif",opacity:loaded?1:0,transition:"opacity .5s"}}>
      <div style={{maxWidth:900,margin:"0 auto",padding:"0 24px"}}>
        <Navbar onNav={nav}/>
        {page==="home"?<><Hero onNav={nav}/><ToolsSection/><VideoSection/><ArticlesSection onOpen={openArt}/></>
        :<ArticlePage id={artId} onBack={()=>nav("home","articole")}/>}
        <Footer onNav={nav}/>
      </div>
    </div>
  );
}
