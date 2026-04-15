document.addEventListener('DOMContentLoaded', function () {

    // ── Element refs ──
    const templateContainer = document.querySelector('.templatecontainer');
    const templateTab       = document.querySelector('.templatetab');
    const templateButton    = document.getElementById('templates');
    const closeButton       = document.getElementById('closeTemplates');
    const navbuttons        = document.getElementById('navbuttons');
    const activeTemplate    = document.getElementById('activeTemplate');
    const copyButton        = document.getElementById('copyButton');
    const fileInput         = document.getElementById('fileInput');
    const timelineButtons   = document.querySelectorAll('.timeline button');

    // Currently displayed template text
    let activeText = '';

    // ── Panel open / close ──
    function openPanel() {
        templateContainer.style.right = '0';
        closeButton.style.display = 'block';
        templateTab.style.display = 'block';
        fileInput.style.display = 'block';
    }

    function closePanel() {
        templateContainer.style.right = '';
        closeButton.style.display = 'none';
        templateTab.style.display = 'none';
        fileInput.style.display = 'none';
    }

    templateButton.addEventListener('click', openPanel);
    closeButton.addEventListener('click', closePanel);

    // ── Load templates.json and build nav buttons ──
    fetch('templates.json')
        .then(function (res) {
            if (!res.ok) throw new Error('Could not load templates.json');
            return res.json();
        })
        .then(function (templates) {
            templates.forEach(function (tpl) {
                const btn = document.createElement('button');
                btn.textContent = tpl.name;

                btn.addEventListener('click', function () {
                    // Show the template text (preserve line breaks)
                    activeTemplate.style.display = 'block';
                    activeTemplate.innerText = tpl.body;
                    copyButton.style.display = 'block';
                    activeText = tpl.body;

                    // Highlight active nav button
                    navbuttons.querySelectorAll('button').forEach(b => b.classList.remove('active-template'));
                    btn.classList.add('active-template');
                });

                navbuttons.appendChild(btn);
            });
        })
        .catch(function (err) {
            navbuttons.innerHTML = '<p style="color:#f66;padding:20px;">Failed to load templates.json — make sure the file is in the same folder as index.html.</p>';
            console.error(err);
        });

    // ── Copy active template to clipboard ──
    copyButton.style.display = 'none';
    copyButton.addEventListener('click', function () {
        if (!activeText) return;
        navigator.clipboard.writeText(activeText).catch(function () {
            // Fallback for older browsers
            const ta = document.createElement('textarea');
            ta.value = activeText;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
        });

        // Brief visual feedback
        copyButton.textContent = 'Copied!';
        setTimeout(function () { copyButton.textContent = 'Copy Template'; }, 1500);
    });

    // ── Timeline: highlight current month ──
    function highlightMonth() {
        const currentMonth = new Date().getMonth();
        timelineButtons.forEach(function (btn, i) {
            btn.classList.remove('highlighted');
            if (i === currentMonth) btn.classList.add('highlighted');
        });
    }

    timelineButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            this.classList.toggle('goalmonth');
        });
    });

    highlightMonth();

    // ── Dashboard notes ──
    function displaySubmittedValue(value) {
        const dashboard = document.getElementById('dashboard');
        const itemDiv = document.createElement('div');
        itemDiv.textContent = value;
        dashboard.appendChild(itemDiv);
    }

    document.getElementById('buildingfeatures').addEventListener('submit', function (e) {
        e.preventDefault();
        const feature = new FormData(this).get('feature');
        if (feature) displaySubmittedValue(feature);
        this.reset();
    });

    document.getElementById('clearButton').addEventListener('click', function () {
        const dashboard = document.getElementById('dashboard');
        Array.from(dashboard.childNodes).forEach(function (node) {
            if (node.nodeName !== 'H3') dashboard.removeChild(node);
        });
        document.getElementById('contactInfo').reset();
    });

    // ── Init ──
    templateTab.style.display = 'none';
    closeButton.style.display = 'none';
    activeTemplate.style.display = 'none';
});
