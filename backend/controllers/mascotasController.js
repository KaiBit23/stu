const pool = require('../config/db');

exports.getAllMascotas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Mascota');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener mascotas', error: error.message });
    }
};

exports.getMascotaById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM Mascota WHERE Id_mascota = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Mascota no encontrada' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener mascota', error: error.message });
    }
};

exports.createMascota = async (req, res) => {
    try {
        const { Nombre, Especie, Raza, Sexo, Color, Fecha_nacimiento, Peso, Estado, Id_dueño } = req.body;
        const [result] = await pool.query(
            'INSERT INTO Mascota (Nombre, Especie, Raza, Sexo, Color, Fecha_nacimiento, Peso, Estado, Id_dueño) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [Nombre, Especie, Raza, Sexo, Color, Fecha_nacimiento, Peso, Estado || 'activo', Id_dueño]
        );
        res.status(201).json({ message: 'Mascota creada', id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear mascota', error: error.message });
    }
};

exports.updateMascota = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nombre, Especie, Raza, Sexo, Color, Fecha_nacimiento, Peso, Estado, Id_dueño } = req.body;
        const [result] = await pool.query(
            'UPDATE Mascota SET Nombre=?, Especie=?, Raza=?, Sexo=?, Color=?, Fecha_nacimiento=?, Peso=?, Estado=?, Id_dueño=? WHERE Id_mascota=?',
            [Nombre, Especie, Raza, Sexo, Color, Fecha_nacimiento, Peso, Estado, Id_dueño, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Mascota no encontrada' });
        res.json({ message: 'Mascota actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar mascota', error: error.message });
    }
};

exports.deleteMascota = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM Mascota WHERE Id_mascota = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Mascota no encontrada' });
        res.json({ message: 'Mascota eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar mascota', error: error.message });
    }
};