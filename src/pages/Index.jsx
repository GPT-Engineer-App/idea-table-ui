import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useIdeas, useAddIdea, useUpdateIdea, useDeleteIdea } from "@/integrations/supabase/index.js";
import { toast } from "sonner";

const Index = () => {
  const { data: ideas, error, isLoading } = useIdeas();
  const addIdeaMutation = useAddIdea();
  const updateIdeaMutation = useUpdateIdea();
  const deleteIdeaMutation = useDeleteIdea();

  const [newIdea, setNewIdea] = useState({ title: "", description: "", category: "" });

  const handleAddIdea = async () => {
    try {
      await addIdeaMutation.mutateAsync(newIdea);
      setNewIdea({ title: "", description: "", category: "" });
      toast.success("Idea added successfully!");
    } catch (error) {
      toast.error("Failed to add idea: " + error.message);
    }
  };

  const handleEditIdea = async (id, field, value) => {
    try {
      const updatedIdea = ideas.find(idea => idea.id === id);
      updatedIdea[field] = value;
      await updateIdeaMutation.mutateAsync(updatedIdea);
      toast.success("Idea updated successfully!");
    } catch (error) {
      toast.error("Failed to update idea: " + error.message);
    }
  };

  const handleDeleteIdea = async (id) => {
    try {
      await deleteIdeaMutation.mutateAsync(id);
      toast.success("Idea deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete idea: " + error.message);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Messaging Ideas</h1>
      <div className="mb-4">
        <Input
          placeholder="Title"
          value={newIdea.title}
          onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
          className="mr-2"
        />
        <Input
          placeholder="Description"
          value={newIdea.description}
          onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })}
          className="mr-2"
        />
        <Input
          placeholder="Category"
          value={newIdea.category}
          onChange={(e) => setNewIdea({ ...newIdea, category: e.target.value })}
          className="mr-2"
        />
        <Button onClick={handleAddIdea}>Add Idea</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ideas.map((idea) => (
            <TableRow key={idea.id}>
              <TableCell>{idea.id}</TableCell>
              <TableCell>
                <Input
                  value={idea.title}
                  onChange={(e) => handleEditIdea(idea.id, "title", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={idea.description}
                  onChange={(e) => handleEditIdea(idea.id, "description", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={idea.category}
                  onChange={(e) => handleEditIdea(idea.id, "category", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => handleDeleteIdea(idea.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Index;