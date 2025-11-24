import React, { useEffect, useState } from 'react';
import { 
  Tabs, 
  Tab,
} from '@nextui-org/react';
import { apiService, Post, Category, Tag } from '../services/apiService';
import PostList from '../components/PostList';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt,desc");
  const [selectedCategory, setSelectedCategory] = useState<string|undefined>(undefined);
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postsResponse, categoriesResponse, tagsResponse] = await Promise.all([
          apiService.getPosts({      
            categoryId: selectedCategory != undefined ? selectedCategory : undefined,
            tagId: selectedTag || undefined
          }),
          apiService.getCategories(),
          apiService.getTags()
        ]);

        setPosts(postsResponse);
        setCategories(categoriesResponse);
        setTags(tagsResponse);
        setError(null);
      } catch (err) {
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, sortBy, selectedCategory, selectedTag]);

  const handleCategoryChange = (categoryId: string|undefined) => {
    if("all" === categoryId){
      setSelectedCategory(undefined)
    } else {
      setSelectedCategory(categoryId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-12 pb-12">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center space-y-6 py-16">
        <h1 className="text-5xl md:text-7xl font-bold font-serif tracking-tight text-foreground">
          Thoughts, stories, <br/> and ideas.
        </h1>
        <p className="text-xl text-default-500 max-w-2xl leading-relaxed">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
      </div>

      <div className="flex flex-col gap-8">                     
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-default-100 pb-4">
          <Tabs 
            selectedKey={selectedCategory} 
            onSelectionChange={(key) => {
              handleCategoryChange(key as string)
            }}
            variant="light"
            classNames={{
              tabList: "gap-4",
              cursor: "w-full bg-primary",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-primary group-data-[selected=true]:font-semibold text-default-500 text-lg"
            }}
          >
            <Tab key="all" title="All Posts" />
            {categories.map((category) => (
              <Tab 
                key={category.id} 
                title={category.name}
              />
            ))}
          </Tabs>

          {tags.length > 0 && (
            <div className="flex gap-2 flex-wrap justify-center">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedTag(selectedTag == tag.id ? undefined : tag.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedTag === tag.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-default-50 text-default-500 hover:bg-default-100'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <PostList
          posts={posts}
          loading={loading}
          error={error}
          page={page}
          sortBy={sortBy}
          onPageChange={setPage}
          onSortChange={setSortBy}
        />
      </div>
    </div>
  );
};

export default HomePage;