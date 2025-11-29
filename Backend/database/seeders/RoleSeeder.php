<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                "role_name" => "Admin",
                "permission_name" => "manage category"
            ],
            [
                "role_name" => "Admin",
                "permission_name" => "manage produit"
            ],
            [
                "role_name" => "Admin",
                "permission_name" => "manage commande"
            ],
            [
                "role_name" => "preparateur",
                "permission_name" => "view commande a traiter"
            ],
        ];

        foreach ($data as $item) {

            $role = Role::firstOrCreate(
                [
                    "name" => $item['role_name']
                ]
            );

            $permission = Permission::firstOrCreate(
                [
                    "name" => $item['permission_name']
                ]
            );

            $role->givePermissionTo($permission);
        }

        Role::firstOrCreate([
            "name" => "client"
        ]);

    }
}
