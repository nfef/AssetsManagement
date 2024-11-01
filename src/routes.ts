import { RouteObject } from "./types/routes";
import { ListUsers, ConsultUser, NewUser, EditUser } from "./features/users";
import { ListCompanies, ConsultCompany, NewCompany, EditCompany } from "./features/companies";
import { ListFloors, ConsultFloor, NewFloor, EditFloor } from "./features/floors";
import { ListAssetTypes, ConsultAssetType, NewAssetType, EditAssetType } from "./features/assetTypes";
import { ListAssets, ConsultAsset, NewAsset, EditAsset } from "./features/assets";
import { ListInventories, ConsultInventory, NewInventory, EditInventory } from "./features/inventories";
import LoginPage from "./features/login/loginPage";


const routes: RouteObject[] = [
  { action: "read", entity: "User", to: '/login', element: LoginPage},
  { action: "read", entity: "Company", to: '/list/companies', element: ListCompanies},
{ action: "add", entity: "Company", to: '/companies/new', element: NewCompany},
{ action: "update", entity: "Company", to: '/companies/edit/:id', element: EditCompany},
{ action: "read", entity: "Company", to: '/companies/consult/:id', element: ConsultCompany},

  { action: "read", entity: "User", to: '/list/users', element: ListUsers},
{ action: "add", entity: "User", to: '/users/new', element: NewUser},
{ action: "update", entity: "User", to: '/users/edit/:id', element: EditUser},
{ action: "read", entity: "User", to: '/users/consult/:id', element: ConsultUser},

{ action: "read", entity: "Floor", to: '/list/floors', element: ListFloors},
{ action: "add", entity: "Floor", to: '/floors/new', element: NewFloor},
{ action: "update", entity: "Floor", to: '/floors/edit/:id', element: EditFloor},
{ action: "read", entity: "Floor", to: '/floors/consult/:id', element: ConsultFloor},

{ action: "read", entity: "AssetType", to: '/list/assettypes', element: ListAssetTypes},
{ action: "add", entity: "AssetType", to: '/assettypes/new', element: NewAssetType},
{ action: "update", entity: "AssetType", to: '/assettypes/edit/:id', element: EditAssetType},
{ action: "read", entity: "AssetType", to: '/assettypes/consult/:id', element: ConsultAssetType},

{ action: "read", entity: "Asset", to: '/list/assets', element: ListAssets},
{ action: "add", entity: "Asset", to: '/assets/new', element: NewAsset},
{ action: "update", entity: "Asset", to: '/assets/edit/:id', element: EditAsset},
{ action: "read", entity: "Asset", to: '/assets/consult/:id', element: ConsultAsset},

{ action: "read", entity: "Inventory", to: '/list/inventories', element: ListInventories},
{ action: "add", entity: "Inventory", to: '/inventories/new', element: NewInventory},
{ action: "update", entity: "Inventory", to: '/inventories/edit/:id', element: EditInventory},
{ action: "read", entity: "Inventory", to: '/inventories/consult/:id', element: ConsultInventory},



];

export default routes;