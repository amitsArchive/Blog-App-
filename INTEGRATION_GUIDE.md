# Frontend-Backend Integration Guide

## Changes Made

### 1. Backend CORS Configuration (SecurityConfig.java)

- Added CORS imports from `org.springframework.web.cors.*`
- Created `corsConfigurationSource()` bean that:
  - Allows requests from `http://localhost:5173` (Vite dev server) and `http://localhost:3000` (alternate port)
  - Enables all HTTP methods: GET, POST, PUT, DELETE, OPTIONS
  - Allows all headers with credentials support
  - Sets max age to 3600 seconds
- Updated `securityFilterChain()` to apply CORS configuration

### 2. Frontend API Service Update (src/services/apiService.ts)

- Changed `baseURL` from relative path `/api/v1` to absolute URL: `http://localhost:8080/api/v1`
- This ensures direct communication with the backend regardless of proxy configuration

## How to Run

### Step 1: Start the Backend

```bash
cd "c:\Users\Amit Sharma\Desktop\SpringBoot Security\Blog-App\blogapp"
mvn spring-boot:run
```

Backend will run on `http://localhost:8080`

### Step 2: Start the Frontend

In a new terminal:

```bash
cd "c:\Users\Amit Sharma\Desktop\SpringBoot Security\Blog-App\1-3-frontend"
npm install  # if not already installed
npm run dev
```

Frontend will run on `http://localhost:5173` (or `http://localhost:3000` if port 5173 is taken)

### Step 3: Test the Application

1. Navigate to `http://localhost:5173` (or the port shown in terminal)
2. Click "Login" in the navigation bar
3. Use test credentials:
   - Email: `test@gmail.com`
   - Password: `password`
4. After login, you should be able to:
   - ✅ Create posts (click "Create Post")
   - ✅ Create categories (click "Categories" in navbar)
   - ✅ Create tags (click "Tags" in navbar)
   - ✅ Delete posts, categories, and tags
   - ✅ View drafts and published posts

## Verification Checklist

After logging in, verify these operations work:

### Posts

- [ ] Create a new post with title, content, category, and tags
- [ ] View the created post on the home page
- [ ] Edit an existing post
- [ ] Delete a post

### Categories

- [ ] Create a new category
- [ ] Delete a category
- [ ] Filter posts by category on home page

### Tags

- [ ] Create new tags
- [ ] Delete a tag
- [ ] Filter posts by tag on home page

### Drafts

- [ ] Create a post and save as "Draft"
- [ ] View drafts in the "Drafts" section
- [ ] Publish a draft post

## Troubleshooting

### CORS Errors

If you see CORS errors in the browser console:

- Ensure backend is running on `http://localhost:8080`
- Ensure frontend is running on `http://localhost:5173` or `http://localhost:3000`
- Clear browser cache and reload

### API Connection Issues

- Check backend logs for errors
- Verify the token is being stored in localStorage (DevTools -> Application -> Local Storage)
- Ensure Authorization header is being sent (DevTools -> Network -> click any API request -> Headers)

### Authentication Issues

- If login fails, verify the test user exists in the database
- Check that the password matches the encoded value in the database
- Token should be stored as `Bearer <token>` format

## API Endpoints

### Authentication

- `POST /api/v1/auth/login` - Login with email and password

### Posts

- `GET /api/v1/posts` - Get all published posts (with optional category and tag filters)
- `GET /api/v1/posts/drafts` - Get user's draft posts (requires auth)
- `POST /api/v1/posts` - Create a new post (requires auth)
- `GET /api/v1/posts/:id` - Get a specific post
- `PUT /api/v1/posts/:id` - Update a post (requires auth)
- `DELETE /api/v1/posts/:id` - Delete a post (requires auth)

### Categories

- `GET /api/v1/categories` - Get all categories
- `POST /api/v1/categories` - Create a category (requires auth)
- `PUT /api/v1/categories/:id` - Update a category (requires auth)
- `DELETE /api/v1/categories/:id` - Delete a category (requires auth)

### Tags

- `GET /api/v1/tags` - Get all tags
- `POST /api/v1/tags` - Create tags (requires auth)
- `DELETE /api/v1/tags/:id` - Delete a tag (requires auth)

## Security Notes

- JWT token is stored in localStorage
- Token is automatically included in all authenticated requests via the `Authorization` header
- Token is automatically removed on logout
- Protected routes redirect to login if not authenticated
- GET endpoints for posts, categories, and tags are public
- All POST, PUT, DELETE operations require authentication
