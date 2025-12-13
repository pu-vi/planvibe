export class BloggerAPI {
  private apiKey: string;
  private blogId: string;
  private baseUrl = 'https://www.googleapis.com/blogger/v3';

  constructor(apiKey: string, blogId: string) {
    this.apiKey = apiKey;
    this.blogId = blogId;
  }

  async getPages(maxResults: number = 10) {
    const url = `${this.baseUrl}/blogs/${this.blogId}/pages?key=${this.apiKey}&maxResults=${maxResults}`;
    const response = await fetch(url);
    return response.json();
  }

  async getPosts(maxResults: number = 10) {
    const url = `${this.baseUrl}/blogs/${this.blogId}/posts?key=${this.apiKey}&maxResults=${maxResults}`;
    const response = await fetch(url);
    return response.json();
  }
}