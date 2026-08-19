/**
 * AETHER — Frontend Logic & Interactions
 * Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroCanvas();
  initMobileNav();
  initMemoryDemo();
  initKnowledgeGraph();
  initScrollReveal();
  initKonamiCode();
});

/* ==========================================================================
   1. Hero Ambient Node Canvas
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const nodes = [];
  const nodeCount = Math.floor((width * height) / 22000);

  // Generate random particles
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 1
    });
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Render connection lines
    ctx.lineWidth = 0.5;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.strokeStyle = `rgba(0, 229, 255, ${0.15 * (1 - dist / 130)})`;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Render particle points
    ctx.fillStyle = 'rgba(240, 242, 245, 0.4)';
    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();

      // Position update
      node.x += node.vx;
      node.y += node.vy;

      // Wall bounce logic
      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('siteNav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    nav.classList.toggle('open');
  });

  // Close nav on link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      nav.classList.remove('open');
    });
  });
}

/* ==========================================================================
   3. Interactive Memory Processing Demo
   ========================================================================== */
function initMemoryDemo() {
  const processBtn = document.getElementById('processBtn');
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  const demoOutput = document.getElementById('demoOutput');

  if (!processBtn) return;

  processBtn.addEventListener('click', () => {
    processBtn.disabled = true;
    processBtn.innerText = 'Processing...';

    // Step 1 -> Step 2
    step1.classList.remove('active');
    step2.classList.add('active');

    setTimeout(() => {
      // Step 2 -> Step 3
      step2.classList.remove('active');
      step3.classList.add('active');

      setTimeout(() => {
        // Reveal Output
        demoOutput.classList.add('revealed');
        processBtn.disabled = false;
        processBtn.innerText = 'Process Memory';
      }, 600);

    }, 600);
  });
}

/* ==========================================================================
   4. SVG Knowledge Graph Node Hover Interactions
   ========================================================================== */
function initKnowledgeGraph() {
  const svg = document.getElementById('knowledgeGraphSvg');
  if (!svg) return;

  const nodes = svg.querySelectorAll('.graph-node');
  const edges = svg.querySelectorAll('.graph-edge');

  nodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      const nodeId = node.getAttribute('data-id');

      // Highlight active node
      node.classList.add('active');

      // Highlight connected edges & targeted neighbor nodes
      edges.forEach(edge => {
        const from = edge.getAttribute('data-from');
        const to = edge.getAttribute('data-to');

        if (from === nodeId || to === nodeId) {
          edge.classList.add('active');
          const targetId = (from === nodeId) ? to : from;
          const targetNode = svg.querySelector(`.graph-node[data-id="${targetId}"]`);
          if (targetNode) targetNode.classList.add('active');
        }
      });
    });

    node.addEventListener('mouseleave', () => {
      // Clear all active highlights
      nodes.forEach(n => n.classList.remove('active'));
      edges.forEach(e => e.classList.remove('active'));
    });
  });
}

/* ==========================================================================
   5. Scroll Reveal Observer
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   6. Konami Code Easter Egg
   ========================================================================== */
function initKonamiCode() {
  const konamiPattern = [
    'ArrowUp', 'ArrowUp', 
    'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 
    'ArrowLeft', 'ArrowRight', 
    'b', 'a'
  ];
  let position = 0;

  document.addEventListener('keydown', (e) => {
    const requiredKey = konamiPattern[position];

    if (e.key.toLowerCase() === requiredKey.toLowerCase()) {
      position++;
      if (position === konamiPattern.length) {
        triggerEasterEgg();
        position = 0;
      }
    } else {
      position = 0;
    }
  });

  function triggerEasterEgg() {
    const toast = document.getElementById('easterEggToast');
    if (!toast) return;

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }
}