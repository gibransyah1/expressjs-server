const router = require("express").Router();
const { mahasiswa } = require("../controllers");

// GET localhost:8080/mahasiswa => Ambil data semua mahasiswa
router.get("/mahasiswa", mahasiswa.getDataMahasiswa);

// GET localhost:8080/mahasiswa/2 => Ambil data semua mahasiswa berdasarkan id = 2
router.get("/mahasiswa/:id", mahasiswa.getDataMahasiswaById);

// POST localhost:8080/mahasiswa/add => Tambah data mahasiswa ke database
router.post("/mahasiswa/add", mahasiswa.addDataMahasiswa);

// POST localhost:8080/mahasiswa/edit => Edit data mahasiswa
router.put("/mahasiswa/edit", mahasiswa.editDataMahasiswa);

// POST localhost:8080/mahasiswa/delete => Delete data mahasiswa
router.delete("/mahasiswa/delete", mahasiswa.deleteDataMahasiswa);

module.exports = router;
