import CommandeChart from "@/components/CommandeChart";
import DernierClient from "@/components/DernierClient";
import DerniereCommande from "@/components/DerniereCommande";
import StatsCard from "@/components/StatsCard";

import DashboardLayout from "@/layouts/DashboardLayout";
import { Euro, ShoppingCart, Users } from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Tableau de bord
            </h1>
            <p className="text-muted-foreground">
              Vue d'ensemble de votre activité e-commerce
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Revenus journalier"
              value="50.000 fcfa"
              change="5.04%"
              icon={Euro}
              trend="up"
            />
            <StatsCard
              title="Revenus totaux"
              value="1.000.000 fcfa"
              change="20.1%"
              icon={Euro}
              trend="up"
            />
            <StatsCard
              title="Commandes"
              value="325"
              change="15.3%"
              icon={ShoppingCart}
              trend="up"
            />
            <StatsCard
              title="Clients"
              value="125"
              change="12.5%"
              icon={Users}
              trend="down"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <CommandeChart/>
            <DernierClient/>
          </div>


          {/* Dernières commandes */}
          <DerniereCommande/>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
