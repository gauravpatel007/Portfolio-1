import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const results = [];

function assert(condition, message, category = 'General') {
  if (condition) {
    results.push({ pass: true, message, category });
    console.log(`  [PASS] ${category} -> ${message}`);
  } else {
    results.push({ pass: false, message, category });
    console.error(`  [FAIL] ${category} -> ${message}`);
  }
}

console.log('\n======================================================');
console.log('   PORTFOLIO AUTOMATED FUNCTIONAL REGRESSION SUITE');
console.log('======================================================\n');

// 1. Navigation & Section ID Integrity
console.log('1. Checking Navigation & Section ID Integrity...');
const appContent = fs.readFileSync(path.join(ROOT, 'src/App.jsx'), 'utf-8');
const navbarContent = fs.readFileSync(path.join(ROOT, 'src/components/Navbar.jsx'), 'utf-8');
const heroContent = fs.readFileSync(path.join(ROOT, 'src/components/Hero.jsx'), 'utf-8');
const aboutContent = fs.readFileSync(path.join(ROOT, 'src/components/About.jsx'), 'utf-8');
const servicesContent = fs.readFileSync(path.join(ROOT, 'src/components/Services.jsx'), 'utf-8');
const projectsContent = fs.readFileSync(path.join(ROOT, 'src/components/Projects.jsx'), 'utf-8');
const experienceContent = fs.readFileSync(path.join(ROOT, 'src/components/Experience.jsx'), 'utf-8');
const breakoutContent = fs.readFileSync(path.join(ROOT, 'src/components/BreakoutGame.jsx'), 'utf-8');
const contactContent = fs.readFileSync(path.join(ROOT, 'src/components/Contact.jsx'), 'utf-8');
const modalContent = fs.readFileSync(path.join(ROOT, 'src/components/ComingSoonModal.jsx'), 'utf-8');

const expectedSections = ['home', 'about', 'service', 'project', 'experience', 'contact'];

expectedSections.forEach((id) => {
  const inNav = navbarContent.includes(`href: '#${id}'`) || navbarContent.includes(`href="#${id}"`);
  assert(inNav, `Navbar contains link to #${id}`, 'Navigation');
});

assert(heroContent.includes('id="home"'), 'Hero component has id="home"', 'Section Anchors');
assert(aboutContent.includes('id="about"'), 'About component has id="about"', 'Section Anchors');
assert(servicesContent.includes('id="service"'), 'Services component has id="service"', 'Section Anchors');
assert(projectsContent.includes('id="project"'), 'Projects component has id="project"', 'Section Anchors');
assert(experienceContent.includes('id="experience"'), 'Experience component has id="experience"', 'Section Anchors');
assert(contactContent.includes('id="contact"'), 'Contact component has id="contact"', 'Section Anchors');
assert(breakoutContent.includes('id="play"'), 'BreakoutGame component has id="play"', 'Section Anchors');

// 2. Scroll Spy Implementation Check
console.log('\n2. Checking Scroll Spy & Active State Tracking...');
assert(
  appContent.includes('setActiveSection(sections[i])') && appContent.includes('scrollPosition'),
  'App.jsx implements dynamic scroll-spy listener calculating active section on scroll',
  'Scroll Spy'
);
assert(
  navbarContent.includes('activeSection === item.id') && navbarContent.includes('border-b-2 border-white'),
  'Navbar renders active white underline for currently active section',
  'Scroll Spy'
);

// 3. Asset Integrity & Existence
console.log('\n3. Checking Static Media Assets...');
const publicDir = path.join(ROOT, 'public');
const assets = [
  'assets/hero_center.png',
  'assets/lifeos.png',
  'assets/resume_intel.png',
  'assets/study_assistant.png',
  'assets/habitflow.jpg',
  'assets/ecommerce.jpg',
  'assets/mindpixel.jpg',
  'assets/expense.jpg',
  'assets/contact_bg.mp4',
  'assets/reels/sigil.mp4',
  'assets/reels/quarto.mp4',
  'assets/reels/parachute.mp4',
  'assets/reels/quench.mp4',
  'assets/reels/lucid.mp4',
];

assets.forEach((assetRel) => {
  const fullPath = path.join(publicDir, assetRel);
  const exists = fs.existsSync(fullPath);
  let size = 0;
  if (exists) {
    size = fs.statSync(fullPath).size;
  }
  assert(exists && size > 100, `Asset ${assetRel} exists and is non-empty (${size} bytes)`, 'Assets');
});

// 4. Contact & Interactive Links
console.log('\n4. Checking External & Contact Link Formats...');
const profilePath = path.join(ROOT, 'src/data/profile.json');
const profileData = JSON.parse(fs.readFileSync(profilePath, 'utf-8'));

assert(
  profileData.personal.links.github.startsWith('https://github.com/'),
  'GitHub link is valid HTTPS URL',
  'Links'
);
assert(
  profileData.personal.links.linkedin.startsWith('https://linkedin.com/in/') ||
    profileData.personal.links.linkedin.startsWith('https://www.linkedin.com/in/'),
  'LinkedIn link is valid HTTPS URL',
  'Links'
);
assert(
  contactContent.includes('https://wa.me/919725259773'),
  'WhatsApp message link is configured with phone number',
  'Links'
);
assert(
  contactContent.includes('handleCopyEmail') && contactContent.includes('navigator.clipboard'),
  'Contact section implements clipboard email copy with feedback state',
  'Interactivity'
);

// 5. Accessibility & Keyboard Controls
console.log('\n5. Checking Accessibility & Keyboard Handlers...');
assert(
  modalContent.includes("e.key === 'Escape'") && modalContent.includes('onBack()'),
  'ComingSoonModal implements keyboard Escape dismiss listener',
  'Accessibility'
);
assert(
  modalContent.includes('role="dialog"') && modalContent.includes('aria-modal="true"'),
  'ComingSoonModal has proper ARIA dialog attributes',
  'Accessibility'
);
assert(
  navbarContent.includes("e.key === 'Escape'") && navbarContent.includes('setMobileMenuOpen(false)'),
  'Navbar mobile drawer implements keyboard Escape dismiss listener',
  'Accessibility'
);
assert(
  navbarContent.includes('aria-label="Toggle navigation menu"'),
  'Navbar mobile toggle button has accessible aria-label',
  'Accessibility'
);

// 6. Production Bundle Build Verification
console.log('\n6. Checking Production Build Output...');
const distIndex = path.join(ROOT, 'dist/index.html');
assert(fs.existsSync(distIndex), 'Production dist/index.html exists', 'Build');

const summary = {
  total: results.length,
  passed: results.filter((r) => r.pass).length,
  failed: results.filter((r) => !r.pass).length,
};

console.log('\n======================================================');
console.log(`TEST SUMMARY: ${summary.passed}/${summary.total} PASSED, ${summary.failed} FAILED`);
console.log('======================================================\n');

if (summary.failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
