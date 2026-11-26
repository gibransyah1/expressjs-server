// const config = require("../configs/database");
// const mysql = require("mysql");
// const pool = mysql.createPool(config);

// pool.on("error", (err) => {
//   console.log(err);
// });

// module.exports = {
//   //ambil semua data mahasiswa
//   getDataMahasiswa(req, res) {
//     pool.getConnection(function (err, connection) {
//       if (err) throw err;
//       connection.query(`SELECT * FROM mahasiswa;`, function (error, results) {
//         if (error) throw error;
//         res.send({
//           success: true,
//           message: "Berhasil ambil data!",
//           data: results,
//         });
//       });
//       connection.release();
//     });
//   },
//   //ambil semua data mahasiswa berdasarkan id
//   getDataMahasiswaById(req, res) {
//     let id = req.params.id;
//     pool.getConnection(function (err, connection) {
//       if (err) throw err;
//       connection.query(
//         `SELECT * FROM mahasiswa WHERE id = ?;`,
//         [id],
//         function (error, results) {
//           if (error) throw error;
//           res.send({
//             success: true,
//             message: "Berhasil ambil data!",
//             data: results,
//           });
//         }
//       );
//       connection.release();
//     });
//   },
//   // Simpan data karyawan
//   addDataMahasiswa(req, res) {
//     let data = {
//       nim: req.body.nim,
//       nama: req.body.nama,
//       email: req.body.email,
//       alamat: req.body.alamat,
//     };
//     pool.getConnection(function (err, connection) {
//       if (err) throw err;
//       connection.query(
//         `INSERT INTO mahasiswa SET ?;`,
//         [data],
//         function (error, results) {
//           if (error) throw error;
//           res.send({
//             success: true,
//             message: "Berhasil tambah data!",
//           });
//         }
//       );
//       connection.release();
//     });
//   },
//   // Update data karyawan
//   editDataMahasiswa(req, res) {
//     let dataEdit = {
//       nim: req.body.nim,
//       nama: req.body.nama,
//       email: req.body.email,
//       alamat: req.body.alamat,
//     };
//     let id = req.body.id;
//     pool.getConnection(function (err, connection) {
//       if (err) throw err;
//       connection.query(
//         `UPDATE mahasiswa SET ? WHERE id = ?;`,
//         [dataEdit, id],
//         function (error, results) {
//           if (error) throw error;
//           res.send({
//             success: true,
//             message: "Berhasil edit data!",
//           });
//         }
//       );
//       connection.release();
//     });
//   },
//   // Delete data karyawan
//   deleteDataMahasiswa(req, res) {
//     let id = req.body.id;
//     pool.getConnection(function (err, connection) {
//       if (err) throw err;
//       connection.query(
//         `DELETE FROM mahasiswa WHERE id = ?`,
//         [id],
//         function (error, results) {
//           if (error) throw error;
//           res.send({
//             success: true,
//             message: "Berhasil hapus data!",
//           });
//         }
//       );
//       connection.release();
//     });
//   },
// };

// Uji Coba

const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.log(err);
});

module.exports = {
  //ambil semua data mahasiswa
  getDataMahasiswa(req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(`SELECT * FROM mahasiswa;`, function (error, results) {
        if (error) throw error;
        res.status(200).send({
          success: true,
          message: "Berhasil ambil data!",
          data: results,
        });
      });
      connection.release();
    });
  },
  //ambil semua data mahasiswa berdasarkan id
  getDataMahasiswaById(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `SELECT * FROM mahasiswa WHERE id = ?;`,
        [id],
        function (error, results) {
          if (error) throw error;
          res.status(200).send({
            success: true,
            message: "Berhasil ambil data!",
            data: results,
          });
        }
      );
      connection.release();
    });
  },
  // Simpan data karyawan
  addDataMahasiswa(req, res) {
    let data = {
      nim: req.body.nim,
      nama: req.body.nama,
      email: req.body.email,
      alamat: req.body.alamat,
    };
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `INSERT INTO mahasiswa SET ?;`,
        [data],
        function (error, results) {
          if (error) throw error;
          res.status(201).send({
            success: true,
            message: "Berhasil tambah data!",
          });
        }
      );
      connection.release();
    });
  },
  // Update data karyawan
  editDataMahasiswa(req, res) {
    let dataEdit = {
      nim: req.body.nim,
      nama: req.body.nama,
      email: req.body.email,
      alamat: req.body.alamat,
    };
    let id = req.body.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `UPDATE mahasiswa SET ? WHERE id = ?;`,
        [dataEdit, id],
        function (error, results) {
          if (error) throw error;
          res.status(200).send({
            success: true,
            message: "Berhasil edit data!",
          });
        }
      );
      connection.release();
    });
  },
  // Delete data karyawan
  deleteDataMahasiswa(req, res) {
    let id = req.body.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `DELETE FROM mahasiswa WHERE id = ?`,
        [id],
        function (error, results) {
          if (error) throw error;
          res.status(204).send({
            success: true,
            message: "Berhasil hapus data!",
          });
        }
      );
      connection.release();
    });
  },
};
