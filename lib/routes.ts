import { AreaRoutes } from "./modules/area/routes/area.routes";
import { UsuarioRoutes } from "./modules/usuario/routes/usuario.routes";

export class Routes {

    private usuarioRoutes: UsuarioRoutes = new UsuarioRoutes();
    private areaRoutes: AreaRoutes = new AreaRoutes();

    public routes(app): void {
        this.usuarioRoutes.routes(app);
        this.areaRoutes.routes(app);
    }
}