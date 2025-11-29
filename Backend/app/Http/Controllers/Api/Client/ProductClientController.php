<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Services\Client\ProductClientServices;
use Illuminate\Http\Request;

class ProductClientController extends Controller
{
    public function __construct(
        public ProductClientServices $productClientServices
    )
    {}

    public function index(Request $request)
    {   
        return $this->productClientServices->getProduts($request);
    }

    public function show(string $id)
    {
        return $this->productClientServices->getProduct($id);
    }
}
