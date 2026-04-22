(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function c(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=c(t);fetch(t.href,r)}})();const n={todoInput:document.querySelector(".todo-input"),todoCounter:document.querySelector(".todo-counter"),clearCompletedBtn:document.querySelector(".todo-list-button"),filtersList:document.querySelector(".filters-list"),todoList:document.querySelector(".todo-list"),creationWrapper:document.querySelector(".creation-wrapper")},l={todos:"todos"};let s=JSON.parse(localStorage.getItem(l.todos))||[];function f(){localStorage.setItem(l.todos,JSON.stringify(s))}function p(){const o=s.filter(e=>!e.completed).length;n.todoCounter.textContent=o}function m(){return s}function u(){n.todoList.innerHTML="",m().forEach(e=>{const c=document.createElement("li");c.classList.add("todo-item"),c.dataset.id=e.id,c.innerHTML=`
      <label class="todo-label">
        <input class="todo-checkbox" type="checkbox" ${e.completed?"checked":""} />
        <span class="custom-checkbox"></span>
      </label>

      <p class="todo-text ${e.completed?"completed":""}">
        ${e.text}
      </p>

      <button class="todo-delete-btn" type="button"></button>
    `,n.todoList.appendChild(c)}),p()}function a(o){const e={id:Date.now(),text:o,completed:!1};s.unshift(e),f(),u()}n.todoInput.addEventListener("keydown",o=>{if(o.key!=="Enter")return;const e=n.todoInput.value.trim();e&&(a(e),n.todoInput.value="")});n.creationWrapper.addEventListener("click",o=>{if(!o.target.classList.contains("todo-checkbox"))return;const e=n.todoInput.value.trim();if(!e){o.target.checked=!1;return}a(e),n.todoInput.value="",o.target.checked=!1});u();
//# sourceMappingURL=index.js.map
