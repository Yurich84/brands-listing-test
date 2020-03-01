import Brands from "../../components/Brand/Brands";
import NotFound from "../../components/NotFound";
import EditBrand from "../../components/Brand/EditBrand";

export const routes = [{
    path: '/:page?',
    name: 'brands_index',
    component: Brands,
},{
    path: '/brands/:id/edit',
    name: 'brands_edit',
    component: EditBrand,
},{
    path: '*',
    component: NotFound,
    name: 'not_found'
}];
