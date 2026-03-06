const pool = require('../config/db');

exports.getAllDuenos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Dueño');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener dueños', error: error.message });
    }
};

exports.getDuenoById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM Dueño WHERE Id_dueño = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Dueño no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el dueño', error: error.message });
    }
};

exports.createDueno = async (req, res) => {
    try {
        const { Nombre_dueño, Dirección, Teléfono, Correo, Fecha_registro } = req.body;
        const [result] = await pool.query(
            'INSERT INTO Dueño (Nombre_dueño, Dirección, Teléfono, Correo, Fecha_registro) VALUES (?, ?, ?, ?, ?)',
            [Nombre_dueño, Dirección, Teléfono, Correo, Fecha_registro]
        );
        res.status(201).json({ message: 'Dueño creado', id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear dueño', error: error.message });
    }
};

exports.updateDueno = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nombre_dueño, Dirección, Teléfono, Correo, Fecha_registro } = req.body;
        const [result] = await pool.query(
            'UPDATE Dueño SET Nombre_dueño=?, Dirección=?, Teléfono=?, Correo=?, Fecha_registro=? WHERE Id_dueño=?',
            [Nombre_dueño, Dirección, Teléfono, Correo, Fecha_registro, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Dueño no encontrado' });
        res.json({ message: 'Dueño actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar dueño', error: error.message });
    }
};

exports.deleteDueno = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM Dueño WHERE Id_dueño = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Dueño no encontrado' });
        res.json({ message: 'Dueño eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar dueño', error: error.message });
    }
};