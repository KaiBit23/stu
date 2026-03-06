const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'veterinaria.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        createTables();
    }
});

function createTables() {
    db.serialize(() => {
        // Dueño
        db.run(`CREATE TABLE IF NOT EXISTS Dueño (
            Id_dueño INTEGER PRIMARY KEY AUTOINCREMENT,
            Nombre_dueño TEXT NOT NULL,
            Dirección TEXT,
            Teléfono TEXT,
            Correo TEXT,
            Fecha_registro DATE,
            CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Mascota
        db.run(`CREATE TABLE IF NOT EXISTS Mascota (
            Id_mascota INTEGER PRIMARY KEY AUTOINCREMENT,
            Nombre TEXT NOT NULL,
            Especie TEXT,
            Raza TEXT,
            Sexo TEXT,
            Color TEXT,
            Fecha_nacimiento DATE,
            Peso REAL,
            Estado TEXT DEFAULT 'activo',
            Id_dueño INTEGER,
            CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (Id_dueño) REFERENCES Dueño(Id_dueño) ON DELETE CASCADE
        )`);

        // Additional tables down the road, but API currently only needs Dueños and Mascotas
        console.log("Tables created successfully.");
    });
}

// Wrapping it with Promises for async/await compatibility in controllers
const pool = {
    query: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            // Differentiate between SELECT and INSERT/UPDATE/DELETE
            if (sql.trim().toUpperCase().startsWith('SELECT')) {
                db.all(sql, params, (err, rows) => {
                    if (err) reject(err);
                    else resolve([rows]); // return array inside array for mysql2 compatibility `const [rows] = ...`
                });
            } else {
                db.run(sql, params, function (err) {
                    if (err) reject(err);
                    else resolve([{ insertId: this.lastID, affectedRows: this.changes }]);
                });
            }
        });
    }
};

module.exports = pool;