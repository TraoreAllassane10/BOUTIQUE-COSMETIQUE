import illustration from "@/assets/login_vector.png";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex justify-between">
      {/* Gauche */}
      <div className="w-[50%] flex flex-col items-center justify-center p-20">
        {children}
      </div>

      {/* Droite */}
      <div className="w-[50%]">
        <div className="bg-indigo-200 w-full h-screen flex justify-center items-center">
          <img src={illustration} alt="" className="w-[80%] h-[80%]" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
