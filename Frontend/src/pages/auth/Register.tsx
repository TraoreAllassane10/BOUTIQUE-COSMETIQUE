import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import gg from "@/assets/chercher.png";
import fb from "@/assets/facebook.png";
import insta from "@/assets/instagram.png";
import AuthLayout from "@/layouts/AuthLayout";

const Register = () => {
  return (
    <AuthLayout>
      {/* Gauche */}

      <div className="space-y-14">
        <div className="space-y-3">
          <h1 className="text-5xl font-bold text-slate-800">Inscivez-vous</h1>
          {/* <p className="text-sm text-gray-400">Hey, bienvenue nous sommes content de vous revoir</p> */}
        </div>

        <div className="mt-14">
          <form action="" className="space-y-6">
            <div className="space-y-3">
              <Input type="text" placeholder="Allassane Traore" />
              <Input type="email" placeholder="allassane@gmail.com" />
              <Input type="password" placeholder="*******" />
            </div>

            <div className="flex justify-between text-sm text-gray-500">
              <div className="flex gap-2">
                <Checkbox />
                <Label>Se Rappeler de moi</Label>
              </div>

              <a href="#">Mot de passe oublié ?</a>
            </div>

            <Button>S'inscrire</Button>
          </form>
        </div>

        <span className="mt-20 text-sm text-gray-500">
          Vous n'avez pas de compte ?{" "}
          <a href="/" className="text-primary">
            connectez-vous
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
      </div>
    </AuthLayout>
  );
};

export default Register;
