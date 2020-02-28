import Brands from "../../components/Brand/Brands";
import NotFound from "../../components/NotFound";

export const routes = [
    {
        path: '/',
        component: Brands,

    },
    {
        path: '*',
        component: NotFound,
        name: 'not_found'
    }
];
