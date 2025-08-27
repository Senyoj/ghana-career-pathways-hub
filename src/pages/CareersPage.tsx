import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareerCard, { CareerType } from "@/components/CareerCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { fetchCareers } from "@/lib/api"; // your API function

const CareersPage = () => {
  const [careers, setCareers] = useState<CareerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  useEffect(() => {
    const loadCareers = async () => {
      try {
        const data = await fetchCareers();
        setCareers(data);
      } catch (err) {
        console.error("Failed to fetch careers:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCareers();
  }, []);

  const uniqueCourses = useMemo(
    () => [...new Set(careers.flatMap(career => career.relatedCourses))],
    [careers]
  );

  const filteredCareers = useMemo(() => {
    return careers.filter(career => {
      const matchesSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        career.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        career.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCourse = selectedCourse ? career.relatedCourses.includes(selectedCourse) : true;
      return matchesSearch && matchesCourse;
    });
  }, [careers, searchQuery, selectedCourse]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading careers...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Filters */}
        <div className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Input
                placeholder="Search careers, skills..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant={selectedCourse === null ? "default" : "outline"} onClick={() => setSelectedCourse(null)}>All Careers</Button>
              {uniqueCourses.map(course => (
                <Button
                  key={course}
                  variant={selectedCourse === course ? "default" : "outline"}
                  onClick={() => setSelectedCourse(course)}
                >
                  {course}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Careers list */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {filteredCareers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCareers.map(career => (
                <CareerCard key={career.id} career={career} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No careers found</h3>
              <Button onClick={() => { setSearchQuery(""); setSelectedCourse(null); }}>Reset Filters</Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CareersPage;
