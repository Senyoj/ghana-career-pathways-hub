
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type CareerType = {
  id: string;
  title: string;
  description: string;
  relatedCourses: string[];
  skills: string[];
  icon: string;
};

interface CareerCardProps {
  career: CareerType;
}

const CareerCard = ({ career }: CareerCardProps) => {
  return (
    <Card className="h-full card-hover">
      <CardHeader className="pb-2">
        <div className="w-12 h-12 mb-2 bg-green-light/10 rounded-full flex items-center justify-center">
          <img src={career.icon} alt={career.title} className="w-6 h-6" />
        </div>
        <CardTitle className="text-xl">{career.title}</CardTitle>
        <CardDescription className="text-sm line-clamp-2">
          {career.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="py-2">
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-muted-foreground">Required Skills</h4>
          <div className="flex flex-wrap gap-1 mt-1">
            {career.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                {skill}
              </Badge>
            ))}
            {career.skills.length > 3 && (
              <span className="text-xs px-2 py-1 rounded-full">
                +{career.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground">Related SHS Courses</h4>
          <div className="flex flex-wrap gap-1 mt-1">
            {career.relatedCourses.map((course, index) => (
              <Badge key={index} variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {course}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link to={`/careers/${career.id}`}>Explore Career</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CareerCard;
