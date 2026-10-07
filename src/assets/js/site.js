// The Last Table — site behavior: drawer, tonight's hours, launch countdown, menu tabs,
// live-music dates and forms. Plain JS, no dependencies.
(function () {
  'use strict';

  var root = document.documentElement;
  var config = {};
  try { config = JSON.parse(document.getElementById('tlt-config').textContent); } catch (e) {}
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // ---------- Chicago time ----------
  // "Service day": the restaurant's night runs until 4 AM, so until then it is still last night.
  function chicagoParts(date) {
    try {
      var parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).formatToParts(date);
      var o = {};
      parts.forEach(function (p) { o[p.type] = p.value; });
      return { ymd: o.year + '-' + o.month + '-' + o.day, dow: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(o.weekday) };
    } catch (e) {
      var d = date;
      return { ymd: d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'), dow: d.getDay() };
    }
  }
  var serviceDay = chicagoParts(new Date(Date.now() - 4 * 36e5));

  // ---------- Tonight's hours ----------
  if (config.tonight && serviceDay.dow > -1) {
    document.querySelectorAll('[data-tonight]').forEach(function (el) { el.textContent = config.tonight[serviceDay.dow]; });
  }

  // ---------- Drawer ----------
  var drawer = document.getElementById('site-drawer');
  var opener = document.querySelector('[data-drawer-open]');
  if (drawer && opener && typeof drawer.showModal === 'function') {
    opener.addEventListener('click', function () {
      drawer.showModal();
      opener.setAttribute('aria-expanded', 'true');
    });
    drawer.addEventListener('close', function () {
      opener.setAttribute('aria-expanded', 'false');
      opener.focus();
    });
    drawer.querySelector('[data-drawer-close]').addEventListener('click', function () { drawer.close(); });
    // A click on the backdrop lands on the <dialog> itself, outside the panel.
    drawer.addEventListener('click', function (e) { if (e.target === drawer) drawer.close(); });
    drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { drawer.close(); }); });
  } else if (opener) {
    // Very old browsers: send the burger to the footer navigation instead.
    opener.addEventListener('click', function () { document.querySelector('.site-footer__nav a').focus(); });
  }

  // ---------- Launch countdown ----------
  var countdown = document.querySelector('[data-countdown]');
  if (countdown && root.getAttribute('data-launch') === 'coming-soon') {
    var openAt = Date.parse(config.openAt);
    var auto = root.getAttribute('data-launch-mode') === 'auto' && !/[?&]launch=coming-soon/.test(location.search);
    var cells = {};
    countdown.querySelectorAll('[data-unit]').forEach(function (el) { cells[el.getAttribute('data-unit')] = el; });
    var pad = function (n) { return String(n).padStart(2, '0'); };
    var timer;
    var tick = function () {
      var ms = Math.max(0, openAt - Date.now());
      cells.d.textContent = pad(Math.floor(ms / 864e5));
      cells.h.textContent = pad(Math.floor(ms / 36e5) % 24);
      cells.m.textContent = pad(Math.floor(ms / 6e4) % 60);
      cells.s.textContent = pad(Math.floor(ms / 1e3) % 60);
      if (ms === 0 && auto) { clearInterval(timer); root.setAttribute('data-launch', 'open'); }
    };
    tick();
    timer = setInterval(tick, 1000);
  }

  // ---------- Menu tabs ----------
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tlt-tabs [role="tab"]'));
  if (tabs.length) {
    var panels = document.querySelectorAll('.tlt-menu-panel');
    var show = function (id, focus) {
      tabs.forEach(function (t) {
        var on = t.getAttribute('data-panel') === id;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        if (on && focus) t.focus();
      });
      panels.forEach(function (p) { p.removeAttribute('data-start-hidden'); p.hidden = p.getAttribute('data-panel') !== id; });
    };
    var ids = tabs.map(function (t) { return t.getAttribute('data-panel'); });
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () {
        show(ids[i]);
        try { history.replaceState(null, '', '?tab=' + ids[i]); } catch (e) {}
      });
      t.addEventListener('keydown', function (e) {
        var next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (next === undefined) return;
        e.preventDefault();
        next = (next + tabs.length) % tabs.length;
        show(ids[next], true);
        try { history.replaceState(null, '', '?tab=' + ids[next]); } catch (err) {}
      });
    });
    var q = new URLSearchParams(location.search).get('tab');
    show(ids.indexOf(q) > -1 ? q : ids[0]);
  }

  // ---------- Live music: hide past nights, show the next three on Home ----------
  document.querySelectorAll('.events').forEach(function (list) {
    var limit = parseInt(list.getAttribute('data-limit') || '0', 10);
    var shown = 0;
    list.querySelectorAll('.event').forEach(function (ev) {
      var past = ev.getAttribute('data-date') < serviceDay.ymd;
      var over = limit && shown >= limit;
      ev.hidden = past || over;
      ev.classList.remove('is-extra');
      if (!ev.hidden) shown++;
    });
    var empty = list.parentNode.querySelector('.events__empty');
    if (empty) empty.hidden = shown > 0;
  });

  // ---------- FAQ: open the answer a link points to (e.g. faq.html#accessibility) ----------
  function openFromHash() {
    var id = location.hash.slice(1);
    var el = id && document.getElementById(id);
    if (el && el.tagName === 'DETAILS') { el.open = true; el.querySelector('summary').focus(); }
  }
  openFromHash();
  window.addEventListener('hashchange', openFromHash);

  // ---------- Forms ----------
  function mailto(subject, body) {
    location.href = 'mailto:' + config.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }

  function post(endpoint, form) {
    return fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); });
  }

  function setError(input, errEl, on) {
    if (input) input.setAttribute('aria-invalid', on ? 'true' : 'false');
    if (errEl) errEl.hidden = !on;
  }

  document.querySelectorAll('form[data-form="newsletter"]').forEach(function (form) {
    var input = form.querySelector('input[type="email"]');
    var err = form.querySelector('.form-error');
    var done = form.querySelector('.signup__done');
    var defaultErr = err.textContent;
    input.addEventListener('input', function () { setError(input, err, false); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.querySelector('.hp').value) return;
      var email = input.value.trim();
      err.textContent = defaultErr;
      if (!EMAIL_RE.test(email)) { setError(input, err, true); input.focus(); return; }
      setError(input, err, false);
      var finish = function (msg) { form.classList.add('is-done'); done.textContent = msg; };
      if (config.forms && config.forms.newsletter) {
        post(config.forms.newsletter, form).then(function () { finish(done.getAttribute('data-done')); })
          .catch(function () { err.textContent = 'That didn’t go through. Please try again, or write to ' + config.email + '.'; err.hidden = false; });
      } else {
        mailto('Join the list', 'Please add ' + email + ' to The Last Table list.');
        finish('Your email app should open. Send the message and you’re on the list.');
      }
    });
  });

  var inquiry = document.querySelector('form[data-form="inquiry"]');
  if (inquiry) {
    var date = inquiry.elements.date;
    var today = chicagoParts(new Date()).ymd;
    date.min = today;
    var checks = {
      name: function (v) { return v.trim() !== ''; },
      email: function (v) { return EMAIL_RE.test(v.trim()); },
      date: function (v) { return v !== ''; },
      guests: function (v) { return +v >= 1; },
    };
    Object.keys(checks).forEach(function (k) {
      inquiry.elements[k].addEventListener('input', function () { setError(inquiry.elements[k], document.getElementById('f-' + k + '-err'), false); });
    });
    inquiry.addEventListener('submit', function (e) {
      e.preventDefault();
      if (inquiry.elements._gotcha.value) return;
      var first = null;
      Object.keys(checks).forEach(function (k) {
        var el = inquiry.elements[k];
        var bad = !checks[k](el.value);
        setError(el, document.getElementById('f-' + k + '-err'), bad);
        if (bad && !first) first = el;
      });
      var submitErr = document.getElementById('f-submit-err');
      submitErr.hidden = true;
      if (first) { first.focus(); return; }

      var f = inquiry.elements;
      var doneBox = document.querySelector('.inquiry-done');
      var finish = function (body) {
        doneBox.querySelector('[data-name]').textContent = f.name.value.trim();
        if (body) doneBox.querySelector('.inquiry-done__body').textContent = body;
        inquiry.hidden = true;
        doneBox.hidden = false;
        doneBox.focus();
      };
      if (config.forms && config.forms.inquiry) {
        var btn = inquiry.querySelector('button[type="submit"]');
        btn.disabled = true;
        post(config.forms.inquiry, inquiry).then(function () { finish(); })
          .catch(function () { submitErr.hidden = false; btn.disabled = false; });
      } else {
        mailto('Private dining inquiry — ' + f.date.value + ', ' + f.guests.value + ' guests', [
          'Name: ' + f.name.value.trim(),
          'Email: ' + f.email.value.trim(),
          'Phone: ' + (f.phone.value.trim() || '—'),
          'Preferred date: ' + f.date.value,
          'Guests: ' + f.guests.value,
          'Occasion: ' + f.occasion.value,
          '',
          f.notes.value.trim(),
        ].join('\n'));
        finish('Your email app should open with the details filled in. Send it, and we’ll be in touch within two business days.');
      }
    });
  }
})();
