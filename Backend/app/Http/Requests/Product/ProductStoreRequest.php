<?php

namespace App\Http\Requests\Product;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ProductStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "nom" => "required",
            "description" => "required",
            "prix" => "required",
            "stock" => "required",
            "image" => $this->isMethod("post") ? "required" : "nullable",
            "category_id" => "required"
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            "success" => true,
            "message" => "la donnée fournie est invalide",
            "errors" => $validator->errors()
        ]));
    }

    public function messages()
    {
        return [
            "nom.required" => "Entrer le nom du produit",
            "description.required" => "Entrer la description du produit",
            "prix.required" => "Entrer le prix du produit",
            "stock.required" => "Entrer le stock du produit",
            "image.required" => "Choissiser une image",
            "category_id.required" => "Entrer la categorie du produit"
        ];
    }
}
