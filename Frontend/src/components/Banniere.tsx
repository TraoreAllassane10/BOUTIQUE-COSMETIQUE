import { ChevronRight } from "lucide-react"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"

const Banniere = () => {
  const navigate = useNavigate()

  return (
     <section className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Boutique Cosmétique
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Jusqu'à -50% sur une sélection de produits. Offre limitée !
            </p>
            <Button
              onClick={() => {
                navigate("/produits")
              }}
              className="bg-white text-purple-600 hover:bg-gray-100 cursor-pointer"
            >
              Découvrir nos produits
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
  )
}

export default Banniere