const $ = (id) => document.getElementById(id);
const micBtn = $("micBtn"), micText = $("micText"), input = $("commandInput");
const transcript = $("transcript"), voiceState = $("voiceState"), listeningLabel = $("listeningLabel");
let recognition = null, listening = false;

function speak(text){
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 1.02; u.pitch = 0.9; u.volume = 1;
  voiceState.textContent = "SPEAKING";
  u.onend = () => voiceState.textContent = "READY";
  speechSynthesis.speak(u);
}

function reply(text){
  transcript.textContent = "JARVIS: " + text;
  speak(text);
}

function openUrl(url, name){
  reply("Opening " + name + ".");
  window.open(url, "_blank", "noopener,noreferrer");
}

function handleCommand(raw){
  const q = raw.trim();
  if(!q) return;
  transcript.textContent = "YOU: " + q;
  const s = q.toLowerCase();

  if(s.includes("youtube")) return openUrl("https://www.youtube.com/","YouTube");
  if(s.includes("github")) return openUrl("https://github.com/","GitHub");
  if(s.includes("google")) return openUrl("https://www.google.com/","Google");
  if(s.includes("facebook")) return openUrl("https://www.facebook.com/","Facebook");
  if(s.includes("search")){
    const term = q.replace(/search( for)?/i,"").trim();
    if(term) return openUrl("https://www.google.com/search?q="+encodeURIComponent(term),"Google search");
  }
  if(s.includes("time")) {
    return reply("The current time is " + new Intl.DateTimeFormat(undefined,{hour:"numeric",minute:"2-digit",second:"2-digit"}).format(new Date()) + ".");
  }
  if(s.includes("date") || s.includes("day")) {
    return reply("Today is " + new Intl.DateTimeFormat(undefined,{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(new Date()) + ".");
  }
  if(s.includes("joke")){
    const jokes=[
      "Why did the developer go broke? Because he used up all his cache.",
      "I told my computer I needed a break. Now it keeps sending me vacation ads.",
      "There are only 10 kinds of people: those who understand binary and those who do not."
    ];
    return reply(jokes[Math.floor(Math.random()*jokes.length)]);
  }
  if(s.includes("who are you") || s.includes("what are you")){
    return reply("I am JARVIS, a browser-based personal assistant. I can listen, speak, and control supported web actions.");
  }
  if(s.includes("status")){
    return reply("All core browser systems are operational. Voice interface is ready.");
  }
  if(s.includes("hello") || s.includes("hi") || s.includes("hey")){
    return reply("Hello. I am online and ready to assist.");
  }
  return reply("I heard you say: " + q + ". I can currently handle browser commands, time, date, search, jokes, and voice interaction.");
}

function setupRecognition(){
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SR){
    voiceState.textContent = "NOT SUPPORTED";
    micBtn.disabled = true;
    micText.textContent = "VOICE N/A";
    return;
  }
  recognition = new SR();
  recognition.lang = "en-US";
  recognition.interimResults = true;
  recognition.continuous = false;

  recognition.onstart = () => {
    listening=true; micBtn.classList.add("active"); micText.textContent="LISTENING...";
    listeningLabel.textContent="LISTENING"; voiceState.textContent="LISTENING";
    transcript.textContent="Listening...";
  };
  recognition.onresult = e => {
    let finalText="";
    for(let i=e.resultIndex;i<e.results.length;i++){
      if(e.results[i].isFinal) finalText += e.results[i][0].transcript;
      else transcript.textContent = "YOU: " + e.results[i][0].transcript;
    }
    if(finalText){ input.value=finalText; handleCommand(finalText); }
  };
  recognition.onerror = e => {
    transcript.textContent = "Voice error: " + e.error + ". You can type a command instead.";
  };
  recognition.onend = () => {
    listening=false; micBtn.classList.remove("active"); micText.textContent="ACTIVATE";
    listeningLabel.textContent="STANDBY"; if(voiceState.textContent==="LISTENING") voiceState.textContent="READY";
  };
}
micBtn.addEventListener("click",()=>{ if(!recognition) return; listening ? recognition.stop() : recognition.start(); });
$("stopBtn").addEventListener("click",()=>speechSynthesis.cancel());
$("sendBtn").addEventListener("click",()=>{handleCommand(input.value);input.value="";});
input.addEventListener("keydown",e=>{if(e.key==="Enter"){handleCommand(input.value);input.value="";}});
document.querySelectorAll("[data-command]").forEach(b=>b.addEventListener("click",()=>handleCommand(b.dataset.command)));

function updateClock(){
  const d=new Date();
  $("clock").textContent=d.toLocaleTimeString();
  $("date").textContent=d.toLocaleDateString(undefined,{month:"short",day:"2-digit"});
  const h=d.getHours();
  $("greeting").textContent = h<12 ? "Good morning, sir." : h<18 ? "Good afternoon, sir." : "Good evening, sir.";
}
setupRecognition(); updateClock(); setInterval(updateClock,1000);
