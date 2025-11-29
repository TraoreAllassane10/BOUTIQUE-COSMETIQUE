<?php

namespace App\Http\Controllers\Api\Client;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Client\CommandeClientServices;

class CommandeClientController extends Controller
{
    public function __construct(
        public CommandeClientServices $commandeClientServices
    )
    {}

    public function process(Request $request)
    {
        return $this->commandeClientServices->process($request);
    }

    public function historique(Request $request)
    {
        return $this->commandeClientServices->historique($request);
    }
}
