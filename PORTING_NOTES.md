# Personal Website Porting Notes

## Goal of this document

This site is small, but it has a few meaningful ideas worth carrying into a rebuilt portfolio. The most important things to preserve are:

- A clear personal identity on the homepage
- Fast access to contact/social links
- Showcasing interactive engineering projects, not just listing them
- A simple, low-friction browsing experience

## Current site summary

The current site is a React + Vite single-page app with client-side routing. It has a fixed top header, a homepage, a contact page, and two interactive algorithm demos:

- Sorting Algorithm Visualizer
- Graph Algorithm Visualizer

There is also a `drone-delivery-system` route, but it is only a placeholder and is not currently surfaced from the homepage.

## Core aspects worth porting

### 1. Personal intro above the fold

The homepage immediately answers:

- Who you are
- What you do
- Where you work
- Why the site exists

It also pairs the intro with a headshot, which makes the landing page feel personal instead of purely technical.

Important content currently expressed:

- Name/identity: Sam / Samuel Kuznia
- Role: Software Engineer
- Employer mention: Amazon
- Site purpose: portfolio + project host + contact hub

For the rebuild, preserve the idea, not the exact copy. The new version should still communicate your identity and purpose immediately.

### 2. Project-first portfolio structure

The homepage does not bury projects in a resume-style wall of text. Instead, it highlights them as large clickable destinations.

This is worth preserving because it makes the site feel like a working product showcase rather than a static profile page.

Current featured projects:

- Sorting Algorithm Visualizer
- Graph Algorithm Visualizer

### 3. Persistent top navigation / header identity

The fixed header is one of the strongest structural ideas in the current site. It gives the site a stable identity and keeps important actions visible.

Current header behaviors:

- Clicking the site title returns to home
- GitHub opens externally
- LinkedIn opens externally
- Contact Me routes internally

The rebuild should keep some version of:

- Personal wordmark or name in the header
- A strong home anchor
- External professional links
- A direct contact path

### 4. Interactive demos as the most distinctive feature

The algorithm pages are the most unique part of the site. These are much more memorable than a standard portfolio card grid and are probably the highest-value features to preserve in some form.

If you only port a few things, port these.

## Feature inventory by page

### Home page

Current features:

- Intro headline
- Short personal blurb
- Headshot image
- Large project cards
- Clean, minimal layout with lots of whitespace

What to preserve:

- Fast understanding of who you are
- A visual human element
- Immediate paths into your best work

### Contact page

Current features:

- Dedicated contact route
- Email displayed directly
- Phone number displayed directly
- Click-to-copy email behavior
- Small confirmation popup after copying

What to preserve:

- At least one low-friction copy action
- Direct contact information or a modern equivalent
- Minimal friction to reach you

Possible modernization:

- Add a mailto link
- Add a resume link
- Add a contact form only if you actually want to maintain it

### Sorting Algorithm Visualizer

Current supported interactions:

- Randomize array
- Bubble sort
- Insertion sort
- Heap sort
- Merge sort
- Quick sort
- Binary search via input box
- Size presets: Small, Medium, Large

Important UX behaviors:

- Bars animate through color changes and swaps/inserts
- Animation speed scales with dataset size
- Binary search is intended to run on a sorted array
- Bar width adapts to viewport width
- Values are shown directly on the bars

Why it matters:

- It demonstrates algorithm knowledge in a visual way
- It gives visitors something interactive to play with
- It shows frontend state management beyond a static marketing site

Recommendation for rebuild:

- Preserve the concept even if the UI is redesigned completely
- Consider treating it as a featured case study with an embedded live demo

### Graph Algorithm Visualizer

Current supported interactions:

- Seeded sample graph on page load
- Add node by clicking the SVG canvas
- Edit node via click popup
- Add directed edge from one node to another
- Delete nodes
- Delete edges
- Pan view with arrow keys
- Zoom with `Z` and `X`
- Run Dijkstra's algorithm from a chosen start node
- Run topological sort
- Run strongly connected components via Kosaraju
- Reset node labels to IDs
- Clear the graph

Important UX behaviors:

- Directed edges are drawn with arrowheads
- Node labels are reused to show algorithm output
- Cycle detection in topological sort triggers an error message
- Contextual popups are used for node/edge editing

Why it matters:

- This is the most differentiated piece of the whole site
- It combines interaction design, algorithms, and SVG rendering
- It feels like a real software artifact instead of a portfolio placeholder

Recommendation for rebuild:

- Strong candidate to keep as a flagship interactive project
- If not embedded directly on the homepage, it should still be featured prominently

## Visual / brand patterns worth preserving

The current aesthetic is simple and developer-oriented. Even if the redesign becomes much more polished, these themes are worth remembering:

- Minimalist white/light background
- Sparse layout with generous spacing
- Black/gray neutral palette for shell UI
- Lowercase personal branding in the header
- Project pages use color mainly as functional feedback, not decoration

Useful brand takeaway:

The site feels straightforward, technical, and unpretentious. That tone is worth preserving even if the visuals become much stronger.

## Content worth carrying forward

- Headshot asset
- GitHub profile link
- LinkedIn profile link
- Personal summary
- Contact information
- The fact that you build interactive frontend-heavy engineering demos

## Things that should probably not be ported as-is

These are either outdated, unfinished, or artifacts of the older codebase:

- `DroneDeliverySystem.jsx` placeholder page
- Unused navigation components (`NavigationBar`, `NavigationItem`)
- Old Create React App leftovers in styles/tests/meta text
- Generic metadata like "Web site created using create-react-app"
- The stale default test file
- Hardcoded layout choices that are not mobile-friendly

## Technical observations

Current stack:

- React 18
- React Router
- Vite
- Sass

Architecture notes:

- Page-level routes are simple and easy to understand
- Styles are split per page/component with SCSS files
- Interactive demos are stateful and self-contained
- Algorithm logic is separated into standalone modules, which is a good pattern to preserve

Good implementation idea to carry forward:

- Keep algorithm logic separate from rendering logic

## Rebuild priorities

If rebuilding from scratch, the highest-priority items to preserve are:

1. A strong homepage intro with your identity and headshot
2. A clean persistent header with GitHub, LinkedIn, and contact access
3. Featured interactive project presentation
4. The sorting visualizer, the graph visualizer, or improved successors to them
5. Easy ways for a visitor to contact you

## Suggested translation into a new site

One strong direction would be:

- Home page as a sharper personal brand statement
- Featured Work section with richer case-study style entries
- One or both algorithm demos retained as polished interactive showcases
- About/Resume/Contact sections integrated more intentionally
- Better mobile responsiveness, metadata, and overall polish

## Bottom line

The most valuable parts of the current website are not the styling details or the exact copy. The important things to port are:

- your identity
- your contact paths
- your interactive project demos
- the sense that this is a portfolio made by an engineer who likes building things people can explore
