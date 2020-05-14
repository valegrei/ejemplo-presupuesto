import React, {useState} from 'react'
import Error from './Error';
import shortid from 'shortid';

const Formulario = ({agregarNuevoGasto}) => {

    const [ nombre, guardarNombre] = useState('');
    const [ cantidad, guardarCantidad] = useState(0);
    const [ error, guardaError] = useState(false);

    const agregarGasto = e => {
        e.preventDefault();

        // validar
        if(cantidad < 1 || isNaN(cantidad) || nombre.trim() === ''){
            guardaError(true);
            return;
        }
        guardaError(false);
        
        // Construir el gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }

        // pasar el gasto al componente principal
        agregarNuevoGasto(gasto)

        // resetar el formulario
        guardarNombre('');
        guardarCantidad(0);
    }

    return ( 
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos aquí</h2>

            { error ? <Error mensaje="Ambos campos son obligatorios o Presupuesto incorrecto"/>:null}

            <div className="campo">
                <label>Nombre Gasto</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    value={nombre}
                    onChange={e => guardarNombre(e.target.value)}
                />

                <label>Cantidad Gasto</label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange={e=> guardarCantidad(e.target.value)}
                />

                <input
                    type="submit"
                    className="button-primary u-full-width"
                    value="Agregar Gasto"
                />
            </div>
        </form>
    );
}
 
export default Formulario;