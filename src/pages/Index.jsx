import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Home, User, Settings, LogOut, MessageSquare, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
});

const Index = () => {
  const [threads, setThreads] = useState([
    { id: 1, title: "Thread Title 1", author: "Author1", date: "Date1", comments: 10, views: 100 },
    { id: 2, title: "Thread Title 2", author: "Author2", date: "Date2", comments: 20, views: 200 },
  ]);

  const form = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    const newThread = {
      id: threads.length + 1,
      title: data.title,
      author: "CurrentUser",
      date: new Date().toLocaleDateString(),
      comments: 0,
      views: 0,
    };
    setThreads([...threads, newThread]);
    toast("Post created successfully");
    form.reset();
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-background">
        <div className="flex items-center gap-4">
          <Home className="h-6 w-6" />
          <nav className="hidden md:flex md:items-center md:gap-5 lg:gap-6 text-lg font-medium md:text-sm">
            <Link to="/" className="hover:text-primary">Home</Link>
            <Link to="/categories" className="hover:text-primary">Categories</Link>
            <Link to="/about" className="hover:text-primary">About</Link>
            <Link to="/contact" className="hover:text-primary">Contact</Link>
          </nav>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 p-4 border-r bg-muted/40">
          <Input placeholder="Search..." className="mb-4" />
          <nav className="flex flex-col gap-2">
            <Link to="/general" className="flex items-center gap-2 hover:text-primary">
              <MessageSquare className="h-5 w-5" />
              General
            </Link>
            <Link to="/programming" className="flex items-center gap-2 hover:text-primary">
              <MessageSquare className="h-5 w-5" />
              Programming
            </Link>
            <Link to="/hardware" className="flex items-center gap-2 hover:text-primary">
              <MessageSquare className="h-5 w-5" />
              Hardware
            </Link>
            <Link to="/software" className="flex items-center gap-2 hover:text-primary">
              <MessageSquare className="h-5 w-5" />
              Software
            </Link>
            <Link to="/networking" className="flex items-center gap-2 hover:text-primary">
              <MessageSquare className="h-5 w-5" />
              Networking
            </Link>
          </nav>
        </aside>

        {/* Forum Threads */}
        <main className="flex-grow p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Forum Threads</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="primary">Create Post</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a New Post</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Content" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">Submit</Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Forum Threads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {threads.map((thread) => (
                  <Link key={thread.id} to={`/thread/${thread.id}`} className="flex justify-between p-4 border rounded hover:bg-muted/40">
                    <div>
                      <h2 className="text-lg font-semibold">{thread.title}</h2>
                      <p className="text-sm text-muted-foreground">by {thread.author} on {thread.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{thread.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{thread.views}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Right Sidebar (optional) */}
        <aside className="w-64 p-4 border-l bg-muted/40 hidden lg:block">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Link to="/post/1" className="hover:text-primary">Recent Post 1</Link>
                <Link to="/post/2" className="hover:text-primary">Recent Post 2</Link>
                {/* Add more recent posts as needed */}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Advertisements</CardTitle>
            </CardHeader>
            <CardContent>
              <img src="/placeholder.svg" alt="placeholder" className="mx-auto object-cover w-full h-[200px]" />
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-between p-4 border-t bg-background">
        <div className="flex items-center gap-4">
          <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
          <Link to="/contact" className="hover:text-primary">Contact Us</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/facebook" className="hover:text-primary">Facebook</Link>
          <Link to="/twitter" className="hover:text-primary">Twitter</Link>
          <Link to="/linkedin" className="hover:text-primary">LinkedIn</Link>
        </div>
      </footer>
    </div>
  );
};

export default Index;