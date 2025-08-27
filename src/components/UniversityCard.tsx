
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export type UniversityType = {
  type: string;
  id: string;
  name: string;
  description: string;
  location: string;
  website: string;
  programs: string[];
  logo: string;
};

interface UniversityCardProps {
  university: UniversityType;
}

const UniversityCard = ({ university }: UniversityCardProps) => {
  return (
    <Card className="h-full card-hover">
      <CardHeader className="pb-2">
        <div className="w-16 h-16 mb-2 flex items-center justify-center">
          <img src={university.logo} alt={university.name} className="max-h-full" />
        </div>
        <CardTitle className="text-xl">{university.name}</CardTitle>
        <CardDescription className="text-sm">
          {university.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="py-2">
        <p className="text-sm mb-4 line-clamp-3">{university.description}</p>
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground">Featured Programs</h4>
          <ul className="mt-1 text-sm space-y-1">
            {university.programs.slice(0, 3).map((program, index) => (
              <li key={index}>{program}</li>
            ))}
            {university.programs.length > 3 && (
              <li className="text-muted-foreground">
                +{university.programs.length - 3} more programs
              </li>
            )}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild variant="outline" className="flex-1">
          <Link to={`/universities/${university.id}`}>Details</Link>
        </Button>
        <Button 
          asChild 
          variant="outline" 
          className="flex items-center gap-1" 
          size="icon"
        >
          <a href={university.website} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UniversityCard;
