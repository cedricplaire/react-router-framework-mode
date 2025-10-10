import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("createuser", "routes/userCreate.tsx"),
    route("userslist", "routes/allusers.tsx"),
    route("edituser/:id", "routes/usermodif.tsx")
] satisfies RouteConfig;
