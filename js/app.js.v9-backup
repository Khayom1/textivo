(() => {
"use strict";
const $ = id => document.getElementById(id);
const editor = $("editor");
const animationScreen = $("animationScreen");
let savedRange = null, undoStack = [], redoStack = [], animationToken = 0;
window.TEXTIVO_BUILD = "v9";

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
function t(key){return (dict[$("language").value]||dict.en)[key]||dict.en[key]||key}
function translate(lang){
 const d=dict[lang]||dict.en;
 Object.entries(d).forEach(([id,value])=>{const el=$(id);if(el)el.textContent=value});
 const labels={animateBy:[["line","animateLine"],["word","animateWord"],["character","animateCharacter"]],entranceEffect:[["fade","effectFadeIn"],["rise","effectRise"],["slide-left","effectSlideLeft"],["zoom","effectZoomIn"],["blur","effectBlurIn"],["pop","effectPop"],["none","effectNone"]],exitEffect:[["fade","effectFadeOut"],["drop","effectDrop"],["slide-right","effectSlideRight"],["zoom","effectZoomOut"],["blur","effectBlurOut"],["none","effectNone"]]};
 Object.entries(labels).forEach(([id,items])=>items.forEach(([v,k])=>{const o=$(id).querySelector(`option[value="${v}"]`);if(o)o.textContent=d[k]||dict.en[k]}));
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
normalizeLines();

function remember(){
 const html=editor.innerHTML;
 if(undoStack[undoStack.length-1]!==html){undoStack.push(html);if(undoStack.length>80)undoStack.shift();redoStack=[]}
}
function hasTransparentBackground(){return $("transparentBg").checked}
function updatePreview(){
 $("previewText").innerHTML=editor.innerHTML;
 [...$("previewText").children].forEach(row=>row.removeAttribute("contenteditable"));
 $("preview").style.background=hasTransparentBackground()?"transparent":$("canvasBg").value;
 $("previewText").style.textAlign=$("align").value;
 $("previewText").style.textShadow=$("shadow").value;
 $("previewText").style.color=$("defaultColor").value;
}
function captureSelection(){
 const selection=window.getSelection();
 if(selection && selection.rangeCount && editor.contains(selection.anchorNode))
   savedRange=selection.getRangeAt(0).cloneRange();
}
document.addEventListener("selectionchange",captureSelection);
editor.addEventListener("input",()=>{remember();updatePreview()});

function restoreSelection(){
 if(!savedRange)return false;
 const selection=window.getSelection();
 try{selection.removeAllRanges();selection.addRange(savedRange);return editor.contains(selection.anchorNode)}
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
 if(!undoStack.length)return;redoStack.push(editor.innerHTML);editor.innerHTML=undoStack.pop();normalizeLines();updatePreview();
});
$("redoBtn").addEventListener("click",()=>{
 if(!redoStack.length)return;undoStack.push(editor.innerHTML);editor.innerHTML=redoStack.pop();normalizeLines();updatePreview();
});
$("resetBtn").addEventListener("click",()=>{
 if(confirm("Reset text?")){editor.innerHTML="<div>Create something amazing.</div>";undoStack=[];redoStack=[];remember();updatePreview()}
});

$("saveBtn").addEventListener("click",()=>{
 localStorage.setItem("textivo-project-v9",JSON.stringify({
  html:editor.innerHTML,lang:$("language").value,bg:$("canvasBg").value,transparentBg:hasTransparentBackground(),
  align:$("align").value,settings:{font:$("font").value,size:$("size").value,color:$("color").value,
  highlight:$("highlight").value,transparentHighlight:$("transparentHighlight").checked,spacing:$("spacing").value,wordSpacing:$("wordSpacing").value,
  weight:$("weight").value,shadow:$("shadow").value,animateBy:$("animateBy").value,entranceEffect:$("entranceEffect").value,exitEffect:$("exitEffect").value,unitDuration:$("unitDuration").value,unitDelay:$("unitDelay").value}
 }));
 alert("Project saved on this device.");
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
 `<!doctype html><meta charset="utf-8"><div>${editor.innerHTML}</div>`,"text/html"));
$("svgBtn").addEventListener("click",()=>{
 const lines=[...editor.children].map((row,i)=>`<text x="600" y="${180+i*70}" text-anchor="middle">${escapeXML(row.innerText)}</text>`).join("");
 download("textivo.svg",`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700">${hasTransparentBackground()?"":`<rect width="100%" height="100%" fill="${$("canvasBg").value}"/>`}<g fill="${$("defaultColor").value}" font-family="${escapeXML($("font").value)}" font-size="${Number($("size").value)||32}">${lines}</g></svg>`,"image/svg+xml");
});
function escapeXML(value){return String(value).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
$("pngBtn").addEventListener("click",()=>{
 const canvas=document.createElement("canvas"),ctx=canvas.getContext("2d");canvas.width=1600;canvas.height=900;
 if(!hasTransparentBackground()){ctx.fillStyle=$("canvasBg").value;ctx.fillRect(0,0,canvas.width,canvas.height);}
 ctx.fillStyle=$("defaultColor").value;ctx.textAlign=$("align").value==="left"?"left":$("align").value==="right"?"right":"center";
 ctx.font=`${$("weight").value} ${Number($("size").value)||32}px "${$("font").value}"`;
 [...editor.children].forEach((row,i)=>ctx.fillText(row.innerText,ctx.textAlign==="left"?70:ctx.textAlign==="right"?1530:800,150+i*85,1450));
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
function setAnimationBaseStyle(){animationScreen.style.fontFamily=$("font").value;animationScreen.style.fontSize=(Number($("size").value)||32)+"px";animationScreen.style.fontWeight=$("weight").value;animationScreen.style.color=$("color").value;animationScreen.style.textAlign=$("align").value;animationScreen.style.textShadow=$("shadow").value;animationScreen.style.background=hasTransparentBackground()?"transparent":$("canvasBg").value}
$("stopBtn").addEventListener("click",()=>{animationToken++;$("animationStatus").textContent=t("ready")});
$("playBtn").addEventListener("click",async()=>{
 const token=++animationToken,rows=getLineElements(),mode=$("loopMode").value,kind=$("animateBy").value,enter=$("entranceEffect").value,leave=$("exitEffect").value,duration=Number($("unitDuration").value),delay=Number($("unitDelay").value),linePause=Number($("linePause").value),deletePause=Number($("deletePause").value);
 if(!rows.length){animationScreen.textContent="";return}setAnimationBaseStyle();
 const run=async()=>{for(let li=0;li<rows.length;li++){if(token!==animationToken)return false;$("animationStatus").textContent=`${t("playing")} ${li+1}/${rows.length}`;const units=splitIntoUnits(rows[li],kind);if(mode!=="type"||li===0)animationScreen.replaceChildren();else animationScreen.appendChild(document.createElement("br"));const shown=[];
 if(mode!=="delete"){for(let i=0;i<units.length;i++){if(token!==animationToken)return false;const u=units[i];if(kind==="line"){u.style.display="block";u.style.width="100%";u.style.whiteSpace="pre-wrap"}else{u.style.display="inline-block";u.style.whiteSpace="pre-wrap"}animationScreen.appendChild(u);shown.push(u);if(enter!=="none")await animateElement(u,inFrames(enter),duration);if(i<units.length-1&&delay)await sleep(delay)}}else{units.forEach(u=>{if(kind!=="line")u.style.display="inline-block";animationScreen.appendChild(u);shown.push(u)})}
 if(mode==="type"){if(li<rows.length-1)await sleep(linePause);continue}if(mode!=="delete")await sleep(deletePause);for(let i=shown.length-1;i>=0;i--){if(token!==animationToken)return false;const u=shown[i];if(leave!=="none")await animateElement(u,outFrames(leave),duration);u.remove();if(i>0&&delay)await sleep(delay)}if(li<rows.length-1)await sleep(linePause)}return true};
 do{const done=await run();if(!done||mode!=="loop")break}while(token===animationToken);if(token===animationToken)$("animationStatus").textContent=t("finished");
});
$("transparentBg").addEventListener("change",()=>{updatePreview();animationScreen.style.background=hasTransparentBackground()?"transparent":$("canvasBg").value});$("canvasBg").addEventListener("input",()=>{if(!hasTransparentBackground())updatePreview()});

let project=null;
try{
 project=JSON.parse(localStorage.getItem("textivo-project-v9")||localStorage.getItem("textivo-project-v8")||localStorage.getItem("textivo-project-v7")||localStorage.getItem("textivo-project-v5")||"null");
 if(project){
  editor.innerHTML=project.html||editor.innerHTML;
  $("language").value=project.lang||"en";
  $("canvasBg").value=project.bg||"#20202b";
  $("transparentBg").checked=!!project.transparentBg;
  $("align").value=project.align||"center";
  const s=project.settings||{};
  ["font","size","color","highlight","spacing","wordSpacing","weight","shadow","animateBy","entranceEffect","exitEffect","unitDuration","unitDelay"].forEach(id=>{if(s[id]!==undefined)$(id).value=s[id]});
 }
}catch(error){console.warn("Could not restore project",error)}
normalizeLines();
if(project && project.settings && project.settings.transparentHighlight!==undefined)
  $("transparentHighlight").checked=!!project.settings.transparentHighlight;
translate($("language").value);
updatePreview();
remember();
$("animationStatus").textContent=t("ready");
})();