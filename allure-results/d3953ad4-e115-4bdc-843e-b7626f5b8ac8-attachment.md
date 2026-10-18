# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: specs\e2e_admin_add_user.spec.js >> Admin User Management >> TC_Admin_001 | Admin menambahkan user dan menemukannya pada tabel
- Location: tests\specs\e2e_admin_add_user.spec.js:20:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_RESET at https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
Call log:
  - navigating to "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "This site can’t be reached" [level=1] [ref=e7]
    - paragraph [ref=e8]: The connection was reset.
    - generic [ref=e9]:
      - paragraph [ref=e10]: "Try:"
      - list [ref=e11]:
        - listitem [ref=e12]: Checking the connection
        - listitem [ref=e13]:
          - link "Checking the proxy and the firewall" [ref=e14] [cursor=pointer]:
            - /url: "#buttons"
        - listitem [ref=e15]:
          - link "Running Windows Network Diagnostics" [ref=e16] [cursor=pointer]:
            - /url: javascript:diagnoseErrors()
    - generic [ref=e17]: ERR_CONNECTION_RESET
  - generic [ref=e18]:
    - button "Reload" [ref=e20] [cursor=pointer]
    - button "Details" [ref=e21] [cursor=pointer]
```

# Test source

```ts
  1  | import { expect } from '@playwright/test';
  2  | 
  3  | export class LoginPage {
  4  |   constructor(page) {
  5  |     this.page = page;
  6  |     this.usernameInput = page.getByRole('textbox', { name: 'Username' });
  7  |     this.passwordInput = page.getByRole('textbox', { name: 'Password' });
  8  |     this.loginButton = page.getByRole('button', { name: 'Login' });
  9  |     this.errorAlert = page.getByRole('alert');
  10 |   }
  11 | 
  12 |   async goto() {
> 13 |     await this.page.goto('/web/index.php/auth/login');
     |                     ^ Error: page.goto: net::ERR_CONNECTION_RESET at https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  14 |   }
  15 | 
  16 |   async login(username, password) {
  17 |     await this.usernameInput.fill(username);
  18 |     await this.passwordInput.fill(password);
  19 |     await this.loginButton.click();
  20 |   }
  21 | 
  22 |   async expectError(message) {
  23 |     await expect(this.errorAlert).toHaveText(message);
  24 |   }
  25 | }
```