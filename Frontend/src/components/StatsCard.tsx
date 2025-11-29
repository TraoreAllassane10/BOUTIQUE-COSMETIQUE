import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import {  type LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: "up" | "down";
}

const StatsCard = ({ title, value, change, icon: Icon, trend }: StatsCardProps) => {
  return (
     <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className={cn(
          "text-xs mt-1",
          trend === "up" ? "text-green-500" : "text-red-500"
        )}>
          {trend === "up" ? "+" : "-"}{change} vs mois dernier
        </p>
      </CardContent>
    </Card>
  )
}

export default StatsCard