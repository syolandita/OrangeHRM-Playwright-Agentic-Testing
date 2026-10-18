Feature : E2E flow Admin menambahkan dan verifikasi user

    Scenario: Admin menambahkan user dan mencari user yang telah ditambahkan
    Backgound User membuka halaman OrangeHRM dan login menggunakan data yang valid

    Given User membuka menu admin dan tab user management
    And user membuka menu Admin
    When user klik button Add pada tab User Management
    And user memilih User Role "Admin"
    And user memilih Status "Enabled"
    And user menginputkan Name "A" dan memilih dari dropdown
    And user menginputkan Username "TaylorSwift89"
    And user menginputkan Password "Taylor123"
    And user menginputkan Confirm Password "Taylor123"
    And user klik Save
    Then user melihat pesan sukses

    Scenario: Mencari user yang baru ditambahkan
    Given user login OrangeHRM
    And user membuka menu Admin
    When user menginputkan Username "TaylorSwift89" pada filter System Users
    And user klik tombol Search
    Then hasil pencarian menampilkan user "TaylorSwift89"

