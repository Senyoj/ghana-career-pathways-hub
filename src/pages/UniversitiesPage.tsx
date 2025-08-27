import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UniversityCard, { UniversityType } from "@/components/UniversityCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchUniversities } from "@/lib/api";

const UniversitiesPage = () => {
  const [universities, setUniversities] = useState<UniversityType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUniversities = async () => {
      try {
        const data = await fetchUniversities();
        setUniversities(data);
      } catch (err) {
        console.error("Failed to fetch universities:", err);
      } finally {
        setLoading(false);
      }
    };
    loadUniversities();
  }, []);

  const categorizedUniversities = useMemo(() => {
    return {
      public: universities.filter(u => u.type === "public"),
      private: universities.filter(u => u.type === "private"),
      technical: universities.filter(u => u.type === "technical"),
    };
  }, [universities]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading universities...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gold-light py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-ghana-blue">
              University & College Directory
            </h1>
            <p className="text-xl max-w-3xl text-ghana-blue">
              Explore Ghana's top higher education institutions, their programs, and admission requirements.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Tabs defaultValue="all" className="mb-12">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Institutions</TabsTrigger>
              <TabsTrigger value="public">Public Universities</TabsTrigger>
              <TabsTrigger value="private">Private Universities</TabsTrigger>
              <TabsTrigger value="technical">Technical Institutions</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="animate-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {universities.map(u => <UniversityCard key={u.id} university={u} />)}
              </div>
            </TabsContent>

            <TabsContent value="public" className="animate-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorizedUniversities.public.map(u => <UniversityCard key={u.id} university={u} />)}
              </div>
            </TabsContent>

            <TabsContent value="private" className="animate-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorizedUniversities.private.map(u => <UniversityCard key={u.id} university={u} />)}
              </div>
            </TabsContent>

            <TabsContent value="technical" className="animate-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorizedUniversities.technical.map(u => <UniversityCard key={u.id} university={u} />)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UniversitiesPage;
