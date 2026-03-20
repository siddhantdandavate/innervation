// ============================================
// BLOG DATA - Add new blogs by adding objects to this array
// ============================================
//
// HOW TO ADD A NEW BLOG:
// 1. Add a new object to the array below
// 2. Place blog images in /public/images/ folder
// 3. That's it! No other code changes needed.
//
// FIELDS:
// - id: unique string (e.g. "blog-1", "blog-2")
// - title: blog post title
// - slug: URL-friendly version of title (lowercase, hyphens)
// - date: publication date (YYYY-MM-DD)
// - author: author name
// - excerpt: short description for blog listing
// - content: full blog content (supports HTML)
// - image: path to featured image (optional, relative to /public)

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  image?: string;
}

export const blogs: BlogPost[] = [
  {
    id: "blog-1",
    title: "How Digital Transformation Drives Business Growth",
    slug: "digital-transformation-drives-business-growth",
    date: "2026-03-15",
    author: "Innervation IT Solutions",
    excerpt: "Discover how businesses are leveraging digital transformation to accelerate growth, improve efficiency, and stay ahead of the competition.",
    content: `
      <h2>The Digital Imperative</h2>
      <p>In today's rapidly evolving business landscape, digital transformation is no longer optional — it's essential. Companies that embrace digital technologies are seeing significant improvements in efficiency, customer satisfaction, and revenue growth.</p>
      
      <h2>Key Areas of Digital Transformation</h2>
      <p><strong>1. Customer Experience</strong> — Modern businesses are using AI, chatbots, and personalized interfaces to create exceptional customer experiences that drive loyalty and retention.</p>
      <p><strong>2. Operational Efficiency</strong> — Automation, cloud computing, and data analytics are helping organizations streamline operations and reduce costs.</p>
      <p><strong>3. Business Model Innovation</strong> — Digital technologies enable new revenue streams and business models that weren't possible before.</p>
      
      <h2>Getting Started</h2>
      <p>The key to successful digital transformation is starting with a clear strategy. At Innervation IT Solutions, we help businesses navigate this journey with proven methodologies and expert guidance.</p>
      
      <p>Contact us to learn how we can help your business thrive in the digital age.</p>
    `,
    image: "/images/blog-digital-transformation.jpg",
  },
  {
    id: "blog-2",
    title: "Why Your Business Needs a Mobile App in 2026",
    slug: "why-your-business-needs-mobile-app-2026",
    date: "2026-03-10",
    author: "Innervation IT Solutions",
    excerpt: "Mobile apps are no longer a luxury — they're a necessity. Learn why investing in a mobile app can transform your customer engagement and revenue.",
    content: `
      <h2>The Mobile-First World</h2>
      <p>With over 6 billion smartphone users worldwide, mobile apps have become the primary way people interact with businesses. If your company doesn't have a mobile presence, you're missing out on a massive opportunity.</p>
      
      <h2>Benefits of Having a Mobile App</h2>
      <p><strong>Direct Customer Engagement</strong> — Push notifications, in-app messaging, and personalized content keep your brand top of mind.</p>
      <p><strong>Increased Revenue</strong> — Mobile commerce is growing exponentially, and apps consistently outperform mobile websites in conversion rates.</p>
      <p><strong>Brand Loyalty</strong> — A well-designed app creates a seamless experience that keeps customers coming back.</p>
      <p><strong>Data Insights</strong> — Mobile apps provide valuable analytics about user behavior that can inform business decisions.</p>
      
      <h2>Our Approach</h2>
      <p>At Innervation IT Solutions, we build cross-platform mobile applications using modern frameworks like React Native and Flutter, ensuring your app works beautifully on both iOS and Android.</p>
    `,
    image: "/images/blog-mobile-app.jpg",
  },
  {
    id: "blog-3",
    title: "The Importance of Cybersecurity for Small Businesses",
    slug: "importance-cybersecurity-small-businesses",
    date: "2026-03-05",
    author: "Innervation IT Solutions",
    excerpt: "Small businesses are increasingly targeted by cyber attacks. Learn how to protect your business with essential cybersecurity practices.",
    content: `
      <h2>Why Small Businesses Are Targets</h2>
      <p>Many small business owners believe they're too small to be targeted by cybercriminals. Unfortunately, the opposite is true — small businesses often have weaker security measures, making them attractive targets.</p>
      
      <h2>Essential Security Measures</h2>
      <p><strong>1. Employee Training</strong> — Most security breaches start with human error. Regular training on phishing, password hygiene, and data handling is crucial.</p>
      <p><strong>2. Multi-Factor Authentication</strong> — Adding an extra layer of security beyond passwords significantly reduces unauthorized access.</p>
      <p><strong>3. Regular Backups</strong> — Automated, encrypted backups ensure your data can be recovered in case of an attack.</p>
      <p><strong>4. Network Security</strong> — Firewalls, VPNs, and network monitoring help detect and prevent intrusions.</p>
      
      <h2>How We Help</h2>
      <p>Innervation IT Solutions offers comprehensive security assessments and implementations to help small businesses protect their digital assets without breaking the bank.</p>
    `,
    image: "/images/blog-cybersecurity.jpg",
  },
];
