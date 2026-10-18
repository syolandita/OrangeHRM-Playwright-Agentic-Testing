Feature: Login OrangeHRM

  Scenario: Login berhasil dengan akun admin valid
    Given user membuka halaman login OrangeHRM
    When user login dengan username "Admin" dan password "admin123"
    Then user melihat halaman dashboard

  Scenario: Login gagal dengan password salah
    Given user membuka halaman login OrangeHRM
    When user login dengan username "Admin" dan password "salahpassword"
    Then muncul pesan error "Invalid credentials"