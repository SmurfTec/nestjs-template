export class AppModulePermissionsModel {
  app_module: number;
  permission: string;
}
export class AppModulePermissionsFetchModel {
  app_module: number;
  name: string;
}

export class AppModulePermissionsUpdateModel {
  app_module?: number;
  permission?: string;
}
