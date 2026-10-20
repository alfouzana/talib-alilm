import "./style.css";

const btn = document.querySelector("[data-nav-toggle]");
const menu = document.querySelector("[data-nav-menu]");
btn?.addEventListener("click", () => menu?.classList.toggle("hidden"));
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = String(new Date().getFullYear())));

const places = [
  { name: "جمعية تحفيظ القرآن الكريم — فرع حي النرجس", type: "جمعية تحفيظ", region: "الرياض", city: "الرياض", info: "حلقات للرجال والنساء بعد العصر والمغرب" },
  { name: "معهد الإتقان لتعليم القرآن", type: "معهد قرآني", region: "الرياض", city: "الخرج", info: "دورات تجويد وإجازات بالسند" },
  { name: "الجمعية العلمية للدراسات الشرعية", type: "جمعية علمية", region: "مكة المكرمة", city: "جدة", info: "دروس علمية أسبوعية ومحاضرات عامة" },
  { name: "مجمع الهدى العلمي", type: "مجمع", region: "المدينة المنورة", city: "المدينة المنورة", info: "دروس في المتون والفقه للمبتدئين" },
  { name: "معهد النور للقرآن الكريم — النسائي", type: "معهد قرآني", region: "القصيم", city: "بريدة", info: "برامج حفظ مكثفة للطالبات" },
  { name: "جمعية تحفيظ القرآن الكريم — الدمام", type: "جمعية تحفيظ", region: "الشرقية", city: "الدمام", info: "حلقات للأطفال والكبار ومسابقات سنوية" },
  { name: "مجمع الفرقان للعلوم الشرعية", type: "مجمع", region: "مكة المكرمة", city: "الطائف", info: "دورات صيفية مكثفة في العلوم الشرعية" },
  { name: "الجمعية العلمية لعلوم القرآن", type: "جمعية علمية", region: "القصيم", city: "عنيزة", info: "ملتقيات ومحاضرات في التفسير وعلوم القرآن" },
];

const programs = [
  { name: "أكاديمية التأصيل الشرعي", cat: "أكاديمية", level: "مبتدئ — متقدم", info: "مسار متدرج في العقيدة والفقه والحديث بشهادات معتمدة" },
  { name: "برنامج المتون العلمية", cat: "برنامج", level: "مبتدئ", info: "شرح المتون الأساسية مع اختبارات دورية" },
  { name: "مجلس السماع الحي", cat: "مجلس", level: "جميع المستويات", info: "مجالس قراءة مباشرة لكتب الحديث" },
  { name: "المقرأة الإلكترونية", cat: "مقرأة", level: "جميع المستويات", info: "تصحيح التلاوة مع مقرئين مجازين عن بُعد" },
  { name: "أكاديمية العلوم العربية", cat: "أكاديمية", level: "متوسط", info: "النحو والصرف والبلاغة لطلاب العلم الشرعي" },
  { name: "برنامج الفقه الميسّر", cat: "برنامج", level: "مبتدئ", info: "دراسة فقه العبادات بأسلوب مبسّط" },
];

const ads = [
  { time: "بعد الفجر", title: "شرح كتاب التوحيد", where: "حضوري — الرياض", mode: "حضوري" },
  { time: "بعد العصر", title: "حلقة تجويد للمبتدئين", where: "عن بُعد — بث مباشر", mode: "عن بُعد" },
  { time: "بعد المغرب", title: "درس في الأربعين النووية", where: "حضوري — جدة", mode: "حضوري" },
  { time: "بعد العشاء", title: "مجلس سماع صحيح البخاري", where: "عن بُعد — بث مباشر", mode: "عن بُعد" },
];

const state = { region: "", type: "", cat: "", q: "" };
const match = (o) => !state.q || Object.values(o).join(" ").includes(state.q);

function renderPlaces() {
  const list = places.filter((p) => (!state.region || p.region === state.region) && (!state.type || p.type === state.type) && match(p));
  document.getElementById("places").innerHTML = list.length
    ? list.map((p) => `
      <div class="rounded-2xl border border-stone-200 bg-white p-5">
        <span class="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-bold text-brand">${p.type}</span>
        <h3 class="mt-3 font-bold">${p.name}</h3>
        <p class="mt-1 text-sm text-slate-500">📍 ${p.city} — ${p.region}</p>
        <p class="mt-2 text-sm text-slate-600">${p.info}</p>
        <a target="_blank" rel="noopener" href="https://www.google.com/maps/search/${encodeURIComponent(p.city)}" class="mt-3 inline-block text-sm font-bold text-gold">عرض على الخريطة ←</a>
      </div>`).join("")
    : `<p class="text-slate-500">لا توجد نتائج لهذا الاختيار.</p>`;
}

function renderPrograms() {
  const list = programs.filter((p) => (!state.cat || p.cat === state.cat) && match(p));
  document.getElementById("programs").innerHTML = list.length
    ? list.map((p) => `
      <div class="rounded-2xl border border-stone-200 bg-stone-50 p-5">
        <div class="flex items-center justify-between">
          <span class="rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-bold text-brand-dark">${p.cat}</span>
          <span class="text-xs font-bold text-brand">✔ معتمد</span>
        </div>
        <h3 class="mt-3 font-bold">${p.name}</h3>
        <p class="mt-1 text-sm text-slate-500">المستوى: ${p.level}</p>
        <p class="mt-2 text-sm text-slate-600">${p.info}</p>
      </div>`).join("")
    : `<p class="text-slate-500">لا توجد نتائج لهذا الاختيار.</p>`;
}

document.getElementById("ads-list").innerHTML = ads.map((a) => `
  <div class="flex flex-wrap items-center gap-4 p-4">
    <span class="w-24 text-sm font-bold text-gold">${a.time}</span>
    <span class="flex-1 font-bold">${a.title}</span>
    <span class="text-sm text-slate-500">${a.where}</span>
    <span class="rounded-full px-2.5 py-0.5 text-xs font-bold ${a.mode === "حضوري" ? "bg-brand/10 text-brand" : "bg-gold/15 text-brand-dark"}">${a.mode}</span>
  </div>`).join("");

document.querySelectorAll("[data-filter]").forEach((group) => {
  group.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    group.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", "false"));
    b.setAttribute("aria-pressed", "true");
    state[group.dataset.filter] = b.dataset.v;
    renderPlaces();
    renderPrograms();
  });
});

document.getElementById("q").addEventListener("input", (e) => {
  state.q = e.target.value.trim();
  renderPlaces();
  renderPrograms();
});

renderPlaces();
renderPrograms();
