import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Index = () => {
  const [ideas, setIdeas] = useState([]);
  const [newIdea, setNewIdea] = useState({ title: "", description: "", category: "" });

  const handleAddIdea = () => {
    setIdeas([...ideas, { ...newIdea, id: ideas.length + 1 }]);
    setNewIdea({ title: "", description: "", category: "" });
  };

  const handleEditIdea = (id, field, value) => {
    setIdeas(ideas.map(idea => idea.id === id ? { ...idea, [field]: value } : idea));
  };

  const handleDeleteIdea = (id) => {
    setIdeas(ideas.filter(idea => idea.id !== id));
  };

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