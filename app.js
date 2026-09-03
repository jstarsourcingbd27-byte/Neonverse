const anime=[
 {title:"Cyber Samurai",genre:"ACTION",year:"2026",img:"https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=800&q=80"},
 {title:"Neon Eclipse",genre:"SCI-FI",year:"2026",img:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"},
 {title:"Moon Guardian",genre:"FANTASY",year:"2025",img:"https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80"},
 {title:"Void Runner",genre:"ADVENTURE",year:"2025",img:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80"},
 {title:"Sky Reborn",genre:"DRAMA",year:"2024",img:"https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80"},
 {title:"Pixel Hearts",genre:"ROMANCE",year:"2024",img:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=80"},
 {title:"Dark Horizon",genre:"MYSTERY",year:"2023",img:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=80"},
 {title:"Star Blade",genre:"ACTION",year:"2023",img:"https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80"}
];
const cards=document.getElementById("cards");
function render(list){
 cards.innerHTML=list.map(a=>`<article class="card"><div class="poster" style="background-image:url('${a.img}')"><span class="tag">${a.genre}</span></div><div class="card-info"><h3>${a.title}</h3><p>${a.year} · 12 Episodes · UHD</p></div></article>`).join("");
}
render(anime);
document.getElementById("search").addEventListener("input",e=>{
 const q=e.target.value.toLowerCase();
 render(anime.filter(a=>(a.title+" "+a.genre).toLowerCase().includes(q)));
});
const scene=document.getElementById("scene");
scene.addEventListener("mousemove",e=>{
 const r=scene.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
 scene.style.transform=`rotateX(${-y*7}deg) rotateY(${x*9}deg)`;
});
scene.addEventListener("mouseleave",()=>scene.style.transform="");
window.addEventListener("load",()=>setTimeout(()=>document.getElementById("loader").style.opacity="0",300));
setTimeout(()=>document.getElementById("loader").remove(),1100);
