# **Data Dictionary: Sistem Permintaan dan Pengadaan Barang**

Berikut adalah dokumentasi lengkap terkait **Data Dictionary** untuk sistem ini.

---

## **1. Tabel: `users`**
**Deskripsi**: Menyimpan informasi pengguna yang terlibat dalam proses permintaan dan pengadaan barang.  

| **Kolom**    | **Tipe Data**   | **Deskripsi**                                                     | **Primary Key** | **Foreign Key** | **Contoh Data**      |
|--------------|-----------------|-------------------------------------------------------------------|-----------------|-----------------|----------------------|
| `user_id`    | SERIAL          | ID unik untuk setiap pengguna.                                    | Yes             | -               | 1                    |
| `name`       | VARCHAR(100)    | Nama pengguna.                                                   | No              | -               | "John Doe"           |
| `role`       | VARCHAR(50)     | Peran pengguna (pemohon, purchasing, atasan).                   | No              | -               | "pemohon"            |

---

## **2. Tabel: `requests`**
**Deskripsi**: Menyimpan permintaan barang atau jasa dari pemohon.  

| **Kolom**      | **Tipe Data**   | **Deskripsi**                                                   | **Primary Key** | **Foreign Key** | **Contoh Data**           |
|----------------|-----------------|-----------------------------------------------------------------|-----------------|-----------------|---------------------------|
| `request_id`   | SERIAL          | ID unik untuk setiap permintaan.                                | Yes             | -               | 101                       |
| `user_id`      | INTEGER         | ID pengguna yang membuat permintaan.                           | No              | Yes (`users`)   | 1                         |
| `category`     | VARCHAR(50)     | Kategori permintaan.                                           | No              | -               | "Office Supplies"         |
| `description`  | TEXT            | Deskripsi permintaan.                                          | No              | -               | "Beli kertas A4"          |
| `status`       | VARCHAR(20)     | Status permintaan (Pending, Approved, Rejected).               | No              | -               | "Pending"                 |
| `created_at`   | TIMESTAMP       | Waktu permintaan dibuat.                                       | No              | -               | "2024-12-01 10:00:00"     |

---

## **3. Tabel: `approvals`**
**Deskripsi**: Menyimpan informasi persetujuan atas permintaan.  

| **Kolom**      | **Tipe Data**   | **Deskripsi**                                                   | **Primary Key** | **Foreign Key** | **Contoh Data**           |
|----------------|-----------------|-----------------------------------------------------------------|-----------------|-----------------|---------------------------|
| `approval_id`  | SERIAL          | ID unik untuk setiap persetujuan.                               | Yes             | -               | 201                       |
| `request_id`   | INTEGER         | ID permintaan yang disetujui.                                   | No              | Yes (`requests`)| 101                       |
| `approver_id`  | INTEGER         | ID pengguna yang menyetujui.                                    | No              | Yes (`users`)   | 2                         |
| `status`       | VARCHAR(20)     | Status persetujuan (Approved, Rejected).                        | No              | -               | "Approved"                |
| `approved_at`  | TIMESTAMP       | Waktu persetujuan diberikan.                                    | No              | -               | "2024-12-02 15:00:00"     |

---

## **4. Tabel: `warehouses`**
**Deskripsi**: Menyimpan data stok barang yang tersedia di gudang.  

| **Kolom**      | **Tipe Data**   | **Deskripsi**                                                   | **Primary Key** | **Foreign Key** | **Contoh Data**           |
|----------------|-----------------|-----------------------------------------------------------------|-----------------|-----------------|---------------------------|
| `warehouse_id` | SERIAL          | ID unik untuk setiap gudang.                                    | Yes             | -               | 301                       |
| `item_name`    | VARCHAR(100)    | Nama barang yang tersedia di gudang.                           | No              | -               | "Kertas A4"               |
| `quantity`     | INTEGER         | Jumlah stok barang.                                            | No              | -               | 500                       |

---

## **5. Tabel: `vendors`**
**Deskripsi**: Menyimpan informasi vendor yang menyediakan barang atau jasa.  

| **Kolom**      | **Tipe Data**   | **Deskripsi**                                                   | **Primary Key** | **Foreign Key** | **Contoh Data**           |
|----------------|-----------------|-----------------------------------------------------------------|-----------------|-----------------|---------------------------|
| `vendor_id`    | SERIAL          | ID unik untuk setiap vendor.                                    | Yes             | -               | 401                       |
| `name`         | VARCHAR(100)    | Nama vendor.                                                   | No              | -               | "PT Stationery Indo"      |
| `contact`      | VARCHAR(100)    | Kontak vendor (email, telepon).                                | No              | -               | "info@stationeryindo.com" |

---

## **6. Tabel: `transactions`**
**Deskripsi**: Mencatat pengadaan barang hingga selesai.  

| **Kolom**         | **Tipe Data**   | **Deskripsi**                                                   | **Primary Key** | **Foreign Key** | **Contoh Data**           |
|-------------------|-----------------|-----------------------------------------------------------------|-----------------|-----------------|---------------------------|
| `transaction_id`  | SERIAL          | ID unik untuk setiap transaksi.                                 | Yes             | -               | 501                       |
| `request_id`      | INTEGER         | ID permintaan terkait transaksi.                               | No              | Yes (`requests`)| 101                       |
| `vendor_id`       | INTEGER         | ID vendor yang menangani pengadaan.                            | No              | Yes (`vendors`) | 401                       |
| `status`          | VARCHAR(20)     | Status transaksi (In Progress, Completed).                     | No              | -               | "Completed"               |
| `completed_at`    | TIMESTAMP       | Waktu transaksi selesai.                                       | No              | -               | "2024-12-03 14:00:00"     |

---

## **Relasi Antar Tabel**
1. **`users` ↔ `requests`**: Satu pengguna dapat membuat banyak permintaan.  
2. **`requests` ↔ `approvals`**: Satu permintaan dapat memiliki satu atau lebih persetujuan.  
3. **`requests` ↔ `transactions`**: Satu permintaan dapat menghasilkan satu transaksi.  
4. **`vendors` ↔ `transactions`**: Satu vendor dapat menangani banyak transaksi.  
5. **`warehouses`**: Berdiri sendiri, digunakan untuk mencatat stok barang.  