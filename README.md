Playwright Automation Testing

Automated testing project using Playwright, Allure Report, and AI Agent to simplify test creation and execution.

Tech Stack
Playwright
Allure Report
AI Agent & Playwright MCP
Gherkin-to-Playwright Skill
Project Structure
tests/ — Automation test cases
pages/ — Page Object Model
skills/gherkin-to-playwright/ — AI Agent skill
allure-results/ — Test results
allure-report/ — HTML test report
Getting Started

Install dependencies:

npm install
npx playwright install


Run tests:

npx playwright test


Generate Allure Report:

allure generate allure-results --clean -o allure-report
allure open allure-report

Workflow
Create test scenarios.
Generate test scripts using AI Agent.
Execute tests with Playwright.
Review results using Allure Report.
