
(function(){
  'use strict';
  var burger=document.getElementById('burger'), drawer=document.getElementById('drawer'), closeBtn=document.getElementById('drawerClose');
  function lock(on){document.body.classList.toggle('is-locked',on);}
  function openD(){if(!drawer)return;drawer.dataset.open='true';burger.setAttribute('aria-expanded','true');lock(true);
    var f=drawer.querySelector('a,button');if(f)f.focus();}
  function closeD(){if(!drawer)return;drawer.dataset.open='false';burger.setAttribute('aria-expanded','false');lock(false);burger.focus();}
  if(burger){burger.addEventListener('click',function(){drawer.dataset.open==='true'?closeD():openD();});}
  if(closeBtn){closeBtn.addEventListener('click',closeD);}
  if(drawer){drawer.addEventListener('click',function(e){if(e.target===drawer)closeD();});}
  document.addEventListener('keydown',function(e){
    if(!drawer||drawer.dataset.open!=='true')return;
    if(e.key==='Escape'){closeD();return;}
    if(e.key==='Tab'){var f=drawer.querySelectorAll('a,button');if(!f.length)return;
      var first=f[0],last=f[f.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
  });
  window.addEventListener('resize',function(){if(window.innerWidth>1180&&drawer&&drawer.dataset.open==='true')closeD();});
  document.querySelectorAll('.navbar__in a').forEach(function(a){
    if(a.hasAttribute('aria-current'))a.scrollIntoView({block:'nearest',inline:'center'});
  });

  // зоны химчистки
  var zoneBtns=document.querySelectorAll('[data-zone]');
  if(zoneBtns.length){
    var zp=document.getElementById('z-title'), zl=document.getElementById('z-list'), zn=document.getElementById('z-note');
    var Z={
      'Потолок':['Проходим мягкой щёткой и пеной без сильного намокания.','Смотрим на разводы от воды и следы от рук у ручек.','Потолок — самая частая причина «пятен после химчистки», поэтому работаем малыми порциями.'],
      'Сиденья':['Пена, щётка по ткани или коже, экстрактор, сушка.','Проверяем швы, боковые валики и зону посадки.','На коже отдельно снимаем блеск и заломы, затем защита.'],
      'Ковры и пол':['Пылесос, затем пена и экстрактор, сушка с обдувом.','Смотрим пороги, тоннель и место под педалями.','Песок из ковров вымываем полностью, иначе он снова поднимется в салон.'],
      'Пластик и панель':['Очистка, затем матовое покрытие без жирного блеска.','Смотрим дефлекторы, кнопки, зону у стекла.','Блеск на панели — это силикон, на солнце он даёт блик в стекло.'],
      'Двери и пороги':['Проходим нижнюю кромку, уплотнители и карманы.','Смотрим следы от обуви на пластике порога.','Уплотнители чистим отдельно: там копится грязь, которую не видно.'],
      'Багажник':['Пылесос, пена, экстрактор, сушка.','Смотрим ниши под обшивкой и место запаски.','Если в багажнике возили стройматериалы — нужна отдельная проходка.'],
      'Стёкла':['Двухэтапная мойка: снятие налёта, затем чистое стекло.','Смотрим кромки и зону у стоек.','Разводы на стекле видны на солнце сильнее, чем грязь на кузове.'],
      'Ремни и мелочи':['Мягкая чистка ремней и направляющих.','Смотрим пепельницы, карманы, зону под сиденьями.','Ремни не заливаем: важна прочность ткани.']
    };
    zoneBtns.forEach(function(b){
      b.addEventListener('click',function(){
        zoneBtns.forEach(function(x){x.setAttribute('aria-pressed','false');});
        b.setAttribute('aria-pressed','true');
        var k=b.getAttribute('data-zone'), d=Z[k]||['Уточним на месте.','—','—'];
        zp.textContent=k;
        zl.innerHTML='<li><b>Что делаем:</b> '+d[0]+'</li><li><b>На что смотрим:</b> '+d[1]+'</li><li><b>Почему так:</b> '+d[2]+'</li>';
        zn.textContent='Полный список зон и порядок работ обсудим по телефону или в WhatsApp.';
      });
    });
  }

  // подбор объёма работ
  var kit=document.getElementById('kit');
  if(kit){
    var body=document.getElementById('k-body'), dirt=document.getElementById('k-dirt');
    var need=kit.querySelectorAll('[data-need]');
    var kt=document.getElementById('k-title'), kl=document.getElementById('k-list'),
        kn=document.getElementById('k-note'), kcta=document.getElementById('k-cta');
    var BODY={'Седан':1,'Хэтчбек':1,'Универсал':1.1,'Кроссовер':1.15,'Микроавтобус':1.5};
    var DIRT={'Лёгкое загрязнение':'одна проходка','Среднее':'две проходки по зонам','Сильное':'полный разбор салона'};
    var NEED={
      'Химчистка салона':['Пылесос и продувка всех полостей','Пена и щётка по зонам, экстрактор','Чистка пластика и стёкол','Сушка с обдувом'],
      'Мойка кузова':['Бесконтактная пена и смыв','Контактная мойка двумя ведрами','Сушка микрофиброй','Проходка стёкол'],
      'Мойка дисков':['Очистка дисков щётками','Снятие налёта с колодок и суппортов','Проходка арок','Чернение резины'],
      'Салон после ремонта':['Удаление строительной пыли','Проходка по коврам и обшивке','Чистка стёкол изнутри']
    };
    function paintK(){
      var items=[]; need.forEach(function(b){if(b.getAttribute('aria-pressed')==='true')items.push(b.getAttribute('data-need'));});
      var bd=body.value, dt=dirt.value, works=[];
      items.forEach(function(n){(NEED[n]||[]).forEach(function(w){if(works.indexOf(w)<0)works.push(w);});});
      kt.textContent=items.length?items.join(' + '):'Выберите, что нужно';
      kl.innerHTML=works.length?works.map(function(w){return '<li>'+w+'</li>';}).join(''):'<li>Отметьте услуги — покажем порядок работ.</li>';
      var lvl=DIRT[dt]||''; kn.textContent='Кузов: '+bd+' · '+dt+' — '+lvl+'. Точный объём и стоимость называю после осмотра: зависит от состояния салона и кузова.';
      var txt='Заявка на детейлинг%0AКузов: '+encodeURIComponent(bd)+'%0AСостояние: '+encodeURIComponent(dt)+
        '%0AНужно: '+encodeURIComponent(items.join(', ')||'—')+'%0AПодскажите стоимость и время.';
      kcta.href='https://wa.me/375297250923?text='+txt;
    }
    body.addEventListener('change',paintK); dirt.addEventListener('change',paintK);
    need.forEach(function(b){b.addEventListener('click',function(){
      b.setAttribute('aria-pressed', b.getAttribute('aria-pressed')==='true'?'false':'true'); paintK();});});
    paintK();
  }

  // аккордеон
  document.querySelectorAll('.acc__q').forEach(function(q){
    q.addEventListener('click',function(){
      var item=q.closest('.acc__i'), open=item.classList.contains('is-open');
      var grp=item.parentNode;
      grp.querySelectorAll('.acc__i').forEach(function(i){i.classList.remove('is-open');
        var b=i.querySelector('.acc__q'); if(b)b.setAttribute('aria-expanded','false');});
      if(!open){item.classList.add('is-open'); q.setAttribute('aria-expanded','true');}
    });
  });

  // форма
  var form=document.getElementById('form');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var g=function(id){var el=document.getElementById(id);return el?el.value.trim():'';};
      var out=document.getElementById('formout');
      var lines=['Заявка на детейлинг','Имя: '+(g('f-name')||'—'),'Связь: '+(g('f-contact')||'—'),
        'Авто: '+(g('f-car')||'—'),'Нужно: '+(g('f-need')||'—'),'Комментарий: '+(g('f-note')||'—')];
      var txt=encodeURIComponent(lines.join(String.fromCharCode(10)));
      window.open('https://wa.me/375297250923?text='+txt,'_blank','noopener');
      out.textContent='Открываю WhatsApp с готовым сообщением.';
    });
  }
})();
