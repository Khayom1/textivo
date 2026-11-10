/*! Textivo Typography Studio | Author: Khayom Abdurahmonov | https://github.com/Khayom1/textivo */
(() => {
"use strict";
const $ = id => document.getElementById(id);
const editor = $("editor");
const animationScreen = $("animationScreen");
let savedRange = null, undoStack = [], redoStack = [], animationToken = 0;
window.TEXTIVO_BUILD = "v14";

const dict = {
en: {
 workspaceTitle:"Text workspace",writeLabel:"Add your lines in order",addLine:"＋ Add line",transparentBgLabel:"No background (transparent)",
 lineHint:"Each line is typed, erased, then the next line starts.",
 selectHint:"Select a word or letter, then apply styles only to that selection.",
 selectionTitle:"Selection styling",fontLabel:"Font family",sizeLabel:"Font size (px)",
 colorLabel:"Text color",highlightLabel:"Highlight color",spacingLabel:"Letter spacing (px)",
 wordSpacingLabel:"Word spacing (px)",weightLabel:"Font weight",alignLabel:"Alignment",
 applyStyle:"Apply to selection",clearStyle:"Clear style",selectAll:"Select all",
 selectionHelp:"On mobile, touch and hold a word or letter to select it.",
 canvasTitle:"Canvas & background",bgLabel:"Preview background",defaultColorLabel:"Default text color",
 shadowLabel:"Text shadow",previewTitle:"Live design preview",previewHint:"Your formatted text appears here.",
 animationTitle:"Text animation engine",typingLabel:"Typing speed — milliseconds per character",
 wordPauseLabel:"Pause after each word (ms)",deletingLabel:"Deleting speed — milliseconds per character",
 deletePauseLabel:"Pause before deleting (ms)",linePauseLabel:"Pause between lines (ms)",
 modeLabel:"Animation mode",exportTitle:"Export & projects",exportHint:"Projects are saved locally on this device.",
 authorLabel:"Created by",saveBtn:"Save project",playBtn:"▶ Play animation",stopBtn:"■ Stop",
 copyBtn:"Copy text",htmlBtn:"Export HTML",svgBtn:"Export SVG",pngBtn:"Export PNG",
 writeLabel:'Write each line in its own box',
 addLine:'＋ Add a new line',
 selectHint:'Select a word or letter, then apply styles only to that selection.',
 highlightLabel:'Text background (highlight)',
 applyStyle:'Apply to selected text',
 selectionHelp:'Your changes affect only the selected characters.',
 bgLabel:'Canvas background (all text)',
 transparentBgLabel:'No background — transparent canvas',
 defaultColorLabel:'Default text color (unformatted text)',
 selectGuideTitle:'Style any word or letter',
 selectGuide1:'Touch and hold a word or letter in the text above.',
 selectGuide2:'Drag the handles to select exactly what you want.',
 selectGuide3:'Choose font, size and colors below.',
 selectGuide4:'Tap “Apply to selected text”.',
 transparentHighlightLabel:'No background for selected text',
 workspaceTag:'STEP 1 · WRITE',
 selectionTag:'STEP 2 · STYLE',
 previewTag:'LIVE PREVIEW', ready:"Ready",playing:"Playing line",finished:"Animation finished",
 motionIntro:"Choose what moves, how it enters and exits, and how fast each part appears.", animateByLabel:"Animate by",entranceLabel:"Entrance effect",exitLabel:"Exit effect",unitDurationLabel:"Movement duration (ms)",unitDelayLabel:"Delay between parts (ms)",animateLine:"Whole line",animateWord:"Word by word",animateCharacter:"Character by character",effectFadeIn:"Fade in",effectRise:"Rise up",effectSlideLeft:"Slide from left",effectZoomIn:"Zoom in",effectBlurIn:"Blur in",effectPop:"Pop",effectNone:"No effect",effectFadeOut:"Fade out",effectDrop:"Drop down",effectSlideRight:"Slide right",effectZoomOut:"Zoom out",effectBlurOut:"Blur out"
},
ru: {
 workspaceTitle:"Рабочая область",writeLabel:"Добавляйте строки по порядку",addLine:"＋ Добавить строку",transparentBgLabel:"Без фона (прозрачный)",
 lineHint:"Каждая строка печатается, полностью стирается, затем начинается следующая.",
 selectHint:"Выделите слово или букву, чтобы изменить только эту часть.",
 selectionTitle:"Форматирование выделения",fontLabel:"Шрифт",sizeLabel:"Размер шрифта (px)",
 colorLabel:"Цвет текста",highlightLabel:"Цвет выделения",spacingLabel:"Интервал между буквами (px)",
 wordSpacingLabel:"Интервал между словами (px)",weightLabel:"Насыщенность",alignLabel:"Выравнивание",
 applyStyle:"Применить к выделению",clearStyle:"Сбросить стиль",selectAll:"Выделить всё",
 selectionHelp:"На телефоне нажмите и удерживайте слово или букву.",
 canvasTitle:"Холст и фон",bgLabel:"Фон предпросмотра",defaultColorLabel:"Основной цвет текста",
 shadowLabel:"Тень текста",previewTitle:"Предпросмотр",previewHint:"Здесь показан оформленный текст.",
 animationTitle:"Анимация текста",typingLabel:"Скорость печати — мс на символ",
 wordPauseLabel:"Пауза после слова (мс)",deletingLabel:"Скорость удаления — мс на символ",
 deletePauseLabel:"Пауза перед удалением (мс)",linePauseLabel:"Пауза между строками (мс)",
 modeLabel:"Режим анимации",exportTitle:"Экспорт и проекты",exportHint:"Проекты сохраняются на устройстве.",
 authorLabel:"Автор",saveBtn:"Сохранить проект",playBtn:"▶ Запустить",stopBtn:"■ Остановить",
 copyBtn:"Копировать текст",htmlBtn:"Экспорт HTML",svgBtn:"Экспорт SVG",pngBtn:"Экспорт PNG",
 writeLabel:'Введите каждую строку в отдельном поле',
 addLine:'＋ Добавить новую строку',
 highlightLabel:'Фон текста (подсветка)',
 applyStyle:'Применить к выделенному тексту',
 selectionHelp:'Изменения применяются только к выделенным символам.',
 bgLabel:'Фон холста (для всего текста)',
 transparentBgLabel:'Без фона — прозрачный холст',
 defaultColorLabel:'Основной цвет текста (без оформления)',
 selectGuideTitle:'Измените стиль любого слова или буквы',
 selectGuide1:'Нажмите и удерживайте слово или букву выше.',
 selectGuide2:'Перетащите маркеры, чтобы уточнить выделение.',
 selectGuide3:'Ниже выберите шрифт, размер и цвета.',
 selectGuide4:'Нажмите «Применить к выделенному тексту».',
 transparentHighlightLabel:'Без фона у выделенного текста',
 workspaceTag:'ШАГ 1 · ТЕКСТ',
 selectionTag:'ШАГ 2 · СТИЛЬ',
 previewTag:'ПРЕДПРОСМОТР', ready:"Готово",playing:"Воспроизводится строка",finished:"Анимация завершена",
 motionIntro:"Выберите, что анимировать, как элементы появляются и исчезают, и задайте скорость.", animateByLabel:"Анимировать по",entranceLabel:"Эффект появления",exitLabel:"Эффект исчезновения",unitDurationLabel:"Длительность движения (мс)",unitDelayLabel:"Пауза между элементами (мс)",animateLine:"Целая строка",animateWord:"По словам",animateCharacter:"По буквам",effectFadeIn:"Плавное появление",effectRise:"Снизу вверх",effectSlideLeft:"Слева",effectZoomIn:"Увеличение",effectBlurIn:"Появление с размытием",effectPop:"Пружина",effectNone:"Без эффекта",effectFadeOut:"Плавное исчезновение",effectDrop:"Падение вниз",effectSlideRight:"Вправо",effectZoomOut:"Уменьшение",effectBlurOut:"Исчезновение с размытием"
},
tg: {
 workspaceTitle:"Муҳаррири матн",writeLabel:"Сатрҳоро бо тартиб илова кун",addLine:"＋ Иловаи сатр",transparentBgLabel:"Бе фон (шаффоф)",
 lineHint:"Ҳар сатр аввал навишта, пурра пок мешавад, баъд сатри навбатӣ оғоз меёбад.",
 selectHint:"Калима ё ҳарфро интихоб кун, то танҳо ҳамон қисм тағйир ёбад.",
 selectionTitle:"Танзими қисми интихобшуда",fontLabel:"Навъи шрифт",sizeLabel:"Андозаи шрифт (px)",
 colorLabel:"Ранги матн",highlightLabel:"Ранги заминаи матн",spacingLabel:"Фосилаи ҳарфҳо (px)",
 wordSpacingLabel:"Фосилаи калимаҳо (px)",weightLabel:"Ғафсии шрифт",alignLabel:"Ҳамворкунӣ",
 applyStyle:"Татбиқ ба қисми интихобшуда",clearStyle:"Пок кардани услуб",selectAll:"Ҳамаро интихоб кун",
 selectionHelp:"Дар телефон калима ё ҳарфро пахш карда нигоҳ дор.",
 canvasTitle:"Саҳна ва фон",bgLabel:"Фони пешнамоиш",defaultColorLabel:"Ранги асосии матн",
 shadowLabel:"Сояи матн",previewTitle:"Пешнамоиши зинда",previewHint:"Матни ороишшуда дар ин ҷо пайдо мешавад.",
 animationTitle:"Аниматсияи матн",typingLabel:"Суръати навиштан — мс барои ҳарф",
 wordPauseLabel:"Таваққуф баъди калима (мс)",deletingLabel:"Суръати поккунӣ — мс барои ҳарф",
 deletePauseLabel:"Таваққуф пеш аз поккунӣ (мс)",linePauseLabel:"Таваққуф байни сатрҳо (мс)",
 modeLabel:"Реҷаи аниматсия",exportTitle:"Экспорт ва лоиҳаҳо",exportHint:"Лоиҳа дар ҳамин дастгоҳ сабт мешавад.",
 authorLabel:"Муаллиф",saveBtn:"Сабти лоиҳа",playBtn:"▶ Оғози аниматсия",stopBtn:"■ Қатъ кардан",
 copyBtn:"Нусхабардории матн",htmlBtn:"Экспорти HTML",svgBtn:"Экспорти SVG",pngBtn:"Экспорти PNG",
 writeLabel:'Ҳар сатрро дар майдони алоҳида навис',
 addLine:'＋ Иловаи сатри нав',
 highlightLabel:'Фони матн (ранги пасзамина)',
 applyStyle:'Татбиқ ба матни интихобшуда',
 selectionHelp:'Тағйирот танҳо ба ҳарфҳо ё калимаҳои интихобшуда татбиқ мешавад.',
 bgLabel:'Фони саҳна (барои тамоми матн)',
 transparentBgLabel:'Бе фон — саҳнаи шаффоф',
 defaultColorLabel:'Ранги асосии матн (бе услуби махсус)',
 selectGuideTitle:'Услуби ҳар калима ё ҳарфро тағйир деҳ',
 selectGuide1:'Калима ё ҳарфи лозимаро дар боло пахш карда нигоҳ дор.',
 selectGuide2:'Дастаҳои интихобро ҳаракат дода, қисми дилхоҳро интихоб кун.',
 selectGuide3:'Дар поён шрифт, андоза ва рангро интихоб кун.',
 selectGuide4:'Тугмаи «Татбиқ ба матни интихобшуда»-ро пахш кун.',
 transparentHighlightLabel:'Барои қисми интихобшуда фон набошад',
 workspaceTag:'ҚАДАМИ 1 · МАТН',
 selectionTag:'ҚАДАМИ 2 · УСЛУБ',
 previewTag:'ПЕШНАМОИШ', ready:"Тайёр",playing:"Сатри навбатӣ иҷро мешавад",finished:"Аниматсия анҷом ёфт",
 motionIntro:"Интихоб кун, ки чӣ ҳаракат кунад, чӣ гуна пайдо ва нопадид шавад ва бо кадом суръат.", animateByLabel:"Аниматсия аз рӯйи",entranceLabel:"Тарзи пайдоиш",exitLabel:"Тарзи нопадидшавӣ",unitDurationLabel:"Давомнокии ҳаракат (мс)",unitDelayLabel:"Таваққуф байни қисмҳо (мс)",animateLine:"Тамоми сатр",animateWord:"Калима ба калима",animateCharacter:"Ҳарф ба ҳарф",effectFadeIn:"Оҳиста пайдо шавад",effectRise:"Аз поён боло",effectSlideLeft:"Аз чап",effectZoomIn:"Калон шавад",effectBlurIn:"Бо хирагӣ пайдо шавад",effectPop:"Ҷаҳиш",effectNone:"Бе эффект",effectFadeOut:"Оҳиста нопадид шавад",effectDrop:"Ба поён фарояд",effectSlideRight:"Ба рост",effectZoomOut:"Хурд шавад",effectBlurOut:"Бо хирагӣ нопадид шавад"
}};
Object.assign(dict.en,{templatesLabel:"Start with a template",applyTemplate:"Use template",templatePlaceholder:"Choose a template…",templateQuote:"Quote card",templateAnnouncement:"Announcement",templateStudy:"Study card",templateCreator:"Creator title",templateMinimal:"Minimal statement",canvasPresetLabel:"Canvas format"});
Object.assign(dict.ru,{templatesLabel:"Начать с шаблона",applyTemplate:"Применить шаблон",templatePlaceholder:"Выберите шаблон…",templateQuote:"Карточка с цитатой",templateAnnouncement:"Объявление",templateStudy:"Учебная карточка",templateCreator:"Заголовок автора",templateMinimal:"Минимализм",canvasPresetLabel:"Формат холста"});
Object.assign(dict.tg,{templatesLabel:"Оғоз аз қолаб",applyTemplate:"Истифодаи қолаб",templatePlaceholder:"Қолабро интихоб кун…",templateQuote:"Корти иқтибос",templateAnnouncement:"Эълон",templateStudy:"Корти омӯзишӣ",templateCreator:"Сарлавҳаи эҷодӣ",templateMinimal:"Тарҳи минималӣ",canvasPresetLabel:"Андозаи саҳна"});
function t(key){return (dict[$("language").value]||dict.en)[key]||dict.en[key]||key}
function translate(lang){
 const d=dict[lang]||dict.en;
 Object.entries(d).forEach(([id,value])=>{const el=$(id);if(el)el.textContent=value});
 const labels={animateBy:[["line","animateLine"],["word","animateWord"],["character","animateCharacter"]],entranceEffect:[["fade","effectFadeIn"],["rise","effectRise"],["slide-left","effectSlideLeft"],["zoom","effectZoomIn"],["blur","effectBlurIn"],["pop","effectPop"],["none","effectNone"]],exitEffect:[["fade","effectFadeOut"],["drop","effectDrop"],["slide-right","effectSlideRight"],["zoom","effectZoomOut"],["blur","effectBlurOut"],["none","effectNone"]]};
 Object.entries(labels).forEach(([id,items])=>items.forEach(([v,k])=>{const o=$(id).querySelector(`option[value="${v}"]`);if(o)o.textContent=d[k]||dict.en[k]}));
 const templateKeys={ "":"templatePlaceholder",quote:"templateQuote",announcement:"templateAnnouncement",study:"templateStudy",creator:"templateCreator",minimal:"templateMinimal" };
 Object.entries(templateKeys).forEach(([value,key])=>{const option=$("templateSelect")?.querySelector(`option[value="${value}"]`);if(option)option.textContent=d[key]||dict.en[key]});
 document.documentElement.lang=lang;
}
$("language").addEventListener("change",e=>translate(e.target.value));

function normalizeLines(){
 // The workspace is a stack of independent, full-width editable line cards.
 const existing=[...editor.children];
 if(!existing.length){
   const row=document.createElement("div");row.className="text-line";row.contentEditable="true";row.spellcheck=false;row.textContent="Create something amazing.";editor.appendChild(row);
 }
 [...editor.children].forEach(row=>{
   row.classList.add("text-line");
   row.setAttribute("contenteditable","true");
   row.setAttribute("spellcheck","false");
 });
}
function sanitizeEditorHTML(input){
 const parser=new DOMParser(),doc=parser.parseFromString(String(input||""),"text/html");
 const tags=new Set(["DIV","SPAN","B","STRONG","I","EM","U","S","BR"]);
 const styles=new Set(["color","background-color","font-family","font-size","font-weight","font-style","text-decoration","text-align","letter-spacing","word-spacing","text-shadow"]);
 const safe=v=>!/(url\s*\(|expression\s*\(|javascript:|@import|[<>])/i.test(v);
 function clean(node){
  if(node.nodeType===Node.TEXT_NODE)return document.createTextNode(node.nodeValue||"");
  if(node.nodeType!==Node.ELEMENT_NODE)return document.createDocumentFragment();
  if(!tags.has(node.tagName)){const f=document.createDocumentFragment();[...node.childNodes].forEach(n=>f.appendChild(clean(n)));return f}
  const out=document.createElement(node.tagName.toLowerCase());if(node.tagName==="DIV")out.className="text-line";
  if(node.hasAttribute("style")){const probe=document.createElement("span");probe.setAttribute("style",node.getAttribute("style"));for(const p of styles){const v=probe.style.getPropertyValue(p).trim();if(v&&safe(v))out.style.setProperty(p,v)}}
  [...node.childNodes].forEach(n=>out.appendChild(clean(n)));return out;
 }
 const root=document.createElement("div");[...doc.body.childNodes].forEach(n=>root.appendChild(clean(n)));return root.innerHTML;
}
normalizeLines();
let lastRememberedHTML=editor.innerHTML;
function remember(){
 const html=editor.innerHTML;if(html===lastRememberedHTML)return;
 undoStack.push(lastRememberedHTML);if(undoStack.length>80)undoStack.shift();
 lastRememberedHTML=html;redoStack=[];
}
const textTemplates={
 quote:{bg:"#171326",color:"#f5efff",align:"center",html:'<div class="text-line" style="font-size:42px;font-weight:700;color:#f5efff;text-align:center">Your words</div><div class="text-line" style="font-size:42px;font-weight:700;color:#b69aff;text-align:center">matter.</div><div class="text-line" style="font-size:16px;color:#c9bfdc;text-align:center">— Make every line count</div>'},
 announcement:{bg:"#101f2a",color:"#ffffff",align:"center",html:'<div class="text-line" style="font-size:18px;font-weight:700;color:#58d7e8;text-align:center">BIG NEWS</div><div class="text-line" style="font-size:48px;font-weight:900;color:#ffffff;text-align:center">Something</div><div class="text-line" style="font-size:48px;font-weight:900;color:#58d7e8;text-align:center">is coming.</div><div class="text-line" style="font-size:17px;color:#d0e3e8;text-align:center">Stay tuned for the reveal</div>'},
 study:{bg:"#14251f",color:"#f1fff5",align:"left",html:'<div class="text-line" style="font-size:16px;font-weight:700;color:#8be0ac">STUDY NOTE</div><div class="text-line" style="font-size:38px;font-weight:900;color:#ffffff">KEY CONCEPT</div><div class="text-line" style="font-size:20px;color:#d5f4df">Write a clear definition or explanation here.</div><div class="text-line" style="font-size:15px;color:#8be0ac">Remember · Review · Apply</div>'},
 creator:{bg:"#21152a",color:"#ffffff",align:"center",html:'<div class="text-line" style="font-size:16px;font-weight:700;color:#f3a8ff">CREATE / EXPLORE / SHARE</div><div class="text-line" style="font-size:46px;font-weight:900;color:#ffffff">MAKE IT</div><div class="text-line" style="font-size:46px;font-weight:900;color:#d6a5ff">HAPPEN.</div><div class="text-line" style="font-size:16px;color:#e5d8ed">Your next idea starts here</div>'},
 minimal:{bg:"#f2f0eb",color:"#171717",align:"left",html:'<div class="text-line" style="font-size:17px;color:#777777">A SIMPLE REMINDER</div><div class="text-line" style="font-size:52px;font-weight:900;color:#171717">Less noise.</div><div class="text-line" style="font-size:52px;font-weight:900;color:#7653d6">More meaning.</div>'}
};
$("applyTemplate").addEventListener("click",()=>{
 const template=textTemplates[$("templateSelect").value];
 if(!template){alert("Choose a template first.");return}
 editor.innerHTML=template.html;$("canvasBg").value=template.bg;$("defaultColor").value=template.color;$("align").value=template.align;
 normalizeLines();remember();updatePreview();$("animationScreen").style.background=template.bg;
});
function hasTransparentBackground(){return $("transparentBg").checked}
function updatePreview(){
 $("previewText").innerHTML=sanitizeEditorHTML(editor.innerHTML);
 [...$("previewText").children].forEach(row=>row.removeAttribute("contenteditable"));
 $("preview").style.background=hasTransparentBackground()?"transparent":$("canvasBg").value;
 const ratio=($("canvasPreset")?.value||"16:9").split(":").map(Number);
 if(ratio.length===2&&ratio.every(Number.isFinite))$("preview").style.aspectRatio=ratio.join(" / ");
 $("previewText").style.textAlign=$("align").value;
 $("previewText").style.textShadow=$("shadow").value;
 $("previewText").style.color=$("defaultColor").value;
 $("previewText").style.fontFamily=$("font").value||"Arial";
 $("previewText").style.fontSize=(Math.max(6,Math.min(200,Number($("size").value)||32)))+"px";
 $("previewText").style.fontWeight=$("weight").value||"400";
}
function captureSelection(){
 const selection=window.getSelection();
 if(selection && selection.rangeCount && editor.contains(selection.anchorNode))
   savedRange=selection.getRangeAt(0).cloneRange();
}
document.addEventListener("selectionchange",captureSelection);
editor.addEventListener("input",()=>{remember();updatePreview()});
["canvasPreset","canvasBg","defaultColor","align","shadow","font","size","weight"].forEach(id=>{
 const control=$(id);if(!control)return;
 control.addEventListener(control.tagName==="SELECT"?"change":"input",updatePreview);
});
editor.addEventListener("paste",event=>{
 event.preventDefault();
 const text=(event.clipboardData||window.clipboardData)?.getData("text/plain")||"";
 if(!text)return;
 const selection=window.getSelection();
 if(selection&&selection.rangeCount&&editor.contains(selection.anchorNode)){
  const range=selection.getRangeAt(0);range.deleteContents();
  const node=document.createTextNode(text);range.insertNode(node);
  range.setStartAfter(node);range.collapse(true);selection.removeAllRanges();selection.addRange(range);
  savedRange=range.cloneRange();
  editor.dispatchEvent(new Event("input",{bubbles:true}));
 }else document.execCommand("insertText",false,text);
});


function restoreSelection(){
 if(!savedRange)return false;
 const selection=window.getSelection();
 try{if(!editor.contains(savedRange.commonAncestorContainer))return false;selection.removeAllRanges();selection.addRange(savedRange);return editor.contains(selection.anchorNode)}
 catch{return false}
}
function applyStyle(styles){
 if(!restoreSelection()||window.getSelection().isCollapsed){alert("Select a word or letter in the text editor first.");return}
 const selection=window.getSelection(),range=selection.getRangeAt(0),span=document.createElement("span");
 Object.assign(span.style,styles);
 try{
   span.appendChild(range.extractContents());range.insertNode(span);
   selection.removeAllRanges();const next=document.createRange();next.selectNodeContents(span);
   selection.addRange(next);savedRange=next.cloneRange();remember();updatePreview();
 }catch(error){console.error(error);alert("Could not apply the style to this selection.")}
}
document.querySelectorAll("[data-cmd]").forEach(button=>{
 button.addEventListener("mousedown",e=>e.preventDefault());
 button.addEventListener("click",()=>{
   if(!restoreSelection()){alert("Select text first.");return}
   document.execCommand(button.dataset.cmd,false,null);remember();updatePreview();
 });
});
$("applyStyle").addEventListener("mousedown",e=>e.preventDefault());
$("applyStyle").addEventListener("click",()=>applyStyle({
 fontFamily:$("font").value,fontSize:Math.max(6,Math.min(200,Number($("size").value)||32))+"px",
 color:$("color").value,backgroundColor:$("transparentHighlight").checked?"transparent":$("highlight").value,
 letterSpacing:$("spacing").value+"px",wordSpacing:$("wordSpacing").value+"px",
 fontWeight:$("weight").value
}));
$("clearStyle").addEventListener("click",()=>{
 if(!restoreSelection()||window.getSelection().isCollapsed){alert("Select text first.");return}
 document.execCommand("removeFormat",false,null);remember();updatePreview();
});
$("selectAll").addEventListener("click",()=>{
 const firstLine=editor.querySelector(".text-line");if(firstLine)firstLine.focus();const range=document.createRange();range.selectNodeContents(editor);
 const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);savedRange=range.cloneRange();
});

function addLine(value="", after=null){
 const row=document.createElement("div");
 row.className="text-line";row.contentEditable="true";row.spellcheck=false;
 if(value)row.textContent=value;else row.innerHTML="<br>";
 if(after && after.parentElement===editor)after.after(row);else editor.appendChild(row);
 row.focus();
 const range=document.createRange();range.selectNodeContents(row);range.collapse(false);
 const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);
 savedRange=range.cloneRange();remember();updatePreview();
 row.scrollIntoView({block:"nearest",behavior:"smooth"});
}
const addLineButton=$("addLine");
if(addLineButton){
 addLineButton.addEventListener("click",event=>{
   event.preventDefault();
   event.stopPropagation();
   addLine("");
 });
}
editor.addEventListener("keydown",event=>{
 if(event.key!=="Enter"||event.shiftKey)return;
 const selection=window.getSelection();
 if(!selection.rangeCount||!editor.contains(selection.anchorNode))return;
 event.preventDefault();
 const range=selection.getRangeAt(0);
 let current=range.startContainer.nodeType===1?range.startContainer:range.startContainer.parentElement;
 while(current&&current.parentElement!==editor)current=current.parentElement;
 if(!current){addLine("");return}
 const next=document.createElement("div");next.className="text-line";next.contentEditable="true";next.spellcheck=false;
 try{const tail=document.createRange();tail.selectNodeContents(current);tail.setStart(range.startContainer,range.startOffset);next.appendChild(tail.extractContents())}catch{}
 current.after(next);
 const nextRange=document.createRange();nextRange.selectNodeContents(next);nextRange.collapse(true);
 selection.removeAllRanges();selection.addRange(nextRange);savedRange=nextRange.cloneRange();
 remember();updatePreview();next.focus();
});

$("undoBtn").addEventListener("click",()=>{
 if(!undoStack.length)return;redoStack.push(editor.innerHTML);editor.innerHTML=undoStack.pop();normalizeLines();lastRememberedHTML=editor.innerHTML;updatePreview();
});
$("redoBtn").addEventListener("click",()=>{
 if(!redoStack.length)return;undoStack.push(editor.innerHTML);editor.innerHTML=redoStack.pop();normalizeLines();lastRememberedHTML=editor.innerHTML;updatePreview();
});
$("resetBtn").addEventListener("click",()=>{
 if(confirm("Reset text?")){editor.innerHTML='<div class="text-line" contenteditable="true" spellcheck="false">Create something amazing.</div>';normalizeLines();undoStack=[];redoStack=[];lastRememberedHTML=editor.innerHTML;updatePreview()}
});

$("saveBtn").addEventListener("click",()=>{
 const ids=["font","size","color","highlight","transparentHighlight","spacing","wordSpacing","weight","align","shadow","linePause","deletePause","loopMode","animateBy","entranceEffect","exitEffect","unitDuration","unitDelay","canvasPreset"],settings={};
 ids.forEach(id=>{const el=$(id);if(el)settings[id]=el.type==="checkbox"?el.checked:el.value});
 const project={format:"textivo-project",schemaVersion:2,app:"Textivo",author:"Khayom Abdurahmonov",savedAt:new Date().toISOString(),html:sanitizeEditorHTML(editor.innerHTML),lang:$("language").value,bg:$("canvasBg").value,transparentBg:hasTransparentBackground(),defaultColor:$("defaultColor").value,align:$("align").value,settings};
 try{const data=JSON.stringify(project);if(data.length>2000000)throw new Error("Project exceeds the 2 MB local-storage limit.");localStorage.setItem("textivo-project-v13",data);localStorage.setItem("textivo-project-v9",data);$("saveBtn").textContent="Saved ✓";setTimeout(()=>$("saveBtn").textContent=t("saveBtn"),1600)}
 catch(error){alert("Could not save project: "+error.message)}
});
function download(name,data,type){
 const url=URL.createObjectURL(new Blob([data],{type})),a=document.createElement("a");
 a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1200);
}
$("copyBtn").addEventListener("click",async()=>{
 try{await navigator.clipboard.writeText(editor.innerText);alert("Copied.")}
 catch{alert("Clipboard access is not available. Select and copy the text manually.")}
});
$("htmlBtn").addEventListener("click",()=>download("textivo.html",
 `<!doctype html><html lang="${$("language").value}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Textivo Export</title><style>body{margin:0;padding:32px;background:${hasTransparentBackground()?"transparent":$("canvasBg").value};color:${$("defaultColor").value};font-family:Arial,sans-serif}.text-line{white-space:pre-wrap;overflow-wrap:anywhere;text-align:${$("align").value}}</style></head><body><main>${sanitizeEditorHTML(editor.innerHTML)}</main><footer>Created with Textivo · Khayom Abdurahmonov</footer></body></html>`,"text/html"));

/* TEXTIVO_SVG_EXPORT_V12 — native vector + SMIL animation */
function svgEscape(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"
  }[ch]));
}
function svgNum(value, fallback=0) {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : fallback;
}
function svgAttr(name, value) {
  return `${name}="${svgEscape(value)}"`;
}
function svgColor(value, fallback="none") {
  if (!value || value === "transparent" || value === "rgba(0, 0, 0, 0)") return fallback;
  return value;
}
function svgStyleAttributes(element, inherited) {
  const cs = getComputedStyle(element);
  const attrs = {
    "font-family": cs.fontFamily || inherited.fontFamily,
    "font-size": cs.fontSize || inherited.fontSize,
    "font-weight": cs.fontWeight || inherited.fontWeight,
    "font-style": cs.fontStyle || inherited.fontStyle,
    "text-decoration": cs.textDecorationLine && cs.textDecorationLine !== "none" ? cs.textDecorationLine : inherited.textDecoration,
    "letter-spacing": cs.letterSpacing !== "normal" ? cs.letterSpacing : inherited.letterSpacing,
    "word-spacing": cs.wordSpacing !== "normal" ? cs.wordSpacing : inherited.wordSpacing,
    "fill": svgColor(cs.color, inherited.fill),
    "stroke": cs.webkitTextStrokeColor && cs.webkitTextStrokeColor !== "rgba(0, 0, 0, 0)" ? cs.webkitTextStrokeColor : inherited.stroke,
    "stroke-width": cs.webkitTextStrokeWidth && cs.webkitTextStrokeWidth !== "0px" ? cs.webkitTextStrokeWidth : inherited.strokeWidth,
    "paint-order": "stroke fill"
  };
  if (cs.opacity && cs.opacity !== "1") attrs.opacity = cs.opacity;
  return attrs;
}
function svgAttrs(obj) {
  return Object.entries(obj).filter(([,v]) => v != null && v !== "").map(([k,v]) => svgAttr(k,v)).join(" ");
}
function svgTextNodes(row, mode, inherited) {
  const units = [];
  const makeTspan = (text, style, cls) => {
    const safe = svgEscape(text);
    units.push({text, style, cls});
    return `<tspan class="${cls}" ${svgAttrs(style)}>${safe}</tspan>`;
  };
  const walk = (node, parentStyle) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const value = node.nodeValue || "";
      if (!value) return "";
      if (mode === "line") return makeTspan(value, parentStyle, "svg-unit");
      if (mode === "word") {
        return value.match(/\s+|[^\s]+/gu)?.map(part => makeTspan(part, parentStyle, "svg-unit")).join("") || "";
      }
      return Array.from(value).map(ch => makeTspan(ch, parentStyle, "svg-unit")).join("");
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return "";
    const style = svgStyleAttributes(node, parentStyle);
    const children = Array.from(node.childNodes).map(child => walk(child, style)).join("");
    return children;
  };
  const markup = Array.from(row.childNodes).map(node => walk(node, inherited)).join("");
  return {markup, units};
}
function svgAnimationMarkup(targetId, effect, begin, duration, exit=false, repeat="1") {
  if (!effect || effect === "none" || duration <= 0) return "";
  const sec = Math.max(0.001, duration / 1000);
  const timing = `begin="${(begin/1000).toFixed(3)}s" dur="${sec.toFixed(3)}s" fill="freeze" repeatCount="${repeat}"`;
  const fade = exit ? `from="1" to="0"` : `from="0" to="1"`;
  const opacity = `<animate attributeName="opacity" ${fade} ${timing}/>`;
  const transforms = {
    rise: exit ? ["translate(0 0)","translate(0 24)"] : ["translate(0 24)","translate(0 0)"],
    "slide-left": exit ? ["translate(0 0)","translate(-32 0)"] : ["translate(-32 0)","translate(0 0)"],
    "slide-right": exit ? ["translate(0 0)","translate(32 0)"] : ["translate(32 0)","translate(0 0)"],
    drop: ["translate(0 0)","translate(0 28)"],
    zoom: exit ? ["scale(1)","scale(.65)"] : ["scale(.65)","scale(1)"],
    pop: ["scale(.65)","scale(1.08)"]
  };
  const pair = transforms[effect];
  const transform = pair ? `<animateTransform attributeName="transform" type="${effect==="zoom"||effect==="pop"?"scale":"translate"}" ${effect==="zoom"||effect==="pop"?`from="${pair[0].replace("scale(","").replace(")","")}" to="${pair[1].replace("scale(","").replace(")","")}"`:`from="${pair[0].replace("translate(","").replace(")","")}" to="${pair[1].replace("translate(","").replace(")","")}"`} ${timing}/>` : "";
  const blur = effect === "blur" ? `<animate attributeName="opacity" ${fade} ${timing}/>` : "";
  return opacity + transform + blur;
}
function buildTextivoAnimatedSVG() {
  const rows = Array.from(editor.children).filter(row => (row.textContent || "").length);
  if (!rows.length) throw new Error("There is no text to export.");
  const mode = $("loopMode").value;
  const unitMode = $("animateBy").value;
  const entrance = $("entranceEffect").value;
  const exit = $("exitEffect").value;
  const duration = Math.max(0, svgNum($("unitDuration").value, 500));
  const delay = Math.max(0, svgNum($("unitDelay").value, 120));
  const linePause = Math.max(0, svgNum($("linePause").value, 500));
  const deletePause = Math.max(0, svgNum($("deletePause").value, 1500));
  const fontSize = Math.max(6, svgNum($("size").value, 32));
  const rootStyle = {
    "font-family": $("font").value || "Arial",
    "font-size": `${fontSize}px`,
    "font-weight": $("weight").value || "400",
    "text-anchor": $("align").value === "left" ? "start" : $("align").value === "right" ? "end" : "middle",
    "fill": $("defaultColor").value || "#ffffff",
    "letter-spacing": `${svgNum($("spacing").value)}px`,
    "word-spacing": `${svgNum($("wordSpacing").value)}px`
  };
  const textBlocks = [];
  let timeline = 0;
  let longestLineWidth = 0;
  const measureSvg = document.createElementNS("http://www.w3.org/2000/svg","svg");
  measureSvg.setAttribute("xmlns","http://www.w3.org/2000/svg");
  measureSvg.style.cssText = "position:fixed;left:-100000px;top:-100000px;visibility:hidden;overflow:visible";
  document.body.appendChild(measureSvg);
  try {
    rows.forEach((row, lineIndex) => {
      const inherited = {
        fontFamily: rootStyle["font-family"], fontSize: rootStyle["font-size"],
        fontWeight: rootStyle["font-weight"], fontStyle:"normal",
        textDecoration:"none", letterSpacing:rootStyle["letter-spacing"],
        wordSpacing:rootStyle["word-spacing"], fill:rootStyle.fill, stroke:"none", strokeWidth:"0"
      };
      const {markup, units} = svgTextNodes(row, unitMode, inherited);
      const y = (lineIndex + 1) * (fontSize * 1.65);
      const text = document.createElementNS("http://www.w3.org/2000/svg","text");
      text.setAttribute("x","0"); text.setAttribute("y",String(y));
      text.setAttribute("text-anchor",rootStyle["text-anchor"]);
      text.setAttribute("font-family",rootStyle["font-family"]);
      text.setAttribute("font-size",rootStyle["font-size"]);
      text.setAttribute("font-weight",rootStyle["font-weight"]);
      text.setAttribute("fill",rootStyle.fill);
      text.innerHTML = markup;
      measureSvg.appendChild(text);
      const box = text.getBBox();
      longestLineWidth = Math.max(longestLineWidth, box.width);
      const unitCount = unitMode === "line" ? 1 : Math.max(1, units.length);
      const lineStart = timeline;
      const enterStart = lineStart;
      const exitStart = mode === "type" ? -1 : mode === "delete" ? lineStart : lineStart + (Math.max(0,unitCount-1)*delay) + duration + deletePause;
      const targets = unitMode === "line" ? [text] : Array.from(text.querySelectorAll("tspan.svg-unit"));
      targets.forEach((target, unitIndex) => {
        const id = `txv-${lineIndex}-${unitIndex}`;
        target.setAttribute("id",id);
        const unitStart = enterStart + (unitMode === "line" ? 0 : unitIndex*delay);
        let animationMarkup = "";
        if (mode !== "delete" && entrance !== "none") {
          animationMarkup += svgAnimationMarkup(id, entrance, unitStart, duration, false, mode === "loop" ? "indefinite" : "1");
        }
        if (mode !== "type" && exit !== "none") {
          const outStart = exitStart + (unitMode === "line" ? 0 : unitIndex*delay);
          animationMarkup += svgAnimationMarkup(id, exit, outStart, duration, true, mode === "loop" ? "indefinite" : "1");
        }
        if (animationMarkup) target.insertAdjacentHTML("beforeend", animationMarkup);
      });
      textBlocks.push(text);
      const enterSpan = Math.max(0,unitCount-1)*delay + duration;
      timeline += (mode === "type" ? enterSpan : enterSpan + deletePause + Math.max(0,unitCount-1)*delay + duration) + linePause;
    });
    const bbox = rows.length * fontSize * 1.65;
    const width = Math.max(240, Math.ceil(longestLineWidth + fontSize*3), 600);
    const height = Math.max(160, Math.ceil(bbox + fontSize*2));
    const xOffset = width/2;
    const alignment=$("align").value;
    textBlocks.forEach(text=>{
      text.setAttribute("x",alignment==="left"?String(-width/2+40):alignment==="right"?String(width/2-40):"0");
      text.setAttribute("text-anchor",alignment==="left"?"start":alignment==="right"?"end":"middle");
    });
    const background = $("transparentBg").checked ? "" :
      `<rect x="0" y="0" width="${width}" height="${height}" fill="${svgEscape($("canvasBg").value || "#20202b")}"/>`;
    const shadowValue = $("shadow").value || "none";
    const     const shadowNumbers = [...shadowValue.matchAll(/(-?\d+(?:\.\d+)?)(?:px)?/g)].slice(0,3).map(match=>Number(match[1]));
    const shadowColor = shadowValue.match(/#[0-9a-f]{3,8}/i)?.[0] || "#000000";
    const shadowFilter = shadowValue !== "none"
      ? `<filter id="textivo-shadow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur in="SourceAlpha" stdDeviation="${Math.max(0,(shadowNumbers[2]||0)/2)}" result="blur"/><feOffset in="blur" dx="${shadowNumbers[0]||0}" dy="${shadowNumbers[1]||0}" result="offset"/><feFlood flood-color="${svgEscape(shadowColor)}" flood-opacity=".75" result="color"/><feComposite in="color" in2="offset" operator="in" result="shadow"/><feMerge><feMergeNode in="shadow"/><feMergeNode in="SourceGraphic"/></feMerge></filter>` : "";
    const defs = `<defs>${shadowFilter}<style><![CDATA[
      text{dominant-baseline:auto}
      .svg-unit{white-space:pre}
    ]]></style></defs>`;
    const shift = `translate(${xOffset} ${fontSize})`;
    const repeat = mode === "loop" ? "indefinite" : "1";
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" version="1.1">
${defs}
${background}
<g transform="${shift}"${shadowFilter ? ` filter="url(#textivo-shadow)"` : ""}>
${textBlocks.map(text=>text.outerHTML).join("\n")}
</g>
</svg>`;
    return svg;
  } finally {
    measureSvg.remove();
  }
}
function exportTextivoSVG() {
  try {
    const svg = buildTextivoAnimatedSVG();
    download("textivo-animated.svg", svg, "image/svg+xml;charset=utf-8");
  } catch (error) {
    console.error("Textivo SVG export failed:", error);
    alert("SVG export failed: " + (error?.message || String(error)));
  }
}

$("svgBtn").addEventListener("click", exportTextivoSVG); $("pngBtn").addEventListener("click",()=>{
 const canvas=document.createElement("canvas"),ctx=canvas.getContext("2d");
 const dimensions={"16:9":[1600,900],"1:1":[1080,1080],"9:16":[1080,1920],"4:5":[1080,1350]};
 [canvas.width,canvas.height]=dimensions[$("canvasPreset").value]||dimensions["16:9"];
 const scale=Math.min(canvas.width/1600,canvas.height/900),rows=[...editor.children].filter(row=>(row.textContent||"").trim());
 if(!hasTransparentBackground()){ctx.fillStyle=$("canvasBg").value;ctx.fillRect(0,0,canvas.width,canvas.height)}
 const baseSize=(Number($("size").value)||32)*scale;
 const lineHeight=Math.max(baseSize*1.7,(canvas.height-100*scale)/Math.max(rows.length,1));
 const firstY=(canvas.height-(rows.length-1)*lineHeight)/2;
 const alignment=$("align").value;
 function collect(node,inherited){
  if(node.nodeType===Node.TEXT_NODE){
   if(node.nodeValue){
    const cs=getComputedStyle(node.parentElement);
    inherited.push({text:node.nodeValue,style:{fontSize:cs.fontSize,fontFamily:cs.fontFamily,fontWeight:cs.fontWeight,fontStyle:cs.fontStyle,color:cs.color,backgroundColor:cs.backgroundColor,letterSpacing:cs.letterSpacing,wordSpacing:cs.wordSpacing,textDecorationLine:cs.textDecorationLine,textShadow:cs.textShadow}});
   }
   return;
  }
  if(node.nodeType!==Node.ELEMENT_NODE)return;
  [...node.childNodes].forEach(child=>collect(child,inherited));
 }
 rows.forEach((row,index)=>{
  const runs=[];collect(row,runs);
  if(!runs.length)return;
  const prepared=runs.map(run=>{
   const st=run.style,px=Math.max(6,parseFloat(st.fontSize)||baseSize/scale)*scale;
   const font=[st.fontStyle&&st.fontStyle!=="normal"?st.fontStyle:"",st.fontWeight||$("weight").value,px+"px",st.fontFamily||$("font").value].filter(Boolean).join(" ");
   ctx.font=font;
   const letter=parseFloat(st.letterSpacing)||0,word=parseFloat(st.wordSpacing)||0;
   const spaces=(run.text.match(/\s/g)||[]).length;
   const width=ctx.measureText(run.text).width+Math.max(0,run.text.length-1)*letter*scale+spaces*word*scale;
   return {...run,font,width,px,letter,word};
  });
  const total=prepared.reduce((sum,run)=>sum+run.width,0),maxWidth=canvas.width-100*scale;
  const fit=Math.min(1,maxWidth/Math.max(total,1)),rowWidth=total*fit;
  let x=alignment==="left"||alignment==="justify"?50*scale:alignment==="right"?canvas.width-50*scale-rowWidth:(canvas.width-rowWidth)/2;
  const y=firstY+index*lineHeight;
  prepared.forEach(run=>{
   const st=run.style,scaledFont=run.font.replace(/([0-9.]+)px/,(_,n)=>(Number(n)*fit)+"px");
   ctx.font=scaledFont;ctx.textBaseline="middle";ctx.textAlign="left";
   const width=run.width*fit,px=run.px*fit;
   if(st.backgroundColor&&st.backgroundColor!=="rgba(0, 0, 0, 0)"&&st.backgroundColor!=="transparent"){
    ctx.fillStyle=st.backgroundColor;ctx.fillRect(x,y-px*.62,width,px*1.25);
   }
   ctx.fillStyle=st.color||$("defaultColor").value;
   const shadow=st.textShadow||"none";
   const shadowColor=shadow.match(/rgba?\([^)]+\)|#[0-9a-f]{3,8}|\b[a-z]+\b/i)?.[0]||"transparent";
   const shadowNumbers=[...shadow.matchAll(/(-?\d+(?:\.\d+)?)px/g)].map(match=>Number(match[1]));
   ctx.shadowColor=shadowColor;ctx.shadowOffsetX=(shadowNumbers[0]||0)*scale*fit;ctx.shadowOffsetY=(shadowNumbers[1]||0)*scale*fit;ctx.shadowBlur=(shadowNumbers[2]||0)*scale*fit;
   if(run.letter||run.word){
    let cx=x;for(let i=0;i<run.text.length;i++){
     const ch=run.text[i];ctx.fillText(ch,cx,y);cx+=ctx.measureText(ch).width;
     if(i<run.text.length-1)cx+=run.letter*scale*fit;
     if(/\s/.test(ch))cx+=run.word*scale*fit;
    }
   }else ctx.fillText(run.text,x,y);
   const decoration=st.textDecorationLine||st.textDecoration||"";
   if(/underline|line-through/.test(decoration)){
    ctx.fillStyle=st.color||$("defaultColor").value;ctx.fillRect(x,y+(decoration.includes("underline")?px*.42:0),width,Math.max(1,px*.055));
    if(decoration.includes("line-through"))ctx.fillRect(x,y, width,Math.max(1,px*.055));
   }
   ctx.shadowColor="transparent";ctx.shadowBlur=0;ctx.shadowOffsetX=0;ctx.shadowOffsetY=0;
   x+=width;
  });
 });
 const a=document.createElement("a");a.download="textivo.png";a.href=canvas.toDataURL("image/png");a.click();
});

const rangeLabels={linePause:"linePauseValue",deletePause:"deletePauseValue",unitDuration:"unitDurationValue",unitDelay:"unitDelayValue"};
Object.entries(rangeLabels).forEach(([id,label])=>{const c=$(id),o=$(label);const sync=()=>{if(o)o.textContent=c.value+" ms"};c.addEventListener("input",sync);sync()});
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
function getLineElements(){return [...editor.children].filter(row=>row.innerText.trim().length>0)}
function makeCharacterSpans(line){
 const result=[],props=["fontFamily","fontSize","fontWeight","fontStyle","textDecoration","color","backgroundColor","letterSpacing","wordSpacing","textShadow"];
 function visit(node,inherited={}){if(node.nodeType===Node.TEXT_NODE){for(const ch of node.nodeValue){const s=document.createElement("span");s.textContent=ch;props.forEach(p=>{if(inherited[p])s.style[p]=inherited[p]});result.push(s)}return}if(node.nodeType!==Node.ELEMENT_NODE)return;const cs=getComputedStyle(node),next={...inherited};props.forEach(p=>{const v=cs[p];if(v&&v!=="normal"&&v!=="rgba(0, 0, 0, 0)")next[p]=v});node.childNodes.forEach(child=>visit(child,next))}
 line.childNodes.forEach(child=>visit(child,{}));return result;
}
function splitIntoUnits(line,kind){if(kind==="line"){const b=document.createElement("div");b.className="motion-line";b.innerHTML=line.innerHTML;return [b]}const chars=makeCharacterSpans(line);if(kind==="character")return chars;const words=[];let current=null;chars.forEach(ch=>{const space=/^\s+$/.test(ch.textContent);if(space){if(current)current.appendChild(ch);else{current=document.createElement("span");current.appendChild(ch);words.push(current);current=null}}else{if(!current){current=document.createElement("span");words.push(current)}current.appendChild(ch)}});return words.filter(x=>x.textContent.length)}
function inFrames(e){return ({fade:[{opacity:0},{opacity:1}],rise:[{opacity:0,transform:"translateY(28px)"},{opacity:1,transform:"translateY(0)"}],"slide-left":[{opacity:0,transform:"translateX(-35px)"},{opacity:1,transform:"translateX(0)"}],zoom:[{opacity:0,transform:"scale(.55)"},{opacity:1,transform:"scale(1)"}],blur:[{opacity:0,filter:"blur(10px)"},{opacity:1,filter:"blur(0)"}],pop:[{opacity:0,transform:"scale(.65)"},{opacity:1,transform:"scale(1.12)",offset:.72},{opacity:1,transform:"scale(1)"}]})[e]||[{opacity:1},{opacity:1}]}
function outFrames(e){return ({fade:[{opacity:1},{opacity:0}],drop:[{opacity:1,transform:"translateY(0)"},{opacity:0,transform:"translateY(28px)"}],"slide-right":[{opacity:1,transform:"translateX(0)"},{opacity:0,transform:"translateX(35px)"}],zoom:[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(.55)"}],blur:[{opacity:1,filter:"blur(0)"},{opacity:0,filter:"blur(10px)"}]})[e]||[{opacity:1},{opacity:1}]}
function animateElement(el,frames,duration){if(!duration)return Promise.resolve();if(el.animate)return el.animate(frames,{duration,easing:"cubic-bezier(.2,.75,.25,1)",fill:"both"}).finished.catch(()=>{});return sleep(duration)}
function setAnimationBaseStyle(){animationScreen.style.fontFamily=$("font").value;animationScreen.style.fontSize=(Number($("size").value)||32)+"px";animationScreen.style.fontWeight=$("weight").value;animationScreen.style.color=$("defaultColor").value;animationScreen.style.textAlign=$("align").value;animationScreen.style.textShadow=$("shadow").value;animationScreen.style.background=hasTransparentBackground()?"transparent":$("canvasBg").value}
$("stopBtn").addEventListener("click",()=>{animationToken++;$("animationStatus").textContent=t("ready")});
/* TEXTIVO_MOTION_FIX_V11 */
$("playBtn").addEventListener("click", async () => {
  const status = $("animationStatus");
  const button = $("playBtn");
  const token = ++animationToken;
  try {
    const rows = [...editor.children].filter(row => (row.textContent || "").trim().length > 0);
    const mode = $("loopMode").value;
    const kind = $("animateBy").value;
    const enter = $("entranceEffect").value;
    const leave = $("exitEffect").value;
    const duration = Number($("unitDuration").value) || 0;
    const delay = Number($("unitDelay").value) || 0;
    const linePause = Number($("linePause").value) || 0;
    const deletePause = Number($("deletePause").value) || 0;

    if (!rows.length) {
      animationScreen.replaceChildren();
      status.textContent = "No text to animate";
      return;
    }

    setAnimationBaseStyle();
    animationScreen.replaceChildren();
    button.disabled = true;
    status.textContent = "Preparing animation…";
    const wait = ms => new Promise(resolve => setTimeout(resolve, Math.max(0, ms)));

    const run = async () => {
      for (let li = 0; li < rows.length; li++) {
        if (token !== animationToken) return false;
        status.textContent = `${t("playing")} ${li + 1}/${rows.length}`;
        const units = splitIntoUnits(rows[li], kind);
        if (mode !== "type" || li === 0) animationScreen.replaceChildren();
        else animationScreen.appendChild(document.createElement("br"));
        const shown = [];

        if (mode !== "delete") {
          for (let i = 0; i < units.length; i++) {
            if (token !== animationToken) return false;
            const unit = units[i];
            if (kind === "line") {
              unit.style.display = "block";
              unit.style.width = "100%";
              unit.style.whiteSpace = "pre-wrap";
            } else {
              unit.style.display = "inline-block";
              unit.style.whiteSpace = "pre-wrap";
            }
            animationScreen.appendChild(unit);
            shown.push(unit);
            if (enter !== "none" && duration > 0) await animateElement(unit, inFrames(enter), duration);
            if (i < units.length - 1 && delay) await wait(delay);
          }
        } else {
          units.forEach(unit => {
            if (kind !== "line") unit.style.display = "inline-block";
            animationScreen.appendChild(unit);
            shown.push(unit);
          });
        }

        if (mode === "type") {
          if (li < rows.length - 1) await wait(linePause);
          continue;
        }
        if (mode !== "delete" && deletePause) await wait(deletePause);
        for (let i = shown.length - 1; i >= 0; i--) {
          if (token !== animationToken) return false;
          const unit = shown[i];
          if (leave !== "none" && duration > 0) await animateElement(unit, outFrames(leave), duration);
          unit.remove();
          if (i > 0 && delay) await wait(delay);
        }
        if (li < rows.length - 1) await wait(linePause);
      }
      return true;
    };

    let completed;
    do {
      completed = await run();
      if (!completed || mode !== "loop") break;
    } while (token === animationToken);
    if (token === animationToken) status.textContent = t("finished");
  } catch (error) {
    console.error("Textivo animation error:", error);
    status.textContent = "Animation error: " + (error && error.message ? error.message : String(error));
  } finally {
    if (token === animationToken) button.disabled = false;
  }
});

$("stopBtn").addEventListener("click", () => {
  animationToken++;
  $("playBtn").disabled = false;
  $("animationStatus").textContent = t("ready");
});
$("transparentBg").addEventListener("change",()=>{updatePreview();animationScreen.style.background=hasTransparentBackground()?"transparent":$("canvasBg").value});$("canvasBg").addEventListener("input",()=>{if(!hasTransparentBackground())updatePreview()});

let project=null;
try{
 project=JSON.parse(localStorage.getItem("textivo-project-v13")||localStorage.getItem("textivo-project-v9")||localStorage.getItem("textivo-project-v8")||localStorage.getItem("textivo-project-v7")||localStorage.getItem("textivo-project-v5")||"null");
 if(project){
  editor.innerHTML=sanitizeEditorHTML(project.html||editor.innerHTML);
  $("language").value=["en","ru","tg"].includes(project.lang)?project.lang:"en";
  $("canvasBg").value=project.bg||"#20202b";$("transparentBg").checked=!!project.transparentBg;$("defaultColor").value=project.defaultColor||"#ffffff";
  const s=project.settings||{};["font","size","color","highlight","transparentHighlight","spacing","wordSpacing","weight","align","shadow","linePause","deletePause","loopMode","animateBy","entranceEffect","exitEffect","unitDuration","unitDelay","canvasPreset"].forEach(id=>{if(s[id]!==undefined&&$(id)){if($(id).type==="checkbox")$(id).checked=!!s[id];else $(id).value=s[id]}});
 }
}catch(error){console.warn("Could not restore project",error)}
normalizeLines();
if(project && project.settings && project.settings.transparentHighlight!==undefined)
  $("transparentHighlight").checked=!!project.settings.transparentHighlight;
translate($("language").value);
updatePreview();
undoStack=[];redoStack=[];lastRememberedHTML=editor.innerHTML;
$("animationStatus").textContent=t("ready");

/* TEXTIVO_PORTABLE_EXPORT_V10 */
(function installPortableExportV10(){
  const exportPanel = $("exportTitle")?.closest(".panel");
  if (!exportPanel) return;
  const toolbar = exportPanel.querySelector(".toolbar");
  if (!toolbar) return;

  const addButton = (id, label) => {
    if ($(id)) return $(id);
    const b = document.createElement("button");
    b.id = id; b.type = "button"; b.textContent = label;
    toolbar.appendChild(b); return b;
  };
  const htmlBtn = addButton("portableHtmlBtn", "Export animated HTML");
  const jsonBtn = addButton("projectJsonBtn", "Export project JSON");
  const importBtn = addButton("projectImportBtn", "Import project JSON");
  const fileInput = document.createElement("input");
  fileInput.type = "file"; fileInput.accept = ".json,application/json";
  fileInput.hidden = true; fileInput.id = "projectImportFile";
  exportPanel.appendChild(fileInput);

  const ids = [
    "font","size","color","highlight","transparentHighlight","spacing","wordSpacing",
    "weight","align","shadow","linePause","deletePause","loopMode","animateBy",
    "entranceEffect","exitEffect","unitDuration","unitDelay","canvasPreset"
  ];
  function snapshot(){
    const settings = {};
    ids.forEach(id => {
      const el = $(id);
      if (el) settings[id] = el.type === "checkbox" ? el.checked : el.value;
    });
    return {
      format: "textivo-project",
      schemaVersion: 2,
      app: "Textivo",
      author: "Khayom Abdurahmonov",
      exportedAt: new Date().toISOString(),
      language: $("language")?.value || "en",
      content: {
        html: sanitizeEditorHTML(editor.innerHTML),
        background: $("canvasBg")?.value || "#20202b",
        transparentBackground: !!$("transparentBg")?.checked,
        defaultColor: $("defaultColor")?.value || "#ffffff"
      },
      settings
    };
  }
  function safeJSON(value){
    return JSON.stringify(value, null, 2).replace(/</g, "\\u003c");
  }
  function saveFile(name, data, type){
    const blob = new Blob([data], {type});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }
  jsonBtn.addEventListener("click", () => {
    saveFile("textivo-project.json", safeJSON(snapshot()), "application/json");
  });

  importBtn.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", async () => {
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;
    try {
      if(file.size>2000000)throw new Error("Project file exceeds the 2 MB safety limit.");
      const data=JSON.parse(await file.text());
      if(data.format!=="textivo-project"||!data.content||typeof data.content.html!=="string"||!data.settings||typeof data.settings!=="object")throw new Error("This is not a valid Textivo project file.");
      if(!confirm("Replace the current Textivo workspace with this project?"))return;
      editor.innerHTML=sanitizeEditorHTML(data.content.html);
      $("language").value=["en","ru","tg"].includes(data.language)?data.language:"en";
      $("canvasBg").value=/^#[0-9a-f]{6}$/i.test(data.content.background||"")?data.content.background:"#20202b";
      $("transparentBg").checked=!!data.content.transparentBackground;
      $("defaultColor").value=/^#[0-9a-f]{6}$/i.test(data.content.defaultColor||"")?data.content.defaultColor:"#ffffff";
      const allowed=new Set(["font","size","color","highlight","transparentHighlight","spacing","wordSpacing","weight","align","shadow","linePause","deletePause","loopMode","animateBy","entranceEffect","exitEffect","unitDuration","unitDelay","canvasPreset"]);
      Object.entries(data.settings).forEach(([id,value])=>{if(!allowed.has(id))return;const el=$(id);if(!el)return;if(el.type==="checkbox")el.checked=!!value;else if(el.tagName==="SELECT"&&[...el.options].some(o=>o.value===String(value)))el.value=String(value);else if(el.type==="number"||el.type==="range"){const n=Number(value);if(Number.isFinite(n))el.value=String(Math.max(Number(el.min)||-Infinity,Math.min(Number(el.max)||Infinity,n)))}else if(el.type==="color"&&/^#[0-9a-f]{6}$/i.test(String(value)))el.value=value});
      normalizeLines();translate($("language").value);updatePreview();undoStack=[];redoStack=[];lastRememberedHTML=editor.innerHTML;
      $("animationStatus").textContent="Project imported";alert("Textivo project imported safely.");
    } catch (err) {
      alert("Could not import project: " + err.message);
    } finally { fileInput.value = ""; }
  });

  function portableRuntime(){
    return [
      "(function(){",
      "const data=JSON.parse(document.getElementById('textivo-data').textContent);",
      "const root=document.getElementById('stage'),play=document.getElementById('play'),stop=document.getElementById('stop'),status=document.getElementById('status');",
      "const c=data.content,s=data.settings||{}; root.innerHTML=c.html;",
      "root.style.background=c.transparentBackground?'transparent':c.background;",
      "root.style.color=c.defaultColor||'#fff';root.style.textAlign=s.align||'center';",
      "root.style.fontFamily=s.font||'Arial';root.style.fontSize=(s.size||32)+'px';root.style.fontWeight=s.weight||'400';root.style.textShadow=s.shadow||'none';",
      "const sleep=n=>new Promise(r=>setTimeout(r,n));let token=0;",
      "function frames(name,out){const map=out?{fade:[{opacity:1},{opacity:0}],drop:[{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(28px)'}],'slide-right':[ {opacity:1,transform:'translateX(0)'},{opacity:0,transform:'translateX(35px)'}],zoom:[{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(.55)'}],blur:[{opacity:1,filter:'blur(0)'},{opacity:0,filter:'blur(10px)'}]}:{fade:[{opacity:0},{opacity:1}],rise:[{opacity:0,transform:'translateY(28px)'},{opacity:1,transform:'translateY(0)'}],'slide-left':[{opacity:0,transform:'translateX(-35px)'},{opacity:1,transform:'translateX(0)'}],zoom:[{opacity:0,transform:'scale(.55)'},{opacity:1,transform:'scale(1)}],blur:[{opacity:0,filter:'blur(10px)'},{opacity:1,filter:'blur(0)'}],pop:[{opacity:0,transform:'scale(.65)'},{opacity:1,transform:'scale(1.12)',offset:.72},{opacity:1,transform:'scale(1)'}]};return map[name]||[{opacity:1},{opacity:1}]}",
      "function split(line,kind){if(kind==='line'){const x=document.createElement('div');x.className='unit line';x.innerHTML=line.innerHTML;return [x]}const out=[];function walk(node,styles){if(node.nodeType===3){for(const ch of node.nodeValue){const x=document.createElement('span');x.className='unit';x.textContent=ch;Object.assign(x.style,styles);out.push(x)}return}if(node.nodeType!==1)return;const cs=getComputedStyle(node),next={...styles};['fontFamily','fontSize','fontWeight','fontStyle','textDecoration','color','backgroundColor','letterSpacing','wordSpacing','textShadow'].forEach(k=>{const v=cs[k];if(v&&v!=='normal'&&v!=='rgba(0, 0, 0, 0)')next[k]=v});node.childNodes.forEach(n=>walk(n,next))}line.childNodes.forEach(n=>walk(n,{}));if(kind==='character')return out;const words=[];let cur=null;out.forEach(ch=>{if(/^\s+$/.test(ch.textContent)){if(cur)cur.appendChild(ch);else{const w=document.createElement('span');w.className='unit';w.appendChild(ch);words.push(w)}}else{if(!cur){cur=document.createElement('span');cur.className='unit';words.push(cur)}cur.appendChild(ch)}});return words.filter(x=>x.textContent.length)}",
      "async function animate(el,fs,ms,t){if(t!==token)return;if(el.animate){try{await el.animate(fs,{duration:ms,easing:'cubic-bezier(.2,.75,.25,1)',fill:'both'}).finished}catch(e){}}else await sleep(ms)}",
      "async function run(){const t=++token,rows=[...root.querySelectorAll('.text-line,div')].filter(x=>x.parentElement===root&&x.textContent.trim());const mode=s.loopMode||'once',kind=s.animateBy||'character',enter=s.entranceEffect||'fade',leave=s.exitEffect||'fade',duration=+(s.unitDuration||500),delay=+(s.unitDelay||120),linePause=+(s.linePause||500),deletePause=+(s.deletePause||1500);",
      "do{for(let li=0;li<rows.length;li++){if(t!==token)return;status.textContent='Line '+(li+1)+' / '+rows.length;const units=split(rows[li],kind);root.replaceChildren();const shown=[];if(mode!=='delete'){for(let i=0;i<units.length;i++){if(t!==token)return;const u=units[i];if(kind==='line'){u.style.display='block';u.style.width='100%';u.style.whiteSpace='pre-wrap'}else{u.style.display='inline-block';u.style.whiteSpace='pre-wrap'}root.appendChild(u);shown.push(u);if(enter!=='none')await animate(u,frames(enter,false),duration,t);if(i<units.length-1)await sleep(delay)}}else units.forEach(u=>{u.style.display=kind==='line'?'block':'inline-block';root.appendChild(u);shown.push(u)});",
      "if(mode==='type'){if(li<rows.length-1)await sleep(linePause);continue}if(mode!=='delete')await sleep(deletePause);for(let i=shown.length-1;i>=0;i--){if(t!==token)return;if(leave!=='none')await animate(shown[i],frames(leave,true),duration,t);shown[i].remove();if(i)await sleep(delay)}if(li<rows.length-1)await sleep(linePause)}}while(mode==='loop'&&t===token);if(t===token)status.textContent='Animation finished'}",
      "play.addEventListener('click',run);stop.addEventListener('click',()=>{token++;status.textContent='Stopped'});",
      "})();"
    ].join("\\n");
  }
  htmlBtn.addEventListener("click", () => {
    const data = safeJSON(snapshot());
    const css = "html,body{margin:0;min-height:100%;background:#09090f;color:#fff;font-family:Arial,sans-serif}body{padding:24px;box-sizing:border-box}.bar{display:flex;gap:10px;flex-wrap:wrap;margin:0 auto 18px;max-width:1100px}.bar button{background:#a78bfa;color:#160f22;border:0;border-radius:9px;padding:11px 16px;font-weight:700}#stage{box-sizing:border-box;max-width:1100px;min-height:260px;margin:auto;padding:30px;border-radius:14px;white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.35;text-align:center}#stage .text-line{display:block;white-space:pre-wrap;min-height:1em}#stage .unit{vertical-align:baseline}.status{max-width:1100px;margin:12px auto;color:#aaa;font:13px Arial}";
    const runtime = portableRuntime().replace(/<\/script/gi, "<\\\\/script");
    const doc = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Textivo — Animated Export</title><style>'+css+'</style></head><body><div class="bar"><button id="play">▶ Play animation</button><button id="stop">■ Stop</button></div><div id="stage"></div><div class="status" id="status">Ready — this file works independently of Textivo.</div><script type="application/json" id="textivo-data">'+data+'</script><script>'+runtime+'</script></body></html>';
    saveFile("textivo-animated.html", doc, "text/html");
  });
})();

})();
