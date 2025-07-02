
import { PostComposerForm } from "@/components/PostComposerForm";

const PostComposer = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create Post</h1>
        <p className="text-muted-foreground">
          Share your content across multiple platforms
        </p>
      </div>
      
      <PostComposerForm />
    </div>
  );
};

export default PostComposer;
