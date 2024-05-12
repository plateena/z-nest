import { Routes } from "@nestjs/core";
import { v1Routes } from "@/routes/v1-routes";

export const apiRoutes: Routes = [
    {
        path: '/api', 
        children: v1Routes
    }
]
