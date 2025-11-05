import { AreaController } from "../controllers/area.controller";

export class AreaRoutes {
    private areaController: AreaController = new AreaController();

    public routes(app): void {
        app.route('/area')
        .get(this.areaController.obtenerAreas)
        .post(this.areaController.crearArea);

        app.route('/area/:id')
        .put(this.areaController.actualizarArea)
        .delete(this.areaController.eliminarArea);        
    }
}