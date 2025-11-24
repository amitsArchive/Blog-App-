import React from 'react';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { Card, CardBody, CardFooter, CardHeader, Chip, Pagination, Select, SelectItem } from '@nextui-org/react';
import { Post } from '../services/apiService';
import { Calendar, Clock, Tag } from 'lucide-react';
import DOMPurify from 'dompurify';

interface PostListProps {
  posts: Post[] | null;
  loading: boolean;
  error: string | null;
  page: number;
  sortBy: string;
  onPageChange: (page: number) => void;
  onSortChange: (sortBy: string) => void;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  loading,
  error,
  page,
  sortBy,
  onPageChange,
  onSortChange,
}) => {
 
  const navigate = useNavigate();
 
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const createExcerpt = (content: string) => {
    const sanitizedContent = DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: []
    });
    
    let textContent = sanitizedContent.trim();
    
    if (textContent.length > 150) {
      textContent = textContent.substring(0, 150).split(' ').slice(0, -1).join(' ') + '...';
    }
    
    return textContent;
  };

  if (error) {
    return (
      <div className="p-6 text-danger bg-danger-50 rounded-xl border border-danger-100">
        {error}
      </div>
    );
  }

  const navToPostPage = (post: Post) => {
    navigate(`/posts/${post.id}`)
  }

  return (
    <div className="w-full space-y-8">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="w-full h-[300px] animate-pulse shadow-none border border-default-100" radius="lg">
              <div className="h-full bg-default-100"></div>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts?.map((post) => (
              <Card 
                key={post.id} 
                className="w-full h-full border-none shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-content1" 
                isPressable={true} 
                onPress={() => navToPostPage(post)}
                radius="lg"
              >
                <CardHeader className="flex flex-col items-start gap-2 px-6 pt-6 pb-0">
                  <div className="flex flex-wrap gap-2 mb-2">
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
                  </div>
                  <h2 className="text-xl font-bold text-left font-serif leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                </CardHeader>
                <CardBody className="px-6 py-4">
                  <p className="text-default-500 text-sm leading-relaxed line-clamp-3">
                    {createExcerpt(post.content)}
                  </p>
                </CardBody>
                <CardFooter className="px-6 pb-6 pt-0 flex flex-col items-start gap-4">
                  <div className="flex items-center justify-between w-full text-xs text-default-400 font-medium border-t border-default-100 pt-4">
                    <div className="flex items-center gap-2">
                       <span>{post.author?.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(post.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {post.readingTime} min
                      </span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PostList;