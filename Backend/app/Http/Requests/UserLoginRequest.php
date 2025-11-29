<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserLoginRequest extends FormRequest
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
            "email" => "required|email",
            "password" => "required|min:4"
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            "success" => false,
            "message" => 'Les données founies sont invalides',
            "errors" => $validator->errors()
        ]));
    }

    public function messages(): array
    {
        return [
            'email.required' => 'Entrer votre email',
            'email.email' => 'Entrer un email valide',
            'password.required' => 'Entrer un mot de passe',
            'password.min' => 'Le mot de passe doit contenir au moins 4 caractere'
        ];
    }
}
