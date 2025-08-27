import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard, { CourseType } from "@/components/CourseCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchCourses } from "@/lib/api"; // import your helper

const CoursesPage = () => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses(); // use your helper
        // Convert API data to CourseType
        const mappedCourses: CourseType[] = Object.entries(data).map(([title, courseData]: [string, any]) => {
          const allCareers: string[] = [];
          const fieldMap = {
            "General Science": courseData.science_fields,
            "General Arts": courseData.arts_fields,
            "Business": courseData.business_fields,
            "Visual Arts": courseData.visual_arts_fields,
            "Home Economics": courseData.home_economics_fields,
            "Technical/Vocational": courseData.technical_fields
          };
          const fields = fieldMap[title as keyof typeof fieldMap];
          if (fields) {
            Object.values(fields).forEach((field: any) => {
              field.programs.forEach((program: any) => {
                program.careers.forEach((career: any) => {
                  if (!allCareers.includes(career.career_name)) allCareers.push(career.career_name);
                });
              });
            });
          }
          return {
            id: title.toLowerCase().replace(/\s+/g, "-"),
            title,
            description: courseData.description,
            subjects: courseData.subjects,
            careers: allCareers,
            icon: "/placeholder.svg"
          };
        });
        setCourses(mappedCourses);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching courses");
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  if (loading) return <p className="text-center py-20">Loading courses...</p>;
  if (error) return <p className="text-center py-20 text-red-600">{error}</p>;

  const categorizedCourses = {
    science: courses.filter(c => c.title === "General Science"),
    arts: courses.filter(c => ["General Arts", "Visual Arts"].includes(c.title)),
    business: courses.filter(c => ["Business", "Home Economics", "Technical/Vocational"].includes(c.title))
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-ghana-blue text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">SHS Courses Overview</h1>
            <p className="text-xl max-w-3xl text-blue-100">Explore major SHS programs in Ghana, their elective subjects, and potential career paths.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Choose Your Path</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Your SHS program choice significantly affects your future education and career. Explore each program to understand its focus, subjects, and career paths.
            </p>
          </div>

          <Tabs defaultValue="all" className="mb-12">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Programs</TabsTrigger>
              <TabsTrigger value="science">Science</TabsTrigger>
              <TabsTrigger value="arts">Arts & Humanities</TabsTrigger>
              <TabsTrigger value="business">Business & Technical</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="animate-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => <CourseCard key={course.id} course={course} />)}
              </div>
            </TabsContent>

            <TabsContent value="science" className="animate-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorizedCourses.science.map(course => <CourseCard key={course.id} course={course} />)}
              </div>
            </TabsContent>

            <TabsContent value="arts" className="animate-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorizedCourses.arts.map(course => <CourseCard key={course.id} course={course} />)}
              </div>
            </TabsContent>

            <TabsContent value="business" className="animate-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorizedCourses.business.map(course => <CourseCard key={course.id} course={course} />)}
              </div>
            </TabsContent>
          </Tabs>

          <div className="bg-muted p-6 rounded-lg mb-12">
            <h3 className="text-xl font-bold mb-2">Making the Right Choice</h3>
            <p className="mb-4">When selecting an SHS program, consider:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your personal interests and strengths</li>
              <li>Potential career goals and aspirations</li>
              <li>University program requirements for your desired field</li>
              <li>Performance in related subjects during Junior High School</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoursesPage;
