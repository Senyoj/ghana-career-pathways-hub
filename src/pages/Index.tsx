import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Book, GraduationCap, Briefcase, School } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import CourseCard, { CourseType } from "@/components/CourseCard";
import CareerCard, { CareerType } from "@/components/CareerCard";
import UniversityCard, { UniversityType } from "@/components/UniversityCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchCareers, fetchCourses, fetchUniversities } from "@/lib/api";

export default function Index() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [careers, setCareers] = useState<CareerType[]>([]);
  const [universities, setUniversities] = useState<UniversityType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [coursesData, careersData, universitiesData] = await Promise.all([
          fetchCourses(),
          fetchCareers(),
          fetchUniversities(),
        ]);
        setCourses(coursesData);
        setCareers(careersData);
        setUniversities(universitiesData);
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Hero />

      {/* Courses Section */}
      <section className="py-16">
        <div className="container">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-6 w-6" />
                Featured Courses
              </CardTitle>
              <CardDescription>Explore popular high school programs</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              {courses.slice(0, 3).map(course => (
                <CourseCard key={course._id || course.id} course={course} />
              ))}

            </CardContent>
            <div className="p-4 text-center">
              <Button asChild>
                <Link to="/courses">View All Courses</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Careers Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-6 w-6" />
                Career Paths
              </CardTitle>
              <CardDescription>Discover future opportunities</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              {careers.slice(0, 3).map((career) => (
                <CareerCard key={career.id} career={career} />
              ))}
            </CardContent>
            <div className="p-4 text-center">
              <Button asChild>
                <Link to="/careers">View All Careers</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-16">
        <div className="container">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="h-6 w-6" />
                Universities
              </CardTitle>
              <CardDescription>Find top universities in Ghana</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              {universities.slice(0, 3).map((university) => (
                <UniversityCard key={university.id} university={university} />
              ))}
            </CardContent>
            <div className="p-4 text-center">
              <Button asChild>
                <Link to="/universities">View All Universities</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
