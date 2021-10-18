const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    };

    constructor() {
        this._listado = {};
    }

    cargarTereasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        this.listadoArr.forEach((tarea, i) => {
            const indice = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada.'.green
                : 'Pendiente.'.red;
            console.log(`${indice}. ${desc} :: ${estado}`);
        })
    }

    listarPendientesCompletadas(completadas = true) {

        let cont = 0;
        this.listadoArr.forEach(tarea => {
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada.'.green
                : 'Pendiente.'.red;
            if (completadas) {
                if (completadoEn) {
                    cont++;
                    console.log(`${(cont.toString() + '.').green} ${desc} :: ${completadoEn.green}`);
                }
            } else {
                if (!completadoEn) {
                    cont++;
                    console.log(`${(cont.toString() + '.').green} ${desc} :: ${estado}`);
                }
            }
        })
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    toggleCompletadas(ids = []) {

        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toLocaleDateString();
            }
        });

        this.listadoArr.forEach(tarea => {

            if (!ids.includes(tarea.id)) {

                this._listado[tarea.id].completadoEn = null;

            }

        });

    }
}

module.exports = Tareas;