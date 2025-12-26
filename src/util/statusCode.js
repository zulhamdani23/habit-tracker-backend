const statVal = {
  // 2xx — Success
  OK: 200,                 // request berhasil
  CREATED: 201,            // data berhasil dibuat
  ACCEPTED: 202,           // diproses async
  NO_CONTENT: 204,         // sukses tanpa body

  // 4xx — Client Error
  BAD_REQUEST: 400,        // request tidak valid
  UNAUTHORIZED: 401,       // belum login / token invalid
  FORBIDDEN: 403,          // tidak punya akses
  NOT_FOUND: 404,          // data / endpoint tidak ditemukan
  METHOD_NOT_ALLOWED: 405, // method salah
  CONFLICT: 409,           // data duplikat / bentrok
  UNPROCESSABLE: 422,      // validasi gagal

  // 5xx — Server Error
  INTERNAL_ERROR: 500,     // error server
  BAD_GATEWAY: 502,        // upstream error
  SERVICE_UNAVAILABLE: 503,// server down
  GATEWAY_TIMEOUT: 504     // upstream timeout
};

module.exports = statVal;