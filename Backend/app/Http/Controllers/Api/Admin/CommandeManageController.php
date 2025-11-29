<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\CommandeServices;
use Illuminate\Http\Request;

class CommandeManageController extends Controller
{
    public function __construct(
        public CommandeServices $commandeServices
    )
    {}

    public function index()
    {
        return $this->commandeServices->all();
    }

    public function updateStatus(Request $request, $commande)
    {
        return $this->commandeServices->updateStatus($request, $commande);
    }

    public function delete($commande)
    {
       return $this->commandeServices->delete($commande);
    }
}
