import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function BlogContentSection() {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Web Development",
      date: "3rd Dec 2024",
      description: "Exploring the latest trends in frontend and backend technologies, including AI-powered coding tools and modern frameworks.",
      image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Developer working on code"
    },
    {
      id: 2,
      title: "Mastering React Performance Optimization",
      date: "5th Dec 2024", 
      description: "A deep dive into memoization, lazy loading, and efficient state management techniques for faster React applications.",
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D",
      alt: "Code on screen"
    },
    {
      id: 3,
      title: "UI/UX Design Principles for 2025",
      date: "10th Dec 2024",
      description: "Key strategies for creating intuitive, beautiful interfaces that delight users and drive engagement in the coming year.",
      image: "https://images.unsplash.com/photo-1455894127589-22f75500213a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbXB1dGVyfGVufDB8fDB8fHww",
      alt: "UI/UX design sketches on paper"
    }
  ];

  return (
    <section className="bg-background py-32">
      <div className="container mx-auto px-4">
        <h1 className="mb-12 max-w-lg font-sans text-5xl font-extrabold tracking-tight text-foreground md:text-7xl">
          Discover Our Fresh Content
        </h1>
        
        <div className="flex flex-col space-y-16">
          {blogPosts.map((post) => (
            <div key={post.id} className="flex flex-col items-center gap-16 md:flex-row">
              {/* Image */}
              <div className="flex h-80 w-full items-center justify-center overflow-hidden rounded-3xl bg-muted md:w-140">
                <img 
                  src={post.image} 
                  className="h-full w-full object-cover" 
                  alt={post.alt}
                />
              </div>
              
              {/* Content Card */}
              <Card className="border-none shadow-none bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6">
                <CardContent className="p-0">
                  <div className="mb-5 flex h-90 items-start border-b py-10 md:mb-0 lg:gap-32 md:border-t">
                    {/* Title and Date */}
                    <div className="flex h-full w-full flex-col items-start justify-between pr-8">
                      <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
                        {post.date}
                      </p>
                    </div>
                    
                    {/* Description and Button */}
                    <div className="flex h-full w-full flex-col items-start justify-between gap-6">
                      <p className="text-lg leading-relaxed font-normal tracking-tight text-muted-foreground md:text-xl">
                        {post.description}
                      </p>
                      
                      <Button 
                        variant="ghost" 
                        className="h-9 py-2 px-0 text-primary transition-all ease-in-out hover:gap-6 hover:text-accent-foreground hover:bg-accent dark:hover:bg-accent/50 inline-flex items-center justify-center gap-4"
                      >
                        <a href="#" className="text-lg font-semibold tracking-tight">
                          Read
                        </a>
                        <ArrowRight className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}