document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('people-list');
    const cards = [...list.querySelectorAll('.card')];
    const search = document.getElementById('search');
    const empty = document.getElementById('empty');
    let filter = 'all';

    function setCard(card, available) {
        card.classList.toggle('is-available', available);
        card.querySelector('.switch').setAttribute('aria-checked', String(available));
        card.querySelector('.status-text').textContent = available ? 'Available' : 'Away';
    }

    function applyFilters() {
        const q = search.value.trim().toLowerCase();
        let shown = 0;
        cards.forEach(card => {
            const on = card.classList.contains('is-available');
            const ok = card.dataset.name.includes(q) &&
                (filter === 'all' || (filter === 'available') === on);
            card.hidden = !ok;
            if (ok) shown++;
        });
        empty.hidden = shown > 0;
    }

    function updateSummary() {
        const total = cards.length;
        const on = cards.filter(c => c.classList.contains('is-available')).length;
        document.getElementById('count-total').textContent = total;
        document.getElementById('count-available').textContent = on;
        document.getElementById('meter-fill').style.width = (total ? on / total * 100 : 0) + '%';
    }

    list.addEventListener('click', async e => {
        const btn = e.target.closest('.switch');
        if (!btn) return;
        const card = btn.closest('.card');
        const was = card.classList.contains('is-available');
        setCard(card, !was);            // optimistic update
        updateSummary();
        btn.disabled = true;
        try {
            const res = await fetch(`/toggle_availability/${card.dataset.id}`, { method: 'POST' });
            if (!res.ok) throw new Error(res.status);
            setCard(card, (await res.json()).available);
        } catch {
            setCard(card, was);         // roll back on failure
        } finally {
            btn.disabled = false;
            updateSummary();
            applyFilters();
        }
    });

    search.addEventListener('input', applyFilters);
    document.querySelector('.filters').addEventListener('click', e => {
        const b = e.target.closest('.filter');
        if (!b) return;
        document.querySelectorAll('.filter').forEach(f => f.classList.toggle('is-active', f === b));
        filter = b.dataset.filter;
        applyFilters();
    });

    updateSummary();
});
