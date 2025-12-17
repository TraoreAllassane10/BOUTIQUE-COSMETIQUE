import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import gg from "@/assets/chercher.png";
import fb from "@/assets/facebook.png";
import insta from "@/assets/instagram.png";
import AuthLayout from "@/layouts/AuthLayout";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/store/api/authApi";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "@/store/slices/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

// Schema de validation avec zod
const FormSchema = z.object({
  email: z.string().email("Adresse e-mail invalide"),
  password: z
    .string()
    .min(4, "Le mot de passe doit contenir au moins 4 caractères"),
});

// Interfer le type TypeScript à partir du schema zod
type FormData = z.infer<typeof FormSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [errorConnection, setErrorConnection] = useState<string | null>("");

  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Soumission du formulaire
  const onSubmit = async (data: FormData) => {
    try {
      // Envoie de la requete au serveur en passant par RTK Query
      const response = await login(data).unwrap();

      // Mise à jour du state global avec les informations de l'utilisateur
      dispatch(
        setCredentials({
          user: response.data,
          token: response.token,
          isAuthenticated: true,
        })
      );

      if (response.success) {
        localStorage.setItem("token", response.token);
        navigate("/dashboard");
          console.log(response)
      }

      if (response.success === false) {
        setErrorConnection("Email ou mot de passe incorrect");
      }

      reset();
    } catch (error) {}
  };

  return (
    <AuthLayout>
      <div className="space-y-14">
        <div className="space-y-3">
          <h1 className="text-5xl font-bold text-slate-800">Connectez-vous</h1>
          <p className="text-sm text-gray-400">
            Hey, bienvenue nous sommes content de vous revoir
          </p>
        </div>

        {/* Formulaire */}
        <div className="mt-14">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {errorConnection && (
              <p className="mb-4 text-sm text-red-600">{errorConnection}</p>
            )}

            <div className="space-y-3">
              <div>
                <Input
                  type="email"
                  placeholder="allassane@gmail.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="*******"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-500">
              <div className="flex gap-2">
                <Checkbox />
                <Label>Se Rappeler de moi</Label>
              </div>

              <a href="#">Mot de passe oublié ?</a>
            </div>

            <Button>{isSubmitting ? "Connexion..." : "Se connecter"}</Button>
          </form>
        </div>

        <span className="mt-20 text-sm text-gray-500">
          Vous n'avez pas de compte ?{" "}
          <a href="/register" className="text-primary">
            inscrivez-vous
          </a>
        </span>

        <hr className="w-full m-4 border border-gray-300" />

        <div className="flex items-center justify-center gap-6">
          <a href="">
            <img src={gg} alt="" className="w-10 h-10" />
          </a>
          <a href="">
            <img src={fb} alt="" className="w-10 h-10" />
          </a>
          <a href="">
            <img src={insta} alt="" className="w-10 h-10" />
          </a>
        </div>

        <div>
          Administrateur
          <p>Email : allassanetraore@gmail.com</p>
          <p>Password : 1234</p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
