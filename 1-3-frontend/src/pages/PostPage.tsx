import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import {
  Chip,
  Button,
  Avatar,
} from '@nextui-org/react';
import { 
  Edit,
  Trash,
  ArrowLeft,
  Share
} from 'lucide-react';
import { apiService, Post } from '../services/apiService';

interface PostPageProps {
  isAuthenticated?: boolean;
  currentUserId?: string;
}

const PostPage: React.FC<PostPageProps> = ({ 
  isAuthenticated,
  currentUserId
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        if (!id) throw new Error('Post ID is required');
        const fetchedPost = await apiService.getPost(id);
        setPost(fetchedPost);
        setError(null);
      } catch (err) {
        setError('Failed to load the post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!post || !window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      setIsDeleting(true);
      await apiService.deletePost(post.id);
      navigate('/');
    } catch (err) {
      setError('Failed to delete the post. Please try again later.');
      setIsDeleting(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: post?.title,
        text: post?.content.substring(0, 100) + '...',
        url: window.location.href,
      });
    } catch (err) {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const createSanitizedHTML = (content: string) => {
    return {
      __html: DOMPurify.sanitize(content, {
        ALLOWED_TAGS: ['p', 'strong', 'em', 'br'],
        ALLOWED_ATTR: []
      })
    };
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12 animate-pulse space-y-8">
        <div className="space-y-4">
          <div className="h-4 bg-default-200 rounded w-1/4"></div>
          <div className="h-12 bg-default-200 rounded w-3/4"></div>
        </div>
        <div className="flex items-center gap-4 py-6 border-y border-default-100">
          <div className="w-10 h-10 rounded-full bg-default-200"></div>
          <div className="space-y-2 w-1/3">
            <div className="h-3 bg-default-200 rounded w-full"></div>
            <div className="h-3 bg-default-200 rounded w-2/3"></div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-default-200 rounded w-full"></div>
          <div className="h-4 bg-default-200 rounded w-full"></div>
          <div className="h-4 bg-default-200 rounded w-5/6"></div>
          <div className="h-4 bg-default-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12 text-center space-y-6">
        <div className="p-6 bg-danger-50 text-danger rounded-xl">
          {error || 'Post not found'}
        </div>
        <Button
          as={Link}
          to="/"
          color="primary"
          variant="flat"
          startContent={<ArrowLeft size={18} />}
        >
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8">
        <Button
          as={Link}
          to="/"
          variant="light"
          startContent={<ArrowLeft size={18} />}
          className="pl-0 text-default-500 hover:text-foreground transition-colors"
        >
          Back to Posts
        </Button>
      </div>

      <article className="space-y-8">
        <header className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Chip 
              size="sm" 
              variant="flat" 
              classNames={{
                base: "bg-primary/5 text-primary font-medium",
                content: "px-2"
              }}
            >
              {post.category.name}
            </Chip>
            {post.tags.map((tag) => (
              <Chip
                key={tag.id}
                size="sm"
                variant="flat"
                classNames={{
                  base: "bg-default-100 text-default-500",
                  content: "px-2"
                }}
              >
                {tag.name}
              </Chip>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight text-foreground">
            {post.title}
          </h1>

          <div className="flex items-center justify-between py-6 border-y border-default-100">
            <div className="flex items-center gap-3">
              <Avatar
                name={post.author?.name}
                className="w-10 h-10 text-large"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">{post.author?.name}</span>
                <div className="flex items-center gap-2 text-xs text-default-500">
                  <span>{formatDate(post.createdAt)}</span>
                  <span>•</span>
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                isIconOnly
                variant="light"
                onClick={handleShare}
                className="text-default-500 hover:text-foreground"
              >
                <Share size={20} />
              </Button>
              {isAuthenticated && (
                <>
                  <Button
                    isIconOnly
                    as={Link}
                    to={`/posts/${post.id}/edit`}
                    variant="light"
                    className="text-default-500 hover:text-primary"
                  >
                    <Edit size={20} />
                  </Button>
                  <Button
                    isIconOnly
                    variant="light"
                    onClick={handleDelete}
                    isLoading={isDeleting}
                    className="text-default-500 hover:text-danger"
                  >
                    <Trash size={20} />
                  </Button>
                </>
              )}
            </div>
          </div>
        </header>

        <div 
          className="prose prose-lg prose-neutral max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl"
          dangerouslySetInnerHTML={createSanitizedHTML(post.content)}
        />
      </article>
    </div>
  );
};

export default PostPage;