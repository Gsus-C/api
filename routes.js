// routes.js
const express = require('express');
const router = express.Router();
const connection = require('./db');
//const bcrypt = require('bcrypt');

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// ---------- Rutas: Registros IoT
// Obtener todos los registros
router.get('/registros_iot', (req, res) => {
  connection.query('SELECT * FROM tb_registros_iot', (err, results) => {
    if (err) {
      console.error('Error al obtener registros:', err);
      res.status(500).json({ error: 'Error al obtener registros' });
      return;
    }
    res.json(results);
  });
});

// Obtener un registro por su ID
router.get('/registros_iot/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM tb_registros_iot WHERE id_registro = ?', id, (err, results) => {
      if (err) {
        console.error('Error al obtener el registro:', err);
        res.status(500).json({ error: 'Error al obtener el registro' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Registro no encontrado' });
        return;
      }
      res.json(results[0]);
    });
});

// Crear un nuevo registro
router.post('/registros_iot', (req, res) => {
  const nuevoRegistro = req.body;
  connection.query('INSERT INTO tb_registros_iot SET ?', nuevoRegistro, (err, results) => {
    if (err) {
      console.error('Error al crear un nuevo registro:', err);
      res.status(500).json({ error: 'Error al crear un nuevo registro' });
      return;
    }
    res.status(201).json({ message: 'Registro creado exitosamente' });
  });
});

// Actualizar un registro
router.put('/registros_iot/:id', (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  connection.query('UPDATE tb_registros_iot SET ? WHERE id_registro = ?', [datosActualizados, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar el registro:', err);
      res.status(500).json({ error: 'Error al actualizar el registro' });
      return;
    }
    res.json({ message: 'Registro actualizado exitosamente' });
  });
});

// Eliminar un registro
router.delete('/registros_iot/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM tb_registros_iot WHERE id_registro = ?', id, (err, results) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
      return;
    }
    res.json({ message: 'Registro eliminado exitosamente' });
  });
});


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// ---------- Rutas: Usuarios
// Obtener todos los registros de usuarios
router.get('/registros_usuarios', (req, res) => {
  connection.query('SELECT * FROM tb_usuarios', (err, results) => { 
    if (err) {
      console.error('Error al obtener usuarios:', err);
      res.status(500).json({ error: 'Error al obtener usuarios' });
      return;
    }
    res.json(results);
  });
});

// Obtener un usuario por su ID
router.get('/registros_usuarios/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM tb_usuarios WHERE id_usuario = ?', id, (err, results) => {
    if (err) {
      console.error('Error al obtener el usuario:', err);
      res.status(500).json({ error: 'Error al obtener el usuario' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }
    res.json(results[0]);
  });
});

// Crear un nuevo usuario
router.post('/registros_usuarios', (req, res) => {
  const nuevoUsuario = req.body;
  connection.query('INSERT INTO tb_usuarios SET ?', nuevoUsuario, (err, results) => {
    if (err) {
      console.error('Error al crear un nuevo usuario:', err);
      res.status(500).json({ error: 'Error al crear un nuevo usuario' });
      return;
    }
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  });
});

// Actualizar un usuario
router.put('/registros_usuarios/:id', (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  connection.query('UPDATE tb_usuarios SET ? WHERE id_usuario = ?', [datosActualizados, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar el usuario:', err);
      res.status(500).json({ error: 'Error al actualizar el usuario' });
      return;
    }
    res.json({ message: 'Usuario actualizado exitosamente' });
  });
});

// Eliminar un usuario
router.delete('/registros_usuarios/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM tb_usuarios WHERE id_usuario = ?', id, (err, results) => {
    if (err) {
      console.error('Error al eliminar el usuario:', err);
      res.status(500).json({ error: 'Error al eliminar el usuario' });
      return;
    }
    res.json({ message: 'Usuario eliminado exitosamente' });
  });
});

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//En caso de hacer relacion de 2 tablas
/* Obtener todos los registros de dos tablas
router.get('/datos', (req, res) => {
  connection.query('SELECT car.id_carrera AS id, car.nombre AS carrera, gru.nombre AS grupo ' +
    'FROM tb_carrera AS car, tb_grupos AS gru ' +
    'WHERE car.id_carrera=gru.id_carrera', (err, results) => {
    if (err) {
      console.error('Error al obtener registros:', err);
      res.status(500).json({ error: 'Error al obtener registros' });
      return;
    }
    res.json(results);
  });
});
*/

module.exports = router;
