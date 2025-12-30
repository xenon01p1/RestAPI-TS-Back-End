export type Permission = {
    id: number,
    name: string
};

export type GetPermissions = Omit<Permission, 'id'>;