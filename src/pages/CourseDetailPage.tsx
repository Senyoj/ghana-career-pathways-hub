import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, GraduationCap, Briefcase } from "lucide-react";

const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      try {
        const res = await fetch(`/api/courses/${courseId}`);
        if (!res.ok) throw new Error("Failed to fetch course data");
        const data = await res.json();
        setCourse(data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading course data...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
            <p className="mb-6">{error || "The course you're looking for doesn't exist."}</p>
            <Button asChild>
              <Link to="/courses">Back to Courses</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const fieldsObject = course.fields || {};
  const fieldKeys = Object.keys(fieldsObject);

  const getAllCareers = () => {
    const careers: Array<any> = [];
    fieldKeys.forEach(subject => {
      const subjectField = fieldsObject[subject];
      subjectField.programs.forEach(program => {
        program.careers.forEach(career => {
          careers.push({ ...career, subject, program: program.program_name });
        });
      });
    });
    return careers;
  };

  const allCareers = getAllCareers();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className={`py-16 text-white ${courseId === "General Science" ? "bg-gradient-to-br from-blue-600 to-blue-800" :
            courseId === "General Arts" ? "bg-gradient-to-br from-purple-600 to-purple-800" :
              courseId === "Business" ? "bg-gradient-to-br from-amber-600 to-amber-800" :
                courseId === "Visual Arts" ? "bg-gradient-to-br from-pink-600 to-pink-800" :
                  courseId === "Home Economics" ? "bg-gradient-to-br from-green-600 to-green-800" :
                    "bg-gradient-to-br from-gray-600 to-gray-800"
          }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-4">
              <Button asChild variant="ghost" className="text-white hover:bg-white/10">
                <Link to="/courses"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses</Link>
              </Button>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">{course.name}</h1>
            <p className="text-xl max-w-3xl">{course.description}</p>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 flex flex-wrap">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="subjects">Key Subjects</TabsTrigger>
              <TabsTrigger value="programs">University Programs</TabsTrigger>
              <TabsTrigger value="careers">Career Paths</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="animate-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>About {course.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{course.description}</p>
                      <p className="mb-4">This SHS program prepares students for higher education and diverse career paths. Students develop skills specific to {course.name.toLowerCase()} while building foundational knowledge for university.</p>
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-2">Who Should Choose This Program?</h3>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                          <li>Have interests in {fieldKeys.join(", ")}</li>
                          <li>Excel in analytical thinking and problem-solving</li>
                          <li>Aspire to careers in {allCareers.slice(0, 3).map(c => c.career_name).join(", ")}, and related fields</li>
                          <li>Plan to pursue higher education in these disciplines</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Core Subjects</h3>
                          <p>English, Mathematics, Integrated Science, Social Studies</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Elective Subjects</h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {course.subjects.map((subject: string, index: number) => (
                              <Badge key={index} variant="outline">{subject}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Potential Career Fields</h3>
                          <p>{allCareers.slice(0, 5).map(c => c.career_name).join(", ")}{allCareers.length > 5 ? ", and more" : ""}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">University Programs</h3>
                          <p>{fieldKeys.length} main fields with multiple specialized programs</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Subjects Tab */}
            <TabsContent value="subjects" className="animate-in">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Key Subjects in {course.name}</h2>
                <p className="text-lg text-muted-foreground mb-6">Explore the elective subjects that form the foundation of the {course.name} program.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {course.subjects.map((subject: string, index: number) => (
                  <Card key={index} className="h-full">
                    <CardHeader>
                      <CardTitle>{subject}</CardTitle>
                      <CardDescription>
                        {fieldsObject[subject] ? `${fieldsObject[subject].programs.length} related university programs` : 'Foundation subject'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">
                        {fieldsObject[subject]
                          ? `${subject} provides knowledge for programs like ${fieldsObject[subject].programs.map((p: any) => p.program_name).join(", ")}.`
                          : `${subject} is a key component of ${course.name}.`}
                      </p>
                      {fieldsObject[subject] && (
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Related Careers</h4>
                          <div className="flex flex-wrap gap-2">
                            {Array.from(new Set(fieldsObject[subject].programs.flatMap((p: any) => p.careers.map((c: any) => c.career_name)))).slice(0, 5).map((career, idx) => (
                              <Badge key={idx} variant="outline">{career}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Programs Tab */}
            <TabsContent value="programs" className="animate-in">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">University Programs</h2>
                <p className="text-lg text-muted-foreground mb-6">Discover higher education paths available to {course.name} graduates.</p>
              </div>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {fieldKeys.map((subject, subjectIndex) => (
                  <AccordionItem key={subjectIndex} value={`subject-${subjectIndex}`} className="border rounded-lg overflow-hidden">
                    <AccordionTrigger className="px-6">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <GraduationCap className="h-4 w-4 text-primary" />
                        </div>
                        <span>{subject}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        {fieldsObject[subject].programs.map((program: any, programIndex: number) => (
                          <Card key={programIndex} className="border-0 shadow-sm">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">{program.program_name}</CardTitle>
                              <CardDescription>Available at: {program.universities.join(", ")}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <h4 className="text-sm font-medium text-muted-foreground mb-1">Related Careers</h4>
                              <div className="flex flex-wrap gap-1">
                                {program.careers.map((career: any, idx: number) => (
                                  <Badge key={idx} variant="outline">{career.career_name}</Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            {/* Careers Tab */}
            <TabsContent value="careers" className="animate-in">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Career Paths</h2>
                <p className="text-lg text-muted-foreground mb-6">Explore potential career opportunities for {course.name} graduates.</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {allCareers.map((career, index) => (
                  <Card key={index} className="h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{career.career_name}</CardTitle>
                          <CardDescription>{career.subject} &gt; {career.program}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{career.description}</p>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium">Key Responsibilities</h4>
                          <ul className="mt-1 pl-5 list-disc space-y-1 text-sm">
                            {career.key_responsibilities.map((resp: string, idx: number) => (
                              <li key={idx}>{resp}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Required Skills</h4>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {career.required_skills.map((skill: string, idx: number) => (
                              <Badge key={idx} variant="outline">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium">Education</h4>
                            <ul className="mt-1 text-sm">
                              {career.education_qualifications.map((edu: string, idx: number) => (
                                <li key={idx}>{edu}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Salary Range</h4>
                            <p className="text-sm mt-1">{career.salary}</p>
                            <h4 className="text-sm font-medium mt-2">Job Outlook</h4>
                            <p className="text-sm mt-1">{career.job_outlook}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetailPage;
