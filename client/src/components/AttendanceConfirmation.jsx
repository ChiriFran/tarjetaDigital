import React, { useState } from 'react';
import '../styles/AttendanceConfirmation.css';
import iconConfirmacion from '../../media/icons/carta.webp'

const opcionesAlimentacion = [
    'Ninguno',
    'Vegetariano',
    'Vegano',
    'Celíaco',
    'Diabético',
    'Hipertenso',
    'Intolerante a la lactosa',
    'Otro',
];

const AttendanceConfirmation = () => {
    const [cantidadPersonas, setCantidadPersonas] = useState(1);
    const [datos, setDatos] = useState([
        { nombre: '', apellido: '', alimentacion: 'Ninguno' },
    ]);

    const handleCantidadChange = (e) => {
        const nuevaCantidad = parseInt(e.target.value);
        setCantidadPersonas(nuevaCantidad);
        const nuevosDatos = Array.from({ length: nuevaCantidad }, (_, i) =>
            datos[i] || { nombre: '', apellido: '', alimentacion: 'Ninguno' }
        );
        setDatos(nuevosDatos);
    };

    const handleChange = (index, field, value) => {
        const nuevosDatos = [...datos];
        nuevosDatos[index][field] = value;
        setDatos(nuevosDatos);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formularioCompleto = datos.every(
            (d) => d.nombre.trim() !== '' && d.apellido.trim() !== ''
        );

        if (!formularioCompleto) {
            alert('Por favor completá todos los campos.');
            return;
        }

        console.log('Datos enviados:', datos);
        alert('Asistencia confirmada. ¡Gracias!');

        // 🔁 Reiniciar a 1 persona con campos vacíos
        setCantidadPersonas(1);
        setDatos([{ nombre: '', apellido: '', alimentacion: 'Ninguno' }]);
    };

    return (
        <div className="attendanceConfirmationContainer">
            <div className="icono-superior"><img src={iconConfirmacion} alt="confirmacion" /></div>
            <h2>Confirmacion de asistencia</h2>
            <form className="form-container" onSubmit={handleSubmit}>
                <label htmlFor="cantidad" className="label-cantidad">
                    ¿Cuántas personas asistirán?
                </label>
                <select
                    id="cantidad"
                    className="select-cantidad"
                    value={cantidadPersonas}
                    onChange={handleCantidadChange}
                >
                    {Array.from({ length: 10 }, (_, i) => (
                        <option key={i} value={i + 1}>
                            Persona {i + 1}
                        </option>
                    ))}
                </select>

                {datos.map((persona, index) => (
                    <div key={index} className="tarjeta-persona">
                        <h3>Persona {index + 1}</h3>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={persona.nombre}
                            onChange={(e) => handleChange(index, 'nombre', e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Apellido"
                            value={persona.apellido}
                            onChange={(e) => handleChange(index, 'apellido', e.target.value)}
                            required
                        />
                        <label className='restriccionAlimentariaTitle'>Restricción alimentaria:</label>
                        <select
                            value={persona.alimentacion}
                            onChange={(e) => handleChange(index, 'alimentacion', e.target.value)}
                        >
                            {opcionesAlimentacion.map((op, i) => (
                                <option key={i} value={op}>
                                    {op}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}

                <button type="submit" className="boton-enviar">
                    Enviar
                </button>
            </form>
        </div>
    );

};

export default AttendanceConfirmation;
