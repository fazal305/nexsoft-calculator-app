# Nexsoft Calculator App

A responsive calculator application built with HTML5, CSS3, and vanilla JavaScript for the Nexsoft Solutions Frontend Internship.

## Live Links

- GitHub Repository: https://github.com/fazal305/nexsoft-calculator-app
- Live Demo: https://fazal305.github.io/nexsoft-calculator-app/

## Overview

Nexsoft Calculator App is a lightweight browser calculator that performs basic arithmetic operations without using `eval()`.

The project focuses on clean JavaScript logic, safe expression parsing, responsive UI design, keyboard support, and internship-ready project documentation.

## Features

- Number buttons from 0 to 9
- Addition, subtraction, multiplication, and division
- Decimal number support
- Chained calculations
- Clear button
- Delete button
- Keyboard input support
- Safe expression evaluation without `eval()`
- Division by zero handling
- Invalid input handling
- Responsive desktop and mobile layout
- Touch-friendly calculator buttons
- Dark modern UI
- GitHub Pages ready

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- GitHub Pages
  Folder Structure
  nexsoft-calculator-app/
  index.html
  style.css
  script.js
  README.md
  LICENSE
  .gitignore
  Getting Started

Clone the repository:

git clone https://github.com/fazal305/nexsoft-calculator-app.git

Open the folder:

cd nexsoft-calculator-app

Open index.html in your browser.

No installation or build step is required.

Keyboard Controls
Numbers: 0-9
Operators: + - \* /
Decimal: .
Calculate: Enter or =
Delete: Backspace
Clear: Escape
Architecture Notes

The project is split into three core files:

index.html contains the calculator structure and accessible buttons.
style.css handles the responsive layout, dark UI, button states, and focus states.
script.js handles input, validation, expression tokenizing, operator precedence, final calculation, and keyboard support.

The calculator avoids eval() by tokenizing the expression and manually calculating multiplication/division before addition/subtraction.

Accessibility

Accessibility support includes:

Semantic main and section structure
aria-live display updates
Accessible labels for calculator actions
Button type="button" attributes
Keyboard support
Visible focus states
Responsive touch-friendly controls
Performance

Performance notes:

No frameworks
No external libraries
No images
Small static files
GitHub Pages compatible
Fast load time
Testing Checklist

Before final submission:

Test all number buttons
Test addition
Test subtraction
Test multiplication
Test division
Test decimal values
Test chained calculations
Test delete button
Test clear button
Test keyboard controls
Test division by zero
Test mobile responsiveness
Run JavaScript syntax check:
node --check script.js
Lessons Learned
Building a calculator with vanilla JavaScript
Handling operator precedence manually
Avoiding unsafe eval() usage
Managing calculator state
Improving keyboard accessibility
Preparing internship projects for portfolio presentation
Future Improvements
Add percentage button
Add plus/minus toggle
Add calculation history
Add copy result button
Add theme switcher
Add scientific calculator mode
