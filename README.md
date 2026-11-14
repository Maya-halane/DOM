
# Gear Shop

An interactive outdoor equipment shop built using HTML, CSS and JavaScript.

## Features

- Dynamic product rendering from a JavaScript dataset.
- Live product search.
- Category filtering (All, Clothing, Gear).
- Event delegation for category buttons.
- Out-of-stock badges and dimmed product cards.
- Accessible navigation menu.
- Keyboard support using Tab, Enter and Escape.
- XSS protection using escaped product data and textContent.
- Responsive mobile-friendly layout.

## Project Structure

```text
gear-shop/
├── index.html
├── style.css
├── README.md
└── js/
    └── shop.js
```

## How to Run Locally

1. Clone this repository.
2. Open the project folder in VS Code.
3. Install the Live Server extension.
4. Right-click index.html.
5. Select Open with Live Server.
6. Test the search, filters and navigation menu.

## Why Event Delegation?

Event delegation was required because all category filter buttons are managed through one parent container. Instead of attaching separate click listeners to every button, one listener on the parent handles clicks using event.target.closest().

This makes the code easier to maintain and allows newly added filter buttons to work without attaching additional listeners.
